"use client";

import { useState } from "react";
import jsPDF from "jspdf";

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

interface SalaryStep {
  year: string;
  role: string;
  salary: string;
}

interface ActionStep {
  period: string;
  actions: string;
}

interface AiInsight {
  verdict: string;
  executiveSummary: string;
  courseOverview: string;
  universityComparison: string;
  salaryProgression: SalaryStep[];
  feeBreakdown: string;
  skillsToAdd: string[];
  scholarshipGuidance: string;
  actionPlan: ActionStep[];
  commonMistakes: string;
  closingNote: string;
}

interface AiInsightCardProps {
  profile: UserProfile;
  universities: UniversityLite[];
}

export default function AiInsightCard({
  profile,
  universities,
}: AiInsightCardProps) {
  const [insight, setInsight] = useState<AiInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  async function generateInsight() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, universities }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      setInsight(data.insight);
      setHasFetched(true);
    } catch (err) {
      console.error("AI insight error:", err);
      setError("Couldn't generate insight right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function extractAvgNumber(str: string): number {
    const matches = str.match(/\d+(\.\d+)?/g);
    if (!matches || matches.length === 0) return 0;
    const nums = matches.map(Number);
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }

  function downloadGuide() {
    if (!insight) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    const maxWidth = pageWidth - margin * 2;
    let y = 0;
    let pageNum = 1;

    function footer() {
      doc.setDrawColor(230, 230, 230);
      doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        "Generated for you by eCampus AI — personalized to your profile, not a template",
        margin,
        pageHeight - 25,
      );
      doc.text(String(pageNum), pageWidth - margin - 10, pageHeight - 25);
    }

    function newPageIfNeeded(needed = 20) {
      if (y > pageHeight - 70 - needed) {
        footer();
        doc.addPage();
        pageNum += 1;
        y = 60;
      }
    }

    // Section heading with a colored bullet + underline accent
    function addHeading(text: string) {
      newPageIfNeeded(36);
      doc.setFillColor(220, 38, 38);
      doc.roundedRect(margin, y - 12, 5, 16, 1, 1, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(20, 20, 20);
      doc.text(text, margin + 14, y);
      y += 10;
      doc.setDrawColor(240, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 18;
    }

    function addParagraph(text: string) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(50, 50, 50);
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        newPageIfNeeded();
        doc.text(line, margin, y);
        y += 15;
      });
      y += 8;
    }

    // Highlighted callout box (used for the verdict / decision)
    function addDecisionBox(text: string) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(text, maxWidth - 50);
      const boxHeight = lines.length * 16 + 34;
      newPageIfNeeded(boxHeight);

      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(252, 165, 165);
      doc.roundedRect(margin, y, maxWidth, boxHeight, 8, 8, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(185, 28, 28);
      doc.text("✓ Recommended Path", margin + 16, y + 22);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 30, 30);
      doc.setFontSize(10.5);
      let ly = y + 42;
      lines.forEach((line: string) => {
        doc.text(line, margin + 16, ly);
        ly += 16;
      });

      y += boxHeight + 20;
    }

    // Bar chart for salary progression (Year 1 / 3 / 5)
    function addSalaryChart(steps: SalaryStep[]) {
      if (!steps || steps.length === 0) return;
      const chartHeight = 130;
      newPageIfNeeded(chartHeight + 40);

      const values = steps.map((s) => extractAvgNumber(s.salary) || 1);
      const maxVal = Math.max(...values, 1);
      const barAreaWidth = maxWidth;
      const barWidth = 70;
      const gap = (barAreaWidth - barWidth * steps.length) / (steps.length + 1);
      const baseY = y + chartHeight;

      // baseline
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, baseY, margin + barAreaWidth, baseY);

      steps.forEach((s, i) => {
        const barHeight = (values[i] / maxVal) * (chartHeight - 40);
        const x = margin + gap + i * (barWidth + gap);
        const barTop = baseY - barHeight;

        // bar
        doc.setFillColor(220, 38, 38);
        doc.roundedRect(x, barTop, barWidth, barHeight, 3, 3, "F");

        // value label above bar
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(20, 20, 20);
        const salaryLines = doc.splitTextToSize(s.salary, barWidth + 10);
        doc.text(
          salaryLines,
          x + barWidth / 2,
          barTop - 8 - (salaryLines.length - 1) * 10,
          {
            align: "center",
          },
        );

        // year label below baseline
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(60, 60, 60);
        doc.text(s.year, x + barWidth / 2, baseY + 14, { align: "center" });

        // role label
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        const roleLines = doc.splitTextToSize(s.role, barWidth + 10);
        doc.text(roleLines, x + barWidth / 2, baseY + 26, { align: "center" });
      });

      y = baseY + 45;
    }

    // Skill chips (rounded pill shapes)
    function addSkillChips(skills: string[]) {
      let x = margin;
      const chipHeight = 22;
      const rowGap = 10;
      newPageIfNeeded(chipHeight + rowGap);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);

      skills.forEach((skill) => {
        const textWidth = doc.getTextWidth(skill);
        const chipWidth = textWidth + 20;

        if (x + chipWidth > margin + maxWidth) {
          x = margin;
          y += chipHeight + rowGap;
          newPageIfNeeded(chipHeight + rowGap);
        }

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(252, 165, 165);
        doc.roundedRect(x, y, chipWidth, chipHeight, 11, 11, "FD");
        doc.setTextColor(185, 28, 28);
        doc.text(skill, x + 10, y + 15);

        x += chipWidth + 8;
      });

      y += chipHeight + 20;
    }

    // Roadmap / timeline style for the action plan
    function addTimeline(steps: ActionStep[]) {
      steps.forEach((step, i) => {
        const detailLines = doc.splitTextToSize(step.actions, maxWidth - 40);
        const blockHeight = 20 + detailLines.length * 14 + 10;
        newPageIfNeeded(blockHeight);

        const circleX = margin + 8;
        const circleY = y;

        doc.setFillColor(220, 38, 38);
        doc.circle(circleX, circleY, 9, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text(String(i + 1), circleX, circleY + 3, { align: "center" });

        if (i < steps.length - 1) {
          doc.setDrawColor(250, 200, 200);
          doc.line(circleX, circleY + 9, circleX, circleY + blockHeight + 5);
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(20, 20, 20);
        doc.text(step.period, circleX + 20, circleY + 3);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(70, 70, 70);
        let ly = circleY + 18;
        detailLines.forEach((line: string) => {
          doc.text(line, circleX + 20, ly);
          ly += 14;
        });

        y += blockHeight;
      });
      y += 10;
    }

    // ── Cover section ──
    doc.setFillColor(17, 17, 17);
    doc.rect(0, 0, pageWidth, 90, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Your Personalized Career Guide", margin, 45);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(220, 220, 220);
    doc.text(
      `${profile.course} · Target ${profile.targetPackage} · Generated ${new Date().toLocaleDateString("en-IN")}`,
      margin,
      68,
    );

    y = 120;

    addHeading("Executive Summary");
    addParagraph(insight.executiveSummary);

    addDecisionBox(insight.verdict);

    addHeading("Why This Course Matters");
    addParagraph(insight.courseOverview);

    addHeading("University Comparison");
    addParagraph(insight.universityComparison);

    addHeading("Salary Progression");
    addSalaryChart(insight.salaryProgression);

    addHeading("Fee Breakdown & ROI");
    addParagraph(insight.feeBreakdown);

    addHeading("Skills to Add");
    addSkillChips(insight.skillsToAdd);

    addHeading("Scholarship Guidance");
    addParagraph(insight.scholarshipGuidance);

    addHeading("Your 90-Day Action Plan");
    addTimeline(insight.actionPlan);

    addHeading("Common Mistakes to Avoid");
    addParagraph(insight.commonMistakes);

    addHeading("Final Note");
    addParagraph(insight.closingNote);

    footer();

    doc.save(
      `career-guide-${profile.course.replace(/\s+/g, "-").toLowerCase()}.pdf`,
    );
  }

  return (
    <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">✨</span>
        <h3 className="text-lg font-bold text-gray-900">
          AI Personalized Guidance
        </h3>
      </div>

      {!hasFetched && !loading && (
        <div>
          <p className="text-gray-600 mb-4">
            Get a real, personalized career guide — course value, salary
            progression, fee breakdown, and a 90-day action plan — generated
            just for you and downloadable as a full report.
          </p>
          <button
            onClick={generateInsight}
            className="bg-black text-white font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            Get My AI Insight
          </button>
        </div>
      )}

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-red-100 rounded w-3/4" />
          <div className="h-4 bg-red-100 rounded w-full" />
          <div className="h-4 bg-red-100 rounded w-5/6" />
          <p className="text-sm text-gray-500 mt-2">
            Building your personalized guide...
          </p>
        </div>
      )}

      {error && (
        <div>
          <p className="text-red-600 text-sm mb-3">{error}</p>
          <button
            onClick={generateInsight}
            className="text-sm font-semibold text-red-600 underline"
          >
            Try again
          </button>
        </div>
      )}

      {insight && !loading && (
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
              The Verdict
            </h4>
            <p className="text-gray-800">{insight.verdict}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
              Why This Course Matters
            </h4>
            <p className="text-gray-800 text-sm">{insight.courseOverview}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
              University Comparison
            </h4>
            <p className="text-gray-800 text-sm">
              {insight.universityComparison}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              Salary Progression
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {insight.salaryProgression?.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-3 text-center"
                >
                  <p className="text-xs text-gray-500 font-medium">{s.year}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    {s.salary}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
              Fee Breakdown &amp; ROI
            </h4>
            <p className="text-gray-800 text-sm">{insight.feeBreakdown}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              Skills to Add
            </h4>
            <div className="flex flex-wrap gap-2">
              {insight.skillsToAdd.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white border border-red-200 text-red-700 text-sm font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
              Scholarship Guidance
            </h4>
            <p className="text-gray-800 text-sm">
              {insight.scholarshipGuidance}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              90-Day Action Plan
            </h4>
            <ol className="space-y-2">
              {insight.actionPlan?.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {a.period}
                    </p>
                    <p className="text-gray-600 text-sm">{a.actions}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={downloadGuide}
              className="bg-black text-white font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                />
              </svg>
              Download Full Guide (PDF)
            </button>
            <button
              onClick={generateInsight}
              className="text-sm font-semibold text-red-600 underline"
            >
              Regenerate insight
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
