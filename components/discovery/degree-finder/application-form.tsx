// // "use client";

// // import React, { useState } from "react";
// // import PhoneInput from "react-phone-input-2";
// // import "react-phone-input-2/lib/style.css";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { ArrowRight, Loader2 } from "lucide-react";

// // // ── Types ─────────────────────────────────────────────────────────────────────

// // export interface LeadData {
// //   name: string;
// //   email: string;
// //   mobile: string;
// // }

// // // ── Shared Data ──────────────────────────────────────────────────────────────

// // const courseList = ["DBA in Generative AI"];

// // const indianStates = [
// //   "Andhra Pradesh",
// //   "Arunachal Pradesh",
// //   "Assam",
// //   "Bihar",
// //   "Chhattisgarh",
// //   "Goa",
// //   "Gujarat",
// //   "Haryana",
// //   "Himachal Pradesh",
// //   "Jharkhand",
// //   "Karnataka",
// //   "Kerala",
// //   "Madhya Pradesh",
// //   "Maharashtra",
// //   "Manipur",
// //   "Meghalaya",
// //   "Mizoram",
// //   "Nagaland",
// //   "Odisha",
// //   "Punjab",
// //   "Rajasthan",
// //   "Sikkim",
// //   "Tamil Nadu",
// //   "Telangana",
// //   "Tripura",
// //   "Uttar Pradesh",
// //   "Uttarakhand",
// //   "West Bengal",
// //   "Delhi",
// //   "Other",
// // ];

// // function getExpectedPhoneLength(countryCode: string, dialCode: string): number {
// //   const dialLen = dialCode.length;
// //   const nationalLengths: Record<string, number> = {
// //     in: 10,
// //     cn: 11,
// //     jp: 10,
// //     kr: 10,
// //     pk: 10,
// //     bd: 10,
// //     us: 10,
// //     ca: 10,
// //     gb: 10,
// //   };
// //   const nationalLen = nationalLengths[countryCode.toLowerCase()] ?? 7;
// //   return dialLen + nationalLen;
// // }

// // // ── ApplicationForm ───────────────────────────────────────────────────────────

