import { Braces, Code2, Layers, PanelsTopLeft, Server } from "lucide-react";

const roleDetails: Record<string, { summary: string; skills: string[]; icon: typeof Code2 }> = {
  "Frontend Developer": {
    summary: "Build accessible, responsive interfaces for websites and digital products.",
    skills: ["React", "TypeScript", "CSS"],
    icon: PanelsTopLeft,
  },
  "Backend Developer": {
    summary: "Create APIs, data models, authentication, and reliable application services.",
    skills: ["Node.js", "APIs", "Databases"],
    icon: Server,
  },
  "Full Stack Developer": {
    summary: "Deliver features end to end, from browser interfaces to production APIs.",
    skills: ["React", "Node.js", "Cloud"],
    icon: Layers,
  },
  "Software Engineer": {
    summary: "Solve product problems with tested, maintainable software systems.",
    skills: ["System design", "Testing", "Git"],
    icon: Code2,
  },
  "React Developer": {
    summary: "Build reusable component systems and fast, polished React applications.",
    skills: ["React", "Next.js", "Components"],
    icon: Braces,
  },
};

export function CareerRoles({ roles }: { roles: readonly string[] }) {
  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-white pb-10 pt-6 sm:pb-12 sm:pt-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
            <Code2 className="h-3 w-3" /> Career paths
          </span>
          <h2 className="mt-4 whitespace-nowrap text-[clamp(12px,4.2vw,24px)] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Explore software developer roles
          </h2>
          <p className="mx-auto mt-3 max-w-none text-sm leading-6 text-slate-600 sm:text-base md:whitespace-nowrap">
            See where full stack skills can take you, and the tools you will use in each role.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {roles.map((role, index) => {
            const details = roleDetails[role] ?? {
              summary: "Apply software development skills to build and improve digital products.",
              skills: ["Programming", "Problem solving", "Teamwork"],
              icon: Code2,
            };
            const Icon = details.icon;

            return (
              <article
                key={role}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Role {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-0.5 text-base font-bold text-slate-900">{role}</h3>
                  </div>
                </div>
                <p className="mt-4 min-h-10 text-sm leading-5 text-slate-600">{details.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {details.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-red-500 to-orange-400 transition-transform duration-300 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
