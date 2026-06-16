"use client";
import React from 'react';

export interface LeadData { name: string; email: string; mobile: string; }

export default function LeadCaptureScreen({ onSubmit, onBack }: {
    onSubmit: (data: LeadData) => void;
    onBack: () => void;
}) {
    const [form, setForm] = React.useState<LeadData>({ name: '', email: '', mobile: '' });
    const [errors, setErrors] = React.useState<Partial<LeadData>>({});

    const validate = () => {
        const e: Partial<LeadData> = {};
        if (!form.name.trim()) e.name = 'Name required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
        if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Valid 10-digit mobile required';
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        onSubmit(form);
    };

    const field = (id: keyof LeadData, label: string, placeholder: string, type = 'text') => (
        <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
            <input
                type={type} value={form[id]}
                onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); setErrors(err => ({ ...err, [id]: undefined })); }}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors[id] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white focus:border-emerald-400'}`}
            />
            {errors[id] && <p className="mt-1 text-xs text-red-500">{errors[id]}</p>}
        </div>
    );

    return (
        <div className="max-w-md mx-auto">
            <button onClick={onBack} className="mb-5 flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors">← Back</button>
            <div className="text-center mb-8">
                <div className="mb-4 text-4xl">🎓</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost there!</h2>
                <p className="text-sm text-gray-400">Enter your details to see your matched universities</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                {field('name', 'Full Name', 'Rahul Sharma')}
                {field('email', 'Email', 'rahul@example.com', 'email')}
                {field('mobile', 'Mobile Number', '9876543210', 'tel')}
                <button onClick={handleSubmit} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-2">
                    View My Results →
                </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">We'll send your personalized recommendations to your email</p>
        </div>
    );
}