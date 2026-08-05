import { NextRequest, NextResponse } from "next/server";

interface UserProfile {
  category: string;
  course: string;
  budget: string;
  targetPackage: string;
  qualification: string;
  scholarship: string;
}

interface UniversityLite {
  name: string;
  fees: string;
  location: string;
  rating: number;
}

export async function POST(req: NextRequest) {
  try {
    const { profile, universities } = (await req.json()) as {
      profile: UserProfile;
      universities: UniversityLite[];
    };

    if (!profile) {
      return NextResponse.json(
        { error: "Missing user profile" },
        { status: 400 },
      );
    }

    const prompt = `
A student is exploring education options on an Indian ed-tech platform. Generate a rich, detailed, personalized career and education guide for them — this will become a 2-3 page downloadable PDF report, so be thorough and specific, not generic.

Student profile:
- Category: ${profile.category}
- Course: ${profile.course}
- Budget: ${profile.budget}
- Target salary package: ${profile.targetPackage}
- Highest qualification: ${profile.qualification}
- Scholarship need: ${profile.scholarship}

Universities they're considering:
${
  universities
    ?.map(
      (u) =>
        `- ${u.name} (${u.location}) — Fees: ${u.fees}, Rating: ${u.rating}`,
    )
    .join("\n") || "None selected yet"
}

Respond with ONLY a valid JSON object (no markdown, no code fences) in exactly this shape:

{
  "verdict": "2-3 sentence direct recommendation: which option fits their budget and target package better, and why",
  "executiveSummary": "3-4 sentence overview of their situation and what this report covers",
  "courseOverview": "150-200 words on why this specific course matters right now in India, real industry demand, what kind of companies hire for it, and what a typical day-to-day job looks like",
  "universityComparison": "200-250 words comparing the specific universities listed above (or general options if none listed) — cover total cost for full duration, accreditation value, placement support, ROI (fees vs expected starting salary), and a clear recommendation with reasoning",
  "salaryProgression": [
    { "year": "Year 1", "role": "typical entry role title", "salary": "realistic INR range" },
    { "year": "Year 3", "role": "typical role title after experience", "salary": "realistic INR range" },
    { "year": "Year 5", "role": "typical senior role title", "salary": "realistic INR range" }
  ],
  "feeBreakdown": "120-150 words breaking down the total investment: tuition across the full duration, estimated additional costs (materials, exams, etc.), and how this compares to the expected salary — essentially a simple ROI explanation with real numbers",
  "skillsToAdd": ["specific skill or certification 1", "specific skill or certification 2", "specific skill or certification 3", "specific skill or certification 4"],
  "scholarshipGuidance": "80-120 words on realistic scholarship or financial aid options relevant to their stated need, and how much it could reduce their cost",
  "actionPlan": [
    { "period": "First 30 days", "actions": "specific concrete actions" },
    { "period": "Next 60 days", "actions": "specific concrete actions" },
    { "period": "By 90 days", "actions": "specific concrete actions" }
  ],
  "commonMistakes": "100-150 words on 2-3 specific mistakes students in a similar situation (budget, qualification level) commonly make, and how to avoid them",
  "closingNote": "2-3 sentence motivating but honest closing statement, specific to their goal, not generic"
}

Use real, specific Indian market numbers throughout (salary ranges in LPA, fee amounts in rupees). Be honest and direct — no vague filler, no disclaimers, no repeated phrases across sections.
`.trim();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 3500,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a practical career and education advisor for Indian students, writing a detailed personalized report. Be specific, honest, and data-driven. Always respond with valid JSON only, matching the exact schema requested.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const rawText = data?.choices?.[0]?.message?.content ?? "{}";

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("Failed to parse AI JSON:", rawText);
      return NextResponse.json(
        { error: "AI returned an unexpected format" },
        { status: 502 },
      );
    }

    return NextResponse.json({ insight: parsed });
  } catch (err) {
    console.error("ai-insight route error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
