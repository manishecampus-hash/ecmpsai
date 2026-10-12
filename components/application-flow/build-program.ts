import type { ApplicationFlowConfig } from "@/data/application-flows";
import type { ApplicationProgram } from "./types";

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// Combines the flow config with the university's API record into what the screens render.
export function buildApplicationProgram(slug: string, flow: ApplicationFlowConfig, university: any): ApplicationProgram {
  const details = university?.details ?? {};
  const firstSpecialization = details.specializations?.list?.[0];

  const eligibility: string[] = (details.eligibility?.criteriaGroups ?? [])
    .flatMap((g: any) => (Array.isArray(g?.points) ? g.points : []))
    .map(clean)
    .filter(Boolean);

  const documents = (details.processFlow?.steps ?? [])
    .map((s: any) => ({ title: clean(s?.title), description: clean(s?.description) || undefined }))
    .filter((s: { title: string }) => s.title);

  return {
    slug,
    universityName: clean(university?.name) || clean(details.banner?.heading),
    universityLogo: clean(details.banner?.icon) || clean(university?.logoUrl) || undefined,
    programName: flow.programName,
    image: flow.image || clean(details.banner?.image) || undefined,
    durationLabel: flow.durationLabel || clean(firstSpecialization?.duration) || undefined,
    startDate: flow.startDate,
    stages: flow.stages,
    payment: flow.payment,
    eligibility,
    documents,
  };
}
