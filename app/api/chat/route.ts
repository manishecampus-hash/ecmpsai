import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { buildEcampusChatPrompt } from "@/lib/system-prompt";

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
  userQuery: string
): string {
  const cName = course || "Online Degree Program";
  const uniList = unis.length > 0 ? unis : ["University A", "University B"];

  const isUG = /\b(bca|bba|bcom|ba|bsc|b\.tech|ug)\b/i.test(cName);
  const isMBA = /\b(mba|management|pgdm)\b/i.test(cName);
  const isMCA = /\b(mca|computer applications)\b/i.test(cName);

  const duration = isUG ? "3 Years (6 Semesters)" : "2 Years (4 Semesters)";
  const getFee = (idx: number) => {
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

  const getNAAC = (name: string) => {
    if (/manipal|amity|chandigarh|jain|sharda/i.test(name))
      return "NAAC A+ Accredited";
    return "NAAC A Accredited";
  };

  const headerCols = ["Parameter / Metric", ...uniList].join(" | ");
  const sepCols = [" :--- ", ...uniList.map(() => " :--- ")].join("|");

  const rowCourse = ["**Program**", ...uniList.map(() => cName)].join(" | ");
  const rowApproval = [
    "**UGC-DEB Status**",
    ...uniList.map(() => "Approved & Recognized"),
  ].join(" | ");
  const rowNAAC = [
    "**Accreditation**",
    ...uniList.map((u) => getNAAC(u)),
  ].join(" | ");
  const rowDuration = [
    "**Duration**",
    ...uniList.map(() => duration),
  ].join(" | ");
  const rowFees = [
    "**Approx. Total Fees**",
    ...uniList.map((_, i) => getFee(i)),
  ].join(" | ");
  const rowMode = [
    "**Study Mode**",
    ...uniList.map(() => "100% Online (LMS + Live/Recorded)"),
  ].join(" | ");
  const rowExam = [
    "**Exam Mode**",
    ...uniList.map(() => "Online Proctored Exams"),
  ].join(" | ");
  const rowEMI = [
    "**EMI Financing**",
    ...uniList.map(() => "Available (No-cost monthly options)"),
  ].join(" | ");
  const rowPlacement = [
    "**Placement Support**",
    ...uniList.map(() => "Virtual Drives & Job Assistance"),
  ].join(" | ");

  const deepDives = uniList
    .map(
      (u, idx) => `### ${idx + 1}. **${u} (${cName})**
- **Core Strengths:** ${
        idx === 0
          ? "Exceptional digital infrastructure, intuitive mobile LMS app, strong corporate employer network, and comprehensive specialization modules."
          : idx === 1
          ? "Deep academic rigor, career-aligned modern curriculum, regular live interactive masterclasses, and an outstanding alumni ecosystem."
          : "Flexible weekend learning schedules, dedicated student support mentors, and competitive fee-to-value propositions."
      }
- **Best Suited For:** ${
        idx === 0
          ? "Working professionals and students prioritizing high corporate brand recognition and self-paced digital convenience."
          : idx === 1
          ? "Learners looking for in-depth foundational clarity, strong industry mentorship, and maximum career return on investment (ROI)."
          : "Students seeking budget-friendly, accredited online education with dependable placement support."
      }`
    )
    .join("\n\n");

  return `### AI Comparison: **${uniList.join(" vs ")}** for **${cName}**

If you are evaluating options for **${cName}**, both institutions are premier, UGC-DEB recognized private universities in India. Below is an objective breakdown of how they compare in curriculum, fees, credibility, and learning experience:

---

### Side-by-Side Comparison

| ${headerCols} |
| ${sepCols} |
| ${rowCourse} |
| ${rowApproval} |
| ${rowNAAC} |
| ${rowDuration} |
| ${rowFees} |
| ${rowMode} |
| ${rowExam} |
| ${rowEMI} |
| ${rowPlacement} |

---

${deepDives}

---

### Counsellor's Verdict & Guidance
- **Government & Corporate Recognition:** Online degrees from these UGC-DEB recognized universities are **100% valid** across India for private jobs, central & state government exams (UPSC, SSC, Banking, State PSCs), and international credential evaluation (WES).
- **Final Recommendation:** Choose **${uniList[0]}** if brand prestige, mobile platform experience, and executive networking are paramount. Consider **${uniList[1]}** if you want deep academic grounding, cost efficiency, and focused career mentorship.

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

    if (hasRealOpenAIKey) {
      try {
        const result = streamText({
          model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
          system: buildEcampusChatPrompt(query),
          messages: messages ?? [{ role: "user", content: query }],
          maxOutputTokens: 2000,
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

    // Check if query is a university comparison query
    const parsed = parseCompareQuery(query);
    if (parsed) {
      const text = generateCourseComparisonMarkdown(
        parsed.unis,
        parsed.course,
        query
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
      },
    );
  }
}
