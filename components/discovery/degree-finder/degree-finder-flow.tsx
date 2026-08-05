// "use client";

// import React from "react";
// import {
//   degreeTypes,
//   quizQuestions,
//   useDegreeFinderFlow,
//   QuizAnswers,
// } from "@/data/degreefinder";
// import CourseDetails from "./../../discovery/degree-finder/course-details";
// import Step1Screen from "./step1-screen";
// import Step2Screen from "./step2_screen";
// import UniversityResultsList, {
//   mbaUniversities,
// } from "@/components/discovery/degree-finder/university-result-card";
// import { Sparkles } from "lucide-react";
// // import LeadCaptureScreen from "./lead-capture-screen";
// import { ApplicationForm } from "./application-form";

// // ── Step Indicator ────────────────────────────────────────────────────────────

// const STEPS = [
//   { id: "step1", label: "Degree" },
//   { id: "step2", label: "Course" },
//   { id: "step3", label: "Budget" },
//   { id: "step4", label: "Package" },
//   { id: "step5", label: "Qualification" },
//   { id: "step6", label: "Scholarship" },
// ];

// const STEP_INDEX: Record<string, number> = {
//   step1: 0,
//   step2: 1,
//   step3: 2,
//   step4: 3,
//   step5: 4,
//   step6: 5,
//   results: 5,
//   detail: 5,
// };

// function StepIndicator({
//   flowStep,
//   onStepClick,
// }: {
//   flowStep: string;
//   onStepClick?: (stepId: string) => void;
// }) {
//   const current = STEP_INDEX[flowStep] ?? 0;
//   if (flowStep === "step1") return null;

//   return (
//     <div className="flex items-center justify-center gap-1 mb-10 flex-wrap">
//       {STEPS.map((step, idx) => {
//         const isCompleted = idx < current;
//         const isActive = idx === current;
//         const isClickable = isCompleted && !!onStepClick;

//         return (
//           <React.Fragment key={step.id}>
//             <div className="flex flex-col items-center gap-1">
//               <button
//                 type="button"
//                 disabled={!isClickable}
//                 onClick={() => isClickable && onStepClick?.(step.id)}
//                 aria-label={`Go to ${step.label}`}
//                 className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
//                   isCompleted
//                     ? "bg-emerald-500 text-white hover:scale-110 cursor-pointer"
//                     : isActive
//                       ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
//                       : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 {isCompleted ? "✓" : idx + 1}
//               </button>
//               <span
//                 className={`text-[10px] font-medium hidden sm:block ${
//                   idx <= current ? "text-gray-700" : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             </div>
//             {idx < STEPS.length - 1 && (
//               <div
//                 className={`h-0.5 w-5 mx-0.5 mb-3 transition-colors ${
//                   idx < current ? "bg-emerald-400" : "bg-gray-200"
//                 }`}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// }

// // ── Answer pills ──────────────────────────────────────────────────────────────

// function AnswerPills({
//   answers,
//   selectedTypeData,
//   selectedCourseName,
//   upToStep,
// }: {
//   answers: QuizAnswers;
//   selectedTypeData?: { label: string; emoji: string };
//   selectedCourseName?: string;
//   upToStep: number;
// }) {
//   const pills: { emoji: string; label: string }[] = [];

//   if (upToStep > 0 && selectedTypeData)
//     pills.push({
//       emoji: selectedTypeData.emoji,
//       label: selectedTypeData.label,
//     });
//   if (upToStep > 1 && selectedCourseName)
//     pills.push({ emoji: "📚", label: selectedCourseName });

//   const quizStepOffset = 2;
//   quizQuestions.forEach((q, i) => {
//     if (upToStep > i + quizStepOffset && answers[q.id]) {
//       const opt = q.options.find((o) => o.id === answers[q.id]);
//       if (opt) pills.push({ emoji: opt.emoji, label: opt.label });
//     }
//   });

//   if (!pills.length) return null;

//   return (
//     <div className="flex flex-wrap gap-2 mb-6 justify-center">
//       {pills.map((p, i) => (
//         <span
//           key={i}
//           className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"
//         >
//           {p.emoji} {p.label}
//         </span>
//       ))}
//     </div>
//   );
// }

