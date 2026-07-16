"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LeadData {
  name: string;
  email: string;
  mobile: string;
}

// ── Shared Data ──────────────────────────────────────────────────────────────

const courseList = ["DBA in Generative AI"];

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

function getExpectedPhoneLength(countryCode: string, dialCode: string): number {
  const dialLen = dialCode.length;
  const nationalLengths: Record<string, number> = {
    in: 10,
    cn: 11,
    jp: 10,
    kr: 10,
    pk: 10,
    bd: 10,
    us: 10,
    ca: 10,
    gb: 10,
  };
  const nationalLen = nationalLengths[countryCode.toLowerCase()] ?? 7;
  return dialLen + nationalLen;
}

// ── ApplicationForm ───────────────────────────────────────────────────────────

export function ApplicationForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: LeadData) => void;
  onBack?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phoneMeta, setPhoneMeta] = useState({
    countryCode: "in",
    dialCode: "91",
    requiredLength: 12,
  });

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
    if (!formData.fullName.trim()) err.fullName = "Enter name";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) err.email = "Enter valid email";

    const digitsOnly = formData.mobile.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < phoneMeta.requiredLength) {
      err.mobile = `Enter a valid ${phoneMeta.countryCode.toUpperCase()} phone number`;
    }

    if (!formData.course) err.course = "Select a course";
    if (!formData.state) err.state = "Select a state";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const isPhoneValid = () => {
    const digitsOnly = formData.mobile.replace(/\D/g, "");
    return digitsOnly.length >= phoneMeta.requiredLength;
  };

  const isFormValid = !!(
    formData.fullName.trim() &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    isPhoneValid() &&
    formData.course &&
    formData.state
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.mobile,
          course: formData.course,
          state: formData.state,
        }),
      });

      let number = formData.mobile;
      let newNumber = number.startsWith("91") ? number.slice(2) : number;

      const leadFormData = new FormData();
      leadFormData.append("full_name", formData.fullName);
      leadFormData.append("email", formData.email);
      leadFormData.append("country_code", "+91");
      leadFormData.append("phone", newNumber);
      leadFormData.append("course", formData.course);
      leadFormData.append("state", formData.state);
      leadFormData.append("no_of_users", "0");
      leadFormData.append("source", "Gen AI LP");

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
        // ✅ Route push ki jagah parent ko batao — parent apna state khud manage karega
        onSubmit({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
        });
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
    <div className="w-full max-w-md mx-auto bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-6 sm:py-8 shadow-sm">
      <div className="flex flex-col items-center text-center space-y-2 mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
          Apply Now
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Enroll Now & Lead the Future with AI
        </p>
        <div className="flex justify-center items-center gap-3 text-emerald-600 text-sm flex-wrap font-medium">
          <span>✔ EMI Available</span>
          <span>✔ 100% Placement Assistance</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Full Name
          </label>
          <Input
            placeholder="Enter name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className={`h-11 w-full px-3 rounded-xl border text-sm ${
              errors.fullName
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white focus:border-emerald-400"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`h-11 w-full px-3 rounded-xl border text-sm ${
              errors.email
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white focus:border-emerald-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Phone no.
          </label>
          <PhoneInput
            country={"in"}
            preferredCountries={["in"]}
            value={formData.mobile}
            onChange={(value, data: any) => {
              const countryCode: string = data.countryCode ?? "in";
              const dialCode: string = data.dialCode ?? "91";
              const required = getExpectedPhoneLength(countryCode, dialCode);
              const digitsOnly = value.replace(/\D/g, "");
              const capped =
                digitsOnly.length > required
                  ? digitsOnly.slice(0, required)
                  : digitsOnly;

              setFormData({ ...formData, mobile: capped });
              setPhoneMeta({
                countryCode,
                dialCode,
                requiredLength: required,
              });
            }}
            disableFormatting={phoneMeta.countryCode === "in"}
            autoFormat={phoneMeta.countryCode !== "in"}
            countryCodeEditable={false}
            inputProps={{ maxLength: phoneMeta.requiredLength + 4 }}
            containerClass="!w-full"
            inputClass="!w-full !h-11 !bg-white !text-gray-900 !border !border-gray-200 !pl-14 !rounded-xl"
            buttonClass="!bg-white !border !border-gray-200 !rounded-l-xl"
            dropdownClass="!bg-white !text-gray-900 !border !border-gray-200"
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Course
          </label>
          <Select
            value={formData.course}
            onValueChange={(v) => setFormData({ ...formData, course: v })}
          >
            <SelectTrigger className="!h-11 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 text-gray-900">
              {courseList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.course && (
            <p className="text-red-500 text-xs mt-1">{errors.course}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            State
          </label>
          <Select
            value={formData.state}
            onValueChange={(v) => setFormData({ ...formData, state: v })}
          >
            <SelectTrigger className="!h-11 !min-h-[44px] bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 text-gray-900 max-h-60 overflow-y-auto">
              {indianStates.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-2"
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
    </div>
  );
}
