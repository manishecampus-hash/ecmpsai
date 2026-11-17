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
  totalFee?: number;
  tier?: number;
  scholarshipNote?: string;
  durationNote: string;
  accreditations: string[];
  features: string[];
  tags: string[];
  slug?: string;
  eligibility?: string;
}

export function extractDynamicTags(
  uni: any,
  doc?: any,
  studentCategory?: string
): string[] {
  const tags: string[] = [];
  const accList: any[] = uni?.details?.accreditation?.list || [];

  // 1. Dynamic Accreditations & Approvals from uni.details.accreditation.list
  for (const acc of accList) {
    const rawLabel = (acc.label || acc.name || "").trim();
    if (!rawLabel) continue;
    const lower = rawLabel.toLowerCase();

    let formatted = rawLabel;
    if (lower.includes("naac")) {
      if (lower.includes("a++") || acc.ribbon?.includes("A++")) formatted = "NAAC A++";
      else if (lower.includes("a+") || acc.ribbon?.includes("A+")) formatted = "NAAC A+";
      else formatted = "NAAC Accredited";
    } else if (lower.includes("ugc")) {
      formatted = "UGC Entitled";
    } else if (lower.includes("aicte")) {
      formatted = "AICTE Approved";
    } else if (lower.includes("wes")) {
      formatted = "WES Recognized";
    } else if (lower.includes("nirf")) {
      formatted = rawLabel.length <= 18 ? rawLabel : "NIRF Ranked";
    } else if (lower.includes("qs")) {
      formatted = "QS World Ranked";
    } else if (lower.includes("ksurf")) {
      formatted = "KSURF 5-Star";
    } else if (lower.includes("aiu")) {
      formatted = "AIU Member";
    } else if (lower.includes("aacsb")) {
      formatted = "AACSB";
    } else if (lower.includes("acbsp")) {
      formatted = "ACBSP";
    } else if (lower.includes("wasc")) {
      formatted = "WASC (USA)";
    } else if (lower.includes("eduqua")) {
      formatted = "EDUQUA";
    } else if (lower.includes("hlc")) {
      formatted = "HLC";
    } else if (lower.includes("acca")) {
      formatted = "ACCA";
    } else if (rawLabel.length > 20) {
      formatted = rawLabel.slice(0, 18) + "...";
    }

    if (!tags.includes(formatted)) {
      tags.push(formatted);
    }
    if (tags.length >= 2) break;
  }

  // 2. Dynamic Financial Options (Zero-Cost EMI / Easy EMI / Flexible EMI / Education Loan)
  const finCards: any[] = uni?.details?.financialAssistance?.cards || [];
  const finHeading = (uni?.details?.financialAssistance?.heading || "").toLowerCase();
  const finTexts = [
    finHeading,
    ...finCards.map((c: any) => `${c.value || ""} ${c.text || ""} ${c.tag || ""}`),
  ]
    .join(" ")
    .toLowerCase();

  let emiTag: string | null = null;
  if (
    finTexts.includes("no-cost emi") ||
    finTexts.includes("zero cost emi") ||
    finTexts.includes("no cost emi")
  ) {
    emiTag = "No-Cost EMI";
  } else if (finTexts.includes("easy emi") || finHeading.includes("easy emi")) {
    emiTag = "Easy EMI Options";
  } else if (
    finTexts.includes("flexible emi") ||
    finHeading.includes("flexible emi") ||
    finTexts.includes("instalment") ||
    finTexts.includes("installment")
  ) {
    emiTag = "Flexible EMI";
  } else if (finTexts.includes("0%")) {
    emiTag = "0% Interest EMI";
  } else if (finTexts.includes("/mo") || finTexts.includes("/month")) {
    const cardWithMo = finCards.find(
      (c: any) =>
        (c.value || "").includes("/mo") || (c.value || "").includes("/month")
    );
    if (cardWithMo) emiTag = cardWithMo.value.replace("*", "").trim();
  }

  if (emiTag) {
    tags.push(emiTag);
  } else if (finTexts.includes("loan")) {
    tags.push("Education Loan");
  }

  // 3. Dynamic Hiring & Placement Support (Actual recruiter network)
  const hiringLogos: any[] = uni?.details?.hiringNetwork?.logos || [];
  const validLogos = hiringLogos.filter((l: any) => l.name || l.logoUrl);
  if (validLogos.length > 0) {
    tags.push(`${validLogos.length}+ Hiring Partners`);
  } else if (uni?.details?.banner?.pointers?.items?.length) {
    const jobPointer = uni.details.banner.pointers.items.find(
      (p: any) =>
        (p.heading || "").toLowerCase().includes("job") ||
        (p.heading || "").toLowerCase().includes("corporate")
    );
    if (jobPointer) {
      tags.push(`${jobPointer.mainText} ${jobPointer.heading}`.trim());
    }
  }

  // 4. Dynamic Scholarship (if slot remains)
  if (tags.length < 4) {
    if (studentCategory && studentCategory.includes("defence")) {
      tags.push("Defence Waiver");
    } else if (studentCategory && studentCategory.includes("merit")) {
      tags.push("Merit Scholarship");
    } else if (finTexts.includes("scholarship")) {
      tags.push("Scholarship Available");
    }
  }

  // Fallback only if the university CMS record had 0 accreditation/financial/hiring details
  if (tags.length === 0) {
    tags.push("UGC Entitled", "Flexible EMI");
  }

  return tags.slice(0, 4);
}

