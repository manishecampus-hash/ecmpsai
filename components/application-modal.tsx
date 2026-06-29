"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export function ApplicationModal({ trigger }: any) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
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
      // Call Microservice Proxy Endpoint (instead of direct /api/application)
      // This endpoint will handle forwarding to old project and CRM
      const res = await fetch("/api/form-submit", {
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

      const data = await res.json();

      if (res.ok && data.success) {
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[95vw] max-w-md bg-black border border-white/90 rounded-xl px-4 sm:px-6 py-4 sm:py-5">
        <DialogHeader className="flex flex-col items-center text-center space-y-2">
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Apply Now
          </DialogTitle>
          <p className="text-sm sm:text-base text-gray-400">
            Enroll Now & Lead the Future with AI
          </p>
          <div className="flex justify-center items-center gap-3 text-green-400 text-sm flex-wrap font-medium">
            <span>✔ EMI Available</span>
            <span>✔ 100% Placement Assistance</span>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
          {/* Full Name */}
          <div>
            <label className="text-xs text-gray-300">Full Name</label>
            <Input
              placeholder="Enter name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="bg-black border border-white/30 text-white h-11 w-full px-3"
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-gray-300">Email</label>
            <Input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-black border border-white/30 text-white h-11 w-full px-3"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-gray-300">Phone no.</label>
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
              inputClass="!w-full !h-11 !bg-black !text-white !border !border-white/30 !pl-14 !rounded-md"
              buttonClass="!bg-black !border !border-white/30 !rounded-l-md"
              dropdownClass="!bg-black !text-white !border !border-white/30"
            />
            {errors.mobile && (
              <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <label className="text-xs text-gray-300">Course</label>
            <Select
              value={formData.course}
              onValueChange={(v) => setFormData({ ...formData, course: v })}
            >
              <SelectTrigger className="!h-11 !min-h-0 !py-0 bg-black border border-white/30 text-white w-full px-3 flex items-center">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="bg-black border border-white/30 text-white">
                {courseList.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.course && (
              <p className="text-red-400 text-xs mt-1">{errors.course}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="text-xs text-gray-300">State</label>
            <Select
              value={formData.state}
              onValueChange={(v) => setFormData({ ...formData, state: v })}
            >
              <SelectTrigger className="!h-11 !min-h-[44px] bg-black border border-white/30 text-white w-full px-3 flex items-center">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-black border border-white/30 text-white max-h-60 overflow-y-auto">
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-400 text-xs mt-1">{errors.state}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 mt-2 text-white font-bold"
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
      </DialogContent>
    </Dialog>
  );
}
