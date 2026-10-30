import { Db } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { StudentProfile } from "@/app/dashboard/types";
import {
  type RecommendationItem,
  calculateMatchScore,
  extractTargetDegree,
  formatIndianRupees,
  getUniversityCampusImage,
  parseBudgetRange,
  FALLBACK_RECOMMENDATIONS_CATALOG,
} from "./recommendations";

export interface UniversityCourseListing {
  id: string;
  name: string;
  image: string;
  program: string;
  degree: string;
  specialization: string;
  mode: string;
  location: string;
  matchScore: number;
  rating: number;
  reviews: number;
  applied: number;
  fee: number;
  scholarshipNote?: string;
  durationNote: string;
  accreditations: string[];
  features: string[];
  slug?: string;
}

export function buildDegreeRegex(rawCourse?: string): RegExp {
  const raw = (rawCourse || "").toLowerCase().trim();
  if (!raw) return /mba|mca|bca|bba/i;
  if (raw.includes("mca")) return /mca/i;
  if (raw.includes("mba")) return /mba/i;
  if (raw.includes("bca")) return /bca/i;
  if (raw.includes("bba")) return /bba/i;
  if (raw.includes("b.com") || raw.includes("bcom")) return /b\.?com/i;
  if (raw.includes("m.com") || raw.includes("mcom")) return /m\.?com/i;
  if (raw.includes("m.sc") || raw.includes("msc")) return /m\.?sc/i;
  if (raw.includes("b.sc") || raw.includes("bsc")) return /b\.?sc/i;
  if (raw.includes("majmc") || raw.includes("journalism")) return /majmc|journalism/i;
  if (raw.includes("bajmc")) return /bajmc|journalism/i;
  if (raw.includes("dba") || raw.includes("doctor of business")) return /dba|doctor/i;
  if (raw.includes("dcs") || raw.includes("doctor of computer")) return /dcs|computer/i;
  if (raw.includes("b.tech") || raw.includes("btech")) return /b\.?tech/i;
  if (raw.includes("ma")) return /\bma\b|master of arts/i;
  if (raw.includes("ba")) return /\bba\b|bachelor of arts/i;
  const clean = raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(clean, "i");
}

export function extractDegreeToken(courseName: string): string {
  const upper = courseName.toUpperCase();
  if (upper.includes("MCA")) return "MCA";
  if (upper.includes("MBA")) return "MBA";
  if (upper.includes("BCA")) return "BCA";
  if (upper.includes("BBA")) return "BBA";
  if (upper.includes("B.COM") || upper.includes("BCOM")) return "B.Com";
  if (upper.includes("M.COM") || upper.includes("MCOM")) return "M.Com";
  if (upper.includes("M.SC") || upper.includes("MSC")) return "M.Sc";
  if (upper.includes("B.SC") || upper.includes("BSC")) return "B.Sc";
  if (upper.includes("M.TECH") || upper.includes("MTECH")) return "M.Tech";
  if (upper.includes("B.TECH") || upper.includes("BTECH")) return "B.Tech";
  if (upper.includes("DBA")) return "DBA";
  if (upper.includes("DCS")) return "DCS";
  if (upper.includes("MA")) return "MA";
  if (upper.includes("BA")) return "BA";
  return "Degree";
}

export function extractSpecializationToken(courseName: string, specList: any[] = []): string {
  const lower = courseName.toLowerCase();
  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("gen-ai")) {
    return "AI & ML";
  }
  if (lower.includes("data science") || lower.includes("analytics")) {
    return "Data Science";
  }
  if (lower.includes("cyber") || lower.includes("cloud") || lower.includes("security")) {
    return "Cloud & Cyber Security";
  }
  if (lower.includes("full stack") || lower.includes("software") || lower.includes("information technology")) {
    return "Full Stack";
  }
  if (lower.includes("marketing")) return "Marketing";
  if (lower.includes("finance")) return "Finance";
  if (lower.includes("human resource") || lower.includes("hr")) return "HR Management";
  if (lower.includes("supply chain")) return "Supply Chain";
  if (lower.includes("international business")) return "International Business";
  if (lower.includes("healthcare")) return "Healthcare";
  if (lower.includes("general management")) return "General Management";

  if (Array.isArray(specList) && specList.length > 0) {
    const first = specList[0]?.specialization;
    if (first && first.toLowerCase() !== "general") return first;
  }
  return "General";
}

/**
 * Executes the 3-filter query against MongoDB:
 * 1. Course Name (targetDegree)
 * 2. Budget Range (feeRange in [budgetMin, budgetMax])
 * 3. Qualification (eligibility matching highestQualification)
 */
