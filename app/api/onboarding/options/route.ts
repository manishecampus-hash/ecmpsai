import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const eligibilityParam = searchParams.get("eligibility");

    // 1. Fetch all admin root course eligibilities
    const eligDocs = await db
      .collection("eligibilities")
      .find({})
      .sort({ createdAt: 1 })
      .toArray();

    // Educational hierarchy sort order for smooth UI
    const ORDER: Record<string, number> = {
      "10th pass": 1,
      "12th pass": 2,
      "10+3 years diploma": 3,
      iti: 4,
      graduate: 5,
      "graduate with exp.": 6,
      "b.tech with exp.": 7,
      "graduate with exp. or post-graduate": 8,
      "post-graduate": 9,
    };

    const eligibilities = eligDocs
      .map((doc: any) => ({
        id: (doc.title || doc._id.toHexString()).trim(),
        title: (doc.title || "").trim(),
        label: (doc.title || "").trim(),
      }))
      .filter((e) => e.title.length > 0)
      .sort((a, b) => {
        const orderA = ORDER[a.title.toLowerCase()] ?? 99;
        const orderB = ORDER[b.title.toLowerCase()] ?? 99;
        return orderA - orderB;
      });

    // 2. Fetch all budget ranges from University Course Budget Range tab (course_meta)
    const budgetDocs = await db
      .collection("course_meta")
      .find({ type: "budget_range" })
      .sort({ min: 1 })
      .toArray();

    const budgetRanges = budgetDocs.map((doc: any) => ({
      id: doc.name || doc._id.toHexString(),
      name: doc.name,
      label: doc.name,
      min: typeof doc.min === "number" ? doc.min : 0,
      max: typeof doc.max === "number" ? doc.max : 2000000,
    }));

    // 3. If an eligibility filter is requested, query root courses for that qualification
    let rootCourses: any[] = [];
    if (eligibilityParam) {
      const safeElig = eligibilityParam.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const eligFilter: any[] = [
        { eligibility: { $regex: new RegExp(`^${safeElig}$`, "i") } },
      ];

      const lower = eligibilityParam.toLowerCase();
      if (lower === "graduate") {
        eligFilter.push({
          $and: [
            { $or: [{ eligibility: null }, { eligibility: "" }, { eligibility: { $exists: false } }] },
            { slug: { $regex: /mba|mca|mcom|online-ma|online-msc/i } },
          ],
        });
      } else if (lower.includes("12th")) {
        eligFilter.push({
          $and: [
            { $or: [{ eligibility: null }, { eligibility: "" }, { eligibility: { $exists: false } }] },
            { slug: { $regex: /bba|bca|bcom|online-ba|online-bsc/i } },
          ],
        });
      }

      const coursesDocs = await db
        .collection("root_courses")
        .find({ $or: eligFilter })
        .sort({ name: 1 })
        .toArray();

      rootCourses = coursesDocs.map((doc: any) => {
        const rawName = (doc.name || "").trim();
        // Clean display title
        const cleanName = rawName
          .replace(/\s*–\s*Complete.*$/i, "")
          .replace(/\/Bachelors Program/i, "")
          .replace(/\/Doctorate Program.*$/i, "")
          .replace(/\/Master Online Program/i, "")
          .replace(/\s*\(2026\)/i, "")
          .trim();

        let group: string | undefined = undefined;
        if (rawName.toLowerCase().includes("dba") || rawName.toLowerCase().includes("doctor of business")) {
          group = "Doctor of Business Administration (DBA)";
        } else if (rawName.toLowerCase().includes("dcs") || rawName.toLowerCase().includes("doctor of computer")) {
          group = "Doctor of Computer Science (DCS)";
        } else if (rawName.toLowerCase().includes("b.tech") || rawName.toLowerCase().includes("btech")) {
          group = "B.Tech for Working Professionals";
        }

        return {
          id: rawName,
          name: cleanName || rawName,
          fullName: rawName,
          group,
          slug: doc.slug,
          eligibility: doc.eligibility || eligibilityParam,
          duration: doc.duration || "",
        };
      });
    }

    return NextResponse.json({
      success: true,
      eligibilities,
      budgetRanges,
      rootCourses,
    });
  } catch (error: any) {
    console.error("GET /api/onboarding/options error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load onboarding options" },
      { status: 500 }
    );
  }
}