// // export function ApplicationForm({
// //   onSubmit,
// //   onBack,
// // }: {
// //   onSubmit: (data: LeadData) => void;
// //   onBack?: () => void;
// // }) {
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const [phoneMeta, setPhoneMeta] = useState({
// //     countryCode: "in",
// //     dialCode: "91",
// //     requiredLength: 12,
// //   });

// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     mobile: "",
// //     course: "",
// //     state: "",
// //   });

// //   const [errors, setErrors] = useState<any>({});

// //   const validate = () => {
// //     const err: any = {};
// //     if (!formData.fullName.trim()) err.fullName = "Enter name";
// //     if (!/^\S+@\S+\.\S+$/.test(formData.email)) err.email = "Enter valid email";

// //     const digitsOnly = formData.mobile.replace(/\D/g, "");
// //     if (!digitsOnly || digitsOnly.length < phoneMeta.requiredLength) {
// //       err.mobile = `Enter a valid ${phoneMeta.countryCode.toUpperCase()} phone number`;
// //     }

// //     if (!formData.course) err.course = "Select a course";
// //     if (!formData.state) err.state = "Select a state";

// //     setErrors(err);
// //     return Object.keys(err).length === 0;
// //   };

// //   const isPhoneValid = () => {
// //     const digitsOnly = formData.mobile.replace(/\D/g, "");
// //     return digitsOnly.length >= phoneMeta.requiredLength;
// //   };

// //   const isFormValid = !!(
// //     formData.fullName.trim() &&
// //     /^\S+@\S+\.\S+$/.test(formData.email) &&
// //     isPhoneValid() &&
// //     formData.course &&
// //     formData.state
// //   );

// //   const handleSubmit = async (e: any) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     setIsSubmitting(true);

// //     try {
// //       const res = await fetch("/api/application", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name: formData.fullName,
// //           email: formData.email,
// //           phone: formData.mobile,
// //           course: formData.course,
// //           state: formData.state,
// //         }),
// //       });

// //       let number = formData.mobile;
// //       let newNumber = number.startsWith("91") ? number.slice(2) : number;

// //       const leadFormData = new FormData();
// //       leadFormData.append("full_name", formData.fullName);
// //       leadFormData.append("email", formData.email);
// //       leadFormData.append("country_code", "+91");
// //       leadFormData.append("phone", newNumber);
// //       leadFormData.append("course", formData.course);
// //       leadFormData.append("state", formData.state);
// //       leadFormData.append("no_of_users", "0");
// //       leadFormData.append("source", "Gen AI LP");

// //       const response = await fetch(
// //         "https://bls.ecampuscrm.com/api/form/leads",
// //         {
// //           method: "POST",
// //           body: leadFormData,
// //         },
// //       );

// //       const result = await response.json();
// //       console.log("Success:", result);

// //       const data = await res.json();

// //       if (res.ok && data.success) {
// //         // ✅ Route push ki jagah parent ko batao — parent apna state khud manage karega
// //         onSubmit({
// //           name: formData.fullName,
// //           email: formData.email,
// //           mobile: formData.mobile,
// //         });
// //       } else {
// //         alert(data.message || "Something went wrong ❌");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert("Network error. Please try again ❌");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="w-full max-w-md mx-auto bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-6 sm:py-8 shadow-sm">
// //       <div className="flex flex-col items-center text-center space-y-2 mb-4">
// //         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
// //           Apply Now
// //         </h2>
// //       </div>

// //       <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
// //         <div>
// //           <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
// //             Full Name
// //           </label>
// //           <Input
// //             placeholder="Enter name"
// //             value={formData.fullName}
// //             onChange={(e) =>
// //               setFormData({ ...formData, fullName: e.target.value })
// //             }
// //             className={`h-11 w-full px-3 rounded-xl border text-sm ${
// //               errors.fullName
// //                 ? "border-red-300 bg-red-50"
// //                 : "border-gray-200 bg-white focus:border-emerald-400"
// //             }`}
// //           />
// //           {errors.fullName && (
// //             <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
// //             Email
// //           </label>
// //           <Input
// //             type="email"
// //             placeholder="Enter email"
// //             value={formData.email}
// //             onChange={(e) =>
// //               setFormData({ ...formData, email: e.target.value })
// //             }
// //             className={`h-11 w-full px-3 rounded-xl border text-sm ${
// //               errors.email
// //                 ? "border-red-300 bg-red-50"
// //                 : "border-gray-200 bg-white focus:border-emerald-400"
// //             }`}
// //           />
// //           {errors.email && (
// //             <p className="text-red-500 text-xs mt-1">{errors.email}</p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
// //             Phone no.
// //           </label>
// //           <PhoneInput
// //             country={"in"}
// //             preferredCountries={["in"]}
// //             value={formData.mobile}
// //             onChange={(value, data: any) => {
// //               const countryCode: string = data.countryCode ?? "in";
// //               const dialCode: string = data.dialCode ?? "91";
// //               const required = getExpectedPhoneLength(countryCode, dialCode);
// //               const digitsOnly = value.replace(/\D/g, "");
// //               const capped =
// //                 digitsOnly.length > required
// //                   ? digitsOnly.slice(0, required)
// //                   : digitsOnly;

// //               setFormData({ ...formData, mobile: capped });
// //               setPhoneMeta({
// //                 countryCode,
// //                 dialCode,
// //                 requiredLength: required,
// //               });
// //             }}
// //             disableFormatting={phoneMeta.countryCode === "in"}
// //             autoFormat={phoneMeta.countryCode !== "in"}
// //             countryCodeEditable={false}
// //             inputProps={{ maxLength: phoneMeta.requiredLength + 4 }}
// //             containerClass="!w-full"
// //             inputClass="!w-full !h-11 !bg-white !text-gray-900 !border !border-gray-200 !pl-14 !rounded-xl"
// //             buttonClass="!bg-white !border !border-gray-200 !rounded-l-xl"
// //             dropdownClass="!bg-white !text-gray-900 !border !border-gray-200"
// //           />
// //           {errors.mobile && (
// //             <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
// //             Course
// //           </label>
// //           <Select
// //             value={formData.course}
// //             onValueChange={(v) => setFormData({ ...formData, course: v })}
// //           >
// //             <SelectTrigger className="!h-11 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center">
// //               <SelectValue placeholder="Select Course" />
// //             </SelectTrigger>
// //             <SelectContent className="bg-white border border-gray-200 text-gray-900">
// //               {courseList.map((c) => (
// //                 <SelectItem key={c} value={c}>
// //                   {c}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //           {errors.course && (
// //             <p className="text-red-500 text-xs mt-1">{errors.course}</p>
// //           )}
// //         </div>

// //         <div>
// //           <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
// //             State
// //           </label>
// //           <Select
// //             value={formData.state}
// //             onValueChange={(v) => setFormData({ ...formData, state: v })}
// //           >
// //             <SelectTrigger className="!h-11 !min-h-[44px] bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center">
// //               <SelectValue placeholder="Select State" />
// //             </SelectTrigger>
// //             <SelectContent className="bg-white border border-gray-200 text-gray-900 max-h-60 overflow-y-auto">
// //               {indianStates.map((s) => (
// //                 <SelectItem key={s} value={s}>
// //                   {s}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //           {errors.state && (
// //             <p className="text-red-500 text-xs mt-1">{errors.state}</p>
// //           )}
// //         </div>

// //         <Button
// //           type="submit"
// //           disabled={!isFormValid || isSubmitting}
// //           className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-2"
// //         >
// //           {isSubmitting ? (
// //             <Loader2 className="animate-spin" />
// //           ) : (
// //             <>
// //               Apply Now
// //               <ArrowRight className="ml-2 w-4 h-4" />
// //             </>
// //           )}
// //         </Button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ArrowRight, Loader2 } from "lucide-react";

// // ── Types ─────────────────────────────────────────────────────────────────────

// export interface LeadData {
//   name: string;
//   email: string;
//   mobile: string;
// }

// // ── Shared Data ──────────────────────────────────────────────────────────────

// const courseList = ["DBA in Generative AI"];

// const indianStates = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
//   "Delhi",
//   "Other",
// ];

// function getExpectedPhoneLength(countryCode: string, dialCode: string): number {
//   const dialLen = dialCode.length;
//   const nationalLengths: Record<string, number> = {
//     in: 10,
//     cn: 11,
//     jp: 10,
//     kr: 10,
//     pk: 10,
//     bd: 10,
//     us: 10,
//     ca: 10,
//     gb: 10,
//   };
//   const nationalLen = nationalLengths[countryCode.toLowerCase()] ?? 7;
//   return dialLen + nationalLen;
// }

// // ── ApplicationForm ───────────────────────────────────────────────────────────

// export function ApplicationForm({
//   onSubmit,
//   onBack,
// }: {
//   onSubmit: (data: LeadData) => void;
//   onBack?: () => void;
// }) {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [phoneMeta, setPhoneMeta] = useState({
//     countryCode: "in",
//     dialCode: "91",
//     requiredLength: 12,
//   });

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     course: "",
//     state: "",
//   });

//   const [errors, setErrors] = useState<any>({});

//   const validate = () => {
//     const err: any = {};
//     if (!formData.fullName.trim()) err.fullName = "Enter name";
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) err.email = "Enter valid email";

//     const digitsOnly = formData.mobile.replace(/\D/g, "");
//     if (!digitsOnly || digitsOnly.length < phoneMeta.requiredLength) {
//       err.mobile = `Enter a valid ${phoneMeta.countryCode.toUpperCase()} phone number`;
//     }

//     if (!formData.course) err.course = "Select a course";
//     if (!formData.state) err.state = "Select a state";

//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const isPhoneValid = () => {
//     const digitsOnly = formData.mobile.replace(/\D/g, "");
//     return digitsOnly.length >= phoneMeta.requiredLength;
//   };

//   const isFormValid = !!(
//     formData.fullName.trim() &&
//     /^\S+@\S+\.\S+$/.test(formData.email) &&
//     isPhoneValid() &&
//     formData.course &&
//     formData.state
//   );

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/application", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.fullName,
//           email: formData.email,
//           phone: formData.mobile,
//           course: formData.course,
//           state: formData.state,
//         }),
//       });

//       let number = formData.mobile;
//       let newNumber = number.startsWith("91") ? number.slice(2) : number;

//       const leadFormData = new FormData();
//       leadFormData.append("full_name", formData.fullName);
//       leadFormData.append("email", formData.email);
//       leadFormData.append("country_code", "+91");
//       leadFormData.append("phone", newNumber);
//       leadFormData.append("course", formData.course);
//       leadFormData.append("state", formData.state);
//       leadFormData.append("no_of_users", "0");
//       leadFormData.append("source", "Gen AI LP");

//       const response = await fetch(
//         "https://bls.ecampuscrm.com/api/form/leads",
//         {
//           method: "POST",
//           body: leadFormData,
//         },
//       );

//       const result = await response.json();
//       console.log("Success:", result);

//       const data = await res.json();

//       if (res.ok && data.success) {
//         // ✅ Route push ki jagah parent ko batao — parent apna state khud manage karega
//         onSubmit({
//           name: formData.fullName,
//           email: formData.email,
//           mobile: formData.mobile,
//         });
//       } else {
//         alert(data.message || "Something went wrong ❌");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Network error. Please try again ❌");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//       <div className="flex flex-col items-center text-center space-y-1.5 mb-3">
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
//           Apply Now
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Full Name
//           </label>
//           <Input
//             placeholder="Enter name"
//             value={formData.fullName}
//             onChange={(e) =>
//               setFormData({ ...formData, fullName: e.target.value })
//             }
//             className={`h-10 w-full px-3 rounded-xl border text-sm ${
//               errors.fullName
//                 ? "border-red-300 bg-red-50"
//                 : "border-gray-200 bg-white focus:border-emerald-400"
//             }`}
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.fullName}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Email
//           </label>
//           <Input
//             type="email"
//             placeholder="Enter email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             className={`h-10 w-full px-3 rounded-xl border text-sm ${
//               errors.email
//                 ? "border-red-300 bg-red-50"
//                 : "border-gray-200 bg-white focus:border-emerald-400"
//             }`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Phone no.
//           </label>
//           <PhoneInput
//             country={"in"}
//             preferredCountries={["in"]}
//             value={formData.mobile}
//             onChange={(value, data: any) => {
//               const countryCode: string = data.countryCode ?? "in";
//               const dialCode: string = data.dialCode ?? "91";
//               const required = getExpectedPhoneLength(countryCode, dialCode);
//               const digitsOnly = value.replace(/\D/g, "");
//               const capped =
//                 digitsOnly.length > required
//                   ? digitsOnly.slice(0, required)
//                   : digitsOnly;

