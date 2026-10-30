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

    const coursePreference =
      searchParams.get("coursePreference") ||
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

    const limitParam = parseInt(searchParams.get("limit") || "60", 10);

    const courses = await getUniversityListings({
      qualification,
      coursePreference,
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