// // ── Steps 3–6: Quiz Question ──────────────────────────────────────────────────

// const QUIZ_STEP_MAP: Record<string, number> = {
//   step3: 0,
//   step4: 1,
//   step5: 2,
//   step6: 3,
// };

// function QuizStepScreen({
//   flowStep,
//   answers,
//   selectedTypeData,
//   selectedCourseName,
//   onAnswer,
//   onBack,
// }: {
//   flowStep: string;
//   answers: QuizAnswers;
//   selectedTypeData?: { label: string; emoji: string };
//   selectedCourseName?: string;
//   onAnswer: (qid: keyof QuizAnswers, optId: string) => void;
//   onBack: () => void;
// }) {
//   const questionIndex = QUIZ_STEP_MAP[flowStep] ?? 0;
//   const q = quizQuestions[questionIndex];
//   const stepIdx = STEP_INDEX[flowStep];
//   const isScholarshipStep = flowStep === "step6";

//   return (
//     <div>
//       <AnswerPills
//         answers={answers}
//         selectedTypeData={selectedTypeData}
//         selectedCourseName={selectedCourseName}
//         upToStep={stepIdx}
//       />

//       <div className="text-center mb-2">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">{q.question}</h2>
//         <p className="text-sm text-gray-400">{q.subtitle}</p>
//       </div>

//       <div
//         className={`mx-auto ${isScholarshipStep ? "max-w-md" : "max-w-2xl"}`}
//       >
//         {isScholarshipStep ? (
//           <div className="space-y-3">
//             {q.options.map((opt) => {
//               const active = answers[q.id] === opt.id;
//               return (
//                 <button
//                   key={opt.id}
//                   onClick={() => onAnswer(q.id, opt.id)}
//                   className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
//                     active
//                       ? "border-emerald-500 bg-emerald-50"
//                       : "border-gray-100 bg-white hover:border-emerald-200"
//                   }`}
//                 >
//                   <div
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                       active ? "border-emerald-500" : "border-gray-300"
//                     }`}
//                   >
//                     {active && (
//                       <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
//                     )}
//                   </div>
//                   <span
//                     className={`font-medium ${active ? "text-emerald-700" : "text-gray-700"}`}
//                   >
//                     {opt.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {q.options.map((opt) => {
//               const active = answers[q.id] === opt.id;
//               return (
//                 <button
//                   key={opt.id}
//                   onClick={() => onAnswer(q.id, opt.id)}
//                   className={`relative p-5 rounded-2xl border-2 text-center group transition-all ${
//                     active
//                       ? "border-emerald-500 bg-emerald-50"
//                       : "border-gray-100 bg-white hover:border-emerald-300"
//                   }`}
//                 >
//                   <div className="text-3xl mb-3">{opt.emoji}</div>
//                   <div
//                     className={`text-sm font-bold ${active ? "text-emerald-700" : "text-gray-700"}`}
//                   >
//                     {opt.label}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// <ApplicationForm
//   onSubmit={(data: LeadData) => {
//     // handle submitted lead
//   }}
//   onBack={() => {
//     // handle back navigation
//   }}
// />;
// // ── Results ───────────────────────────────────────────────────────────────────

// function ResultsScreen({
//   selectedTypeData,
//   filteredCourses,
//   answers,
//   selectedCourseName,
//   leadData,
//   onCourseSelect,
//   onBack,
//   onReset,
// }: {
//   selectedTypeData?: { label: string; emoji: string };
//   filteredCourses: any[];
//   answers: QuizAnswers;
//   selectedCourseName?: string;
//   leadData?: LeadData | null;
//   onCourseSelect: (id: string | null) => void;
//   onBack: () => void;
//   onReset: () => void;
// }) {
//   return (
//     <div>
//       <div className="text-center mb-10">
//         <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
//           Smart Degree Finder
//         </p>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           {selectedCourseName
//             ? `Universities for ${selectedCourseName}`
//             : `Programs for ${selectedTypeData?.label ?? "you"}`}
//         </h1>
//         <p className="text-sm text-gray-500">
//           Based on your answers · {mbaUniversities.length} match
//           {mbaUniversities.length !== 1 ? "es" : ""}
//         </p>
//       </div>

