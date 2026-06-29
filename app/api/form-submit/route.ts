import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, course, state } = body;

    if (!name || !email || !phone || !course || !state) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Try to reach old project - with error handling
    let oldProjectData = null;
    let oldProjectSuccess = false;

    try {
      const oldProjectResponse = await fetch(
        "https://genai.ecampusapp.com/api/application",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            course,
            state,
          }),
        },
      );

      oldProjectData = await oldProjectResponse.json();
      oldProjectSuccess = oldProjectResponse.ok && oldProjectData.success;
      console.log("Old Project Response:", oldProjectData);
    } catch (oldProjectError) {
      console.error("Old Project Error:", oldProjectError);
      // Continue even if old project fails
    }

    // Always send to CRM
    let phoneNumber = phone;
    let newNumber = phoneNumber.startsWith("91")
      ? phoneNumber.slice(2)
      : phoneNumber;

    const leadFormData = new FormData();
    leadFormData.append("full_name", name);
    leadFormData.append("email", email);
    leadFormData.append("country_code", "+91");
    leadFormData.append("phone", newNumber);
    leadFormData.append("course", course);
    leadFormData.append("state", state);
    leadFormData.append("no_of_users", "0");
    leadFormData.append("source", "eCampus Platform");

    let crmData = null;
    try {
      const crmResponse = await fetch(
        "https://bls.ecampuscrm.com/api/form/leads",
        {
          method: "POST",
          body: leadFormData,
        },
      );

      crmData = await crmResponse.json();
      console.log("CRM Response:", crmData);
    } catch (crmError) {
      console.error("CRM Error:", crmError);
    }

    // Return success if either old project or CRM succeeds
    if (oldProjectSuccess || crmData) {
      return NextResponse.json({
        success: true,
        message: "Application submitted successfully",
        oldProjectData,
        crmData,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit application",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
