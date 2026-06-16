import { BookOpen, GraduationCap, Award } from 'lucide-react';

interface AcademicProps {
    a: { name: string; courses: string[]; affiliations: string[] };
    b: { name: string; courses: string[]; affiliations: string[] };
}

export default function AcademicSection({ a, b }: AcademicProps) {
    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
                    <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Academic Excellence</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* University A Details */}
                <div className="space-y-6">
                    <h3 className="font-bold text-indigo-600 border-b pb-2">{a.name}</h3>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-1">
                            <GraduationCap size={16} /> Popular Courses
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {a.courses.map((course) => (
                                <span key={course} className="text-xs bg-gray-100 px-3 py-1 rounded-full">{course}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-1">
                            <Award size={16} /> Affiliations
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">{a.affiliations.join(', ')}</p>
                    </div>
                </div>

                {/* University B Details */}
                <div className="space-y-6 md:border-l md:pl-8">
                    <h3 className="font-bold text-emerald-600 border-b pb-2">{b.name}</h3>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-1">
                            <GraduationCap size={16} /> Popular Courses
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {b.courses.map((course) => (
                                <span key={course} className="text-xs bg-gray-100 px-3 py-1 rounded-full">{course}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-1">
                            <Award size={16} /> Affiliations
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">{b.affiliations.join(', ')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}