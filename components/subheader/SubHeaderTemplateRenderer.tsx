"use client";

import React from "react";
import SubjectSyllabus from "@/components/online-mba/subject-syllabus/subject-syllabus";
import SubEligibilityDuration from "@/components/online-mba/eligibility-duration/eligibility-duration";
import SubProgramFees from "@/components/online-mba/program-fees/sub-program-fees";
import MbaAdmissionProcedure from "@/components/online-mba/admission-procedure/admission-procedure";
import TopSpecializations from "@/components/online-mba/top-specializations/top-specializations";
import EducationLoans from "@/components/online-mba/education-loans/education-loans";
import WorthIt from "@/components/online-mba/worth-it/worth-it";
import CareerScope from "@/components/online-mba/career-scope/career-scope";
import Coupons from "@/components/online-mba/coupons/coupons";

export interface SubHeaderData {
  id: string;
  title: string;
  url: string;
  urlType: "relative" | "anchor";
  template: string;
  content?: string;
  templateData?: Record<string, any>;
  faqs?: Array<{ id: string; question: string; answer: string }>;
}

export interface SubHeaderTemplateRendererProps {
  subHeader: SubHeaderData;
  course?: any;
}

export default function SubHeaderTemplateRenderer({ subHeader }: SubHeaderTemplateRendererProps) {
  const { template, templateData, title, content } = subHeader;

  switch (template) {
    case "syllabus":
      return <SubjectSyllabus data={templateData} title={title} />;

    case "eligibility":
      return <SubEligibilityDuration data={templateData} title={title} />;

    case "program_fees":
      return <SubProgramFees data={templateData} title={title} />;

    case "procedure":
      return <MbaAdmissionProcedure data={templateData} title={title} />;

    case "top_specializations":
      return <TopSpecializations data={templateData} title={title} />;

    case "education_loan":
      return <EducationLoans data={templateData} title={title} />;

    case "worth_it":
      return <WorthIt data={templateData} title={title} />;

    case "career_scope":
      return <CareerScope data={templateData} title={title} />;

    case "coupons":
      return <Coupons data={templateData} title={title} />;

    case "custom":
    default:
      return (
        <section className="font-sans relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              {title}
            </h1>
          </div>
          {content ? (
            <div
              className="prose prose-slate max-w-none leading-relaxed text-slate-700 sm:text-base"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center text-slate-500 text-sm italic">
              No content published for this section yet.
            </div>
          )}
        </section>
      );
  }
}