//       <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
//         <p className="text-sm font-semibold text-gray-800 mt-2 mb-3 px-3 py-2 inline-block  to-white  tracking-wide">
//           Hi,{" "}
//           <span className="text-violet-600 font-bold">{leadData?.name}</span> 👋
//         </p>
//         <div className="flex flex-wrap gap-2">
//           {selectedTypeData && (
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
//               {selectedTypeData.emoji} {selectedTypeData.label}
//             </span>
//           )}
//           {selectedCourseName && (
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
//               📚 {selectedCourseName}
//             </span>
//           )}
//           {quizQuestions.map((q) => {
//             const opt = q.options.find((o) => o.id === answers[q.id]);
//             return opt ? (
//               <span
//                 key={q.id}
//                 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100"
//               >
//                 {opt.emoji} {opt.label}
//               </span>
//             ) : null;
//           })}
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-5">
//         <p className="text-sm font-semibold text-gray-800">
//           {mbaUniversities.length} universities match your profile
//         </p>
//         <button
//           onClick={onReset}
//           className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           Start over
//         </button>
//       </div>

//       <UniversityResultsList
//         universities={mbaUniversities}
//         onSelect={(id) => onCourseSelect(id)}
//       />
//     </div>
//   );
// }

// // ── Root ──────────────────────────────────────────────────────────────────────

// export default function DegreeFinderFlow() {
//   const {
//     flowStep,
//     setFlowStep,
//     selectedType,
//     selectedCourse,
//     categoryCoursess,
//     filteredCourses,
//     selectedTypeData,
//     answers,
//     handleTypeSelect,
//     handleCourseSelect,
//     handleQuizAnswer,
//     handleResultCourseSelect,
//     handleBack,
//     handleReset,
//   } = useDegreeFinderFlow();

//   const [leadStep, setLeadStep] = React.useState<"quiz" | "results">("quiz");
//   const [leadData, setLeadData] = React.useState<LeadData | null>(null);

//   const selectedCourseObj = categoryCoursess.find(
//     (c) => c.id === selectedCourse,
//   );
//   const selectedCourseName = selectedCourseObj?.title;
//   const isQuizStep = ["step3", "step4", "step5", "step6"].includes(flowStep);

//   const showLeadGate = flowStep === "results" && leadStep === "quiz";

//   const effectiveFlowStep = showLeadGate ? "step6" : flowStep;
//   const currentIdx = STEP_INDEX[effectiveFlowStep] ?? 0;

//   const goToStep = (targetStepId: string) => {
//     const targetIdx = STEP_INDEX[targetStepId] ?? 0;
//     if (targetIdx >= currentIdx) return;

//     if (flowStep === "results") {
//       setLeadStep("quiz");
//     }
//     setFlowStep(targetStepId);
//   };

//   const handleLeadSubmit = (data: LeadData) => {
//     setLeadData(data);
//     setLeadStep("results");
//   };

//   const handleLeadBack = () => {
//     handleBack();
//     setLeadStep("quiz");
//   };

//   const handleResetFull = () => {
//     handleReset();
//     setLeadStep("quiz");
//     setLeadData(null);
//   };

//   return (
//     <div className="min-h-[auto] bg-gray-50 py-4 px-4">
//       <div className="max-w-5xl mx-auto">
//         <StepIndicator flowStep={effectiveFlowStep} onStepClick={goToStep} />

//         {flowStep === "step1" && (
//           <Step1Screen onTypeSelect={handleTypeSelect} />
//         )}

//         {flowStep === "step2" && (
//           <Step2Screen
//             courses={categoryCoursess}
//             selectedTypeData={selectedTypeData}
//             onCourseSelect={handleCourseSelect}
//             onBack={handleBack}
//           />
//         )}

//         {isQuizStep && (
//           <QuizStepScreen
//             flowStep={flowStep}
//             answers={answers}
//             selectedTypeData={selectedTypeData}
//             selectedCourseName={selectedCourseName}
//             onAnswer={handleQuizAnswer}
//             onBack={handleBack}
//           />
//         )}