export function buildDegreeRegex(rawCourse?: string): RegExp | null {
  const raw = (rawCourse || "").toLowerCase().trim();
  if (!raw || raw === "all") return null;

  // Handle multiple comma-separated degrees, e.g. "MBA,MCA"
  if (raw.includes(",")) {
    const parts = raw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const subRegexes = parts.map((p) => {
      if (p.includes("mca")) return "mca";
      if (p.includes("mba")) return "mba";
      if (p.includes("bca")) return "bca";
      if (p.includes("bba")) return "bba";
      if (p.includes("b.com") || p.includes("bcom")) return "b\\.?com";
      if (p.includes("m.com") || p.includes("mcom")) return "m\\.?com";
      if (p.includes("m.sc") || p.includes("msc")) return "m\\.?sc";
      if (p.includes("b.sc") || p.includes("bsc")) return "b\\.?sc";
      if (p.includes("b.tech") || p.includes("btech")) return "b\\.?tech";
      if (p.includes("m.tech") || p.includes("mtech")) return "m\\.?tech";
      if (p.includes("dba")) return "dba";
      if (p === "ma" || p.includes("master of arts")) return "\\bma\\b";
      if (p === "ba" || p.includes("bachelor of arts")) return "\\bba\\b";
      return p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    return new RegExp(subRegexes.join("|"), "i");
  }

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
  if (raw.includes("m.tech") || raw.includes("mtech")) return /m\.?tech/i;
  if (raw === "ma" || raw.includes("master of arts")) return /\bma\b|master of arts/i;
  if (raw === "ba" || raw.includes("bachelor of arts")) return /\bba\b|bachelor of arts/i;
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

  // 1. Course Name Match (optional when coursePreference is "all" or omitted)
  const matchFilter: any = queryRegex ? { name: queryRegex } : {};

  // 2. Budget Range Match
  // Include courses within or below the maximum budget range ceiling
  const budgetMatch = {
    $or: [
      { "feeRange.start": { $lte: budgetMax } },
      { "feeRange.end": { $lte: budgetMax } },
      { feeRange: null },
      { "feeRange.start": { $exists: false } },
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
      const { min: budgetMin, max: budgetMax } = parseBudgetRange(budget);

      const items = coursesWithUni.map((doc: any) => {
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

        const courseTotalFee =
          typeof doc.feeRange?.start === "number" && doc.feeRange.start > 0
            ? doc.feeRange.start
            : annualFeeNum * durationYears;

        // Determine budget tier:
        // Tier 1: In selected budget range [budgetMin, budgetMax]
        // Tier 2: Below selected budget range (< budgetMin)
        // Tier 3: Above selected budget range (> budgetMax)
        let tier = 1;
        if (budget) {
          if (
            (courseTotalFee >= budgetMin && courseTotalFee <= budgetMax) ||
            (annualFeeNum >= budgetMin && annualFeeNum <= budgetMax)
          ) {
            tier = 1;
          } else if (courseTotalFee < budgetMin || annualFeeNum < budgetMin) {
            tier = 2;
          } else {
            tier = 3;
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

        // Dynamically extract real accreditations, financial assistance, and placement tags
        const tags = extractDynamicTags(uni, doc, category);

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
          totalFee: courseTotalFee,
          budget,
          highestQualification: qualification,
          category,
          studentState: state,
          universityLocation: uni.location,
          universityRating: ratingNum,
        });

        return {
          rec: {
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
          },
          tier,
          totalFee: courseTotalFee,
          matchScore: score,
          rating: Number(ratingNum),
        };
      });

      // Sort logic:
      // When student selects a budget:
      // 1. Courses in range come first (Tier 1), then courses below (Tier 2), then above (Tier 3)
      // 2. Within each tier, order is descending by fee!
      // 3. Tie-breaker: match score descending, then rating descending
      items.sort((a, b) => {
        if (budget && a.tier !== b.tier) {
          return a.tier - b.tier;
        }
        if (budget && b.totalFee !== a.totalFee) {
          return b.totalFee - a.totalFee;
        }
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        return b.rating - a.rating;
      });

      // Return top distinct universities
      const seenUnis = new Set<string>();
      const topItems: RecommendationItem[] = [];
      for (const item of items) {
        if (!seenUnis.has(item.rec.university)) {
          seenUnis.add(item.rec.university);
          topItems.push(item.rec);
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
  targetPreference?: string;
  budget?: string;
  category?: string;
  state?: string;
  limit?: number;
}): Promise<UniversityCourseListing[]> {
  try {
    // For AI Degree Finder (/dashboard/matcher), do not strictly filter out courses by qualification
    // or budget ceiling in MongoDB so the user has the entire catalog available to filter dynamically.
    // The student's questionnaire preferences (targetPreference, qualification, budget) are used
    // for AI match scoring and budget tier ordering instead.
    const docs = await queryUniversityCoursesWithFilters({
      coursePreference: params.coursePreference === "all" ? undefined : params.coursePreference,
      limit: params.limit || 500,
    });

    const targetDegree = extractTargetDegree({
      advisorProfile: {
        coursePreference: params.targetPreference || params.coursePreference || "",
      } as any,
    });

    const { min: budgetMin, max: budgetMax } = parseBudgetRange(params.budget);

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

      const courseTotalFee =
        typeof doc.feeRange?.start === "number" && doc.feeRange.start > 0
          ? doc.feeRange.start
          : annualFeeNum * durationYears;

      // Determine budget tier:
      // Tier 1: In selected budget range [budgetMin, budgetMax]
      // Tier 2: Below selected budget range (< budgetMin)
      // Tier 3: Above selected budget range (> budgetMax)
      let tier = 1;
      if (params.budget) {
        if (
          (courseTotalFee >= budgetMin && courseTotalFee <= budgetMax) ||
          (annualFeeNum >= budgetMin && annualFeeNum <= budgetMax)
        ) {
          tier = 1;
        } else if (courseTotalFee < budgetMin || annualFeeNum < budgetMin) {
          tier = 2;
        } else {
          tier = 3;
        }
      }

      const degreeToken = extractDegreeToken(doc.name);
      const specToken = extractSpecializationToken(doc.name, uni.details?.specializations?.list);

      // Accreditations for filtering
      const accreditations: string[] = [];
      const accList = uni.details?.accreditation?.list || [];
      if (accList.length > 0) {
        if (accList.some((a: any) => a.label?.toLowerCase().includes("naac"))) accreditations.push("NAAC");
        if (accList.some((a: any) => a.label?.toLowerCase().includes("ugc"))) accreditations.push("UGC");
        if (accList.some((a: any) => a.label?.toLowerCase().includes("aicte"))) accreditations.push("AICTE");
        if (accList.some((a: any) => a.label?.toLowerCase().includes("wes"))) accreditations.push("WES");
      }

      // Dynamic Features based on real financialAssistance & hiringNetwork
      const finCards: any[] = uni.details?.financialAssistance?.cards || [];
      const finHeading = (uni.details?.financialAssistance?.heading || "").toLowerCase();
      const finAllText = [
        finHeading,
        ...finCards.map((c: any) => `${c.value || ""} ${c.text || ""} ${c.tag || ""}`),
      ]
        .join(" ")
        .toLowerCase();

      const hasEmi =
        finAllText.includes("no-cost emi") ||
        finAllText.includes("zero cost emi") ||
        finAllText.includes("no cost emi") ||
        finAllText.includes("0%") ||
        finAllText.includes("emi");

      const hasScholarship =
        finAllText.includes("scholarship") ||
        finAllText.includes("waiver") ||
        finAllText.includes("grant") ||
        annualFeeNum < 90000 ||
        Boolean(params.category?.includes("merit") || params.category?.includes("defence"));

      const hiringCount = uni.details?.hiringNetwork?.logos?.length || 0;
      const hiringHeading = (uni.details?.hiringNetwork?.heading || "").toLowerCase();
      const hasPlacement = hiringCount > 0 || hiringHeading.includes("placement") || hiringHeading.includes("recruitment");

      const features: string[] = [];
      if (hasEmi) features.push("ZeroCostEMI");
      if (hasPlacement) features.push("Placement");
      if (hasScholarship) features.push("Scholarship");

      // Extract truly dynamic card tags for Degree Finder cards
      const dynamicTags = extractDynamicTags(uni, doc, params.category);

      const ratingNum = Number(doc.rating || uni.details?.banner?.rating || 4.8);
      const reviewsNum = Number(uni.details?.banner?.reviewsCount || 950);
      const appliedNum = Math.floor(reviewsNum * 1.05) || 1000;

      const score = calculateMatchScore({
        targetDegree,
        courseDegree: doc.name,
        courseName: doc.name,
        annualFee: annualFeeNum,
        totalFee: courseTotalFee,
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
        totalFee: courseTotalFee,
        tier,
        scholarshipNote: features.includes("Scholarship") ? "Scholarships up to ₹15,000" : undefined,
        durationNote: doc.duration ? `100% Online · ${doc.duration}` : `100% Online · ${durationYears} Years Duration`,
        accreditations,
        features,
        tags: dynamicTags,
        slug: doc.slug,
        eligibility: (doc.eligibility || "").trim(),
      };
    });

    // Sort:
    // If student selected a budget:
    // 1. Courses in that budget range come first (Tier 1), then courses below (Tier 2), then above (Tier 3).
    // 2. Within each tier, order is DESCENDING by fee!
    // 3. If fees are equal, sort by matchScore descending, then rating.
    listings.sort((a, b) => {
      if (params.budget && (a.tier ?? 1) !== (b.tier ?? 1)) {
        return (a.tier ?? 1) - (b.tier ?? 1);
      }
      const feeA = a.totalFee || a.fee * 2;
      const feeB = b.totalFee || b.fee * 2;
      if (params.budget && feeB !== feeA) {
        return feeB - feeA;
      }
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return b.rating - a.rating;
    });

    return listings;
  } catch (error) {
    console.error("Error in getUniversityListings:", error);
    return [];
  }
}
