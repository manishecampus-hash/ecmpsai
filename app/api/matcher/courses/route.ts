import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/guards";
import { getUniversityListings } from "@/lib/recommendations-server";

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    const { searchParams } = new URL(req.url);

    const authUser = auth?.user;

    const qualification =
      searchParams.get("highestQualification") ||
      authUser?.advisorProfile?.highestQualification ||
      "";

    // If client explicitly sent coursePreference, use it. If "all", query all.
    // If not passed, default to "all" so AI degree finder is never locked to 1 degree!
    let coursePreference = "all";
    if (searchParams.has("coursePreference")) {
      coursePreference = searchParams.get("coursePreference") || "all";
    } else if (searchParams.has("degrees") || searchParams.has("degree")) {
      coursePreference = searchParams.get("degrees") || searchParams.get("degree") || "all";
    }

    const targetPreference =
      searchParams.get("targetPreference") ||
      authUser?.advisorProfile?.coursePreference ||
      authUser?.course ||
      authUser?.coursesInterested?.[0] ||
      "";

    const budget =
      searchParams.get("budget") ||
      authUser?.advisorProfile?.budget ||
      "";

    const category =
      searchParams.get("category") ||
      authUser?.advisorProfile?.category ||
      "";

    const state =
      searchParams.get("state") ||
      authUser?.state ||
      "";

    const limitParam = parseInt(searchParams.get("limit") || "500", 10);

    const courses = await getUniversityListings({
      qualification,
      coursePreference,
      targetPreference,
      budget,
      category,
      state,
      limit: limitParam,
    });

    return NextResponse.json({
      success: true,
      count: courses.length,
      filtersApplied: {
        qualification,
        coursePreference,
        targetPreference,
        budget,
      },
      courses,
    });
  } catch (error: any) {
    console.error("GET /api/matcher/courses error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch university courses",
      },
      { status: 500 }
    );
  }
}
