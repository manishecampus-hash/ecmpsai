import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Incoming dynamic data
    const { university1, university2, course, budget, salary, qualification } =
      body;

    // Generate structured AI response
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),

      schema: z.object({
        winner: z.string(),

        matchScore: z.number().min(50).max(100),

        summary: z.string(),

        whyBetter: z.array(z.string()),

        salaryRange: z.string(),

        nextSteps: z.array(z.string()),

        skills: z.array(z.string()),

        finalAdvice: z.string(),
      }),

      prompt: `
You are eCampus AI, an expert Indian higher education and career counsellor.

Compare these two universities for THIS specific student.

STUDENT PROFILE
----------------
Course: ${course}
Budget: ${budget}
Salary Goal: ${salary}
Qualification: ${qualification}

UNIVERSITY A
----------------
${university1}

UNIVERSITY B
----------------
${university2}

TASK
----------------
Return a personalized comparison for this student.

Important rules:
- Choose the university that is most suitable for the student's budget, qualification, and salary goal.
- Explain practical reasons, not marketing claims.
- Give realistic salary expectations for India.
- Suggest useful skills related to the selected course.
- Create actionable next steps.
- Keep the tone encouraging, professional, and easy for students to understand.
- Do NOT give fake placement guarantees.
- The response must be different for MBA, MCA, BCA, DBA, and other courses.
`,
    });

    return Response.json(object);
  } catch (error) {
    console.error("Compare AI Error:", error);

    return Response.json(
      {
        winner: "Unable to generate comparison",
        matchScore: 0,
        summary:
          "We could not generate the AI comparison right now. Please try again.",
        whyBetter: [],
        salaryRange: "N/A",
        nextSteps: [],
        skills: [],
        finalAdvice: "Please try again later.",
      },
      { status: 500 },
    );
  }
}
