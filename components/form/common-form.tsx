"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2, ShieldCheck, Sparkles } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LeadData {
  name: string;
  email: string;
  mobile: string;
}

// ── Shared Data ──────────────────────────────────────────────────────────────

const courseList = [
  "BA",
  "BCOM",
  "BBA",
  "BCA",
  "BSC",
  "MA",
  "MCOM",
  "MBA",
  "MCA",
  "MSC",
  "BTech",
  "DBA",
  "HR & Analytics",
  "AI for Business Professionals",
  "Certificate in CTO & AI Leadership",
  "Certificate in Chief data & AI officer",
];

const OFFER_DURATION_SECONDS = 5 * 24 * 60 * 60;

// ── Countries ────────────────────────────────────────────────────────────────

const countryList = [
  { name: "India", code: "in", dialCode: "91", length: 10 },
  { name: "United States", code: "us", dialCode: "1", length: 10 },
  { name: "Canada", code: "ca", dialCode: "1", length: 10 },
  { name: "United Kingdom", code: "gb", dialCode: "44", length: 10 },
  { name: "Australia", code: "au", dialCode: "61", length: 9 },
  { name: "Germany", code: "de", dialCode: "49", length: 11 },
  { name: "France", code: "fr", dialCode: "33", length: 9 },
  { name: "Japan", code: "jp", dialCode: "81", length: 10 },
  { name: "China", code: "cn", dialCode: "86", length: 11 },
  { name: "Pakistan", code: "pk", dialCode: "92", length: 10 },
  { name: "Bangladesh", code: "bd", dialCode: "880", length: 10 },
  { name: "Sri Lanka", code: "lk", dialCode: "94", length: 9 },
  { name: "Singapore", code: "sg", dialCode: "65", length: 8 },
  { name: "Malaysia", code: "my", dialCode: "60", length: 9 },
  { name: "Thailand", code: "th", dialCode: "66", length: 9 },
  { name: "Indonesia", code: "id", dialCode: "62", length: 10 },
  { name: "Philippines", code: "ph", dialCode: "63", length: 10 },
];

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Other",
];

// ── UTM Helpers ─────────────────────────────────────────────────────────────

const getUtmParams = () => {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
    };
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const sourceFromUrl = params.get("utm_source");
    const mediumFromUrl = params.get("utm_medium");
    const campaignFromUrl =
      params.get("utm_campaign") || params.get("campaign_name");

    if (sourceFromUrl) sessionStorage.setItem("utm_source", sourceFromUrl);
    if (mediumFromUrl) sessionStorage.setItem("utm_medium", mediumFromUrl);
    if (campaignFromUrl) sessionStorage.setItem("utm_campaign", campaignFromUrl);

    return {
      utm_source:
        sourceFromUrl || sessionStorage.getItem("utm_source") || "",
      utm_medium:
        mediumFromUrl || sessionStorage.getItem("utm_medium") || "",
      utm_campaign:
        campaignFromUrl || sessionStorage.getItem("utm_campaign") || "",
    };
  } catch {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
    };
  }
};

// ── ApplicationForm ───────────────────────────────────────────────────────────