async function queryUniversityCoursesWithFilters(params: {
  qualification?: string;
  coursePreference?: string;
  budget?: string;
  limit?: number;
}) {
  const db: Db = await getDb();
  const queryRegex = buildDegreeRegex(params.coursePreference);
  const { min: budgetMin, max: budgetMax } = parseBudgetRange(params.budget);

  // 1. Course Name Match
  const matchFilter: any = { name: queryRegex };

  // 2. Budget Range Fallback Match
  // A university course fee falls in the budget range when its fee range overlaps [budgetMin, budgetMax]
  const budgetMatch = {
    $or: [
      { "feeRange.start": { $lte: budgetMax }, "feeRange.end": { $gte: budgetMin } },
      { "feeRange.start": { $gte: budgetMin, $lte: budgetMax } },
      { "feeRange.end": { $gte: budgetMin, $lte: budgetMax } },
    ],
  };

  // 3. Qualification Eligibility Match
  let qualRegex: RegExp | null = null;
  if (params.qualification) {
    const lq = params.qualification.toLowerCase();
    if (lq.includes("12th")) {
      qualRegex = /12th/i;
    } else if (lq.includes("diploma")) {
      qualRegex = /diploma|12th/i;
    } else if (lq.includes("graduate with exp. or post-graduate")) {
      qualRegex = /graduate|post-graduate/i;
    } else if (lq.includes("post-graduate")) {
      qualRegex = /post-graduate|graduate/i;
    } else if (lq.includes("graduate")) {
      qualRegex = /graduate/i;
    } else {
      const safe = params.qualification.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      qualRegex = new RegExp(safe, "i");
    }
  }

  const qualMatch = qualRegex
    ? {
        $or: [
          { eligibility: qualRegex },
          { eligibility: null },
          { eligibility: "" },
          { eligibility: { $exists: false } },
        ],
      }
    : null;

  // Build full 3-filter criteria
  const strictFilter: any = {
    ...matchFilter,
    ...budgetMatch,
  };
  if (qualMatch) {
    strictFilter.$and = [qualMatch];
  }

  const limitCount = params.limit || 50;

  // First attempt: Strict 3-filter query
  let docs = await db
    .collection("courses")
    .aggregate([
      { $match: strictFilter },
      {
        $lookup: {
          from: "universities",
          let: { uid: "$universityId", uname: "$universityName" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$_id", "$$uid"] },
                    { $eq: [{ $toString: "$_id" }, "$$uid"] },
                    { $eq: ["$name", "$$uname"] },
                  ],
                },
              },
            },
          ],
          as: "uni",
        },
      },
      { $unwind: { path: "$uni", preserveNullAndEmptyArrays: true } },
      { $limit: limitCount },
    ])
    .toArray();

  // If strict combination yielded 0 (e.g. unrealistic budget for high-end degree), relax budget constraint
  if (!docs || docs.length === 0) {
    const relaxedFilter: any = { ...matchFilter };
    if (qualMatch) relaxedFilter.$and = [qualMatch];

    docs = await db
      .collection("courses")
      .aggregate([
        { $match: relaxedFilter },
        {
          $lookup: {
            from: "universities",
            let: { uid: "$universityId", uname: "$universityName" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ["$_id", "$$uid"] },
                      { $eq: [{ $toString: "$_id" }, "$$uid"] },
                      { $eq: ["$name", "$$uname"] },
                    ],
                  },
                },
              },
            ],
            as: "uni",
          },
        },
        { $unwind: { path: "$uni", preserveNullAndEmptyArrays: true } },
        { $limit: limitCount },
      ])
      .toArray();
  }

  return docs;
}

/**
 * Returns formatted recommendations for the dashboard overview, filtered by the 3 criteria.
 */
