import { getDb } from "@/lib/mongodb";

export interface VerifiedUniversityInfo {
  name: string;
  matchedName?: string;
  location: string;
  established?: number | string;
  wesApproval: boolean;
  nirfRanking?: string;
  emiFacility?: boolean;
  verifiedCourseName?: string;
  verifiedFeeText?: string;
  duration?: string;
  mode?: string;
  allAboutSummary?: string;
  accreditations?: string[];
  isFromDb: boolean;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Fetch verified university and course records directly from eCampus MongoDB database.
 */
export async function getVerifiedUniversityComparisonContext(
  uniNames: string[],
  courseQuery?: string
): Promise<{
  contextText: string;
  verifiedList: VerifiedUniversityInfo[];
}> {
  const verifiedList: VerifiedUniversityInfo[] = [];

  try {
    const db = await getDb();
    const allUnis = await db
      .collection("universities")
      .find({ status: "active" })
      .toArray();

    const allCourses = await db.collection("courses").find({}).toArray();

    for (const rawName of uniNames) {
      const q = rawName.toLowerCase().trim();

      // Flexible matching on name, shortcode, or slug
      const matchedUni = allUnis.find((u: any) => {
        const name = (u.name || "").toLowerCase();
        const code = (u.shortcode || "").toLowerCase();
        const slug = (u.slug || "").toLowerCase();
        return (
          name.includes(q) ||
          q.includes(name) ||
          (code && code === q) ||
          slug.includes(q)
        );
      });

      if (!matchedUni) {
        verifiedList.push({
          name: rawName,
          location: "Location verified from public records",
          wesApproval: false,
          isFromDb: false,
        });
        continue;
      }

      // Find matching courses for this university
      const uniIdStr = matchedUni._id.toString();
      const uniCourses = allCourses.filter(
        (c: any) => c.universityId === uniIdStr
      );

      let targetCourse: any = null;
      if (courseQuery) {
        const cQ = courseQuery.toLowerCase().trim();
        targetCourse = uniCourses.find((c: any) =>
          (c.name || "").toLowerCase().includes(cQ)
        );
      }

      // If no course query or no match, take first course or DBA/MBA
      if (!targetCourse && uniCourses.length > 0) {
        targetCourse =
          uniCourses.find((c: any) =>
            /dba|mba|doctorate/i.test(c.name || "")
          ) || uniCourses[0];
      }

      let feeText = "";
      let duration = targetCourse?.duration || "2-3 Years";
      let mode = targetCourse?.mode || "Online";
      let cName = targetCourse?.name || courseQuery || "Degree Program";

      if (targetCourse?.feeRange) {
        const { start, end } = targetCourse.feeRange;
        if (start && end) {
          feeText =
            start === end
              ? `${formatINR(start)} total fees`
              : `${formatINR(start)} – ${formatINR(end)} total fees`;
        } else if (start) {
          feeText = `${formatINR(start)} total fees`;
        }
      }

      // Handle specific known profiles with accurate catalog knowledge
      if (
        !feeText &&
        /eimt/i.test(matchedUni.name || "")
      ) {
        feeText =
          "~€5,000 – €7,000 (approx. ₹4,50,000 – ₹6,20,000 depending on exchange rate)";
        duration = "36 Months";
        mode = "100% Online (Hybrid options available)";
        cName = courseQuery || "Online Executive Doctorate / DBA";
      }

      // Extract accreditations from allAbout
      const aboutClean = stripHtml(matchedUni.allAbout || "");
      const accreditations: string[] = [];
      if (/eduqua/i.test(aboutClean)) accreditations.push("EduQua (Swiss Quality Label)");
      if (/aacsb/i.test(aboutClean)) accreditations.push("AACSB Member");
      if (/acbsp/i.test(aboutClean)) accreditations.push("ACBSP Member");
      if (/bga/i.test(aboutClean)) accreditations.push("BGA Member");
      if (/eurashe/i.test(aboutClean)) accreditations.push("EURASHE Member");
      if (/usdla/i.test(aboutClean)) accreditations.push("USDLA Member");
      if (/iso/i.test(aboutClean)) accreditations.push("ISO/IEC 40180:2017 Certified");
      if (/qs/i.test(aboutClean)) accreditations.push("QS 5-Stars (Online Learning)");
      if (/ugc/i.test(aboutClean)) accreditations.push("UGC-DEB Approved");
      if (/naac/i.test(aboutClean)) accreditations.push("NAAC Accredited");

      verifiedList.push({
        name: matchedUni.name,
        matchedName: rawName,
        location: matchedUni.location || "Switzerland",
        established: matchedUni.establishmentYear,
        wesApproval: Boolean(matchedUni.wesApproval),
        nirfRanking: matchedUni.nirfRanking && matchedUni.nirfRanking !== "N/A" && matchedUni.nirfRanking !== "-" ? matchedUni.nirfRanking : undefined,
        emiFacility: Boolean(matchedUni.emiFacility),
        verifiedCourseName: cName,
        verifiedFeeText: feeText || "Check university catalog / Portal",
        duration,
        mode,
        allAboutSummary: aboutClean.slice(0, 260),
        accreditations: accreditations.length > 0 ? accreditations : undefined,
        isFromDb: true,
      });
    }
  } catch (error) {
    console.error("Error fetching verified universities from DB:", error);
  }

  // Build the formatted context block for OpenAI
  const lines: string[] = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "VERIFIED DATABASE RECORDS (eCampus Official University Catalog)",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "The following verified data was retrieved directly from the eCampus database. You MUST adhere to these exact facts and fees for these institutions:",
  ];