export function ApplicationForm({
  onSubmit,
  onBack,
  courses,
  coursePlaceholder = "Select Course",
}: {
  onSubmit?: (data: LeadData) => void;
  onBack?: () => void;
  /** Page-specific options for the course dropdown; defaults to the shared course list */
  courses?: string[];
  coursePlaceholder?: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerSecondsRemaining, setOfferSecondsRemaining] = useState(OFFER_DURATION_SECONDS);

  useEffect(() => {
    getUtmParams();
  }, []);

  useEffect(() => {
    const offerDeadline = Date.now() + OFFER_DURATION_SECONDS * 1000;
    const updateCountdown = () => {
      setOfferSecondsRemaining(
        Math.max(0, Math.ceil((offerDeadline - Date.now()) / 1000)),
      );
    };

    updateCountdown();
    const countdownInterval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(countdownInterval);
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(
    countryList.find((c) => c.code === "in")!,
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    course: "",
    state: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const err: any = {};

    if (!formData.fullName.trim()) {
      err.fullName = "Enter name";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      err.email = "Enter valid email";
    }

    const digitsOnly = formData.mobile.replace(/\D/g, "");

    if (selectedCountry.code === "in") {
      if (!digitsOnly || digitsOnly.length !== selectedCountry.length) {
        err.mobile = `Enter a valid ${selectedCountry.name} phone number`;
      }
    } else {
      if (!digitsOnly) {
        err.mobile = "Enter a valid phone number";
      }
    }

    if (!formData.course) {
      err.course = "Select a course";
    }

    if (!formData.state && selectedCountry.code === "in") {
      err.state = "Select a state";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const isPhoneValid = () => {
    const digitsOnly = formData.mobile.replace(/\D/g, "");

    if (selectedCountry.code === "in") {
      return digitsOnly.length === selectedCountry.length;
    }

    return digitsOnly.length > 0;
  };

  const isFormValid = !!(
    formData.fullName.trim() &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    isPhoneValid() &&
    formData.course &&
    formData.state
  );

  const offerExpired = offerSecondsRemaining === 0;
  const offerDays = Math.floor(offerSecondsRemaining / (24 * 60 * 60));
  const offerHours = Math.floor((offerSecondsRemaining % (24 * 60 * 60)) / 3600);
  const offerMinutes = Math.floor((offerSecondsRemaining % 3600) / 60);
  const offerSeconds = offerSecondsRemaining % 60;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { utm_source, utm_medium, utm_campaign } = getUtmParams();

      const res = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.mobile,
          course: formData.course,
          state: formData.state,
          utm_source,
          utm_medium,
          utm_campaign,
          campaign_name: utm_campaign,
        }),
      });

      let number = formData.mobile;
      let newNumber = number.startsWith("91")
        ? number.slice(2)
        : number;

      const leadFormData = new FormData();

      leadFormData.append("full_name", formData.fullName);
      leadFormData.append("email", formData.email);
      leadFormData.append("country_code", "+91");
      leadFormData.append("phone", newNumber);
      leadFormData.append("course", formData.course);
      leadFormData.append("state", formData.state);
      leadFormData.append("no_of_users", "0");
      leadFormData.append("source", "ECAMPUS NEW WB");
      leadFormData.append("campaign_name", utm_campaign);
      leadFormData.append("medium", utm_medium);
      leadFormData.append("utm_source", utm_source);

      const response = await fetch(
        "https://bls.ecampuscrm.com/api/form/leads",
        {
          method: "POST",
          body: leadFormData,
        },
      );

      const result = await response.json();

      console.log("Success:", result);

      const data = await res.json();

      if (res.ok && data.success) {
        if (onSubmit) {
          onSubmit({
            name: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
          });
        }
        router.push("/thank-you");
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-white via-white to-red-50 px-5 py-7 shadow-sm sm:px-8 sm:py-8">
      <div className="relative z-10 mb-5 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#ee2c3c]">
            Get ₹10,000* Scholarship
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ee2c3c] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm shadow-red-600/25">
            <ShieldCheck className="h-3.5 w-3.5" />
            Connect With An Expert
          </span>
        </div>
        <h2 className="mt-2 flex items-center justify-center gap-2 text-[30px] font-black leading-tight tracking-[-0.04em] text-gray-900 sm:text-[34px]">
          <span>
            Apply <span className="text-[#ee2c3c]">Now</span>
          </span>
          <Sparkles className="h-6 w-6 text-[#ee2c3c]" />
        </h2>
        <p className="mt-1.5 whitespace-nowrap text-[10px] text-gray-500 sm:text-xs">Share your details and we’ll help you with the next steps.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col gap-3.5"
      >
        {/* Name */}
        <div>
          <Input
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({
                ...formData,
                fullName: e.target.value,
              })
            }
            className={`h-11 w-full rounded-xl border px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-100 ${
              errors.fullName
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          />

          {errors.fullName && (
            <p className="text-red-500 text-xs mt-0.5">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            placeholder="Enter Full Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className={`h-11 w-full rounded-xl border px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-100 ${
              errors.email
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-0.5">
              {errors.email}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <Select
            value={selectedCountry.code}
            onValueChange={(code) => {
              const country = countryList.find(
                (c) => c.code === code,
              );

              if (country) {
                setSelectedCountry(country);

                setFormData({
                  ...formData,
                  mobile: "",
                });

                setErrors({
                  ...errors,
                  mobile: "",
                });
              }
            }}
          >
            <SelectTrigger className="!h-11 !min-h-0 !py-0 flex w-full items-center rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-100">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              align="start"
              className="z-[10000] bg-white border border-gray-200 text-gray-900 max-h-48 overflow-y-auto w-full"
            >
              {countryList.map((country) => (
                <SelectItem
                  key={country.code}
                  value={country.code}
                >
                  {country.name} (+{country.dialCode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile */}
        <div>
          <div
            className={`__phone-input-wrapper flex h-11 w-full items-center overflow-hidden rounded-xl border transition focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 ${
              errors.mobile
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="__country-code flex h-full min-w-fit items-center whitespace-nowrap border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700">
              +{selectedCountry.dialCode}
            </div>

            <input
              type="tel"
              placeholder={
                selectedCountry.code === "in"
                  ? "xxxxxxxxxx"
                  : "Enter Phone Number"
              }
              value={formData.mobile.replace(/\D/g, "")}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(
                  /\D/g,
                  "",
                );

                const capped =
                  selectedCountry.code === "in"
                    ? digitsOnly.slice(
                        0,
                        selectedCountry.length,
                      )
                    : digitsOnly;

                setFormData({
                  ...formData,
                  mobile: capped,
                });
              }}
              maxLength={
                selectedCountry.code === "in"
                  ? selectedCountry.length
                  : undefined
              }
              className="__phone-input h-full flex-1 rounded-none border-0 bg-transparent px-3 text-sm text-gray-900 shadow-none outline-none placeholder:text-gray-400 focus:border-0 focus:bg-transparent focus:shadow-none"
            />
          </div>

          {errors.mobile && (
            <p className="text-red-500 text-xs mt-0.5">
              {errors.mobile}
            </p>
          )}
        </div>

        {/* Course */}
        <div className="relative z-50">
          <Select
            value={formData.course}
            onValueChange={(v) =>
              setFormData({
                ...formData,
                course: v,
              })
            }
          >
            <SelectTrigger className="!h-11 !min-h-0 !py-0 flex w-full items-center rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-100">
              <SelectValue placeholder={coursePlaceholder} />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              align="start"
              className="z-[10000] max-h-48 w-[var(--radix-select-trigger-width)] overflow-y-auto border border-gray-200 bg-white text-gray-900"
            >
              {(courses?.length ? courses : courseList).map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.course && (
            <p className="text-red-500 text-xs mt-0.5">
              {errors.course}
            </p>
          )}
        </div>

        {/* State */}
        {selectedCountry.code === "in" && (
          <div className="relative z-40">
            <Select
              value={formData.state}
              onValueChange={(v) =>
                setFormData({
                  ...formData,
                  state: v,
                })
              }
            >
              <SelectTrigger className="!h-11 !min-h-0 flex w-full items-center rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-100">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>

              <SelectContent
                side="bottom"
                align="start"
                className="z-[10000] max-h-48 w-[var(--radix-select-trigger-width)] overflow-y-auto border border-gray-200 bg-white text-gray-900"
              >
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.state && (
              <p className="text-red-500 text-xs mt-0.5">
                {errors.state}
              </p>
            )}
          </div>
        )}

        <p className="pt-1 text-center text-xs font-medium text-gray-500">
          🔒 Your information is secure with us
        </p>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="mx-auto mt-1 h-11 w-3/4 max-w-sm rounded-xl bg-red-600 text-sm font-semibold text-white shadow-sm shadow-red-600/20 transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-200 disabled:text-white focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      <div
        role="timer"
        aria-live="off"
        className="relative z-10 mt-4 flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-center text-xs font-medium text-red-800 sm:text-sm"
      >
        {offerExpired ? (
          <span className="font-semibold text-red-700">Offer Expired</span>
        ) : (
          <>
            <span>Offer Expires In:</span>
            <span className="font-bold tabular-nums text-red-700">
              {String(offerDays).padStart(2, "0")}d&nbsp; : &nbsp;
              {String(offerHours).padStart(2, "0")}h&nbsp; : &nbsp;
              {String(offerMinutes).padStart(2, "0")}m&nbsp; : &nbsp;
              {String(offerSeconds).padStart(2, "0")}s
            </span>
          </>
        )}
      </div>
    </div>
  );
}