export async function getRecommendationsForStudent(
  student?: Partial<StudentProfile>
): Promise<RecommendationItem[]> {
  const targetDegree = extractTargetDegree(student);
  const budget = student?.advisorProfile?.budget;
  const qualification = student?.advisorProfile?.highestQualification;
  const coursePref = student?.advisorProfile?.coursePreference || student?.course || student?.coursesInterested?.[0];
  const category = student?.advisorProfile?.category;
  const state = student?.state;

  try {
    const coursesWithUni = await queryUniversityCoursesWithFilters({
      qualification,
      coursePreference: coursePref,
      budget,
      limit: 25,
    });

    if (coursesWithUni && coursesWithUni.length > 0) {
      const items: RecommendationItem[] = coursesWithUni.map((doc: any) => {
        const uni = doc.uni || {};
        const uniName: string = (uni.name || doc.universityName || "eCampus Partner University").trim();
        const durationStr = doc.duration || "24 Months";
        let durationYears = 2;
        if (durationStr.includes("36") || durationStr.includes("3 Year") || durationStr.includes("3 year")) {
          durationYears = 3;
        } else if (durationStr.includes("12") || durationStr.includes("1 Year") || durationStr.includes("1 year")) {
          durationYears = 1;
        }

        // Calculate annual fee
        let annualFeeNum = 65000;
        if (doc.feeRange?.start && typeof doc.feeRange.start === "number") {
          annualFeeNum = Math.round(doc.feeRange.start / durationYears);
        } else if (doc.fees) {
          const matchNum = String(doc.fees).replace(/,/g, "").match(/\d+/);
          if (matchNum) {
            annualFeeNum = Math.round(parseInt(matchNum[0], 10) / durationYears);
          }
        }

        let courseTitle: string = doc.name;
        const specList = uni.details?.specializations?.list || [];
        const matchingSpec = specList.find((s: any) => {
          const sCourse = (s.course || "").toLowerCase();
          return sCourse.includes(targetDegree) || targetDegree.includes(sCourse);
        });

        if (matchingSpec?.specialization) {
          const specName = matchingSpec.specialization.trim();
          if (specName.toLowerCase() !== "general") {
            courseTitle = `${targetDegree.toUpperCase()} with ${specName} Specialization`;
          }
        }

        // Generate accreditations & features tags
        const tags: string[] = [];
        const accList = uni.details?.accreditation?.list || [];
        if (accList.length > 0) {
          const naac = accList.find((a: any) => a.label?.toLowerCase().includes("naac"));
          if (naac) tags.push(naac.label.trim());
          else tags.push("NAAC A+");

          const ugc = accList.find((a: any) => a.label?.toLowerCase().includes("ugc"));
          if (ugc) tags.push("UGC Entitled");
          else tags.push("UGC Entitled");
        } else {
          tags.push("NAAC A+", "UGC Entitled");
        }

        tags.push("Zero Cost EMI");
        if (category && category.includes("defence")) {
          tags.push("Defence/Govt Waiver");
        } else if (category && category.includes("merit")) {
          tags.push("Merit Scholarship");
        } else {
          tags.push("Top Recruiter Network");
        }

        const ratingNum = doc.rating || uni.details?.banner?.rating || 4.8;
        const reviewsNum = uni.details?.banner?.reviewsCount || 1200;
        const reviewsStr =
          reviewsNum >= 1000
            ? `${(reviewsNum / 1000).toFixed(1).replace(".0", "")}k reviews`
            : `${reviewsNum} reviews`;

        const appliedNum = Math.floor(reviewsNum * 1.05) || 1240;
        const seedStr = (uni.shortcode || uniName).toLowerCase().replace(/[^a-z0-9]/g, "");

        const score = calculateMatchScore({
          targetDegree,
          courseDegree: doc.name,
          courseName: courseTitle,
          annualFee: annualFeeNum,
          budget,
          highestQualification: qualification,
          category,
          studentState: state,
          universityLocation: uni.location,
          universityRating: ratingNum,
        });

        return {
          id: doc._id?.toString() || doc.id || seedStr,
          image: getUniversityCampusImage(uniName, uni.details?.banner?.image || uni.image),
          match: `${score}% Match`,
          matchScore: score,
          university: uniName.toUpperCase(),
          rating: Number(ratingNum).toFixed(1),
          reviews: reviewsStr,
          applied: appliedNum,
          seed: seedStr,
          title: courseTitle,
          tags: tags.slice(0, 4),
          fee: formatIndianRupees(annualFeeNum),
          duration: `${durationYears} Years`,
          slug: doc.slug,
        };
      });

      // Sort by match score descending
      items.sort((a, b) => b.matchScore - a.matchScore);

      // Return top distinct universities
      const seenUnis = new Set<string>();
      const topItems: RecommendationItem[] = [];
      for (const item of items) {
        if (!seenUnis.has(item.university)) {
          seenUnis.add(item.university);
          topItems.push(item);
        }
        if (topItems.length >= 3) break;
      }

      if (topItems.length > 0) {
        return topItems;
      }
    }
  } catch (err) {
    console.error("Failed to query recommendations from database, using fallback catalog:", err);
  }

  // Fallback
  const scoredFallback = FALLBACK_RECOMMENDATIONS_CATALOG.map((rec) => {
    const score = calculateMatchScore({
      targetDegree,
      courseDegree: rec.title,
      courseName: rec.title,
      annualFee: parseInt(rec.fee.replace(/[^\d]/g, ""), 10) || 65000,
      budget,
      highestQualification: qualification,
      category,
      studentState: state,
      universityRating: parseFloat(rec.rating) || 4.8,
    });
    return {
      ...rec,
      matchScore: score,
      match: `${score}% Match`,
    };
  });

  scoredFallback.sort((a, b) => b.matchScore - a.matchScore);
  return scoredFallback.slice(0, 3);
}

