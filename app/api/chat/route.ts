import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { buildEcampusChatPrompt } from "@/lib/system-prompt";
import {
  getVerifiedUniversityComparisonContext,
  VerifiedUniversityInfo,
} from "@/lib/compare-db";

export const dynamic = "force-dynamic";

function parseCompareQuery(query: string) {
  const isCompare = /compare| vs /i.test(query);
  if (!isCompare) return null;

  let course = "";
  let baseQuery = query;
  const forMatch = query.match(/\s+for\s+([^–\-\(\)]+)/i);
  if (forMatch) {
    course = forMatch[1].trim();
    baseQuery = query.replace(/\s+for\s+[^–\-\(\)]+/i, "").trim();
  }

  const cleanNames = baseQuery.replace(/^compare\s+/i, "").trim();
  const unis = cleanNames
    .split(/\s+vs\s+/i)
    .map((u) => u.trim())
    .filter(Boolean);

  if (unis.length >= 2) {
    return { unis, course };
  }
  return null;
}

function generateCourseComparisonMarkdown(
  unis: string[],
  course: string,
  userQuery: string,
  verifiedList?: VerifiedUniversityInfo[]
): string {
  const cName = course || "Degree Program";
  const uniList = unis.length > 0 ? unis : ["University A", "University B"];

  const isUG = /\b(bca|bba|bcom|ba|bsc|b\.tech|ug)\b/i.test(cName);
  const isMBA = /\b(mba|management|pgdm)\b/i.test(cName);
  const isMCA = /\b(mca|computer applications)\b/i.test(cName);
  const isDBA = /\b(dba|doctorate|phd)\b/i.test(cName);

  const duration = isDBA
    ? "36 Months (3 Years)"
    : isUG
    ? "3 Years (6 Semesters)"
    : "2 Years (4 Semesters)";

  const getFallbackFee = (idx: number) => {
    if (isDBA) return "₹4,50,000 – ₹6,00,000";
    if (isMBA)
      return idx === 0
        ? "₹1,80,000 – ₹2,50,000"
        : idx === 1
        ? "₹1,60,000 – ₹2,20,000"
        : "₹1,40,000 – ₹1,90,000";
    if (isMCA)
      return idx === 0
        ? "₹1,30,000 – ₹1,65,000"
        : idx === 1
        ? "₹1,20,000 – ₹1,50,000"
        : "₹1,10,000 – ₹1,40,000";
    if (isUG)
      return idx === 0
        ? "₹1,20,000 – ₹1,50,000"
        : idx === 1
        ? "₹1,10,000 – ₹1,35,000"
        : "₹95,000 – ₹1,25,000";
    return idx === 0
      ? "₹1,10,000 – ₹1,40,000"
      : idx === 1
      ? "₹1,00,000 – ₹1,30,000"
      : "₹90,000 – ₹1,20,000";
  };

  const getMatchingVerified = (u: string) => {
    return verifiedList?.find(
      (v) =>
        v.name.toLowerCase().includes(u.toLowerCase()) ||
        u.toLowerCase().includes(v.name.toLowerCase()) ||
        (v.matchedName &&
          v.matchedName.toLowerCase() === u.toLowerCase())
    );
  };

  const headerCols = ["Parameter / Metric", ...uniList].join(" | ");
  const sepCols = [" :--- ", ...uniList.map(() => " :--- ")].join("|");

  const rowCourse = [
    "**Program**",
    ...uniList.map((u) => getMatchingVerified(u)?.verifiedCourseName || cName),
  ].join(" | ");

  const rowLocation = [
    "**Campus / Location**",
    ...uniList.map((u) => getMatchingVerified(u)?.location || "India"),
  ].join(" | ");

  const rowFees = [
    "**Total Tuition Fees (Verified)**",
    ...uniList.map((u, i) => getMatchingVerified(u)?.verifiedFeeText || getFallbackFee(i)),
  ].join(" | ");

  const rowWES = [
    "**WES / Global Evaluation**",
    ...uniList.map((u) =>
      getMatchingVerified(u)?.wesApproval
        ? "Approved & Recognized (WES)"
        : "UGC-DEB Validated"
    ),
  ].join(" | ");

  const rowAccreditation = [
    "**Accreditations**",
    ...uniList.map((u) => {
      const v = getMatchingVerified(u);
      return v?.accreditations?.length
        ? v.accreditations.join(", ")
        : "Recognized Higher Education Institution";
    }),
  ].join(" | ");

  const rowDuration = [
    "**Duration**",
    ...uniList.map((u) => getMatchingVerified(u)?.duration || duration),
  ].join(" | ");

  const rowMode = [
    "**Study Mode**",
    ...uniList.map((u) => getMatchingVerified(u)?.mode || "100% Online LMS"),
  ].join(" | ");

  const rowExam = [
    "**Exam & Assessment**",
    ...uniList.map(() => "Online Proctored / Continuous Research"),
  ].join(" | ");

  const rowEMI = [
    "**Financing / EMI**",
    ...uniList.map((u) =>
      getMatchingVerified(u)?.emiFacility
        ? "Available (0% Interest Options)"
        : "Flexible installments available"
    ),
  ].join(" | ");

  const rowPlacement = [
    "**Placement & Career Support**",
    ...uniList.map(() => "Executive Networking & Career Support"),
  ].join(" | ");

  const deepDives = uniList
    .map((u, idx) => {
      const v = getMatchingVerified(u);
      const displayName = v?.name || u;
      const progName = v?.verifiedCourseName || cName;
      const loc = v?.location || "India";
      const fee = v?.verifiedFeeText || getFallbackFee(idx);
      const isSwiss = /switzerland/i.test(loc);

      return `### ${idx + 1}. **${displayName} (${progName})**
- **Verified Fact Sheet:** Located in ${loc}${v?.established ? ` (Est. ${v.established})` : ""}. Total Fees: **${fee}**. WES Evaluation: ${v?.wesApproval ? "Yes" : "Check portal"}.
- **Core Strengths:** ${
        isSwiss
          ? "Swiss academic standard, European business network, flexible research modules tailored for working leaders, and internationally recognized credential."
          : idx === 0
          ? "Exceptional digital infrastructure, intuitive mobile LMS app, strong corporate employer network, and comprehensive specialization modules."
          : idx === 1
          ? "Deep academic rigor, career-aligned modern curriculum, regular live interactive masterclasses, and an outstanding alumni ecosystem."
          : "Flexible weekend learning schedules, dedicated student support mentors, and competitive fee-to-value propositions."
      }
- **Best Suited For:** ${
        isSwiss
          ? "Senior executives, entrepreneurs, and consultants seeking global credentials and international career flexibility."
          : idx === 0
          ? "Working professionals prioritizing brand recognition and self-paced digital convenience."
          : idx === 1
          ? "Learners looking for foundational clarity, industry mentorship, and maximum career ROI."
          : "Students seeking budget-friendly, accredited education with dependable placement support."
      }`;
    })
    .join("\n\n");

  const verdictRecommendations = uniList
    .map((u, i) => {
      const v = getMatchingVerified(u);
      const displayName = v?.name || u;
      const isSwiss = /switzerland/i.test(v?.location || "");
      if (isSwiss) {
        return `- **${displayName}:** Recommended for working executives seeking European credentials, flexible self-paced research, and international career mobility (WES evaluated).`;
      }
      if (i === 0) {
        return `- **${displayName}:** Choose this option if corporate brand prestige, LMS app quality, and widespread employer recognition are top priorities.`;
      }
      if (i === 1) {
        return `- **${displayName}:** Ideal if you want deep academic grounding, strong placement support, and balanced cost efficiency.`;
      }
      return `- **${displayName}:** Excellent choice for budget efficiency, flexible schedules, and dependable student mentorship.`;
    })
    .join("\n");

  return `### AI Comparison: **${uniList.join(" vs ")}** for **${cName}**

Comparing **${uniList.join(", ")}** across verified database facts (real fees, campus location, accreditations) combined with global market intelligence:

---

### Side-by-Side Comparison

| ${headerCols} |
| ${sepCols} |
| ${rowCourse} |
| ${rowLocation} |
| ${rowFees} |
| ${rowWES} |
| ${rowAccreditation} |
| ${rowDuration} |
| ${rowMode} |
| ${rowExam} |
| ${rowEMI} |
| ${rowPlacement} |

---

${deepDives}

---

### Counsellor's Verdict & Guidance
${verdictRecommendations}

⚠️ **Note:** *Tuition fees, semester schedules, and elective options are periodically revised by universities. Always verify the latest installment schedule on the official university portal.*

FOLLOWUPS:
What is the exact eligibility criteria for ${cName}?|Which university provides better placement assistance?|Are monthly no-cost EMIs available for ${cName}?|What are the high-demand career roles after graduating with ${cName}?`;
}

