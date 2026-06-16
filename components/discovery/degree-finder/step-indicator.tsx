// "use client";
// import React from 'react';

// const STEPS = [
//   { id: 'step1', label: 'Degree' },
//   { id: 'step2', label: 'Course' },
//   { id: 'step3', label: 'Budget' },
//   { id: 'step4', label: 'Package' },
//   { id: 'step5', label: 'Qualification' },
//   { id: 'step6', label: 'Scholarship' },
//   { id: 'results', label: 'Results' },
// ];

// const STEP_INDEX: Record<string, number> = {
//   step1: 0, step2: 1, step3: 2, step4: 3,
//   step5: 4, step6: 5, results: 6, detail: 6,
// };

// export default function StepIndicator({ flowStep }: { flowStep: string }) {
//   const current = STEP_INDEX[flowStep] ?? 0;
//   if (flowStep === 'step1') return null;
//   return (
//     <div className="flex items-center justify-center gap-1 mb-10 flex-wrap">
//       {STEPS.map((step, idx) => (
//         <React.Fragment key={step.id}>
//           <div className="flex flex-col items-center gap-1">
//             <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
//               idx < current ? 'bg-emerald-500 text-white'
//               : idx === current ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
//               : 'bg-gray-100 text-gray-400'
//             }`}>
//               {idx < current ? '✓' : idx + 1}
//             </div>
//             <span className={`text-[10px] font-medium hidden sm:block ${idx <= current ? 'text-gray-700' : 'text-gray-400'}`}>
//               {step.label}
//             </span>
//           </div>
//           {idx < STEPS.length - 1 && (
//             <div className={`h-0.5 w-5 mx-0.5 mb-3 transition-colors ${idx < current ? 'bg-emerald-400' : 'bg-gray-200'}`} />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }