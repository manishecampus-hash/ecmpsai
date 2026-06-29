"use client";

import CTA from "@/components/contact/cta";
import OurOffices from "@/components/contact/OurOffices";
import { Footer } from "@/components/layout/footer";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormState {
  name: string;
  phone: string;
  email: string;
  course: string;
  state: string;
  coupon: string;
}

const ContactUs: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    course: "",
    state: "",
    coupon: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.course,
          state: form.state,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Application submitted successfully! ✅");
        setForm({
          name: "",
          phone: "",
          email: "",
          course: "",
          state: "",
          coupon: "",
        });
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-400 mb-1">
          Big decisions need clarity.
        </p>
        <h1 className="text-3xl font-bold mb-10 leading-snug">
          Talk it through with us.
        </h1>

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
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-black text-white text-sm font-semibold py-2.5 rounded-xl transition-colors mb-2 disabled:opacity-50"
              >
                {isLoading ? (
                  "Submitting..."
                ) : (
                  <>
                    <SendIcon /> Submit enquiry
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                <LockIcon /> Your personal information is secure with us.
              </p>
            </form>
          </div>
        </div>
      </div>
      <OurOffices />
      <CTA />
      <Footer />
    </>
  );
};

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
