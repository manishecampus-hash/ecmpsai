import { useState } from 'react';
import { degrees } from '@/data/degree-data';

export const degreeTypes = [
    { id: 'all', label: 'All Programs', emoji: '🎓' },
    { id: 'ug', label: 'UG Courses', emoji: '📖' },
    { id: 'pg', label: 'PG Courses', emoji: '📚' },
    { id: 'executive', label: 'Executive Education', emoji: '🏆' },
    { id: 'phd', label: 'Doctorate / Ph.D.', emoji: '📜' },
    { id: 'engineering', label: 'Engineering', emoji: '⚙️' },
    { id: 'gen-ai', label: 'Gen AI / Agentic AI', emoji: '🤖' },
    { id: 'skill', label: 'Skilling & Certificate', emoji: '🛠️' },
];

export const idOverrideMap: Record<string, string[]> = {
    all: degrees.map(d => d.id),

    // ── UG: 5 programs ────────────────────────────────────────────────────────
    ug: ['ba', 'b.com', 'bba', 'bca', 'bsc'],

    // ── PG: 7 programs ────────────────────────────────────────────────────────
    pg: ['ma', 'mcom', 'mba', 'mca', 'msc', 'msc-ds', 'pgdm'],

    // ── Executive: 6 programs ─────────────────────────────────────────────────
    executive: [
        'exec-jindal-mba',          // 1 Year MBA – O.P. Jindal
        'exec-jindal-msc',          // 1 Year M.Sc – O.P. Jindal
        'exec-liverpool-mba',       // 1.5 Year MBA – Liverpool Business School
        'exec-golden-gate-mba',     // 1 Year MBA – Golden Gate University
        'exec-edgewood-mba',        // 1 Year MBA – Edgewood University
        'exec-jindal-mba-law',      // 1 Year MBA in Business & Law – O.P. Jindal
    ],

    // ── PhD: 8 programs ───────────────────────────────────────────────────────
    phd: [
        'phd-birchwood',            // Birchwood University
        'phd-eimt',                 // EIMT
        'phd-ssbm',                 // Swiss School of Business and Management
        'phd-esgci',                // Ecole de Commerce International (ESGCI)
        'phd-rushford',             // Rushford Business School
        'phd-edgewood',             // Edgewood University
        'phd-golden-gate',          // Golden Gate University
        'phd-lsmt',                 // LSMT University
    ],

    // ── Gen AI: 3 programs ────────────────────────────────────────────────────
    'gen-ai': ['cert-genai', 'mca', 'msc-ds'],

    // ── Engineering: 3 programs ───────────────────────────────────────────────
    engineering: ['btech', 'be', 'mtech'],

    // ── Skilling & Certificate: 3 programs ───────────────────────────────────
    skill: ['cert-genai', 'bca', 'bba'],
};

// ── Quiz questions (budget → salary → qualification → scholarship) ────────────

export interface QuizOption {
    id: string;
    label: string;
    emoji: string;
    min?: number;
    max?: number;
}

