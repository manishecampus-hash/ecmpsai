import { MapPin, Calendar, Award, Building, Users, Globe, BookOpen, GraduationCap, Clock, CheckCircle } from 'lucide-react';

interface BasicInfoProps {
    a: {
        name: string;
        location: string;
        established: string;
        ranking: string;
        students: string;
        type: string;
    };
    b: {
        name: string;
        location: string;
        established: string;
        ranking: string;
        students: string;
        type: string;
    };
}

export default function BasicInformation({ a, b }: BasicInfoProps) {
    // Basic details for side-by-side comparison
    const basicDetails = [
        { label: 'Location', icon: MapPin, valA: a.location, valB: b.location },
        { label: 'Founded', icon: Calendar, valA: a.established, valB: b.established },
        { label: 'Type', icon: Building, valA: a.type, valB: b.type },
        { label: 'Student Body', icon: Users, valA: a.students, valB: b.students },
        { label: 'World Ranking', icon: Award, valA: a.ranking, valB: b.ranking },
    ];

    // Sample courses data - you can make this dynamic based on props if needed
    const coursesA = [
        { name: 'Computer Science', degree: 'B.Sc / M.Sc', duration: '3-4 Years' },
        { name: 'Business Administration', degree: 'BBA / MBA', duration: '3-4 Years' },
        { name: 'Engineering', degree: 'B.E / M.E', duration: '4 Years' },
    ];

    const coursesB = [
        { name: 'Data Science', degree: 'B.Sc / M.Sc', duration: '3-4 Years' },
        { name: 'International Business', degree: 'BBA / MBA', duration: '3-4 Years' },
        { name: 'Artificial Intelligence', degree: 'B.E / M.E', duration: '4 Years' },
    ];

    return (
        <div className="space-y-8">
            {/* Basic Information Section */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-600 rounded-2xl text-white">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">University Overview</h2>
                        <p className="text-gray-500 text-sm">Quick facts for a side-by-side comparison</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {basicDetails.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-6 items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                            {/* Label Column */}
                            <div className="col-span-12 md:col-span-3 flex items-center gap-3 font-semibold text-gray-600">
                                <item.icon size={18} className="text-blue-500" />
                                {item.label}
                            </div>

                            {/* Value A */}
                            <div className="col-span-6 md:col-span-4 text-gray-700 font-medium">
                                {item.valA}
                            </div>

                            {/* Value B */}
                            <div className="col-span-6 md:col-span-4 text-gray-700 font-medium border-l border-gray-200 pl-6">
                                {item.valB}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Courses & Degrees Section */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-600 rounded-2xl text-white">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Popular Courses & Degrees</h2>
                        <p className="text-gray-500 text-sm">Top programs offered at each institution</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* University A Courses */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                            <h3 className="text-lg font-semibold text-gray-800">{a.name}</h3>
                        </div>
                        <div className="space-y-4">
                            {coursesA.map((course, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:shadow-sm transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <GraduationCap size={16} className="text-blue-500" />
                                                <h4 className="font-semibold text-gray-800">{course.name}</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Award size={14} />
                                                    {course.degree}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {course.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* University B Courses */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                            <h3 className="text-lg font-semibold text-gray-800">{b.name}</h3>
                        </div>
                        <div className="space-y-4">
                            {coursesB.map((course, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:shadow-sm transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <GraduationCap size={16} className="text-blue-500" />
                                                <h4 className="font-semibold text-gray-800">{course.name}</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Award size={14} />
                                                    {course.degree}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {course.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Recognition Section */}
            <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                        <Building size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Professional Recognition</h2>
                        <p className="text-gray-500 text-sm">Accreditations & professional standing</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-6 rounded-full bg-blue-500"></div>
                            <h3 className="font-semibold text-gray-800">{a.name}</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>Globally recognized degree programs</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>Industry-aligned curriculum</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>International student support</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-6 rounded-full bg-blue-500"></div>
                            <h3 className="font-semibold text-gray-800">{b.name}</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>Globally recognized degree programs</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>Industry-aligned curriculum</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>International student support</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}