//               setFormData({ ...formData, mobile: capped });
//               setPhoneMeta({
//                 countryCode,
//                 dialCode,
//                 requiredLength: required,
//               });
//             }}
//             disableFormatting={phoneMeta.countryCode === "in"}
//             autoFormat={phoneMeta.countryCode !== "in"}
//             countryCodeEditable={false}
//             inputProps={{ maxLength: phoneMeta.requiredLength + 4 }}
//             containerClass="!w-full"
//             inputClass="!w-full !h-10 !bg-white !text-gray-900 !border !border-gray-200 !pl-12 !rounded-xl !text-sm"
//             buttonClass="!bg-white !border-r !border-gray-200 !rounded-l-xl !px-2"
//             dropdownClass="!bg-white !text-gray-900 !border !border-gray-200"
//           />
//           {errors.mobile && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.mobile}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Course
//           </label>
//           <Select
//             value={formData.course}
//             onValueChange={(v) => setFormData({ ...formData, course: v })}
//           >
//             <SelectTrigger className="!h-10 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
//               <SelectValue placeholder="Select Course" />
//             </SelectTrigger>
//             <SelectContent className="bg-white border border-gray-200 text-gray-900">
//               {courseList.map((c) => (
//                 <SelectItem key={c} value={c}>
//                   {c}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.course && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.course}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             State
//           </label>
//           <Select
//             value={formData.state}
//             onValueChange={(v) => setFormData({ ...formData, state: v })}
//           >
//             <SelectTrigger className="!h-10 !min-h-[40px] bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
//               <SelectValue placeholder="Select State" />
//             </SelectTrigger>
//             <SelectContent className="bg-white border border-gray-200 text-gray-900 max-h-60 overflow-y-auto">
//               {indianStates.map((s) => (
//                 <SelectItem key={s} value={s}>
//                   {s}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.state && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.state}</p>
//           )}
//         </div>

