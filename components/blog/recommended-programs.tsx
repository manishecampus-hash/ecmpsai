import { Award, Clock3 } from "lucide-react";

type RecommendedProgram = {
    id: string;
    title: string;
    category: string;
    level: string;
    duration: string;
    specializations: string;
    imageGradient: string;
    href: string;
};

const recommendedPrograms: RecommendedProgram[] = [
    {
        id: "online-mba",
        title: "Online MBA Course",
        category: "Top Universities",
        level: "Master's Degree",
        duration: "2 Years",
        specializations: "90+ Specializations",
        imageGradient: "from-gray-700 via-gray-600 to-gray-500",
        href: "/degree/online-mba",
    },
    {
        id: "online-mca",
        title: "Online MCA Course",
        category: "Top Universities",
        level: "Master's Degree",
        duration: "2 Years",
        specializations: "10+ Specializations",
        imageGradient: "from-gray-800 via-gray-600 to-gray-400",
        href: "/degree/online-mca",
    },
    {
        id: "online-bca",
        title: "Online BCA Course",
        category: "Top Universities",
        level: "Bachelor's Degree",
        duration: "3 Years",
        specializations: "18+ Specializations",
        imageGradient: "from-gray-700 via-gray-500 to-gray-400",
        href: "/degree/online-bca",
    },
    {
        id: "online-bba",
        title: "Online BBA Course",
        category: "Top Universities",
        level: "Bachelor's Degree",
        duration: "3 Years",
        specializations: "10+ Specializations",
        imageGradient: "from-gray-800 via-gray-700 to-gray-500",
        href: "/degree/online-bba",
    },
];

export default function RecommendedPrograms({
    programs = recommendedPrograms,
}: {
    programs?: RecommendedProgram[];
}) {
    if (programs.length === 0) {
        return null;
    }

    return (
        <section className="bg-gray-100 py-16">
            <div className="mx-auto max-w-[1540px] px-6 lg:px-12">
                {/* Recommended programs heading */}
                <p className="mb-1 text-lg font-bold text-gray-500">
                    Top Resources
                </p>

                <h2 className="mb-12 text-xl font-bold text-gray-700">
                    Recommended Programs
                </h2>

                {/* Program cards grid */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {programs.map((program) => (
                        <article
                            key={program.id}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm"
                        >
                            <div
                                className={`h-40 bg-gradient-to-br ${program.imageGradient}`}
                            />

                            <div className="p-5">
                                <p className="mb-1 text-base font-bold text-gray-500">
                                    {program.category}
                                </p>

                                <h3 className="mb-4 text-lg font-bold text-gray-800">
                                    {program.title}
                                </h3>

                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
                                    {program.specializations}
                                </span>

                                <div className="my-8 border-t border-gray-100" />

                                <div className="mb-8 flex items-center justify-between text-base font-semibold text-gray-600">
                                    <span className="inline-flex items-center gap-2">
                                        <Award size={22} className="text-gray-500" />
                                        {program.level}
                                    </span>

                                    <span className="inline-flex items-center gap-2">
                                        <Clock3 size={22} className="text-gray-500" />
                                        {program.duration}
                                    </span>
                                </div>

                                <a
                                    href={program.href}
                                    className="block w-full rounded-xl bg-gray-800 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-700"
                                >
                                    View Program
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}