export interface QuizQuestion {
    id: keyof QuizAnswers;
    question: string;
    subtitle: string;
    options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 'budget',
        question: 'What is your budget for the program?',
        subtitle: 'Total tuition fees for the full course duration',
        options: [
            { id: 'under-50k', label: 'Under ₹50,000', emoji: '', min: 0, max: 50000 },
            { id: '50k-1l', label: '₹50K – ₹1 Lakh', emoji: '', min: 50000, max: 100000 },
            { id: '1l-3l', label: '₹1L – ₹3 Lakhs', emoji: '', min: 100000, max: 300000 },
            { id: '3l-5l', label: '₹3L – ₹5 Lakhs', emoji: '', min: 300000, max: 500000 },
            { id: 'above-5l', label: 'Above ₹5 Lakhs', emoji: '', min: 500000, max: Infinity },
        ],
    },
    {
        id: 'salary',
        question: 'What salary package are you aiming for?',
        subtitle: 'Expected annual CTC after completing the program',
        options: [
            { id: 'under-3l', label: 'Under ₹3 LPA', emoji: '📊', min: 0, max: 300000 },
            { id: '3l-6l', label: '₹3 – ₹6 LPA', emoji: '📈', min: 300000, max: 600000 },
            { id: '6l-10l', label: '₹6 – ₹10 LPA', emoji: '🚀', min: 600000, max: 1000000 },
            { id: '10l-20l', label: '₹10 – ₹20 LPA', emoji: '🌟', min: 1000000, max: 2000000 },
            { id: 'above-20l', label: 'Above ₹20 LPA', emoji: '🏆', min: 2000000, max: Infinity },
        ],
    },
    {
        id: 'qualification',
        question: 'What is your highest qualification?',
        subtitle: "We'll show programs you're eligible for",
        options: [
            { id: '10th', label: '10th Pass', emoji: '📝' },
            { id: '12th', label: '12th Pass', emoji: '📋' },
            { id: 'diploma', label: 'Diploma', emoji: '📄' },
            { id: 'ug', label: "Bachelor's Degree", emoji: '🎓' },
            { id: 'pg', label: "Master's Degree", emoji: '📘' },
            { id: 'phd', label: 'Ph.D. / Doctorate', emoji: '🔬' },
        ],
    },
    {
        id: 'scholarship',
        question: 'Are you looking for a scholarship?',
        subtitle: "We'll highlight programs with matching financial aid",
        options: [
            { id: 'none', label: 'Not needed', emoji: '⏭️' },
            { id: 'any', label: 'Any scholarship', emoji: '🏅' },
            { id: 'merit', label: 'Merit-based', emoji: '🥇' },
            { id: 'need', label: 'Need-based', emoji: '🤝' },
            { id: 'women', label: 'Women Empowerment', emoji: '👩‍🎓' },
            { id: 'sc-st', label: 'SC / ST / OBC', emoji: '🌐' },
        ],
    },
];

// ── Answers & filtering ───────────────────────────────────────────────────────

export interface QuizAnswers {
    budget: string | null;
    salary: string | null;
    qualification: string | null;
    scholarship: string | null;
}

const QUAL_ORDER = ['10th', '12th', 'diploma', 'ug', 'pg', 'phd'];

export function applyQuizFilters(
    courses: typeof degrees,
    answers: QuizAnswers,
): typeof degrees {
    return courses.filter(course => {
        // Budget: course fee range must overlap selected bucket
        if (answers.budget) {
            const opt = quizQuestions[0].options.find(o => o.id === answers.budget);
            if (opt && course.feeMin !== undefined && course.feeMax !== undefined) {
                if (!(course.feeMin <= (opt.max ?? Infinity) && course.feeMax >= (opt.min ?? 0)))
                    return false;
            }
        }

        // Salary: course avg salary range must overlap selected bucket
        if (answers.salary) {
            const opt = quizQuestions[1].options.find(o => o.id === answers.salary);
            if (opt && course.avgSalaryMin !== undefined && course.avgSalaryMax !== undefined) {
                if (!(course.avgSalaryMin <= (opt.max ?? Infinity) && course.avgSalaryMax >= (opt.min ?? 0)))
                    return false;
            }
        }

        // Eligibility: user qualification must meet course minimum
        if (answers.qualification && course.minQualification) {
            const userLevel = QUAL_ORDER.indexOf(answers.qualification);
            const reqLevel = QUAL_ORDER.indexOf(course.minQualification);
            if (userLevel < reqLevel) return false;
        }

        // Scholarship: must have the specific type (ignore 'none' and 'any')
        if (answers.scholarship && answers.scholarship !== 'none' && answers.scholarship !== 'any') {
            if (course.scholarships && !course.scholarships.includes(answers.scholarship))
                return false;
        }

        return true;
    });
}

// ── Flow steps ────────────────────────────────────────────────────────────────
// step1 (degree category) → step2 (course select) → step3 (budget) →
// step4 (salary) → step5 (qualification) → step6 (scholarship) → results → detail

export type FlowStep =
    | 'step1'   // degree category
    | 'step2'   // course select
    | 'step3'   // budget
    | 'step4'   // salary
    | 'step5'   // qualification
    | 'step6'   // scholarship
    | 'results'
    | 'detail';

