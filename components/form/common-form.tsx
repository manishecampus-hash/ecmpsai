"use client";

import React, { useState } from "react";

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

// ── ApplicationForm ───────────────────────────────────────────────────────────

export function ApplicationForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: LeadData) => void;
  onBack?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col items-center text-center space-y-1.5 mb-3">
        <h2 className="text-1xl sm:text-2xl font-extrabold text-gray-900 leading-tight xl:2xl">
          Apply Now
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-2"
      >
        {/* Name */}
        <div>
          <Input
            placeholder="Enter name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({
                ...formData,
                fullName: e.target.value,
              })
            }
            className={`h-10 w-full px-3 rounded-xl border text-sm ${
              errors.fullName
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white focus:border-emerald-400"
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
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className={`h-10 w-full px-3 rounded-xl border text-sm ${
              errors.email
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white focus:border-emerald-400"
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
            <SelectTrigger className="!h-10 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
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
            className={`__phone-input-wrapper h-10 w-full flex items-center rounded-xl border overflow-hidden ${
              errors.mobile
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="__country-code px-3 bg-gray-50 text-gray-700 font-medium text-sm border-r border-gray-200 flex items-center min-w-fit h-full whitespace-nowrap">
              +{selectedCountry.dialCode}
            </div>

            <input
              type="tel"
              placeholder={
                selectedCountry.code === "in"
                  ? "98765 43210"
                  : "Enter phone number"
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
              className="__phone-input flex-1 px-3 h-full outline-none text-sm text-gray-900 bg-transparent placeholder-gray-400"
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
            <SelectTrigger className="!h-10 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              align="start"
              className="z-[10000] bg-white border border-gray-200 text-gray-900 max-h-48 w-[var(--radix-select-trigger-width)] overflow-y-auto"
            >
              {courseList.map((c) => (
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
              <SelectTrigger className="!h-10 !min-h-[40px] bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>

              <SelectContent
                side="bottom"
                align="start"
                className="z-[10000] bg-white border border-gray-200 text-gray-900 max-h-48 w-[var(--radix-select-trigger-width)] overflow-y-auto"
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

        {/* Submit */}
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-1 text-sm"
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