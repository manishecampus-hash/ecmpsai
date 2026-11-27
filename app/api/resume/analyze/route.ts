import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import mammoth from "mammoth";
import { extractText } from "unpdf";
import { getAuthContext } from "@/lib/auth/guards";
import { getDb } from "@/lib/mongodb";
import {
  getUniversityListings,
  type UniversityCourseListing,
} from "@/lib/recommendations-server";
import { formatIndianRupees } from "@/lib/recommendations";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface ResumeAnalysisResult {
  candidateName: string;
  currentRole: string;
  yearsOfExperience: number;
  experienceLabel: string;
  highestQualification: string;
  qualificationDetail: string;
  skills: string[];
  experienceSummary: string;
  eligibilityAssessment: string;
  recommendedDegrees: string[];
  recommendedSpecializations: string[];
  profileMatchScore: number;
  aiReadinessScore: number;
  scholarshipEligibility: string;
  careerOutcome: string;
  degreeReasons: Record<string, string>;
}

export interface ResumeMatchedCourse {
  id: string;
  university: string;
  program: string;
  degree: string;
  specialization: string;
  mode: string;
  location: string;
  matchScore: number;
  match: string;
  rating: string;
  reviews: string;
  applied: number;
  seed: string;
  fee: string;
  feeNumber: number;
  duration: string;
  eligibility: string;
  eligibilityStatus: string;
  matchReason: string;
  tags: string[];
  image: string;
  slug?: string;
}

function extractPrintableText(buffer: Buffer): string {
  // Useful fallback for legacy binary .doc files or plain text
  const utf8 = buffer.toString("utf8");
  const cleaned = utf8
    .replace(/[^\x20-\x7E\n\r\t]/g, " ")
    .replace(/\s{3,}/g, "\n")
    .trim();
  return cleaned;
}

async function extractResumeText(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ text: string; isPdfFallbackNeeded: boolean }> {
  const lower = fileName.toLowerCase();

  if (lower.endsWith(".pdf") || mimeType === "application/pdf") {
    try {
      const { text } = await extractText(new Uint8Array(buffer), {
        mergePages: true,
      });
      const trimmed = (text || "").trim();
      if (trimmed.length >= 80) {
        return { text: trimmed, isPdfFallbackNeeded: false };
      }
      return { text: trimmed, isPdfFallbackNeeded: true };
    } catch (err) {
      console.warn("unpdf extraction failed, will use OpenAI PDF fallback:", err);
      return { text: "", isPdfFallbackNeeded: true };
    }
  }

  if (
    lower.endsWith(".docx") ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return { text: (result.value || "").trim(), isPdfFallbackNeeded: false };
  }

  if (lower.endsWith(".doc") || mimeType === "application/msword") {
    try {
      const result = await mammoth.extractRawText({ buffer });
      if (result.value && result.value.trim().length >= 60) {
        return { text: result.value.trim(), isPdfFallbackNeeded: false };
      }
    } catch {
      // Legacy binary .doc is not ZIP-based; fall back to printable ASCII extraction
    }
    return { text: extractPrintableText(buffer), isPdfFallbackNeeded: false };
  }

  // Plain text / fallback
  return { text: buffer.toString("utf8").trim(), isPdfFallbackNeeded: false };
}