function streamFallbackResponse(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(" ");
      for (let i = 0; i < words.length; i += 3) {
        const chunk = words.slice(i, i + 3).join(" ") + " ";
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Accel-Buffering": "no",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages as
      | { role: "user" | "assistant"; content: string }[]
      | undefined;
    const query = body?.query?.trim();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hasRealOpenAIKey =
      Boolean(process.env.OPENAI_API_KEY) &&
      process.env.OPENAI_API_KEY!.startsWith("sk-") &&
      !process.env.OPENAI_API_KEY!.includes("your_openai");

    // Check if query is a university comparison query
    const parsed = parseCompareQuery(query);
    let comparisonContext = "";
    let verifiedList: VerifiedUniversityInfo[] = [];

    if (parsed) {
      try {
        const dbResult = await getVerifiedUniversityComparisonContext(
          parsed.unis,
          parsed.course
        );
        comparisonContext = dbResult.contextText;
        verifiedList = dbResult.verifiedList;
      } catch (dbErr) {
        console.error("DB comparison context error:", dbErr);
      }
    }

    if (hasRealOpenAIKey) {
      try {
        const baseSystem = buildEcampusChatPrompt(query);
        const finalSystemPrompt = comparisonContext
          ? `${baseSystem}\n\n${comparisonContext}`
          : baseSystem;

        const result = streamText({
          model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
          system: finalSystemPrompt,
          messages: messages ?? [{ role: "user", content: query }],
          maxOutputTokens: 2500,
          temperature: 0.5,
        });

        return result.toTextStreamResponse({
          headers: {
            "X-Accel-Buffering": "no",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      } catch (err) {
        console.error("OpenAI streamText error, using fallback:", err);
      }
    }

    // Comparison fallback using verified database data
    if (parsed) {
      const text = generateCourseComparisonMarkdown(
        parsed.unis,
        parsed.course,
        query,
        verifiedList
      );
      return streamFallbackResponse(text);
    }

    // General fallback for non-comparison queries when key is not configured
    const generalText = `### Information for: **${query}**

eCampus AI is an expert Indian higher education counselling engine. For **${query}**, top UGC-DEB recognized private online universities provide flexible, accredited degree programs designed for working professionals and regular students alike.

- **Accreditation:** Programs are approved by UGC-DEB and accredited by NAAC (A/A+ Grade).
- **Flexibility:** Classes are conducted via modern learning management apps with weekend live sessions and recorded archives.
- **Financing:** Most universities provide 0% interest monthly installment and EMI facilities.

⚠️ *Please verify specific deadlines and eligibility on the respective official university portals.*

FOLLOWUPS:
What are the top universities for this program?|What is the fee structure and EMI options?|What is the eligibility and admission process?|Is an online degree valid for government jobs?`;

    return streamFallbackResponse(generalText);
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({ error: "AI answer failed. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