//         <Button
//           type="submit"
//           disabled={!isFormValid || isSubmitting}
//           className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-1 text-sm"
//         >
//           {isSubmitting ? (
//             <Loader2 className="animate-spin" />
//           ) : (
//             <>
//               Apply Now
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </>
//           )}
//         </Button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ArrowRight, Loader2 } from "lucide-react";

// // ── Types ─────────────────────────────────────────────────────────────────────

// export interface LeadData {
//   name: string;
//   email: string;
//   mobile: string;
// }

// // ── Shared Data ──────────────────────────────────────────────────────────────

// const courseList = ["DBA in Generative AI"];

// // ── Countries ────────────────────────────────────────────────────────────────

// const countryList = [
//   { name: "India", code: "in", dialCode: "91", length: 10 },
//   { name: "United States", code: "us", dialCode: "1", length: 10 },
//   { name: "Canada", code: "ca", dialCode: "1", length: 10 },
//   { name: "United Kingdom", code: "gb", dialCode: "44", length: 10 },
//   { name: "Australia", code: "au", dialCode: "61", length: 9 },
//   { name: "Germany", code: "de", dialCode: "49", length: 11 },
//   { name: "France", code: "fr", dialCode: "33", length: 9 },
//   { name: "Japan", code: "jp", dialCode: "81", length: 10 },
//   { name: "China", code: "cn", dialCode: "86", length: 11 },
//   { name: "Pakistan", code: "pk", dialCode: "92", length: 10 },
//   { name: "Bangladesh", code: "bd", dialCode: "880", length: 10 },
//   { name: "Sri Lanka", code: "lk", dialCode: "94", length: 9 },
//   { name: "Singapore", code: "sg", dialCode: "65", length: 8 },
//   { name: "Malaysia", code: "my", dialCode: "60", length: 9 },
//   { name: "Thailand", code: "th", dialCode: "66", length: 9 },
//   { name: "Indonesia", code: "id", dialCode: "62", length: 10 },
//   { name: "Philippines", code: "ph", dialCode: "63", length: 10 },
// ];

