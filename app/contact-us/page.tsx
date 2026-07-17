"use client";

import CTA from "@/components/contact/cta";
import OurOffices from "@/components/contact/OurOffices";
import ScrollBallEffect from "@/components/contact/scroll-ball-effect";
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

  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAgreed(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the terms & conditions before submitting.");
      return;
    }

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
        setAgreed(false);
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
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Eyebrow badge, matches homepage "TRENDING COURSES" pill */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide bg-red-50 text-red-600 px-4 py-1.5 rounded-full">
            <ChatIcon /> Get In Touch
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-3 leading-tight tracking-tight text-gray-950">
          Talk it through <span className="text-red-600">with us.</span>
        </h1>
        <p className="text-sm text-gray-400 text-center mb-12">
          Big decisions need clarity — no spam, no pressure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 min-h-[400px]">
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
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-bold bg-black/85 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
              <PinIcon /> eCampus HQ
            </span>
          </div>

          {/* Enquiry Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-950 mb-1">
              Send us an enquiry
            </h2>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Our counsellors will get back to you within 24 hours — no spam, no
              pressure.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full">
                <DiscountIcon /> 15% online discount
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-gray-100 text-gray-900 px-3 py-1 rounded-full">
                <ShieldIcon /> Lowest price promise
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-semibold">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-semibold">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-semibold">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-semibold">
                    Select course
                  </label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
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
                  <label className="text-xs text-gray-500 font-semibold">
                    State
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
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
                  <label className="text-xs text-gray-500 font-semibold">
                    Coupon code (optional)
                  </label>
                  <input
                    type="text"
                    name="coupon"
                    placeholder="Have a code?"
                    value={form.coupon}
                    onChange={handleChange}
                    className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>
              </div>

              {/* Assurance strip */}
              <div className="flex items-start gap-2 bg-red-50 rounded-xl px-3 py-2.5 mb-4">
                <input
                  type="checkbox"
                  id="agree-terms"
                  name="agree"
                  checked={agreed}
                  onChange={handleAgreeChange}
                  required
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-red-600 focus:ring-2 focus:ring-red-100 accent-red-600"
                />
                <label
                  htmlFor="agree-terms"
                  className="text-xs text-red-700 leading-relaxed"
                >
                  eCampus assured — get a 100% full refund on cancellation.{" "}
                  <a href="#" className="font-bold underline">
                    Know more →
                  </a>
                </label>
              </div>

              <div className="flex justify-center mb-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <SendIcon /> Submit enquiry
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                <LockIcon /> Your personal information is secure with us.
              </p>
            </form>
          </div>
        </div>
      </div>
      <OurOffices />
      <ScrollBallEffect />
      <CTA />

      <Footer />
    </>
  );
};

const ChatIcon: React.FC = () => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const PinIcon: React.FC = () => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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
