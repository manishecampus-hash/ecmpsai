"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";

const courseList = ["DBA in Generative AI"];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Other",
];

function getExpectedPhoneLength(countryCode: string, dialCode: string): number {
  const nationalLengths: Record<string, number> = {
    in: 10, cn: 11, jp: 10, kr: 10, pk: 10,
    bd: 10, us: 10, ca: 10, gb: 10,
  };
  return dialCode.length + (nationalLengths[countryCode.toLowerCase()] ?? 7);
}

export function ApplicationModal({ trigger }: { trigger: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneMeta, setPhoneMeta] = useState({ countryCode: "in", dialCode: "91", requiredLength: 12 });
  const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", course: "", state: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.fullName.trim()) err.fullName = "Enter name";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) err.email = "Enter valid email";
    const digits = formData.mobile.replace(/\D/g, "");
    if (digits.length < phoneMeta.requiredLength)
      err.mobile = `Enter a valid ${phoneMeta.countryCode.toUpperCase()} number`;
    if (!formData.course) err.course = "Select a course";
    if (!formData.state) err.state = "Select a state";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const isFormValid = !!(
    formData.fullName.trim() &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    formData.mobile.replace(/\D/g, "").length >= phoneMeta.requiredLength &&
    formData.course &&
    formData.state
  );

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const number = formData.mobile.startsWith("91")
        ? formData.mobile.slice(2)
        : formData.mobile;

      console.log("Form submitted:", { ...formData, phoneStripped: number });

      // TODO: API call yahan aayega
      await new Promise((res) => setTimeout(res, 800));

      setOpen(false);
      router.push("/thank-you");
    } catch {
      alert("Something went wrong ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = "bg-white border border-gray-200 text-gray-900 h-11 w-full px-3 rounded-md focus:ring-2 focus:ring-gray-300";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[95vw] max-w-md bg-white border border-gray-200 rounded-2xl px-5 py-5 shadow-xl">
        <DialogHeader className="flex flex-col items-center text-center space-y-1.5 mb-1">
          <DialogTitle className="text-2xl font-extrabold text-gray-900">
            Apply Now
          </DialogTitle>
          <p className="text-sm text-gray-500">Enroll Today & Unlock New Opportunities</p>
          <div className="flex justify-center gap-3 text-emerald-600 text-xs font-semibold flex-wrap pt-1">
            <span>✔ EMI Available</span>
            <span>✔ 100% Placement Assistance</span>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          {/* Full Name */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Full Name</label>
            <Input
              placeholder="Enter name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={field}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
            <Input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={field}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Phone no.</label>
            <PhoneInput
              country={"in"}
              preferredCountries={["in"]}
              value={formData.mobile}
              onChange={(value: string, data: any) => {
                const countryCode = data.countryCode ?? "in";
                const dialCode = data.dialCode ?? "91";
                const required = getExpectedPhoneLength(countryCode, dialCode);
                const digits = value.replace(/\D/g, "");
                setFormData({ ...formData, mobile: digits.length > required ? digits.slice(0, required) : digits });
                setPhoneMeta({ countryCode, dialCode, requiredLength: required });
              }}
              autoFormat={phoneMeta.countryCode !== "in"}
              countryCodeEditable={false}
              inputProps={{ maxLength: phoneMeta.requiredLength + 4 }}
              containerClass="!w-full"
              inputClass="!w-full !h-11 !bg-white !text-gray-900 !border !border-gray-200 !pl-14 !rounded-md !text-sm"
              buttonClass="!bg-white !border !border-gray-200 !rounded-l-md"
              dropdownClass="!bg-white !text-gray-900 !border !border-gray-200"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Course */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Course</label>
            <Select value={formData.course} onValueChange={(v) => setFormData({ ...formData, course: v })}>
              <SelectTrigger className="h-11 bg-white border border-gray-200 text-gray-900 w-full px-3">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 text-gray-900">
                {courseList.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
          </div>

          {/* State */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">State</label>
            <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
              <SelectTrigger className="h-11 bg-white border border-gray-200 text-gray-900 w-full px-3">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 text-gray-900 max-h-60 overflow-y-auto">
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 mt-1 text-white font-bold rounded-xl"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>Apply Now <ArrowRight className="ml-2 w-4 h-4" /></>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}