// const indianStates = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
//   "Delhi",
//   "Other",
// ];

// // ── ApplicationForm ───────────────────────────────────────────────────────────

// export function ApplicationForm({
//   onSubmit,
//   onBack,
// }: {
//   onSubmit: (data: LeadData) => void;
//   onBack?: () => void;
// }) {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [selectedCountry, setSelectedCountry] = useState(
//     countryList.find((c) => c.code === "in")!,
//   );

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     course: "",
//     state: "",
//   });

//   const [errors, setErrors] = useState<any>({});

//   const validate = () => {
//     const err: any = {};
//     if (!formData.fullName.trim()) err.fullName = "Enter name";
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) err.email = "Enter valid email";

//     const digitsOnly = formData.mobile.replace(/\D/g, "");
//     if (!digitsOnly || digitsOnly.length !== selectedCountry.length) {
//       err.mobile = `Enter a valid ${selectedCountry.name} phone number`;
//     }

//     if (!formData.course) err.course = "Select a course";
//     if (!formData.state && selectedCountry.code === "in")
//       err.state = "Select a state";

//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const isPhoneValid = () => {
//     const digitsOnly = formData.mobile.replace(/\D/g, "");
//     return digitsOnly.length === selectedCountry.length;
//   };

//   const isFormValid = !!(
//     formData.fullName.trim() &&
//     /^\S+@\S+\.\S+$/.test(formData.email) &&
//     isPhoneValid() &&
//     formData.course &&
//     formData.state
//   );

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/application", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.fullName,
//           email: formData.email,
//           phone: formData.mobile,
//           course: formData.course,
//           state: formData.state,
//         }),
//       });

//       let number = formData.mobile;
//       let newNumber = number.startsWith("91") ? number.slice(2) : number;

//       const leadFormData = new FormData();
//       leadFormData.append("full_name", formData.fullName);
//       leadFormData.append("email", formData.email);
//       leadFormData.append("country_code", "+91");
//       leadFormData.append("phone", newNumber);
//       leadFormData.append("course", formData.course);
//       leadFormData.append("state", formData.state);
//       leadFormData.append("no_of_users", "0");
//       leadFormData.append("source", "Gen AI LP");

//       const response = await fetch(
//         "https://bls.ecampuscrm.com/api/form/leads",
//         {
//           method: "POST",
//           body: leadFormData,
//         },
//       );

//       const result = await response.json();
//       console.log("Success:", result);

//       const data = await res.json();

