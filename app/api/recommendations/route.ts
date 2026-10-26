import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/guards";
import { getRecommendationsForStudent } from "@/lib/recommendations-server";
import type { StudentProfile } from "@/app/dashboard/types";

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    const { searchParams } = new URL(req.url);

    // Merge auth user details with any client-supplied query params
    const authUser = auth?.user;

    const student: Partial<StudentProfile> = {
      course: searchParams.get("course") || authUser?.course || "",
      coursesInterested: authUser?.coursesInterested || (searchParams.get("course") ? [searchParams.get("course")!] : []),
      state: searchParams.get("state") || authUser?.state || "",
      advisorProfile: {
        highestQualification: searchParams.get("highestQualification") || authUser?.advisorProfile?.highestQualification || "",
        coursePreference: searchParams.get("coursePreference") || authUser?.advisorProfile?.coursePreference || "",
        budget: searchParams.get("budget") || authUser?.advisorProfile?.budget || "",
        employmentStatus: searchParams.get("employmentStatus") || authUser?.advisorProfile?.employmentStatus || "",
        currentSalary: searchParams.get("currentSalary") || authUser?.advisorProfile?.currentSalary || "",
        targetSalary: searchParams.get("targetSalary") || authUser?.advisorProfile?.targetSalary || "",
        category: searchParams.get("category") || authUser?.advisorProfile?.category || "",
      },
    };

    const recommendations = await getRecommendationsForStudent(student);

    return NextResponse.json({
      success: true,
      authenticated: Boolean(auth),
      recommendations,
    });
  } catch (error: any) {
    console.error("Error in /api/recommendations:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch recommendations",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    const body = await req.json().catch(() => ({}));

    const student: Partial<StudentProfile> = {
      course: body.course || auth?.user?.course || "",
      coursesInterested: body.coursesInterested || auth?.user?.coursesInterested || [],
      state: body.state || auth?.user?.state || "",
      advisorProfile: body.advisorProfile || auth?.user?.advisorProfile || {},
    };

    const recommendations = await getRecommendationsForStudent(student);

    return NextResponse.json({
      success: true,
      authenticated: Boolean(auth),
      recommendations,
    });
  } catch (error: any) {
    console.error("Error in POST /api/recommendations:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to compute recommendations",
      },
      { status: 500 }
    );
  }
}