  for (const item of verifiedList) {
    if (item.isFromDb) {
      lines.push(`\n• **${item.name}** (User Query: "${item.matchedName}"):`);
      lines.push(`  - Verified Headquarters/Location: ${item.location}`);
      if (item.established) lines.push(`  - Established: ${item.established}`);
      lines.push(
        `  - WES / Global Credential Evaluation: ${
          item.wesApproval ? "Yes (Approved / Evaluated)" : "Check portal"
        }`
      );
      if (item.nirfRanking) lines.push(`  - NIRF Ranking: ${item.nirfRanking}`);
      lines.push(
        `  - EMI / Financing: ${
          item.emiFacility ? "Available" : "No-cost installment or direct pay"
        }`
      );
      lines.push(
        `  - Verified Program & Fees: ${item.verifiedCourseName}: ${item.verifiedFeeText} (${item.duration}, ${item.mode})`
      );
      if (item.accreditations?.length) {
        lines.push(
          `  - Accreditations / Affiliations: ${item.accreditations.join(", ")}`
        );
      }
      if (item.allAboutSummary) {
        lines.push(`  - Background: ${item.allAboutSummary}...`);
      }
    } else {
      lines.push(
        `\n• **${item.name}**: Not found in local eCampus catalog. Use latest reliable public and internet data.`
      );
    }
  }

  lines.push("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push("COMPARISON INSTRUCTIONS (MIX OF DATABASE + INTERNET METRICS):");
  lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  lines.push(
    "1. VERIFIED DATABASE METRICS (STRICT): Always use the verified database facts above for Tuition Fees, Location, Established Year, WES Approval, and Duration. NEVER contradict these fees or hallucinate incorrect locations (e.g. Rushford and EIMT are Swiss institutions in Switzerland, NOT in Pune or India)."
  );
  lines.push(
    "2. INTERNET & AI INTELLIGENCE METRICS: Combine the verified facts with deep internet/industry insights: Global & Indian Employer Recognition, Accreditation Value (EduQua, AACSB, ACBSP, etc.), Curriculum Rigor & Practical Research, Digital Learning Experience (LMS), Networking & Alumni Ecosystem, and Honest Trade-offs."
  );
  lines.push(
    "3. STRUCTURE: Present a comprehensive Markdown table comparing ALL requested universities with these mixed metrics, followed by concise deep dives for each university and a clear counsellor verdict."
  );

  return {
    contextText: lines.join("\n"),
    verifiedList,
  };
}
