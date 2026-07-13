import {
  Headphones,
  Users,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  CreditCard,
  BookOpen,
  Handshake,
} from "lucide-react";

// Data structure remains clean and organized
const highlights = [
  {
    title: "Expert Counselling",
    description:
      "One-on-one academic counselling to help you choose the right DBA specialization and an AACSB-accredited university aligned with your leadership goals.",
    icon: Headphones,
  },
  {
    title: "Student Support",
    description:
      "Complete admission support including documentation assistance, application guidance, and easy EMI options for a smooth enrollment process.",
    icon: Users,
  },
  {
    title: "Trustworthy",
    description:
      "Honest, transparent, and reliable guidance delivered with professionalism and a strong student-first commitment throughout your doctoral journey.",
    icon: ShieldCheck,
  },
  {
    title: "Career Growth",
    description:
      "A research-driven learning approach focused on building executive expertise, strategic thinking, and long-term leadership advancement.",
    icon: TrendingUp,
  },
];

const perks = [
  { title: "Expert faculty", icon: GraduationCap },
  { title: "No Cost EMI", icon: CreditCard },
  { title: "LMS Access", icon: BookOpen },
];

export function KeyHighlights() {
  return (
    // Used consistent vertical padding like the Hero section
    <section
      style={{
        background:
          "radial-gradient(circle at top right, rgba(255, 59, 79, 0.12), transparent 35%), #05070d",
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full px-4 py-10 text-slate-100 sm:px-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side: Text and Perks */}
          <div>
            <div className="mx-auto text-center mb-8 border-b border-slate-100 pb-6 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Handshake className="h-3.5 w-3.5 text-red-500" />
                eCampus Advantage
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-white-400 tracking-tight sm:text-3xl md:text-4xl">
                Why Choose Online DBA Through{" "}
                <span className="text-red-500">eCampus</span>
              </h2>
            </div>

            <p className="mt-5 text-base leading-relaxed text-white sm:text-lg">
              eCampus delivers trusted academic assistance, helping executives
              make informed decisions when choosing an online DBA program.
            </p>

            {/* Perks list with consistent icon-text spacing */}
            <div className="mt-8 space-y-4">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="rounded-xl bg-red-50 p-2 text-red-600">
                    <perk.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-white-900">
                    {perk.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Grid Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                // Cards have the same border/shadow structure as the reference
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:border-red-100"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-black text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