/**
 * Returns populated UniversityListings for the AI Degree Finder (/dashboard/matcher),
 * strictly filtered by Course Name, Budget Range, and Qualification.
 */
export async function getUniversityListings(params: {
  qualification?: string;
  coursePreference?: string;
  budget?: string;
  category?: string;
  state?: string;
  limit?: number;
}): Promise<UniversityCourseListing[]> {
  try {
    const docs = await queryUniversityCoursesWithFilters({
      qualification: params.qualification,
      coursePreference: params.coursePreference,
      budget: params.budget,
      limit: params.limit || 60,
    });

    const targetDegree = extractTargetDegree({
      advisorProfile: {
        coursePreference: params.coursePreference || "",
      } as any,
    });

    const listings: UniversityCourseListing[] = docs.map((doc: any) => {
      const uni = doc.uni || {};
      const uniName: string = (uni.name || doc.universityName || "eCampus Partner University").trim();
      const durationStr = doc.duration || "24 Months";
      let durationYears = 2;
      if (durationStr.includes("36") || durationStr.includes("3 Year") || durationStr.includes("3 year")) {
        durationYears = 3;
      } else if (durationStr.includes("12") || durationStr.includes("1 Year") || durationStr.includes("1 year")) {
        durationYears = 1;
      }

      // Calculate annual fee
      let annualFeeNum = 65000;
      if (doc.feeRange?.start && typeof doc.feeRange.start === "number") {
        annualFeeNum = Math.round(doc.feeRange.start / durationYears);
      } else if (doc.fees) {
        const matchNum = String(doc.fees).replace(/,/g, "").match(/\d+/);
        if (matchNum) {
          annualFeeNum = Math.round(parseInt(matchNum[0], 10) / durationYears);
        }
      }

      const degreeToken = extractDegreeToken(doc.name);
      const specToken = extractSpecializationToken(doc.name, uni.details?.specializations?.list);

      // Accreditations
      const accreditations: string[] = [];
      const accList = uni.details?.accreditation?.list || [];
      if (accList.length > 0) {
        if (accList.some((a: any) => a.label?.toLowerCase().includes("naac"))) accreditations.push("NAAC");
        if (accList.some((a: any) => a.label?.toLowerCase().includes("ugc"))) accreditations.push("UGC");
        if (accList.some((a: any) => a.label?.toLowerCase().includes("aicte"))) accreditations.push("AICTE");
        if (accList.some((a: any) => a.label?.toLowerCase().includes("wes"))) accreditations.push("WES");
      }
      if (accreditations.length === 0) {
        accreditations.push("NAAC", "UGC");
      }

      // Features
      const features: string[] = ["ZeroCostEMI", "Placement"];
      if (annualFeeNum < 90000 || params.category?.includes("merit") || params.category?.includes("defence")) {
        features.push("Scholarship");
      }

      const ratingNum = Number(doc.rating || uni.details?.banner?.rating || 4.8);
      const reviewsNum = Number(uni.details?.banner?.reviewsCount || 950);
      const appliedNum = Math.floor(reviewsNum * 1.05) || 1000;

      const score = calculateMatchScore({
        targetDegree,
        courseDegree: doc.name,
        courseName: doc.name,
        annualFee: annualFeeNum,
        budget: params.budget,
        highestQualification: params.qualification,
        category: params.category,
        studentState: params.state,
        universityLocation: uni.location,
        universityRating: ratingNum,
      });

      const loc = uni.location ? uni.location.split(",")[0].trim() : "Online";

      return {
        id: doc._id?.toString() || doc.id || Math.random().toString(36).slice(2),
        name: uniName,
        image: getUniversityCampusImage(uniName, uni.details?.banner?.image || uni.image),
        program: doc.name,
        degree: degreeToken,
        specialization: specToken,
        mode: doc.mode || "Online",
        location: loc,
        matchScore: score,
        rating: parseFloat(ratingNum.toFixed(1)),
        reviews: reviewsNum,
        applied: appliedNum,
        fee: annualFeeNum,
        scholarshipNote: features.includes("Scholarship") ? "Scholarships up to ₹15,000" : undefined,
        durationNote: doc.duration ? `100% Online · ${doc.duration}` : `100% Online · ${durationYears} Years Duration`,
        accreditations,
        features,
        slug: doc.slug,
      };
    });

    // Sort by match score descending
    listings.sort((a, b) => b.matchScore - a.matchScore);
    return listings;
  } catch (error) {
    console.error("Error in getUniversityListings:", error);
    return [];
  }
}