function checkCourseEligibility(
  courseEligibility: string,
  highestQualification: string,
  yearsOfExperience: number
): { eligible: boolean; label: string } {
  const elig = (courseEligibility || "").toLowerCase();
  const qual = (highestQualification || "").toLowerCase();

  if (!elig) {
    return { eligible: true, label: "Eligible" };
  }

  const isDoctorate = qual.includes("phd") || qual.includes("doctor");
  const isMasters = qual.includes("master") || qual.includes("post-graduate") || isDoctorate;
  const isBachelors =
    qual.includes("bachelor") ||
    qual.includes("graduate") ||
    qual.includes("b.tech") ||
    qual.includes("btech") ||
    qual.includes("bca") ||
    qual.includes("bba") ||
    qual.includes("b.com") ||
    qual.includes("b.sc") ||
    isMasters;
  const isDiploma = qual.includes("diploma") || isBachelors;
  const is12th = qual.includes("12th") || isDiploma;

  if (elig.includes("post-graduate") || elig.includes("master")) {
    if (isMasters) return { eligible: true, label: "Eligible (Post-Graduate)" };
    if (isBachelors && yearsOfExperience >= 2) {
      return { eligible: true, label: "Eligible (Graduate + Exp.)" };
    }
    return { eligible: false, label: "Requires Master's / Exp." };
  }

  if (elig.includes("graduate")) {
    if (elig.includes("exp") && isBachelors) {
      return yearsOfExperience >= 1
        ? { eligible: true, label: "Eligible (Work Experience)" }
        : { eligible: true, label: "Eligible (Graduate)" };
    }
    if (isBachelors) return { eligible: true, label: "Eligible (Graduate)" };
    return { eligible: false, label: "Requires Bachelor's" };
  }

  if (elig.includes("diploma")) {
    return isDiploma
      ? { eligible: true, label: "Eligible" }
      : { eligible: false, label: "Requires Diploma / 12th" };
  }

  if (elig.includes("12th")) {
    return is12th
      ? { eligible: true, label: "Eligible (10+2)" }
      : { eligible: true, label: "Eligible" };
  }

  return { eligible: true, label: "Eligible" };
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "AI service is not configured (missing OPENAI_API_KEY).",
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Please upload a valid resume file." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, message: "The uploaded file is empty." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "File size exceeds 10 MB limit. Please upload a smaller file.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { text: extractedText, isPdfFallbackNeeded } =
      await extractResumeText(buffer, file.name, file.type);

    if (!isPdfFallbackNeeded && extractedText.length < 30) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not extract readable text from this file. Please upload a text-based PDF or DOCX resume.",
        },
        { status: 400 }
      );
    }

    // Fetch real catalog snapshot so AI recommends degrees actually offered on eCampus
    const allListings = await getUniversityListings({ limit: 500 });
    const degreeCatalogMap = new Map<
      string,
      { degree: string; count: number; eligibilities: Set<string>; specs: Set<string> }
    >();

    for (const item of allListings) {
      const deg = item.degree || "Degree";
      if (!degreeCatalogMap.has(deg)) {
        degreeCatalogMap.set(deg, {
          degree: deg,
          count: 0,
          eligibilities: new Set(),
          specs: new Set(),
        });
      }
      const entry = degreeCatalogMap.get(deg)!;
      entry.count += 1;
      if (item.eligibility) entry.eligibilities.add(item.eligibility);
      if (item.specialization && item.specialization !== "General") {
        entry.specs.add(item.specialization);
      }
    }

    const catalogSummary = Array.from(degreeCatalogMap.values())
      .map(
        (d) =>
          `- ${d.degree} (${d.count} programs | Eligibility: ${
            Array.from(d.eligibilities).join(", ") || "Open"
          } | Specializations: ${
            Array.from(d.specs).slice(0, 6).join(", ") || "General"
          })`
      )
      .join("\n");

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const systemPrompt = `You are an expert eCampus AI Academic & Career Counselor for Indian online/distance higher education.
Analyze the candidate's resume carefully — looking at their education, highest qualification, work experience (roles, domain, years), technical/management skills, certifications, and career trajectory.

Available eCampus Degree Catalog:
${catalogSummary || "- MBA, MCA, BBA, BCA, B.Com, M.Com, M.Sc, B.Sc, BA, MA, DBA"}

Eligibility Rules to enforce strictly:
- If candidate only has 12th Pass / Senior Secondary -> eligible ONLY for UG degrees (BBA, BCA, B.Com, B.Sc, BA).
- If candidate has a Diploma -> eligible for UG degrees (BBA, BCA, B.Com, B.Sc, BA) or lateral/working-professional programs.
- If candidate has a Bachelor's Degree (B.Tech, B.E., B.Sc, B.Com, BBA, BCA, BA, etc.) -> eligible for PG degrees (MBA, MCA, M.Sc, M.Com, MA, M.Tech). Note: for tech/IT/CS backgrounds, MCA or MBA (IT/Analytics/AI) or M.Sc (Data Science/AI) are strong fits; for business/commerce/operations/marketing/sales/HR backgrounds, MBA or M.Com are strong fits.
- If candidate has a Master's Degree OR Bachelor's with 5+ years senior/leadership experience -> eligible for Executive MBA, DBA (Doctor of Business Administration), or specialized PG/Doctoral degrees.

Return ONLY valid JSON matching this exact schema:
{
  "candidateName": "Full name from resume or 'Candidate'",
  "currentRole": "Most recent job title or 'Student / Fresher'",
  "yearsOfExperience": 2.5,
  "experienceLabel": "e.g. '2.5 Years Experience' or 'Fresher'",
  "highestQualification": "One of: '12th Pass', 'Diploma', 'Bachelor\\'s Degree', 'Master\\'s Degree', 'PhD / Doctorate'",
  "qualificationDetail": "Exact degree & field found, e.g. 'B.Tech in Computer Science (2022)'",
  "skills": ["Top 6-8 skills from resume"],
  "experienceSummary": "2-sentence personalized summary of their background & career strengths.",
  "eligibilityAssessment": "1-2 sentence clear explanation of what degree levels they qualify for based on their qualification and experience.",
  "recommendedDegrees": ["Top 2-3 matching degree tokens from the catalog, e.g. 'MBA', 'MCA', 'M.Sc'"],
  "recommendedSpecializations": ["Top 2-4 matching specializations, e.g. 'AI & ML', 'Data Science', 'Business Analytics'"],
  "profileMatchScore": 92,
  "aiReadinessScore": 89,
  "scholarshipEligibility": "e.g. 'Up to ₹25,000' or 'Up to ₹15,000 Merit Waiver'",
  "careerOutcome": "1-line expected career jump or target role after completing the recommended program",
  "degreeReasons": {
    "MBA": "1-sentence reason why this degree fits their specific experience and eligibility"
  }
}`;

    const userContent: any[] = [];
    if (isPdfFallbackNeeded) {
      const base64Pdf = buffer.toString("base64");
      userContent.push({
        type: "file",
        file: {
          filename: file.name,
          file_data: `data:application/pdf;base64,${base64Pdf}`,
        },
      });
      userContent.push({
        type: "text",
        text: "Please analyze the attached PDF resume and return the structured JSON recommendation report.",
      });
    } else {
      const truncated = extractedText.slice(0, 16000);
      userContent.push({
        type: "text",
        text: `Analyze this resume (${file.name}) and return the structured JSON recommendation report:\n\n---\n${truncated}\n---`,
      });
    }

    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    });

    const rawJson = completion.choices[0]?.message?.content || "{}";
    let parsed: Partial<ResumeAnalysisResult> = {};
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      parsed = {};
    }

    const yearsExp =
      typeof parsed.yearsOfExperience === "number" && !Number.isNaN(parsed.yearsOfExperience)
        ? Math.max(0, parsed.yearsOfExperience)
        : 0;

    const highestQual = parsed.highestQualification || "Bachelor's Degree";
    const recommendedDegrees =
      Array.isArray(parsed.recommendedDegrees) && parsed.recommendedDegrees.length > 0
        ? parsed.recommendedDegrees.slice(0, 3)
        : highestQual.toLowerCase().includes("12th")
          ? ["BBA", "BCA"]
          : ["MBA", "MCA"];

    const recommendedSpecs = Array.isArray(parsed.recommendedSpecializations)
      ? parsed.recommendedSpecializations
      : [];

    const analysis: ResumeAnalysisResult = {
      candidateName: parsed.candidateName || "Candidate",
      currentRole: parsed.currentRole || (yearsExp > 0 ? "Working Professional" : "Student / Fresher"),
      yearsOfExperience: yearsExp,
      experienceLabel:
        parsed.experienceLabel ||
        (yearsExp > 0 ? `${yearsExp} Years Experience` : "Fresher / Early Career"),
      highestQualification: highestQual,
      qualificationDetail: parsed.qualificationDetail || highestQual,
      skills: Array.isArray(parsed.skills) ? parsed.skills.slice(0, 8) : [],
      experienceSummary:
        parsed.experienceSummary ||
        "We analyzed your educational background and experience to find accredited online programs aligned with your career goals.",
      eligibilityAssessment:
        parsed.eligibilityAssessment ||
        `Based on your ${highestQual}, you qualify for accredited online degree programs in ${recommendedDegrees.join(", ")}.`,
      recommendedDegrees,
      recommendedSpecializations: recommendedSpecs,
      profileMatchScore: Math.min(
        98,
        Math.max(75, Math.round(Number(parsed.profileMatchScore) || 92))
      ),
      aiReadinessScore: Math.min(
        98,
        Math.max(72, Math.round(Number(parsed.aiReadinessScore) || 89))
      ),
      scholarshipEligibility: parsed.scholarshipEligibility || "Up to ₹25,000",
      careerOutcome:
        parsed.careerOutcome ||
        "Accelerate into senior leadership & specialized roles with an accredited degree.",
      degreeReasons: parsed.degreeReasons || {},
    };

    // Match real database courses against AI-recommended degrees, specializations & eligibility
    const degPrefs = recommendedDegrees.map((d) => d.toLowerCase());
    const specPrefs = recommendedSpecs.map((s) => s.toLowerCase());

    const scoredCourses = allListings
      .map((course: UniversityCourseListing) => {
        const degLower = (course.degree || "").toLowerCase();
        const progLower = (course.program || "").toLowerCase();
        const specLower = (course.specialization || "").toLowerCase();
        const eligCheck = checkCourseEligibility(
          course.eligibility || "",
          analysis.highestQualification,
          analysis.yearsOfExperience
        );

        let score = 60;

        // Degree priority match (1st recommended degree gets highest boost)
        const degIdx = degPrefs.findIndex(
          (d) => degLower === d || degLower.includes(d) || progLower.includes(d)
        );
        if (degIdx === 0) score += 28;
        else if (degIdx === 1) score += 22;
        else if (degIdx >= 2) score += 16;
        else score -= 18;

        // Specialization match boost
        if (
          specPrefs.some(
            (s) => specLower.includes(s) || progLower.includes(s)
          )
        ) {
          score += 7;
        }

        // Eligibility boost/penalty
        if (eligCheck.eligible) {
          score += 5;
        } else {
          score -= 35;
        }

        // University rating small tiebreaker
        score += Math.min(4, Math.round((course.rating - 4.0) * 3));

        const finalScore = Math.min(99, Math.max(55, score));

        // Pick tailored reason from AI
        const matchedDegKey = Object.keys(analysis.degreeReasons).find(
          (k) =>
            k.toLowerCase() === degLower ||
            progLower.includes(k.toLowerCase())
        );
        const matchReason =
          (matchedDegKey && analysis.degreeReasons[matchedDegKey]) ||
          `Strong fit for your ${analysis.experienceLabel} & ${analysis.qualificationDetail} background.`;

        return {
          course,
          eligCheck,
          finalScore,
          matchReason,
          degIdx,
        };
      })
      .filter((entry) => entry.eligCheck.eligible && entry.degIdx !== -1)
      .sort((a, b) => {
        if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
        return b.course.rating - a.course.rating;
      });

    // Deduplicate by university + degree so user sees diverse top universities
    const seenUniDeg = new Set<string>();
    const matchedCourses: ResumeMatchedCourse[] = [];

    for (const item of scoredCourses) {
      const c = item.course;
      const key = `${c.name.toLowerCase()}-${c.degree.toLowerCase()}`;
      if (seenUniDeg.has(key)) continue;
      seenUniDeg.add(key);

      const reviewsStr =
        c.reviews >= 1000
          ? `${(c.reviews / 1000).toFixed(1).replace(".0", "")}k reviews`
          : `${c.reviews} reviews`;

      matchedCourses.push({
        id: c.id,
        university: c.name.toUpperCase(),
        program: c.program,
        degree: c.degree,
        specialization: c.specialization,
        mode: c.mode,
        location: c.location,
        matchScore: item.finalScore,
        match: `${item.finalScore}% Match`,
        rating: c.rating.toFixed(1),
        reviews: reviewsStr,
        applied: c.applied,
        seed: c.name.toLowerCase().replace(/[^a-z0-9]/g, ""),
        fee: formatIndianRupees(c.fee),
        feeNumber: c.fee,
        duration: c.durationNote,
        eligibility: c.eligibility || "Open",
        eligibilityStatus: item.eligCheck.label,
        matchReason: item.matchReason,
        tags: c.tags.slice(0, 4),
        image: c.image,
        slug: c.slug,
      });

      if (matchedCourses.length >= 8) break;
    }

    // Best-effort persistence for logged-in users
    try {
      const auth = await getAuthContext(req);
      if (auth?.user?.id) {
        const db = await getDb();
        await db.collection("users").updateOne(
          { id: auth.user.id },
          {
            $set: {
              resumeAnalysis: {
                fileName: file.name,
                analyzedAt: new Date().toISOString(),
                ...analysis,
              },
              updated_at: new Date(),
            },
          }
        );
      }
    } catch (persistErr) {
      console.warn("Non-fatal: could not persist resumeAnalysis to user:", persistErr);
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      analysis,
      matchedCourses,
    });
  } catch (error: any) {
    console.error("Error in POST /api/resume/analyze:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error?.message || "Failed to analyze resume. Please try again.",
      },
      { status: 500 }
    );
  }
}

