import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, course, state } = body;

    // Pulling from .env.local
    const token = process.env.ZEPTO_TOKEN;
    const adminEmail = process.env.ADMIN_EMAIL;
    const endpoint = process.env.ZEPTO_ENDPOINT;

    // Safety check: ensure env variables are loaded
    if (!token || !adminEmail || !endpoint) {
      return NextResponse.json(
        { success: false, message: "Server configuration missing" },
        { status: 500 },
      );
    }

    const emailData = {
      from: {
        address: "no-reply@ecampusapp.com",
        name: "ECAMPUS Website Lead",
      },
      to: [
        {
          email_address: {
            address: adminEmail,
            name: "Admin",
          },
        },
      ],
      subject: `New Lead received from ECAMPUS New Website`,
      htmlbody: `
<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px;">
<h2 style="color: #2563eb;">New Lead Received </h2>
<hr style="border: 0; border-top: 1px solid #eee;" />
<table style="width: 100%; border-collapse: collapse;">
<tr><td style="padding: 8px 0;"><b>Name:</b></td><td>${name}</td></tr>
<tr><td style="padding: 8px 0;"><b>Email:</b></td><td>${email}</td></tr>
<tr><td style="padding: 8px 0;"><b>Phone:</b></td><td>${phone || "N/A"}</td></tr>
<tr><td style="padding: 8px 0;"><b>Course:</b></td><td>${course || "N/A"}</td></tr>
<tr><td style="padding: 8px 0;"><b>State:</b></td><td>${state || "N/A"}</td></tr>
</table>
</div>
`,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Zoho-enczapikey ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ ZeptoMail Error:", result);
      return NextResponse.json(
        { success: false, error: result },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// new--------------------------

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email, phone, course, state } = body;

//     // ─── Env checks ───────────────────────────────────────────────
//     const token = process.env.ZEPTO_TOKEN;
//     const adminEmail = process.env.ADMIN_EMAIL;
//     const endpoint = process.env.ZEPTO_ENDPOINT;

//     if (!token || !adminEmail || !endpoint) {
//       return NextResponse.json(
//         { success: false, message: "Server configuration missing" },
//         { status: 500 },
//       );
//     }

//     // ─── 1. upGrad Lead API ───────────────────────────────────────
//     // Strip dial code from full phone string e.g. "918777543476" → "8777543476"
//     const dialCode = "91";
//     const nationalNumber = phone?.startsWith(dialCode)
//       ? phone.slice(dialCode.length)
//       : phone;

//     const upgradeBody = {
//       firstname: name,
//       lastname: "",
//       email,
//       course,
//       state,
//       country: "India",
//       emailTemplateSuffix: "in",
//       isDetectLocation: false,
//       leadSource: {
//         platform: "Campuswalkin",
//         platformSection: "career_transition",
//         plateformCounsellor: "campuswalkin.partner@upgrad.com",
//       },
//       phone: {
//         code: "+91",
//         number: nationalNumber,
//       },
//     };

//     const upgradeRes = await fetch(
//       "https://staging-lead-ms.upgrad.dev/apis/lead-drop/vendor/ugcbvendor",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           utm_source: "ChannelPartner_Campuswalkin",
//           utm_medium: "ChannelPartner_Campuswalkin",
//           utm_campaign: "ChannelPartner_Campuswalkin",
//           Cookie: "sessionid=abc123",
//           Authorization: "Basic dWdjYnZlbmRvcjpraURwcVhtMQ==",
//         },
//         body: JSON.stringify(upgradeBody),
//       },
//     );

//     const upgradeResult = await upgradeRes.json();
//     console.log("upGrad API →", upgradeRes.status, upgradeResult);

//     if (!upgradeRes.ok) {
//       console.error("❌ upGrad API failed:", upgradeResult);
//       // Non-blocking: we still send the admin email below.
//       // If you want to hard-fail instead, return an error response here.
//     }

//     // ─── 2. ZeptoMail Email Notification ─────────────────────────
//     const emailData = {
//       from: {
//         address: "no-reply@ecampusapp.com",
//         name: "GGU Leads",
//       },
//       to: [
//         {
//           email_address: {
//             address: adminEmail,
//             name: "Admin",
//           },
//         },
//       ],
//       subject: `New Lead received from GEN AI New LP`,
//       htmlbody: `
// <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px;">
//   <h2 style="color: #2563eb;">New Lead Received</h2>
//   <p style="font-size: 16px;">You have received a new lead from the landing page.</p>
//   <hr style="border: 0; border-top: 1px solid #eee;" />
//   <table style="width: 100%; border-collapse: collapse;">
//     <tr><td style="padding: 8px 0;"><b>Name:</b></td><td>${name}</td></tr>
//     <tr><td style="padding: 8px 0;"><b>Email:</b></td><td>${email}</td></tr>
//     <tr><td style="padding: 8px 0;"><b>Phone:</b></td><td>${phone || "N/A"}</td></tr>
//     <tr><td style="padding: 8px 0;"><b>Course:</b></td><td>${course || "N/A"}</td></tr>
//     <tr><td style="padding: 8px 0;"><b>State:</b></td><td>${state || "N/A"}</td></tr>
//     <tr><td style="padding: 8px 0;"><b>upGrad Status:</b></td><td>${upgradeRes.ok ? "✅ Submitted" : "❌ Failed"}</td></tr>
//   </table>
// </div>
// `,
//     };

//     const emailRes = await fetch(endpoint, {
//       method: "POST",
//       headers: {
//         Authorization: `Zoho-enczapikey ${token}`,
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(emailData),
//     });

//     const emailResult = await emailRes.json();

//     if (!emailRes.ok) {
//       console.error("❌ ZeptoMail Error:", emailResult);
//       return NextResponse.json(
//         { success: false, error: emailResult },
//         { status: emailRes.status },
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("❌ Server error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 },
//     );
//   }
// }