//         {showLeadGate && (
//           <ApplicationForm
//             onSubmit={handleLeadSubmit}
//             onBack={handleLeadBack}
//           />
//         )}

//         {flowStep === "results" && leadStep === "results" && (
//           <ResultsScreen
//             selectedTypeData={selectedTypeData}
//             filteredCourses={filteredCourses}
//             answers={answers}
//             selectedCourseName={selectedCourseName}
//             leadData={leadData}
//             onCourseSelect={handleResultCourseSelect}
//             onBack={handleBack}
//             onReset={handleResetFull}
//           />
//         )}

//         {flowStep === "detail" && (
//           <CourseDetails
//             course={filteredCourses.find((c) => c.id === selectedCourse)}
//             onBack={() => handleResultCourseSelect(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import {
  degreeTypes,
  quizQuestions,
  useDegreeFinderFlow,
  QuizAnswers,
} from "@/data/degreefinder";
import CourseDetails from "./../../discovery/degree-finder/course-details";
import Step1Screen from "./step1-screen";
import Step2Screen from "./step2_screen";
import UniversityResultsList, {
  mbaUniversities,
  getUniversitiesByCourse,
} from "@/components/discovery/degree-finder/university-result-card";
import { Sparkles } from "lucide-react";
import { ApplicationForm } from "./application-form";

// ── Step Indicator ────────────────────────────────────────────────────────────

const STEPS = [
  { id: "step1", label: "Degree" },
  { id: "step2", label: "Course" },
  { id: "step3", label: "Budget" },
  { id: "step4", label: "Package" },
  { id: "step5", label: "Qualification" },
  { id: "step6", label: "Scholarship" },
];

const STEP_INDEX: Record<string, number> = {
  step1: 0,
  step2: 1,
  step3: 2,
  step4: 3,
  step5: 4,
  step6: 5,
  results: 5,
  detail: 5,
};