interface UseDegreeFinderFlowReturn {
    flowStep: FlowStep;
    stepNumber: number;
    selectedType: string | null;
    selectedCourse: string | null;
    /** courses in selected category (unfiltered) */
    categoryCoursess: typeof degrees;
    /** courses after quiz filters applied */
    filteredCourses: typeof degrees;
    selectedTypeData: typeof degreeTypes[0] | undefined;
    answers: QuizAnswers;
    handleTypeSelect: (id: string) => void;
    handleCourseSelect: (id: string) => void;
    handleQuizAnswer: (qid: keyof QuizAnswers, optId: string) => void;
    handleResultCourseSelect: (id: string | null) => void;
    handleBack: () => void;
    handleReset: () => void;
}

export function useDegreeFinderFlow(): UseDegreeFinderFlowReturn {
    const [flowStep, setFlowStep] = useState<FlowStep>('step1');
    const [stepNumber, setStepNumber] = useState(0);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [answers, setAnswers] = useState<QuizAnswers>({
        budget: null, salary: null, qualification: null, scholarship: null,
    });

    const categoryCoursess = selectedType
        ? degrees.filter(d => (idOverrideMap[selectedType] ?? []).includes(d.id))
        : [];

    // For results we filter from just the single selected course (or category if none)
    const baseForFilter = selectedCourse
        ? degrees.filter(d => d.id === selectedCourse)
        : categoryCoursess;

    const filteredCourses = applyQuizFilters(baseForFilter, answers);
    const selectedTypeData = degreeTypes.find(d => d.id === selectedType);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleTypeSelect = (id: string) => {
        setSelectedType(id);
        setSelectedCourse(null);
        setAnswers({ budget: null, salary: null, qualification: null, scholarship: null });
        setStepNumber(1);
        setFlowStep('step2');
    };

    /** Called from step2 course grid */
    const handleCourseSelect = (id: string) => {
        setSelectedCourse(id);
        setStepNumber(2);
        setFlowStep('step3');
    };

    const handleQuizAnswer = (qid: keyof QuizAnswers, optId: string) => {
        setAnswers(prev => ({ ...prev, [qid]: optId }));

        const next: Record<FlowStep, FlowStep> = {
            step3: 'step4',
            step4: 'step5',
            step5: 'step6',
            step6: 'results',
            // unused but needed for type completeness
            step1: 'step2',
            step2: 'step3',
            results: 'detail',
            detail: 'detail',
        };
        setFlowStep(next[flowStep]);
        if (flowStep === 'step3') setStepNumber(3);
        else if (flowStep === 'step4') setStepNumber(4);
        else if (flowStep === 'step5') setStepNumber(5);
    };

    /** Called from results grid to open detail */
    const handleResultCourseSelect = (id: string | null) => {
        setSelectedCourse(id ?? selectedCourse);
        setFlowStep(id ? 'detail' : 'results');
    };

    const handleBack = () => {
        const map: Partial<Record<FlowStep, { step: FlowStep; num: number }>> = {
            detail: { step: 'results', num: 6 },
            results: { step: 'step6', num: 5 },
            step6: { step: 'step5', num: 4 },
            step5: { step: 'step4', num: 3 },
            step4: { step: 'step3', num: 2 },
            step3: { step: 'step2', num: 1 },
            step2: { step: 'step1', num: 0 },
        };
        const target = map[flowStep];
        if (target) {
            setFlowStep(target.step);
            setStepNumber(target.num);
            if (flowStep === 'step2') setSelectedType(null);
        }
    };

    const handleReset = () => {
        setFlowStep('step1');
        setStepNumber(0);
        setSelectedType(null);
        setSelectedCourse(null);
        setAnswers({ budget: null, salary: null, qualification: null, scholarship: null });
    };

    return {
        flowStep, stepNumber, selectedType, selectedCourse,
        categoryCoursess, filteredCourses, selectedTypeData, answers,
        handleTypeSelect, handleCourseSelect, handleQuizAnswer,
        handleResultCourseSelect, handleBack, handleReset,
    };
}