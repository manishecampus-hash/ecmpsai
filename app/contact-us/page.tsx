"use client";

import CTA from "@/components/contact/cta";
import OurOffices from "@/components/contact/OurOffices";
import { Footer } from "@/components/layout/footer";
import React, { ChangeEvent, FormEvent, useState } from "react";

/* ── Types ── */
interface FormState {
  name: string;
  phone: string;
  email: string;
  course: string;
  state: string;
  coupon: string;
}

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEmail?: boolean;
}

/* ── Main Component ── */
const ContactUs: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    course: "",
    state: "",
    coupon: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // wire up your API call here
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <p className="text-sm text-gray-400 mb-1">
          Big decisions need clarity.
        </p>
        <h1 className="text-3xl font-bold mb-10 leading-snug">
          Talk it through with us.
        </h1>

        <OurOffices />

        {/* ── Map + Form ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 min-h-[360px]">
            <iframe
              title="eCampus HQ location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7006.989929442989!2d77.31512289999999!3d28.5849245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce458ccb0afa5%3A0x6f6a3dc21c831e29!2sSector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1781869959798!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-full block"
            />
          </div>

          {/* Enquiry Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Send us an enquiry
            </h2>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Our counsellors will get back to you within 24 hours — no spam, no
              pressure.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-800 px-3 py-1 rounded-full">
                <DiscountIcon /> 15% online discount
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-purple-50 text-purple-800 px-3 py-1 rounded-full">
                <ShieldIcon /> Lowest price promise
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">
                    Select course
                  </label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  >
                    <option value="">Choose a course</option>
                    <option value="mba">MBA</option>
                    <option value="bba">BBA</option>
                    <option value="mca">MCA</option>
                    <option value="bca">BCA</option>
                    <option value="mcom">M.Com</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">
                    State
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  >
                    <option value="">Select state</option>
                    <option value="up">Uttar Pradesh</option>
                    <option value="dl">Delhi</option>
                    <option value="mh">Maharashtra</option>
                    <option value="ka">Karnataka</option>
                    <option value="rj">Rajasthan</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">
                    Coupon code (optional)
                  </label>
                  <input
                    type="text"
                    name="coupon"
                    placeholder="Have a code?"
                    value={form.coupon}
                    onChange={handleChange}
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>

              {/* Assurance strip */}
              <div className="flex items-start gap-2 bg-blue-50 rounded-xl px-3 py-2.5 mb-3">
                <ShieldCheckIcon />
                <p className="text-xs text-blue-800 leading-relaxed">
                  eCampus assured — get a 100% full refund on cancellation.{" "}
                  <a href="#" className="font-semibold underline">
                    Know more →
                  </a>
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-black text-white text-sm font-semibold py-2.5 rounded-xl transition-colors mb-2"
              >
                <SendIcon /> Submit enquiry
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                <LockIcon /> Your personal information is secure with us.
              </p>
            </form>
          </div>
        </div>
      </div>

      <CTA />

      <Footer />
    </>
  );
};

/* ── Sub-components ── */
const ContactRow: React.FC<ContactRowProps> = ({
  icon,
  label,
  value,
  isEmail = false,
}) => (
  <div className="flex items-start gap-2 text-left mb-2.5 w-full">
    <span className="mt-0.5 shrink-0">{icon}</span>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
        {label}
      </p>
      {isEmail ? (
        <a
          href={`mailto:${value}`}
          className="text-xs text-blue-600 hover:underline leading-snug"
        >
          {value}
        </a>
      ) : (
        <p className="text-xs text-gray-700 leading-snug">{value}</p>
      )}
    </div>
  </div>
);

/* ── Inline SVG Icons ── */
const PhoneIcon: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#534AB7"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#993C1D"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const MapPinIcon: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0F6E56"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const WhatsAppIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#3B6D11"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const UserIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#185FA5"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const UserCheckIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#854F0B"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);
const BuildingIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#534AB7"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
  </svg>
);
const BranchIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0F6E56"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);
const GlobeIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#185FA5"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ClockIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const BriefcaseIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#534AB7"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const HeadsetIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0F6E56"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
  </svg>
);
const LinkedInIcon: React.FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon: React.FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const DiscountIcon: React.FC = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
const ShieldIcon: React.FC = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const ShieldCheckIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1D4ED8"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 mt-0.5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const SendIcon: React.FC = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const LockIcon: React.FC = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline mb-0.5 mr-1"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default ContactUs;