function StepIndicator({
  flowStep,
  onStepClick,
}: {
  flowStep: string;
  onStepClick?: (stepId: string) => void;
}) {
  const current = STEP_INDEX[flowStep] ?? 0;
  if (flowStep === "step1") return null;

  return (
    <div className="flex items-center justify-center gap-1 mb-10 flex-wrap">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < current;
        const isActive = idx === current;
        const isClickable = isCompleted && !!onStepClick;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(step.id)}
                aria-label={`Go to ${step.label}`}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                  isCompleted
                    ? "bg-emerald-500 text-white hover:scale-110 cursor-pointer"
                    : isActive
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isCompleted ? "✓" : idx + 1}
              </button>
              <span
                className={`text-[10px] font-medium hidden sm:block ${
                  idx <= current ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-5 mx-0.5 mb-3 transition-colors ${
                  idx < current ? "bg-emerald-400" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Answer pills ──────────────────────────────────────────────────────────────

function AnswerPills({
  answers,
  selectedTypeData,
  selectedCourseName,
  upToStep,
}: {
  answers: QuizAnswers;
  selectedTypeData?: { label: string; emoji: string };
  selectedCourseName?: string;
  upToStep: number;
}) {
  const pills: { emoji: string; label: string }[] = [];

  if (upToStep > 0 && selectedTypeData)
    pills.push({
      emoji: selectedTypeData.emoji,
      label: selectedTypeData.label,
    });
  if (upToStep > 1 && selectedCourseName)
    pills.push({ emoji: "📚", label: selectedCourseName });

  const quizStepOffset = 2;
  quizQuestions.forEach((q, i) => {
    if (upToStep > i + quizStepOffset && answers[q.id]) {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      if (opt) pills.push({ emoji: opt.emoji, label: opt.label });
    }
  });

  if (!pills.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {pills.map((p, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"
        >
          {p.emoji} {p.label}
        </span>
      ))}
    </div>
  );
}

// ── Steps 3–6: Quiz Question ──────────────────────────────────────────────────

const QUIZ_STEP_MAP: Record<string, number> = {
  step3: 0,
  step4: 1,
  step5: 2,
  step6: 3,
};

function QuizStepScreen({
  flowStep,
  answers,
  selectedTypeData,
  selectedCourseName,
  onAnswer,
  onBack,
}: {
  flowStep: string;
  answers: QuizAnswers;
  selectedTypeData?: { label: string; emoji: string };
  selectedCourseName?: string;
  onAnswer: (qid: keyof QuizAnswers, optId: string) => void;
  onBack: () => void;
}) {
  const questionIndex = QUIZ_STEP_MAP[flowStep] ?? 0;
  const q = quizQuestions[questionIndex];
  const stepIdx = STEP_INDEX[flowStep];
  const isScholarshipStep = flowStep === "step6";

  return (
    <div>
      <AnswerPills
        answers={answers}
        selectedTypeData={selectedTypeData}
        selectedCourseName={selectedCourseName}
        upToStep={stepIdx}
      />

      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{q.question}</h2>
        <p className="text-sm text-gray-400">{q.subtitle}</p>
      </div>

      <div
        className={`mx-auto ${isScholarshipStep ? "max-w-md" : "max-w-2xl"}`}
      >
        {isScholarshipStep ? (
          <div className="space-y-3">
            {q.options.map((opt) => {
              const active = answers[q.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onAnswer(q.id, opt.id)}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                    active
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-100 bg-white hover:border-emerald-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      active ? "border-emerald-500" : "border-gray-300"
                    }`}
                  >
                    {active && (
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${active ? "text-emerald-700" : "text-gray-700"}`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {q.options.map((opt) => {
              const active = answers[q.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onAnswer(q.id, opt.id)}
                  className={`relative p-5 rounded-2xl border-2 text-center group transition-all ${
                    active
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-100 bg-white hover:border-emerald-300"
                  }`}
                >
                  <div className="text-3xl mb-3">{opt.emoji}</div>
                  <div
                    className={`text-sm font-bold ${active ? "text-emerald-700" : "text-gray-700"}`}
                  >
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

interface UserProfile {
  category: string;
  course: string;
  budget: string;
  targetPackage: string;
  qualification: string;
  scholarship: string;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

function ResultsScreen({
  selectedTypeData,
  filteredCourses,
  answers,
  selectedCourseName,
  leadData,
  onCourseSelect,
  onBack,
  onReset,
}: {
  selectedTypeData?: { label: string; emoji: string };
  filteredCourses: any[];
  answers: QuizAnswers;
  selectedCourseName?: string;
  leadData?: LeadData | null;
  onCourseSelect: (id: string | null) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  // ✅ SAVE PROFILE TO LOCALSTORAGE WHENEVER THIS SCREEN RENDERS/UPDATES
  React.useEffect(() => {
    if (!selectedTypeData || !selectedCourseName || !leadData) return;

    // Build complete profile from user selections
    const profile: UserProfile = {
      category: selectedTypeData.label,
      course: selectedCourseName,
      budget:
        quizQuestions[0].options.find((o) => o.id === answers.budget)?.label ||
        "",
      targetPackage:
        quizQuestions[1].options.find((o) => o.id === answers.package)?.label ||
        "",
      qualification:
        quizQuestions[2].options.find((o) => o.id === answers.qualification)
          ?.label || "",
      scholarship:
        quizQuestions[3].options.find((o) => o.id === answers.scholarship)
          ?.label || "",
    };

    // Save to localStorage
    localStorage.setItem("degreeFinderProfile", JSON.stringify(profile));
    console.log("✅ Profile saved to localStorage:", profile);
  }, [selectedTypeData, selectedCourseName, answers, leadData]);

  // Get course-specific universities (agar function available ho to)
  const universitiesToShow = selectedCourseName
    ? getUniversitiesByCourse(selectedCourseName)
    : mbaUniversities;

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Smart Degree Finder
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedCourseName
            ? `Universities for ${selectedCourseName}`
            : `Programs for ${selectedTypeData?.label ?? "you"}`}
        </h1>
        <p className="text-sm text-gray-500">
          Based on your answers · {universitiesToShow.length} match
          {universitiesToShow.length !== 1 ? "es" : ""}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
        <p className="text-sm font-semibold text-gray-800 mt-2 mb-3 px-3 py-2 inline-block to-white tracking-wide">
          Hi,{" "}
          <span className="text-violet-600 font-bold">{leadData?.name}</span> 👋
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedTypeData && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
              {selectedTypeData.emoji} {selectedTypeData.label}
            </span>
          )}
          {selectedCourseName && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
              📚 {selectedCourseName}
            </span>
          )}
          {quizQuestions.map((q) => {
            const opt = q.options.find((o) => o.id === answers[q.id]);
            return opt ? (
              <span
                key={q.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100"
              >
                {opt.emoji} {opt.label}
              </span>
            ) : null;
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold text-gray-800">
          {universitiesToShow.length} universities match your profile
        </p>
        <button
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Start over
        </button>
      </div>

      <UniversityResultsList
        universities={universitiesToShow}
        onSelect={(id) => onCourseSelect(id)}
      />
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function DegreeFinderFlow() {
  const {
    flowStep,
    setFlowStep,
    selectedType,
    selectedCourse,
    categoryCoursess,
    filteredCourses,
    selectedTypeData,
    answers,
    handleTypeSelect,
    handleCourseSelect,
    handleQuizAnswer,
    handleResultCourseSelect,
    handleBack,
    handleReset,
  } = useDegreeFinderFlow();

  const [leadStep, setLeadStep] = React.useState<"quiz" | "results">("quiz");
  const [leadData, setLeadData] = React.useState<LeadData | null>(null);

  const selectedCourseObj = categoryCoursess.find(
    (c) => c.id === selectedCourse,
  );
  const selectedCourseName = selectedCourseObj?.title;
  const isQuizStep = ["step3", "step4", "step5", "step6"].includes(flowStep);

  const showLeadGate = flowStep === "results" && leadStep === "quiz";

  const effectiveFlowStep = showLeadGate ? "step6" : flowStep;
  const currentIdx = STEP_INDEX[effectiveFlowStep] ?? 0;

  const goToStep = (targetStepId: string) => {
    const targetIdx = STEP_INDEX[targetStepId] ?? 0;
    if (targetIdx >= currentIdx) return;

    if (flowStep === "results") {
      setLeadStep("quiz");
    }
    setFlowStep(targetStepId);
  };

  const handleLeadSubmit = (data: LeadData) => {
    setLeadData(data);
    setLeadStep("results");
  };

  const handleLeadBack = () => {
    handleBack();
    setLeadStep("quiz");
  };

  const handleResetFull = () => {
    handleReset();
    setLeadStep("quiz");
    setLeadData(null);
    localStorage.removeItem("degreeFinderProfile");
    localStorage.removeItem("degreeFinderUniversities");
  };

  return (
    <div className="min-h-[auto] bg-gray-50 py-4 px-4">
      <div className="max-w-5xl mx-auto">
        <StepIndicator flowStep={effectiveFlowStep} onStepClick={goToStep} />

        {flowStep === "step1" && (
          <Step1Screen onTypeSelect={handleTypeSelect} />
        )}

        {flowStep === "step2" && (
          <Step2Screen
            courses={categoryCoursess}
            selectedTypeData={selectedTypeData}
            onCourseSelect={handleCourseSelect}
            onBack={handleBack}
          />
        )}

        {isQuizStep && (
          <QuizStepScreen
            flowStep={flowStep}
            answers={answers}
            selectedTypeData={selectedTypeData}
            selectedCourseName={selectedCourseName}
            onAnswer={handleQuizAnswer}
            onBack={handleBack}
          />
        )}

        {showLeadGate && (
          <ApplicationForm
            onSubmit={handleLeadSubmit}
            onBack={handleLeadBack}
          />
        )}

        {flowStep === "results" && leadStep === "results" && (
          <ResultsScreen
            selectedTypeData={selectedTypeData}
            filteredCourses={filteredCourses}
            answers={answers}
            selectedCourseName={selectedCourseName}
            leadData={leadData}
            onCourseSelect={handleResultCourseSelect}
            onBack={handleBack}
            onReset={handleResetFull}
          />
        )}

        {flowStep === "detail" && (
          <CourseDetails
            course={filteredCourses.find((c) => c.id === selectedCourse)}
            onBack={() => handleResultCourseSelect(null)}
          />
        )}
      </div>
    </div>
  );
}