//       if (res.ok && data.success) {
//         // ✅ Route push ki jagah parent ko batao — parent apna state khud manage karega
//         onSubmit({
//           name: formData.fullName,
//           email: formData.email,
//           mobile: formData.mobile,
//         });
//       } else {
//         alert(data.message || "Something went wrong ❌");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Network error. Please try again ❌");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 py-4 sm:py-6 shadow-sm">
//       <div className="flex flex-col items-center text-center space-y-1.5 mb-3">
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
//           Apply Now
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Full Name
//           </label>
//           <Input
//             placeholder="Enter name"
//             value={formData.fullName}
//             onChange={(e) =>
//               setFormData({ ...formData, fullName: e.target.value })
//             }
//             className={`h-10 w-full px-3 rounded-xl border text-sm ${
//               errors.fullName
//                 ? "border-red-300 bg-red-50"
//                 : "border-gray-200 bg-white focus:border-emerald-400"
//             }`}
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.fullName}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Email
//           </label>
//           <Input
//             type="email"
//             placeholder="Enter email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             className={`h-10 w-full px-3 rounded-xl border text-sm ${
//               errors.email
//                 ? "border-red-300 bg-red-50"
//                 : "border-gray-200 bg-white focus:border-emerald-400"
//             }`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Country
//           </label>
//           <Select
//             value={selectedCountry.code}
//             onValueChange={(code) => {
//               const country = countryList.find((c) => c.code === code);
//               if (country) {
//                 setSelectedCountry(country);
//                 setFormData({ ...formData, mobile: "" });
//                 setErrors({ ...errors, mobile: "" });
//               }
//             }}
//           >
//             <SelectTrigger className="!h-10 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
//               <SelectValue placeholder="Select Country" />
//             </SelectTrigger>
//             <SelectContent className="bg-white border border-gray-200 text-gray-900 max-h-60 overflow-y-auto">
//               {countryList.map((country) => (
//                 <SelectItem key={country.code} value={country.code}>
//                   {country.name} (+{country.dialCode})
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Phone no.
//           </label>
//           <div
//             className={`__phone-input-wrapper h-10 w-full flex items-center rounded-xl border overflow-hidden ${
//               errors.mobile
//                 ? "border-red-300 bg-red-50"
//                 : "border-gray-200 bg-white"
//             }`}
//           >
//             <div className="__country-code px-3 bg-gray-50 text-gray-700 font-medium text-sm border-r border-gray-200 flex items-center min-w-fit h-full whitespace-nowrap">
//               +{selectedCountry.dialCode}
//             </div>
//             <input
//               type="tel"
//               placeholder={
//                 selectedCountry.code === "in"
//                   ? "98765 43210"
//                   : "Enter phone number"
//               }
//               value={formData.mobile.replace(/\D/g, "")}
//               onChange={(e) => {
//                 const digitsOnly = e.target.value.replace(/\D/g, "");
//                 const capped = digitsOnly.slice(0, selectedCountry.length);
//                 setFormData({ ...formData, mobile: capped });
//               }}
//               maxLength={selectedCountry.length}
//               className="__phone-input flex-1 px-3 h-full outline-none text-sm text-gray-900 bg-transparent placeholder-gray-400"
//             />
//           </div>
//           {errors.mobile && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.mobile}</p>
//           )}
//           <p className="text-gray-500 text-xs mt-1">
//             {selectedCountry.length} digits required
//           </p>
//         </div>

//         <div>
//           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//             Course
//           </label>
//           <Select
//             value={formData.course}
//             onValueChange={(v) => setFormData({ ...formData, course: v })}
//           >
//             <SelectTrigger className="!h-10 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
//               <SelectValue placeholder="Select Course" />
//             </SelectTrigger>
//             <SelectContent className="bg-white border border-gray-200 text-gray-900">
//               {courseList.map((c) => (
//                 <SelectItem key={c} value={c}>
//                   {c}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.course && (
//             <p className="text-red-500 text-xs mt-0.5">{errors.course}</p>
//           )}
//         </div>

//         {selectedCountry.code === "in" && (
//           <div>
//             <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
//               State
//             </label>
//             <Select
//               value={formData.state}
//               onValueChange={(v) => setFormData({ ...formData, state: v })}
//             >
//               <SelectTrigger className="!h-10 !min-h-[40px] bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
//                 <SelectValue placeholder="Select State" />
//               </SelectTrigger>
//               <SelectContent className="bg-white border border-gray-200 text-gray-900 max-h-60 overflow-y-auto">
//                 {indianStates.map((s) => (
//                   <SelectItem key={s} value={s}>
//                     {s}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {errors.state && (
//               <p className="text-red-500 text-xs mt-0.5">{errors.state}</p>
//             )}
//           </div>
//         )}

