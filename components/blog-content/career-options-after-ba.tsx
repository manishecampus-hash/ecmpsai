import Image from "next/image";

export default function CareerOptionsAfterBaContent() {
    return (
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-blue-600">
            <p className="lead">
                Completing a Bachelor of Arts (BA) is just the beginning of your professional journey.
                In 2026, the opportunities are more diverse than ever. Let's deep dive into what you can do next.
            </p>

            <h2>1. Higher Education Pathways</h2>
            <p>If you enjoy academics, pursuing a Master's degree is the most natural step.</p>
            <ul>
                <li><strong>MA (Master of Arts):</strong> Specialize in your core subject like History, Sociology, or English.</li>
                <li><strong>MBA:</strong> A popular choice for those looking to shift into management, marketing, or HR.</li>
                <li><strong>B.Ed (Bachelor of Education):</strong> Mandatory if you aim for a career in teaching in schools.</li>
            </ul>

            <div className="my-10 p-8 bg-gray-50 rounded-2xl border">
                <h3 className="text-xl font-bold text-gray-900 mt-0">Why MBA after BA?</h3>
                <p>Many students think MBA is only for engineers. However, top B-schools in 2026 actively look for Humanities students for their unique perspective in consumer behavior and strategy.</p>
            </div>

            <h2>2. Government & Competitive Exams</h2>
            <p>A BA degree acts as the foundation for India's most prestigious competitive exams:</p>
            <ol>
                <li><strong>UPSC Civil Services:</strong> The dream of many, focusing on General Studies and Optional subjects.</li>
                <li><strong>SSC CGL:</strong> Perfect for those interested in central government administrative roles.</li>
                <li><strong>Banking (IBPS/SBI):</strong> A high-demand sector for stable careers with growth.</li>
            </ol>

            <h2 id="skills-required">3. Skills You Need to Build in 2026</h2>
            <p>Regardless of your chosen path, you must focus on:</p>
            <ul>
                <li><strong>Digital Literacy:</strong> Basic data analytics and AI tool proficiency.</li>
                <li><strong>Content Strategy:</strong> The ability to write and articulate ideas is highly valued.</li>
                <li><strong>Soft Skills:</strong> Negotiation and leadership are key to climbing the corporate ladder.</li>
            </ul>

            <p><em>Note: Always align your choice with your long-term vision rather than short-term gains.</em></p>
        </div>
    );
}