//         <Button
//           type="submit"
//           disabled={!isFormValid || isSubmitting}
//           className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-1 text-sm"
//         >
//           {isSubmitting ? (
//             <Loader2 className="animate-spin" />
//           ) : (
//             <>
//               Apply Now
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </>
//           )}
//         </Button>
//       </form>
//     </div>
//   );
// }

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
  "DBA in Generative AI",
  "DBA_(IT_Management)",
  "DBA_(Energy_Management)",
  "DBA_(Business_Analytics)",
  "DBA_(Data_Science)",
  "DBA_(Machine_Learning)",
  "DBA_(Global_&_International_Management)",
  "DBA_(Finance)",
  "DBA_(General_Management)",
  "DBA_(Healthcare_Management)",
  "DBA_(Human_Resource_Management)",
  "DBA_(International_Business)",
  "DBA_(Marketing)",
  "DBA_(Supply_Chain_Management)",
  "DBA_(Accounting)",
  "DBA_(AML_Compliance)",
  "DBA_(Cyber_Security)",
  "DBA_(Tax_Management)",
  "DBA_(Strategic_Management)",
  "DBA_(Entrepreneurship)",
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
    if (!formData.fullName.trim()) err.fullName = "Enter name";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) err.email = "Enter valid email";

    const digitsOnly = formData.mobile.replace(/\D/g, "");
    if (selectedCountry.code === "in") {
      // Strict 10-digit check only for India
      if (!digitsOnly || digitsOnly.length !== selectedCountry.length) {
        err.mobile = `Enter a valid ${selectedCountry.name} phone number`;
      }
    } else {
      // For all other countries, just make sure some number has been entered
      if (!digitsOnly) {
        err.mobile = "Enter a valid phone number";
      }
    }

    if (!formData.course) err.course = "Select a course";
    if (!formData.state && selectedCountry.code === "in")
      err.state = "Select a state";

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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col items-center text-center space-y-1.5 mb-3">
        <h2 className="text-1xl sm:text-2xl font-extrabold text-gray-900 leading-tight xl:2xl">
          Download Personalized Report
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
        <div>
          <Input
            placeholder="Enter name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className={`h-10 w-full px-3 rounded-xl border text-sm ${
              errors.fullName
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white focus:border-emerald-400"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-0.5">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`h-10 w-full px-3 rounded-xl border text-sm ${
              errors.email
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white focus:border-emerald-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
          )}
        </div>

        <div>
          <Select
            value={selectedCountry.code}
            onValueChange={(code) => {
              const country = countryList.find((c) => c.code === code);
              if (country) {
                setSelectedCountry(country);
                setFormData({ ...formData, mobile: "" });
                setErrors({ ...errors, mobile: "" });
              }
            }}
          >
            <SelectTrigger className="!h-10 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              align="start"
              className="bg-white border border-gray-200 text-gray-900 max-h-48 overflow-y-auto w-full"
            >
              {countryList.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name} (+{country.dialCode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
                const digitsOnly = e.target.value.replace(/\D/g, "");
                // India: capped at fixed length. Other countries: no limit.
                const capped =
                  selectedCountry.code === "in"
                    ? digitsOnly.slice(0, selectedCountry.length)
                    : digitsOnly;
                setFormData({ ...formData, mobile: capped });
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
            <p className="text-red-500 text-xs mt-0.5">{errors.mobile}</p>
          )}
        </div>

        <div className="relative z-50">
          <Select
            value={formData.course}
            onValueChange={(v) => setFormData({ ...formData, course: v })}
          >
            <SelectTrigger className="!h-10 !min-h-0 !py-0 bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              align="start"
              className="bg-white border border-gray-200 text-gray-900 max-h-48 w-[var(--radix-select-trigger-width)] overflow-y-auto"
            >
              {courseList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.course && (
            <p className="text-red-500 text-xs mt-0.5">{errors.course}</p>
          )}
        </div>

        {selectedCountry.code === "in" && (
          <div className="relative z-40">
            <Select
              value={formData.state}
              onValueChange={(v) => setFormData({ ...formData, state: v })}
            >
              <SelectTrigger className="!h-10 !min-h-[40px] bg-white border border-gray-200 text-gray-900 w-full px-3 rounded-xl flex items-center text-sm">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                align="start"
                className="bg-white border border-gray-200 text-gray-900 max-h-48 w-[var(--radix-select-trigger-width)] overflow-y-auto"
              >
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-500 text-xs mt-0.5">{errors.state}</p>
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-1 text-sm"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Download Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
