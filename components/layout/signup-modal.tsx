// "use client";

// import { useState, useEffect } from "react";
// import { X, ArrowLeft, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface SignupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToLogin?: () => void;
// }

// const countryCodes = [
//   { code: "+91", flag: "🇮🇳", name: "IN" },
//   { code: "+1", flag: "🇺🇸", name: "US" },
//   { code: "+44", flag: "🇬🇧", name: "GB" },
//   { code: "+61", flag: "🇦🇺", name: "AU" },
//   { code: "+971", flag: "🇦🇪", name: "AE" },
//   { code: "+65", flag: "🇸🇬", name: "SG" },
//   { code: "+60", flag: "🇲🇾", name: "MY" },
//   { code: "+49", flag: "🇩🇪", name: "DE" },
//   { code: "+33", flag: "🇫🇷", name: "FR" },
//   { code: "+81", flag: "🇯🇵", name: "JP" },
// ];

// type Step = "phone" | "otp" | "email";

// export function SignupModal({
//   isOpen,
//   onClose,
//   onSwitchToLogin,
// }: SignupModalProps) {
//   const [step, setStep] = useState<Step>("phone");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [resendCooldown, setResendCooldown] = useState(0);

//   useEffect(() => {
//     if (resendCooldown <= 0) return;
//     const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [resendCooldown]);

//   if (!isOpen) return null;

//   const selectedCountry = countryCodes.find((c) => c.code === countryCode)!;
//   const fullPhone = `${countryCode}${phone}`;

//   const handlePhoneContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{7,15}$/.test(phone)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: fullPhone,
//           email: `${fullPhone}@otp.ecampus`,
//           name: "",
//         }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Failed to send OTP");
//       setResendCooldown(30);
//       setStep("otp");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{6}$/.test(otp)) {
//       setError("Enter the 6-digit OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone, otp }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Verification failed");
//       localStorage.setItem(
//         "ecampus_student",
//         JSON.stringify({ phone: fullPhone }),
//       );
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (resendCooldown > 0) return;
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone }),
//       });
//       const data = await res.json();
//       if (!data.success)
//         throw new Error(data.message || "Failed to resend OTP");
//       setResendCooldown(30);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const apiUrl =
//         process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
//         "http://localhost:5000";
//       const res = await fetch(`${apiUrl}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Signup failed");
//       }
//       localStorage.setItem("ecampus_student", JSON.stringify({ name, email }));
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     if (step === "otp") {
//       setOtp("");
//       setStep("phone");
//     } else {
//       setStep("phone");
//     }
//     setError("");
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div
//           className="relative w-full max-w-sm bg-white rounded-3xl shadow-lg overflow-hidden"
//           style={{ minHeight: "auto" }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex flex-col p-6">
//             {/* Heading with close button */}
//             <div className="flex items-center justify-between mb-1">
//               <div className="flex items-center gap-3">
//                 {step !== "phone" && (
//                   <button
//                     onClick={handleBack}
//                     className="text-gray-600 hover:text-black transition-colors"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                   </button>
//                 )}
//                 <h2 className="text-lg font-semibold text-black">
//                   {step === "phone" && "Welcome"}
//                   {step === "otp" && "Enter OTP"}
//                   {step === "email" && "Create Account"}
//                 </h2>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-gray-600 hover:text-black transition-colors flex-shrink-0"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             <p className="text-xs text-gray-600 mb-3">
//               {step === "phone" && "Enter your phone number"}
//               {step === "otp" && `OTP sent to ${fullPhone}`}
//               {step === "email" && "Complete your details"}
//             </p>

//             {/* Error */}
//             {error && (
//               <div className="mb-3 px-3 py-2 bg-white border border-gray-300 text-gray-900 text-xs rounded-xl">
//                 {error}
//               </div>
//             )}

//             {step === "phone" && (
//               <form
//                 onSubmit={handlePhoneContinue}
//                 className="flex flex-col gap-3"
//               >
//                 {/* Phone row */}
//                 <div className="flex items-center border border-gray-300 rounded-2xl">
//                   {/* Country picker */}
//                   <div className="relative flex items-center border-r border-gray-300 px-2 py-2 gap-1 cursor-pointer">
//                     <span className="text-sm">{selectedCountry.flag}</span>
//                     <span className="text-xs font-medium text-black">
//                       {selectedCountry.code}
//                     </span>
//                     <ChevronDown className="w-3 h-3 text-gray-600" />
//                     <select
//                       value={countryCode}
//                       onChange={(e) => setCountryCode(e.target.value)}
//                       className="absolute inset-0 opacity-0 cursor-pointer w-full"
//                     >
//                       {countryCodes.map((c) => (
//                         <option key={c.code} value={c.code}>
//                           {c.flag} {c.code} ({c.name})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {/* Number input */}
//                   <input
//                     type="tel"
//                     placeholder="Mobile number"
//                     value={phone}
//                     onChange={(e) =>
//                       setPhone(e.target.value.replace(/\D/g, ""))
//                     }
//                     maxLength={15}
//                     required
//                     className="flex-1 px-3 py-2 text-sm bg-white outline-none placeholder-gray-500"
//                   />
//                 </div>

//                 {/* OR divider */}
//                 <div className="flex items-center gap-2 text-gray-600 text-xs">
//                   <div className="flex-1 h-px bg-gray-300" />
//                   or
//                   <div className="flex-1 h-px bg-gray-300" />
//                 </div>

//                 {/* Switch to email */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setStep("email");
//                     setError("");
//                   }}
//                   className="text-xs font-medium text-gray-700 hover:text-black text-center transition"
//                 >
//                   Sign up with email
//                 </button>

//                 {/* Continue */}
//                 <Button
//                   type="submit"
//                   disabled={loading || phone.length < 7}
//                   className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600 text-white text-sm font-medium py-2 rounded-2xl transition-all"
//                 >
//                   {loading ? "Sending..." : "Continue"}
//                 </Button>
//               </form>
//             )}

//             {step === "otp" && (
//               <form onSubmit={handleOtpVerify} className="flex flex-col gap-3">
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   placeholder="6-digit OTP"
//                   value={otp}
//                   onChange={(e) =>
//                     setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                   }
//                   maxLength={6}
//                   required
//                   className="w-full px-3 py-2 text-center text-sm tracking-widest font-semibold border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />

//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={resendCooldown > 0 || loading}
//                   className="text-xs font-medium text-gray-700 hover:text-black disabled:text-gray-400 text-center transition"
//                 >
//                   {resendCooldown > 0
//                     ? `Resend in ${resendCooldown}s`
//                     : "Resend OTP"}
//                 </button>

//                 <Button
//                   type="submit"
//                   disabled={loading || otp.length !== 6}
//                   className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600 text-white text-sm font-medium py-2 rounded-2xl transition-all"
//                 >
//                   {loading ? "Verifying..." : "Continue"}
//                 </Button>
//               </form>
//             )}

//             {step === "email" && (
//               <form
//                 onSubmit={handleEmailContinue}
//                 className="flex flex-col gap-3"
//               >
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password (min. 8 characters)"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={8}
//                   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 rounded-2xl transition-all"
//                 >
//                   {loading ? "Creating..." : "Continue"}
//                 </Button>
//               </form>
//             )}

//             {/* Terms */}
//             <p className="mt-4 text-xs text-gray-600 text-center leading-relaxed">
//               By continuing, you agree to our{" "}
//               <a href="/terms" className="hover:underline">
//                 Terms
//               </a>{" "}
//               &{" "}
//               <a href="/privacy" className="hover:underline">
//                 Privacy Policy
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// test...................

// "use client";

// import { useState, useEffect } from "react";
// import { X, ArrowLeft, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface SignupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToLogin?: () => void;
// }

// const countryCodes = [
//   { code: "+91", flag: "🇮🇳", name: "IN" },
//   { code: "+1", flag: "🇺🇸", name: "US" },
//   { code: "+44", flag: "🇬🇧", name: "GB" },
//   { code: "+61", flag: "🇦🇺", name: "AU" },
//   { code: "+971", flag: "🇦🇪", name: "AE" },
//   { code: "+65", flag: "🇸🇬", name: "SG" },
//   { code: "+60", flag: "🇲🇾", name: "MY" },
//   { code: "+49", flag: "🇩🇪", name: "DE" },
//   { code: "+33", flag: "🇫🇷", name: "FR" },
//   { code: "+81", flag: "🇯🇵", name: "JP" },
// ];

// type Step = "phone" | "otp" | "email";

// export function SignupModal({
//   isOpen,
//   onClose,
//   onSwitchToLogin,
// }: SignupModalProps) {
//   const [step, setStep] = useState<Step>("phone");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [assuredOptIn, setAssuredOptIn] = useState(false);

//   useEffect(() => {
//     if (resendCooldown <= 0) return;
//     const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [resendCooldown]);

//   if (!isOpen) return null;

//   const selectedCountry = countryCodes.find((c) => c.code === countryCode)!;
//   const fullPhone = `${countryCode}${phone}`;

//   const handlePhoneContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{7,15}$/.test(phone)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: fullPhone,
//           email: `${fullPhone}@otp.ecampus`,
//           name: "",
//         }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Failed to send OTP");
//       setResendCooldown(30);
//       setStep("otp");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{6}$/.test(otp)) {
//       setError("Enter the 6-digit OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone, otp }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Verification failed");
//       localStorage.setItem(
//         "ecampus_student",
//         JSON.stringify({ phone: fullPhone }),
//       );
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (resendCooldown > 0) return;
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone }),
//       });
//       const data = await res.json();
//       if (!data.success)
//         throw new Error(data.message || "Failed to resend OTP");
//       setResendCooldown(30);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const apiUrl =
//         process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
//         "http://localhost:5000";
//       const res = await fetch(`${apiUrl}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Signup failed");
//       }
//       localStorage.setItem("ecampus_student", JSON.stringify({ name, email }));
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     if (step === "otp") {
//       setOtp("");
//       setStep("phone");
//     } else {
//       setStep("phone");
//     }
//     setError("");
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div
//           className="relative w-full max-w-sm bg-white rounded-3xl shadow-lg overflow-hidden"
//           style={{ minHeight: "auto" }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Close button - fixed to top-right corner of modal */}
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
//           >
//             <X className="w-4 h-4" />
//           </button>

//           <div className="flex flex-col px-3 pb-3 pt-0">
//             {/* Logo */}
//             <div className="flex justify-center -mt-4">
//               <img
//                 src="/image/logo.png"
//                 alt="logo"
//                 className="block h-[100px] w-[100px] object-contain"
//               />
//             </div>

//             {/* Heading */}
//             <div className="relative flex items-center justify-center -mt-3 mb-1.5">
//               {step !== "phone" && (
//                 <button
//                   onClick={handleBack}
//                   className="absolute left-0 flex h-8 w-8 items-center justify-center text-gray-600 hover:text-black"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                 </button>
//               )}

//               <h2 className="whitespace-nowrap text-lg font-semibold text-black">
//                 {step === "phone" && "Welcome! "}
//                 {step === "otp" && "Enter OTP"}
//                 {step === "email" && "Create Account"}
//               </h2>
//             </div>

//             <p className="text-xs text-gray-600 mb-1.5 text-center">
//               {step === "phone" && ""}
//               {step === "otp" && `OTP sent to ${fullPhone}`}
//               {step === "email" && "Complete your details"}
//             </p>

//             {/* Error */}
//             {error && (
//               <div className="mb-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-900 text-xs rounded-xl">
//                 {error}
//               </div>
//             )}

//             {step === "phone" && (
//               <form
//                 onSubmit={handlePhoneContinue}
//                 className="flex flex-col gap-1.5"
//               >
//                 {/* Phone row */}
//                 <div className="flex items-center border border-gray-300 rounded-2xl">
//                   {/* Country picker */}
//                   <div className="relative flex items-center border-r border-gray-300 px-2 py-1.5 gap-1 cursor-pointer">
//                     <span className="text-sm">{selectedCountry.flag}</span>
//                     <span className="text-xs font-medium text-black">
//                       {selectedCountry.code}
//                     </span>
//                     <ChevronDown className="w-3 h-3 text-gray-600" />
//                     <select
//                       value={countryCode}
//                       onChange={(e) => setCountryCode(e.target.value)}
//                       className="absolute inset-0 opacity-0 cursor-pointer w-full"
//                     >
//                       {countryCodes.map((c) => (
//                         <option key={c.code} value={c.code}>
//                           {c.flag} {c.code} ({c.name})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   {/* Number input */}
//                   <input
//                     type="tel"
//                     placeholder="Mobile number"
//                     value={phone}
//                     onChange={(e) =>
//                       setPhone(e.target.value.replace(/\D/g, ""))
//                     }
//                     maxLength={15}
//                     required
//                     className="flex-1 px-3 py-1.5 text-sm bg-white outline-none placeholder-gray-500"
//                   />
//                 </div>

//                 {/* OR divider */}
//                 <div className="flex items-center gap-2 text-gray-600 text-xs">
//                   <div className="flex-1 h-px bg-gray-300" />
//                   or
//                   <div className="flex-1 h-px bg-gray-300" />
//                 </div>

//                 {/* Switch to email */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setStep("email");
//                     setError("");
//                   }}
//                   className="text-xs font-medium text-gray-700 hover:text-black text-center transition"
//                 >
//                   Sign up with email
//                 </button>

//                 {/* Assured refund promo banner */}
//                 <div className="flex w-fit mx-auto items-center justify-center gap-2 rounded-2xl bg-[#ef4444] from-red-700 via-red-600 to-red-500 px-3 py-2 shadow-lg">
//                   <input
//                     type="checkbox"
//                     checked={assuredOptIn}
//                     onChange={(e) => setAssuredOptIn(e.target.checked)}
//                     className="h-4 w-4 flex-shrink-0 cursor-pointer rounded border-gray-300 accent-red-600"
//                   />

//                   <div className="leading-snug text-center">
//                     <p className="text-xs font-semibold text-white text-center">
//                       <span className="font-bold">eCampus Assured</span>{" "}
//                       <span className="cursor-pointer font-semibold text-yellow-300 underline">
//                         (Know More)
//                       </span>
//                     </p>

//                     <p className="text-xs text-red-100 text-center">
//                       Get up to{" "}
//                       <span className="text-white">
//                         100% Course Fee Refund*
//                       </span>{" "}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Continue */}
//                 <Button
//                   type="submit"
//                   disabled={loading || phone.length < 7}
//                   className="w-fit mx-auto bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600 text-white text-base font-medium px-8 py-2.5 rounded-2xl transition-all"
//                 >
//                   {loading ? "Sending..." : "Continue"}
//                 </Button>
//               </form>
//             )}

//             {step === "otp" && (
//               <form
//                 onSubmit={handleOtpVerify}
//                 className="flex flex-col gap-1.5"
//               >
//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   placeholder="6-digit OTP"
//                   value={otp}
//                   onChange={(e) =>
//                     setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                   }
//                   maxLength={6}
//                   required
//                   className="w-full px-3 py-1.5 text-center text-sm tracking-widest font-semibold border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />

//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={resendCooldown > 0 || loading}
//                   className="text-xs font-medium text-gray-700 hover:text-black disabled:text-gray-400 text-center transition"
//                 >
//                   {resendCooldown > 0
//                     ? `Resend in ${resendCooldown}s`
//                     : "Resend OTP"}
//                 </button>

//                 <Button
//                   type="submit"
//                   disabled={loading || otp.length !== 6}
//                   className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600 text-white text-sm font-medium py-1.5 rounded-2xl transition-all"
//                 >
//                   {loading ? "Verifying..." : "Continue"}
//                 </Button>
//               </form>
//             )}

//             {step === "email" && (
//               <form
//                 onSubmit={handleEmailContinue}
//                 className="flex flex-col gap-1.5"
//               >
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password (min. 8 characters)"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={8}
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-black transition placeholder-gray-500"
//                 />
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="w-30px bg-black hover:bg-gray-800 text-white text-sm font-medium py-1.5 rounded-2xl transition-all"
//                 >
//                   {loading ? "Creating..." : "Continue"}
//                 </Button>
//               </form>
//             )}

//             {/* Terms */}
//             <p className="mt-1.5 text-xs text-gray-600 text-center leading-relaxed">
//               By continuing, you agree to our{" "}
//               <a href="/terms" className="hover:underline">
//                 Terms
//               </a>{" "}
//               &{" "}
//               <a href="/privacy" className="hover:underline">
//                 Privacy Policy
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import {
//   X,
//   ArrowLeft,
//   ChevronDown,
//   ShieldCheck,
//   GraduationCap,
//   Users,
//   Laptop,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface SignupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToLogin?: () => void;
// }

// const countryCodes = [
//   { code: "+91", flag: "🇮🇳", name: "IN" },
//   { code: "+1", flag: "🇺🇸", name: "US" },
//   { code: "+44", flag: "🇬🇧", name: "GB" },
//   { code: "+61", flag: "🇦🇺", name: "AU" },
//   { code: "+971", flag: "🇦🇪", name: "AE" },
//   { code: "+65", flag: "🇸🇬", name: "SG" },
//   { code: "+60", flag: "🇲🇾", name: "MY" },
//   { code: "+49", flag: "🇩🇪", name: "DE" },
//   { code: "+33", flag: "🇫🇷", name: "FR" },
//   { code: "+81", flag: "🇯🇵", name: "JP" },
// ];

// type Step = "phone" | "otp" | "email";

// export function SignupModal({
//   isOpen,
//   onClose,
//   onSwitchToLogin,
// }: SignupModalProps) {
//   const [step, setStep] = useState<Step>("phone");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [assuredOptIn, setAssuredOptIn] = useState(false);

//   useEffect(() => {
//     if (resendCooldown <= 0) return;
//     const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [resendCooldown]);

//   if (!isOpen) return null;

//   const selectedCountry = countryCodes.find((c) => c.code === countryCode)!;
//   const fullPhone = `${countryCode}${phone}`;

//   const handlePhoneContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{7,15}$/.test(phone)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: fullPhone,
//           email: `${fullPhone}@otp.ecampus`,
//           name: "",
//         }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Failed to send OTP");
//       setResendCooldown(30);
//       setStep("otp");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{6}$/.test(otp)) {
//       setError("Enter the 6-digit OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone, otp }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Verification failed");
//       localStorage.setItem(
//         "ecampus_student",
//         JSON.stringify({ phone: fullPhone }),
//       );
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (resendCooldown > 0) return;
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone }),
//       });
//       const data = await res.json();
//       if (!data.success)
//         throw new Error(data.message || "Failed to resend OTP");
//       setResendCooldown(30);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const apiUrl =
//         process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
//         "http://localhost:5000";
//       const res = await fetch(`${apiUrl}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Signup failed");
//       }
//       localStorage.setItem("ecampus_student", JSON.stringify({ name, email }));
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     if (step === "otp") {
//       setOtp("");
//       setStep("phone");
//     } else {
//       setStep("phone");
//     }
//     setError("");
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Outer wrapper scrolls as a last resort on very short screens,
//           so nothing is ever clipped off-screen. */}
//       <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain">
//         <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
//           <div
//             className="relative grid max-h-[88vh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* LEFT PANEL */}
//             <div className="hidden max-h-[88vh] flex-col justify-between overflow-y-auto bg-gradient-to-br from-red-700 via-red-600 to-red-500 p-6 text-white md:flex lg:p-8">
//               <div>
//                 <img
//                   src="/image/logo.png"
//                   alt="logo"
//                   className="mb-4 h-7 object-contain"
//                 />

//                 <h1 className="text-xl font-bold leading-snug lg:text-2xl">
//                   Your Future.
//                   <br />
//                   Our Responsibility.
//                 </h1>

//                 <p className="mt-2 text-xs text-red-100 lg:text-sm">
//                   Find the right university. Build the right career.
//                 </p>

//                 <div className="mt-5 space-y-3">
//                   <Feature
//                     icon={<GraduationCap size={16} />}
//                     title="UGC Recognised Universities"
//                     desc="Study from India's top universities"
//                   />
//                   <Feature
//                     icon={<Laptop size={16} />}
//                     title="100% Online & Flexible"
//                     desc="Learn at your own pace"
//                   />
//                   <Feature
//                     icon={<Users size={16} />}
//                     title="Career Focused Programs"
//                     desc="Skills that employers value"
//                   />
//                   <Feature
//                     icon={<ShieldCheck size={16} />}
//                     title="Personal Student Support"
//                     desc="From admission till graduation"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setAssuredOptIn((v) => !v)}
//                 className={`mt-5 rounded-xl border p-3 text-left transition ${
//                   assuredOptIn
//                     ? "border-yellow-300 bg-white/20"
//                     : "border-white/20 bg-white/10"
//                 } backdrop-blur-md`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-full bg-white/20 p-2">
//                     <ShieldCheck size={18} />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold">eCampus Assured</h3>
//                     <p className="text-xs text-red-100">
//                       Get up to{" "}
//                       <span className="font-bold text-yellow-300">
//                         100% Course Fee Refund*
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             </div>

//             {/* RIGHT PANEL */}
//             <div className="relative flex max-h-[88vh] flex-col overflow-y-auto bg-white p-5 sm:p-6 md:p-8">
//               <button
//                 onClick={onClose}
//                 className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black sm:right-4 sm:top-4"
//               >
//                 <X className="h-4 w-4" />
//               </button>

//               {step !== "phone" && (
//                 <button
//                   onClick={handleBack}
//                   className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black sm:left-4 sm:top-4"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                 </button>
//               )}

//               <div className="m-auto w-full max-w-xs py-6">
//                 <div className="flex justify-center md:hidden">
//                   <img
//                     src="/image/logo.png"
//                     alt="logo"
//                     className="mb-3 h-10 w-10 object-contain"
//                   />
//                 </div>

//                 <h2 className="text-center text-xl font-bold text-black md:text-left md:text-2xl">
//                   {step === "phone" && "Welcome to eCampus"}
//                   {step === "otp" && "Enter OTP"}
//                   {step === "email" && "Create Account"}
//                 </h2>

//                 <p className="mt-1.5 text-center text-xs text-gray-500 md:text-left">
//                   {step === "phone" &&
//                     "Create your account to explore India's best online degrees."}
//                   {step === "otp" && `OTP sent to ${fullPhone}`}
//                   {step === "email" && "Complete your details to continue."}
//                 </p>

//                 {error && (
//                   <div className="mt-3 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900">
//                     {error}
//                   </div>
//                 )}

//                 {step === "phone" && (
//                   <form onSubmit={handlePhoneContinue} className="mt-4">
//                     <div className="flex overflow-hidden rounded-lg border border-gray-300 transition focus-within:border-black">
//                       <div className="relative flex items-center gap-1 border-r border-gray-300 px-3">
//                         <span className="text-sm">{selectedCountry.flag}</span>
//                         <span className="text-xs font-medium text-black">
//                           {selectedCountry.code}
//                         </span>
//                         <ChevronDown className="h-3 w-3 text-gray-500" />
//                         <select
//                           value={countryCode}
//                           onChange={(e) => setCountryCode(e.target.value)}
//                           className="absolute inset-0 w-full cursor-pointer opacity-0"
//                         >
//                           {countryCodes.map((c) => (
//                             <option key={c.code} value={c.code}>
//                               {c.flag} {c.code} ({c.name})
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <input
//                         type="tel"
//                         placeholder="Enter Mobile Number"
//                         value={phone}
//                         onChange={(e) =>
//                           setPhone(e.target.value.replace(/\D/g, ""))
//                         }
//                         maxLength={15}
//                         required
//                         className="flex-1 bg-white p-2.5 text-sm outline-none placeholder-gray-500"
//                       />
//                     </div>

//                     <Button
//                       type="submit"
//                       disabled={loading || phone.length < 7}
//                       className="mt-3 h-11 w-full rounded-lg bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                     >
//                       {loading ? "Sending..." : "Continue"}
//                     </Button>

//                     <div className="my-4 flex items-center gap-3">
//                       <div className="h-px flex-1 bg-gray-300" />
//                       <span className="text-xs text-gray-500">OR</span>
//                       <div className="h-px flex-1 bg-gray-300" />
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         setStep("email");
//                         setError("");
//                       }}
//                       className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//                     >
//                       Sign up with email
//                     </button>
//                   </form>
//                 )}

//                 {step === "otp" && (
//                   <form onSubmit={handleOtpVerify} className="mt-4">
//                     <input
//                       type="text"
//                       inputMode="numeric"
//                       placeholder="6-digit OTP"
//                       value={otp}
//                       onChange={(e) =>
//                         setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                       }
//                       maxLength={6}
//                       required
//                       autoFocus
//                       className="w-full rounded-lg border border-gray-300 p-3 text-center text-base font-semibold tracking-[0.4em] outline-none transition placeholder-gray-400 focus:border-black"
//                     />

//                     <button
//                       type="button"
//                       onClick={handleResendOtp}
//                       disabled={resendCooldown > 0 || loading}
//                       className="mt-2 text-xs font-medium text-gray-600 transition hover:text-black disabled:text-gray-400"
//                     >
//                       {resendCooldown > 0
//                         ? `Resend in ${resendCooldown}s`
//                         : "Resend OTP"}
//                     </button>

//                     <Button
//                       type="submit"
//                       disabled={loading || otp.length !== 6}
//                       className="mt-3 h-11 w-full rounded-lg bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                     >
//                       {loading ? "Verifying..." : "Continue"}
//                     </Button>
//                   </form>
//                 )}

//                 {step === "email" && (
//                   <form
//                     onSubmit={handleEmailContinue}
//                     className="mt-4 space-y-2.5"
//                   >
//                     <input
//                       type="text"
//                       placeholder="Full Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                       className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <input
//                       type="email"
//                       placeholder="Email Address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <input
//                       type="password"
//                       placeholder="Password (min. 8 characters)"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       minLength={8}
//                       className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <Button
//                       type="submit"
//                       disabled={loading}
//                       className="h-11 w-full rounded-lg bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                     >
//                       {loading ? "Creating..." : "Continue"}
//                     </Button>
//                   </form>
//                 )}

//                 {/* Assured banner — mobile only, desktop already shows it in the left panel */}
//                 <button
//                   type="button"
//                   onClick={() => setAssuredOptIn((v) => !v)}
//                   className={`mt-4 flex w-full items-center justify-between rounded-xl border p-3 text-left transition md:hidden ${
//                     assuredOptIn
//                       ? "border-red-300 bg-red-50"
//                       : "border-red-100 bg-red-50/60"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2.5">
//                     <ShieldCheck className="text-red-600" size={22} />
//                     <div>
//                       <h3 className="text-xs font-semibold text-black">
//                         eCampus Assured
//                       </h3>
//                       <p className="text-[11px] text-gray-600">
//                         Get up to{" "}
//                         <span className="font-bold text-red-600">
//                           100% Refund*
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                   <span className="rounded-full bg-white px-2.5 py-1 text-[11px] text-red-600 shadow">
//                     Know More
//                   </span>
//                 </button>

//                 <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
//                   By continuing, you agree to our{" "}
//                   <a href="/terms" className="text-red-600 hover:underline">
//                     Terms
//                   </a>{" "}
//                   &{" "}
//                   <a href="/privacy" className="text-red-600 hover:underline">
//                     Privacy Policy
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function Feature({
//   icon,
//   title,
//   desc,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
// }) {
//   return (
//     <div className="flex items-start gap-2.5">
//       <div className="mt-0.5 rounded-lg bg-white/15 p-1.5">{icon}</div>
//       <div>
//         <h3 className="text-sm font-semibold">{title}</h3>
//         <p className="text-xs text-red-100">{desc}</p>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import {
//   X,
//   ArrowLeft,
//   ChevronDown,
//   ShieldCheck,
//   GraduationCap,
//   Users,
//   Laptop,
//   ArrowRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface SignupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToLogin?: () => void;
// }

// const countryCodes = [
//   { code: "+91", flag: "🇮🇳", name: "IN" },
//   { code: "+1", flag: "🇺🇸", name: "US" },
//   { code: "+44", flag: "🇬🇧", name: "GB" },
//   { code: "+61", flag: "🇦🇺", name: "AU" },
//   { code: "+971", flag: "🇦🇪", name: "AE" },
//   { code: "+65", flag: "🇸🇬", name: "SG" },
//   { code: "+60", flag: "🇲🇾", name: "MY" },
//   { code: "+49", flag: "🇩🇪", name: "DE" },
//   { code: "+33", flag: "🇫🇷", name: "FR" },
//   { code: "+81", flag: "🇯🇵", name: "JP" },
// ];

// type Step = "phone" | "otp" | "email";

// export function SignupModal({
//   isOpen,
//   onClose,
//   onSwitchToLogin,
// }: SignupModalProps) {
//   const [step, setStep] = useState<Step>("phone");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [assuredOptIn, setAssuredOptIn] = useState(false);
//   const [mode, setMode] = useState<"mobile" | "email">("mobile");

//   useEffect(() => {
//     if (resendCooldown <= 0) return;
//     const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [resendCooldown]);

//   if (!isOpen) return null;

//   const selectedCountry = countryCodes.find((c) => c.code === countryCode)!;
//   const fullPhone = `${countryCode}${phone}`;

//   const handlePhoneContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{7,15}$/.test(phone)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: fullPhone,
//           email: `${fullPhone}@otp.ecampus`,
//           name: "",
//         }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Failed to send OTP");
//       setResendCooldown(30);
//       setStep("otp");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{6}$/.test(otp)) {
//       setError("Enter the 6-digit OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone, otp }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Verification failed");
//       localStorage.setItem(
//         "ecampus_student",
//         JSON.stringify({ phone: fullPhone }),
//       );
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (resendCooldown > 0) return;
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone }),
//       });
//       const data = await res.json();
//       if (!data.success)
//         throw new Error(data.message || "Failed to resend OTP");
//       setResendCooldown(30);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const apiUrl =
//         process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
//         "http://localhost:5000";
//       const res = await fetch(`${apiUrl}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Signup failed");
//       }
//       localStorage.setItem("ecampus_student", JSON.stringify({ name, email }));
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     if (step === "otp") {
//       setOtp("");
//       setStep("phone");
//     } else {
//       setStep("phone");
//     }
//     setError("");
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain">
//         <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
//           <div
//             className="relative grid max-h-[88vh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* LEFT PANEL */}
//             <div className="hidden relative max-h-[88vh] flex-col justify-between overflow-y-auto bg-gradient-to-br from-red-700 via-red-600 to-red-500 p-8 text-white md:flex lg:p-10">
//               {/* decorative curve */}
//               <svg
//                 className="absolute -right-20 -bottom-10 h-80 w-80 opacity-20"
//                 viewBox="0 0 200 200"
//                 xmlns="http://www.w3.org/2000/svg"
//                 aria-hidden
//               >
//                 <defs>
//                   <radialGradient id="g" cx="30%" cy="30%">
//                     <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
//                     <stop offset="100%" stopColor="#000000" stopOpacity="0" />
//                   </radialGradient>
//                 </defs>
//                 <circle cx="100" cy="100" r="100" fill="url(#g)" />
//               </svg>

//               <div>
//                 <img
//                   src="/image/logo.png"
//                   alt="logo"
//                   className="mb-4 h-7 object-contain"
//                 />

//                 <h1 className="text-2xl font-extrabold leading-snug lg:text-3xl">
//                   Your Future.
//                   <br />
//                   Our Responsibility.
//                 </h1>

//                 <p className="mt-3 max-w-[18rem] text-sm text-red-100 lg:text-base">
//                   Find the right university. Build the right career.
//                 </p>

//                 <div className="mt-6 space-y-4">
//                   <Feature
//                     icon={<GraduationCap size={16} />}
//                     title="UGC Recognised Universities"
//                     desc="Study from India's top universities"
//                   />
//                   <Feature
//                     icon={<Laptop size={16} />}
//                     title="100% Online & Flexible"
//                     desc="Learn at your own pace"
//                   />
//                   <Feature
//                     icon={<Users size={16} />}
//                     title="Career Focused Programs"
//                     desc="Skills that employers value"
//                   />
//                   <Feature
//                     icon={<ShieldCheck size={16} />}
//                     title="Personal Student Support"
//                     desc="From admission till graduation"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setAssuredOptIn((v) => !v)}
//                 className={`mt-6 rounded-xl border p-3 text-left transition ${
//                   assuredOptIn
//                     ? "border-yellow-300 bg-white/20"
//                     : "border-white/20 bg-white/10"
//                 } backdrop-blur-md`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-full bg-white/20 p-2">
//                     <ShieldCheck size={18} />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold">eCampus Assured</h3>
//                     <p className="text-xs text-red-100">
//                       Get up to{" "}
//                       <span className="font-bold text-yellow-300">
//                         100% Course Fee Refund*
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             </div>

//             {/* RIGHT PANEL */}
//             <div className="relative flex max-h-[88vh] flex-col overflow-y-auto bg-white p-5 sm:p-6 md:p-8">
//               <button
//                 onClick={onClose}
//                 className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black sm:right-4 sm:top-4"
//               >
//                 <X className="h-4 w-4" />
//               </button>

//               {step !== "phone" && (
//                 <button
//                   onClick={handleBack}
//                   className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black sm:left-4 sm:top-4"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                 </button>
//               )}

//               <div className="m-auto w-full max-w-xs py-6">
//                 <div className="flex justify-center md:hidden">
//                   <img
//                     src="/image/logo.png"
//                     alt="logo"
//                     className="mb-3 h-10 w-10 object-contain"
//                   />
//                 </div>

//                 <h2 className="text-center text-xl font-bold text-black md:text-left md:text-2xl">
//                   {step === "phone" && "Welcome to eCampus"}
//                   {step === "otp" && "Enter OTP"}
//                   {step === "email" && "Create Account"}
//                 </h2>

//                 <p className="mt-1.5 text-center text-xs text-gray-500 md:text-left">
//                   {step === "phone" &&
//                     "Create your account to explore India's best online degrees."}
//                   {step === "otp" && `OTP sent to ${fullPhone}`}
//                   {step === "email" && "Complete your details to continue."}
//                 </p>

//                 {error && (
//                   <div className="mt-3 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900">
//                     {error}
//                   </div>
//                 )}

//                 {/* Segmented control */}
//                 {step === "phone" && (
//                   <>
//                     <div className="mt-4 flex items-center justify-center">
//                       <div className="rounded-full bg-red-50 p-1.5 shadow-inner">
//                         <div className="flex rounded-full bg-white/80 p-0.5">
//                           <button
//                             onClick={() => {
//                               setMode("mobile");
//                               setError("");
//                             }}
//                             className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
//                               mode === "mobile"
//                                 ? "bg-red-600 text-white shadow"
//                                 : "text-gray-600"
//                             }`}
//                           >
//                             <svg
//                               className={`h-4 w-4 ${
//                                 mode === "mobile"
//                                   ? "text-white"
//                                   : "text-red-600"
//                               }`}
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <rect
//                                 x="7"
//                                 y="3"
//                                 width="10"
//                                 height="18"
//                                 rx="2"
//                                 stroke="currentColor"
//                                 strokeWidth="1.2"
//                               />
//                             </svg>
//                             Mobile Number
//                           </button>
//                           <button
//                             onClick={() => {
//                               setMode("email");
//                               setError("");
//                               setStep("email");
//                             }}
//                             className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
//                               mode === "email"
//                                 ? "bg-red-600 text-white shadow"
//                                 : "text-gray-600"
//                             }`}
//                           >
//                             <svg
//                               className={`h-4 w-4 ${
//                                 mode === "email" ? "text-white" : "text-red-600"
//                               }`}
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 d="M3 8l9 6 9-6"
//                                 stroke="currentColor"
//                                 strokeWidth="1.2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                               <rect
//                                 x="3"
//                                 y="5"
//                                 width="18"
//                                 height="14"
//                                 rx="2"
//                                 stroke="currentColor"
//                                 strokeWidth="1.2"
//                               />
//                             </svg>
//                             Email
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <form onSubmit={handlePhoneContinue} className="mt-5">
//                       <label className="text-xs font-medium text-gray-600">
//                         Mobile Number
//                       </label>
//                       <div className="mt-2 flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition focus-within:ring-1 focus-within:ring-red-200">
//                         <div className="relative flex items-center gap-2 border-r border-gray-200 px-3">
//                           <span className="text-sm">
//                             {selectedCountry.flag}
//                           </span>
//                           <span className="text-xs font-medium text-black">
//                             {selectedCountry.code}
//                           </span>
//                           <ChevronDown className="h-3 w-3 text-gray-400" />
//                           <select
//                             value={countryCode}
//                             onChange={(e) => setCountryCode(e.target.value)}
//                             className="absolute inset-0 w-full cursor-pointer opacity-0"
//                           >
//                             {countryCodes.map((c) => (
//                               <option key={c.code} value={c.code}>
//                                 {c.flag} {c.code} ({c.name})
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <input
//                           type="tel"
//                           placeholder="Enter your mobile number"
//                           value={phone}
//                           onChange={(e) =>
//                             setPhone(e.target.value.replace(/\D/g, ""))
//                           }
//                           maxLength={15}
//                           required
//                           className="flex-1 bg-white p-3 text-sm outline-none placeholder-gray-400"
//                         />
//                       </div>

//                       <Button
//                         type="submit"
//                         disabled={loading || phone.length < 7}
//                         className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                       >
//                         <span>{loading ? "Sending..." : "Continue"}</span>
//                         <ArrowRight className="h-4 w-4" />
//                       </Button>

//                       <div className="my-4 flex items-center gap-3">
//                         <div className="h-px flex-1 bg-gray-200" />
//                         <span className="text-xs text-gray-400">OR</span>
//                         <div className="h-px flex-1 bg-gray-200" />
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setStep("email");
//                           setMode("email");
//                           setError("");
//                         }}
//                         className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//                       >
//                         Sign up with email instead
//                       </button>
//                     </form>
//                   </>
//                 )}

//                 {step === "otp" && (
//                   <form onSubmit={handleOtpVerify} className="mt-4">
//                     <input
//                       type="text"
//                       inputMode="numeric"
//                       placeholder="6-digit OTP"
//                       value={otp}
//                       onChange={(e) =>
//                         setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                       }
//                       maxLength={6}
//                       required
//                       autoFocus
//                       className="w-full rounded-lg border border-gray-200 p-3 text-center text-base font-semibold tracking-[0.4em] outline-none transition placeholder-gray-400 focus:border-black"
//                     />

//                     <button
//                       type="button"
//                       onClick={handleResendOtp}
//                       disabled={resendCooldown > 0 || loading}
//                       className="mt-3 text-xs font-medium text-gray-600 transition hover:text-black disabled:text-gray-400"
//                     >
//                       {resendCooldown > 0
//                         ? `Resend in ${resendCooldown}s`
//                         : "Resend OTP"}
//                     </button>

//                     <Button
//                       type="submit"
//                       disabled={loading || otp.length !== 6}
//                       className="mt-4 h-12 w-full rounded-full bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                     >
//                       {loading ? "Verifying..." : "Continue"}
//                     </Button>
//                   </form>
//                 )}

//                 {step === "email" && (
//                   <form
//                     onSubmit={handleEmailContinue}
//                     className="mt-4 space-y-2.5"
//                   >
//                     <input
//                       type="text"
//                       placeholder="Full Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                       className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <input
//                       type="email"
//                       placeholder="Email Address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <input
//                       type="password"
//                       placeholder="Password (min. 8 characters)"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       minLength={8}
//                       className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <Button
//                       type="submit"
//                       disabled={loading}
//                       className="h-12 w-full rounded-full bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                     >
//                       {loading ? "Creating..." : "Continue"}
//                     </Button>
//                   </form>
//                 )}

//                 {/* Assured banner — mobile only, desktop already shows it in the left panel */}
//                 <button
//                   type="button"
//                   onClick={() => setAssuredOptIn((v) => !v)}
//                   className={`mt-5 flex w-full items-center justify-between rounded-xl border p-3 text-left transition md:hidden ${
//                     assuredOptIn
//                       ? "border-red-300 bg-red-50"
//                       : "border-red-100 bg-red-50/60"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2.5">
//                     <ShieldCheck className="text-red-600" size={22} />
//                     <div>
//                       <h3 className="text-xs font-semibold text-black">
//                         eCampus Assured
//                       </h3>
//                       <p className="text-[11px] text-gray-600">
//                         Get up to{" "}
//                         <span className="font-bold text-red-600">
//                           100% Refund*
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                   <span className="rounded-full bg-white px-2.5 py-1 text-[11px] text-red-600 shadow">
//                     Know More
//                   </span>
//                 </button>

//                 <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
//                   By continuing, you agree to our{" "}
//                   <a href="/terms" className="text-red-600 hover:underline">
//                     Terms
//                   </a>{" "}
//                   &{" "}
//                   <a href="/privacy" className="text-red-600 hover:underline">
//                     Privacy Policy
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function Feature({
//   icon,
//   title,
//   desc,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
// }) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
//         {icon}
//       </div>
//       <div>
//         <h3 className="text-sm font-semibold">{title}</h3>
//         <p className="text-xs text-red-100">{desc}</p>
//       </div>
//     </div>
//   );
// }

// test

// import { useState, useEffect } from "react";
// import {
//   X,
//   ArrowLeft,
//   ChevronDown,
//   ChevronRight,
//   ShieldCheck,
//   GraduationCap,
//   Users,
//   Laptop,
//   Award,
//   ArrowRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface SignupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToLogin?: () => void;
// }

// const countryCodes = [
//   { code: "+91", flag: "🇮🇳", name: "IN" },
//   { code: "+1", flag: "🇺🇸", name: "US" },
//   { code: "+44", flag: "🇬🇧", name: "GB" },
//   { code: "+61", flag: "🇦🇺", name: "AU" },
//   { code: "+971", flag: "🇦🇪", name: "AE" },
//   { code: "+65", flag: "🇸🇬", name: "SG" },
//   { code: "+60", flag: "🇲🇾", name: "MY" },
//   { code: "+49", flag: "🇩🇪", name: "DE" },
//   { code: "+33", flag: "🇫🇷", name: "FR" },
//   { code: "+81", flag: "🇯🇵", name: "JP" },
// ];

// type Step = "phone" | "otp" | "email";

// export function SignupModal({
//   isOpen,
//   onClose,
//   onSwitchToLogin,
// }: SignupModalProps) {
//   const [step, setStep] = useState<Step>("phone");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [assuredOptIn, setAssuredOptIn] = useState(false);
//   const [mode, setMode] = useState<"mobile" | "email">("mobile");

//   useEffect(() => {
//     if (resendCooldown <= 0) return;
//     const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [resendCooldown]);

//   if (!isOpen) return null;

//   const selectedCountry = countryCodes.find((c) => c.code === countryCode)!;
//   const fullPhone = `${countryCode}${phone}`;

//   const handlePhoneContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{7,15}$/.test(phone)) {
//       setError("Please enter a valid phone number.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: fullPhone,
//           email: `${fullPhone}@otp.ecampus`,
//           name: "",
//         }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Failed to send OTP");
//       setResendCooldown(30);
//       setStep("otp");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!/^\d{6}$/.test(otp)) {
//       setError("Enter the 6-digit OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone, otp }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error(data.message || "Verification failed");
//       localStorage.setItem(
//         "ecampus_student",
//         JSON.stringify({ phone: fullPhone }),
//       );
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (resendCooldown > 0) return;
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: fullPhone }),
//       });
//       const data = await res.json();
//       if (!data.success)
//         throw new Error(data.message || "Failed to resend OTP");
//       setResendCooldown(30);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const apiUrl =
//         process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
//         "http://localhost:5000";
//       const res = await fetch(`${apiUrl}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Signup failed");
//       }
//       localStorage.setItem("ecampus_student", JSON.stringify({ name, email }));
//       window.dispatchEvent(new Event("ecampus-auth-change"));
//       onClose();
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     if (step === "otp") {
//       setOtp("");
//       setStep("phone");
//     } else {
//       setStep("phone");
//     }
//     setError("");
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain">
//         <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
//           <div
//             className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* LEFT PANEL */}
//             <div className="hidden relative flex-col justify-between overflow-hidden bg-gradient-to-br from-red-800 via-red-600 to-red-500 p-8 text-white md:flex lg:p-10">
//               {/* decorative curved bg overlay */}
//               <svg
//                 className="pointer-events-none absolute inset-0 h-full w-full"
//                 viewBox="0 0 400 700"
//                 preserveAspectRatio="xMidYMid slice"
//                 xmlns="http://www.w3.org/2000/svg"
//                 aria-hidden
//               >
//                 <defs>
//                   <radialGradient id="glowTopRight" cx="30%" cy="30%">
//                     <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
//                     <stop offset="100%" stopColor="#000000" stopOpacity="0" />
//                   </radialGradient>
//                 </defs>
//                 <path
//                   d="M -50 550 C 80 480, 120 620, 260 560 C 380 510, 420 640, 500 600 L 500 750 L -50 750 Z"
//                   fill="#000000"
//                   opacity="0.10"
//                 />
//                 <path
//                   d="M -50 620 C 100 560, 180 700, 320 630 C 420 585, 460 700, 520 660 L 520 750 L -50 750 Z"
//                   fill="#000000"
//                   opacity="0.14"
//                 />
//                 <path
//                   d="M 250 -50 C 340 40, 300 150, 420 180 C 480 195, 520 140, 560 200 L 560 -50 Z"
//                   fill="#ffffff"
//                   opacity="0.06"
//                 />
//                 <circle cx="360" cy="120" r="140" fill="url(#glowTopRight)" />
//               </svg>

//               <div className="relative z-10">
//                 <h1 className="text-2xl font-extrabold leading-snug lg:text-3xl">
//                   Your Future.
//                   <br />
//                   Our Responsibility.
//                 </h1>

//                 <p className="mt-3 max-w-[18rem] text-sm text-red-100 lg:text-base">
//                   Find the right university. Build the right career.
//                 </p>

//                 <div className="mt-6 space-y-4">
//                   <Feature
//                     icon={<GraduationCap size={16} />}
//                     title="UGC Recognised Universities"
//                     desc="Study from India's top universities"
//                   />
//                   <Feature
//                     icon={<Laptop size={16} />}
//                     title="100% Online & Flexible"
//                     desc="Learn at your own pace"
//                   />
//                   <Feature
//                     icon={<Award size={16} />}
//                     title="Career-Focused Programs"
//                     desc="Skills for a better tomorrow"
//                   />
//                   <Feature
//                     icon={<Users size={16} />}
//                     title="Personalised Student Support"
//                     desc="From admission to graduation"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setAssuredOptIn((v) => !v)}
//                 className={`relative z-10 mt-6 rounded-xl border p-3 text-left transition ${
//                   assuredOptIn
//                     ? "border-yellow-300 bg-white/20"
//                     : "border-white/20 bg-white/10"
//                 } backdrop-blur-md`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="rounded-full bg-white/20 p-2">
//                     <ShieldCheck size={18} />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold">eCampus Assured</h3>
//                     <p className="text-xs text-red-100">
//                       Get up to{" "}
//                       <span className="font-bold text-yellow-300">
//                         100% Course Fee Refund*
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             </div>

//             {/* RIGHT PANEL */}
//             <div className="relative flex flex-col bg-white p-5 sm:p-6 md:p-8">
//               <button
//                 onClick={onClose}
//                 className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black sm:right-4 sm:top-4"
//               >
//                 <X className="h-4 w-4" />
//               </button>

//               {step !== "phone" && (
//                 <button
//                   onClick={handleBack}
//                   className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black sm:left-4 sm:top-4"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                 </button>
//               )}

//               <div className="m-auto w-full max-w-xs py-4">
//                 <div className="flex justify-center">
//                   <img
//                     src="/image/logo.png"
//                     alt="logo"
//                     className="mb-2 h-6 object-contain"
//                   />
//                 </div>

//                 <h2 className="text-center text-lg font-bold text-black md:text-left md:text-xl">
//                   {step === "phone" && "Welcome to eCampus!"}
//                   {step === "otp" && "Enter OTP"}
//                   {step === "email" && "Create Account"}
//                 </h2>

//                 <p className="mt-1 text-center text-xs text-gray-500 md:text-left">
//                   {step === "phone" &&
//                     "Create your account to explore top online programs"}
//                   {step === "otp" && `OTP sent to ${fullPhone}`}
//                   {step === "email" && "Complete your details to continue."}
//                 </p>

//                 {error && (
//                   <div className="mt-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900">
//                     {error}
//                   </div>
//                 )}

//                 {/* Segmented control */}
//                 {step === "phone" && (
//                   <>
//                     <div className="mt-3">
//                       <div className="flex rounded-2xl bg-red-50 p-1">
//                         <button
//                           onClick={() => {
//                             setMode("mobile");
//                             setError("");
//                           }}
//                           className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2 text-xs font-semibold transition sm:gap-2 sm:px-4 sm:text-sm ${
//                             mode === "mobile"
//                               ? "bg-white text-red-600 shadow-sm"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           <svg
//                             className={`h-4 w-4 shrink-0 ${
//                               mode === "mobile"
//                                 ? "text-red-600"
//                                 : "text-gray-400"
//                             }`}
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <rect
//                               x="7"
//                               y="3"
//                               width="10"
//                               height="18"
//                               rx="2"
//                               stroke="currentColor"
//                               strokeWidth="1.2"
//                             />
//                           </svg>
//                           Mobile Number
//                         </button>
//                         <button
//                           onClick={() => {
//                             setMode("email");
//                             setError("");
//                             setStep("email");
//                           }}
//                           className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2 text-xs font-semibold transition sm:gap-2 sm:px-4 sm:text-sm ${
//                             mode === "email"
//                               ? "bg-white text-red-600 shadow-sm"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           <svg
//                             className={`h-4 w-4 shrink-0 ${
//                               mode === "email"
//                                 ? "text-red-600"
//                                 : "text-gray-400"
//                             }`}
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M3 8l9 6 9-6"
//                               stroke="currentColor"
//                               strokeWidth="1.2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <rect
//                               x="3"
//                               y="5"
//                               width="18"
//                               height="14"
//                               rx="2"
//                               stroke="currentColor"
//                               strokeWidth="1.2"
//                             />
//                           </svg>
//                           Email
//                         </button>
//                       </div>
//                     </div>

//                     <form onSubmit={handlePhoneContinue} className="mt-3">
//                       <label className="text-xs font-medium text-gray-600">
//                         Mobile Number
//                       </label>
//                       <div className="mt-1.5 flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition focus-within:ring-1 focus-within:ring-red-200">
//                         <div className="relative flex items-center gap-2 border-r border-gray-200 px-3">
//                           <span className="text-sm">
//                             {selectedCountry.flag}
//                           </span>
//                           <span className="text-xs font-medium text-black">
//                             {selectedCountry.code}
//                           </span>
//                           <ChevronDown className="h-3 w-3 text-gray-400" />
//                           <select
//                             value={countryCode}
//                             onChange={(e) => setCountryCode(e.target.value)}
//                             className="absolute inset-0 w-full cursor-pointer opacity-0"
//                           >
//                             {countryCodes.map((c) => (
//                               <option key={c.code} value={c.code}>
//                                 {c.flag} {c.code} ({c.name})
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <input
//                           type="tel"
//                           placeholder="Enter your mobile number"
//                           value={phone}
//                           onChange={(e) =>
//                             setPhone(e.target.value.replace(/\D/g, ""))
//                           }
//                           maxLength={15}
//                           required
//                           className="flex-1 bg-white p-2.5 text-sm outline-none placeholder-gray-400"
//                         />
//                       </div>

//                       <Button
//                         type="submit"
//                         disabled={loading || phone.length < 7}
//                         className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                       >
//                         <span>{loading ? "Sending..." : "Continue"}</span>
//                         <ArrowRight className="h-4 w-4" />
//                       </Button>

//                       <div className="my-3 flex items-center gap-3">
//                         <div className="h-px flex-1 bg-gray-200" />
//                         <span className="text-xs text-gray-400">or</span>
//                         <div className="h-px flex-1 bg-gray-200" />
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setStep("email");
//                           setMode("email");
//                           setError("");
//                         }}
//                         className="w-full py-0.5 text-center text-sm font-semibold text-gray-800 transition hover:text-red-600"
//                       >
//                         Sign up with email instead
//                       </button>
//                     </form>
//                   </>
//                 )}

//                 {step === "otp" && (
//                   <form onSubmit={handleOtpVerify} className="mt-3">
//                     <input
//                       type="text"
//                       inputMode="numeric"
//                       placeholder="6-digit OTP"
//                       value={otp}
//                       onChange={(e) =>
//                         setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                       }
//                       maxLength={6}
//                       required
//                       autoFocus
//                       className="w-full rounded-lg border border-gray-200 p-3 text-center text-base font-semibold tracking-[0.4em] outline-none transition placeholder-gray-400 focus:border-black"
//                     />

//                     <button
//                       type="button"
//                       onClick={handleResendOtp}
//                       disabled={resendCooldown > 0 || loading}
//                       className="mt-2 text-xs font-medium text-gray-600 transition hover:text-black disabled:text-gray-400"
//                     >
//                       {resendCooldown > 0
//                         ? `Resend in ${resendCooldown}s`
//                         : "Resend OTP"}
//                     </button>

//                     <Button
//                       type="submit"
//                       disabled={loading || otp.length !== 6}
//                       className="mt-3 h-11 w-full rounded-full bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                     >
//                       {loading ? "Verifying..." : "Continue"}
//                     </Button>
//                   </form>
//                 )}

//                 {step === "email" && (
//                   <form
//                     onSubmit={handleEmailContinue}
//                     className="mt-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       placeholder="Full Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                       className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <input
//                       type="email"
//                       placeholder="Email Address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <input
//                       type="password"
//                       placeholder="Password (min. 8 characters)"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       minLength={8}
//                       className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none transition placeholder-gray-500 focus:border-black"
//                     />
//                     <Button
//                       type="submit"
//                       disabled={loading}
//                       className="h-11 w-full rounded-full bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:text-gray-500"
//                     >
//                       {loading ? "Creating..." : "Continue"}
//                     </Button>
//                   </form>
//                 )}

//                 {/* Assured banner — shown in the logo panel (both mobile & desktop), single instance */}
//                 <button
//                   type="button"
//                   onClick={() => setAssuredOptIn((v) => !v)}
//                   className={`mt-3 w-full rounded-lg border p-2.5 text-left transition ${
//                     assuredOptIn
//                       ? "border-red-300 bg-red-50"
//                       : "border-red-100 bg-red-50/60"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <ShieldCheck className="text-red-600" size={16} />
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-[11px] font-semibold text-black">
//                           eCampus Assured
//                         </h3>
//                         <span className="flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">
//                           Know More
//                           <ChevronRight size={10} />
//                         </span>
//                       </div>
//                       <p className="text-[10px] text-gray-600">
//                         Get up to{" "}
//                         <span className="font-bold text-red-600">
//                           100% Course Fee Refund*
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </button>

//                 <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500">
//                   By continuing, you agree to our{" "}
//                   <a href="/terms" className="text-red-600 hover:underline">
//                     Terms
//                   </a>{" "}
//                   &{" "}
//                   <a href="/privacy" className="text-red-600 hover:underline">
//                     Privacy Policy
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function Feature({
//   icon,
//   title,
//   desc,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
// }) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
//         {icon}
//       </div>
//       <div>
//         <h3 className="text-sm font-semibold">{title}</h3>
//         <p className="text-xs text-red-100">{desc}</p>
//       </div>
//     </div>
//   );
// }

// 19 aug


"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  X,
  ArrowLeft,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "GB" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+971", flag: "🇦🇪", name: "AE" },
  { code: "+65", flag: "🇸🇬", name: "SG" },
  { code: "+60", flag: "🇲🇾", name: "MY" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+81", flag: "🇯🇵", name: "JP" },
];

type Step = "phone" | "otp";
type SignupMode = "mobile" | "email";

export function SignupModal({
  isOpen,
  onClose,
}: SignupModalProps) {
  const [step, setStep] = useState<Step>("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [assuredOptIn, setAssuredOptIn] = useState(false);
  const [mode, setMode] = useState<SignupMode>("mobile");

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const t = setTimeout(
      () => setResendCooldown((s) => s - 1),
      1000,
    );

    return () => clearTimeout(t);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const selectedCountry = countryCodes.find(
    (c) => c.code === countryCode,
  )!;

  const fullPhone = `${countryCode}${phone}`;

  const handleModeChange = (nextMode: SignupMode) => {
    setMode(nextMode);
    setError("");
  };

  const handlePhoneContinue = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{7,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullPhone,
          email: `${fullPhone}@otp.ecampus`,
          name: "",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setResendCooldown(30);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fullPhone,
          otp,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Verification failed");
      }

      localStorage.setItem(
        "ecampus_student",
        JSON.stringify({ phone: fullPhone }),
      );

      window.dispatchEvent(new Event("ecampus-auth-change"));
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setResendCooldown(30);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailContinue = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
        "http://localhost:5000";

      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem(
        "ecampus_student",
        JSON.stringify({ name, email }),
      );

      window.dispatchEvent(new Event("ecampus-auth-change"));
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setOtp("");
    setStep("phone");
    setError("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
          {/* Fixed / stable modal size */}
          <div
            className="
              relative
              w-full
              max-w-[380px]
              min-h-[430px]
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="
                absolute right-3.5 top-3.5 z-20
                flex h-8 w-8
                items-center justify-center
                rounded-full
                bg-gray-100
                text-gray-600
                transition
                hover:bg-gray-200
                hover:text-black
              "
            >
              <X className="h-4 w-4" />
            </button>

            {/* Back button */}
            {step === "otp" && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back"
                className="
                  absolute left-3.5 top-3.5 z-20
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-600
                  transition
                  hover:bg-gray-200
                  hover:text-black
                "
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}

            <div className="flex min-h-[430px] flex-col bg-white px-5 py-6 sm:px-7 sm:py-7">
              <div className="mx-auto flex w-full max-w-[330px] flex-1 flex-col">
                {/* Logo */}
                <div className="flex justify-center">
                  <img
                    src="/image/logo.png"
                    alt="eCampus"
                    className="h-6 w-auto object-contain"
                  />
                </div>

                {/* Heading */}
                <div className="mt-4">
                  <h2 className="text-center text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                    {step === "otp"
                      ? "Enter OTP"
                      : mode === "email"
                        ? "Create Account"
                        : "Welcome to eCampus!"}
                  </h2>

                  <p className="mx-auto mt-1.5 max-w-[300px] text-center text-sm leading-5 text-gray-600">
                    {step === "otp"
                      ? `OTP sent to ${fullPhone}`
                      : mode === "email"
                        ? "Complete your details to continue."
                        : "Create your account to explore top online programs"}
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-3 rounded-lg border border-red-300 bg-red-50 px-3.5 py-2 text-xs font-medium leading-4 text-red-700">
                    {error}
                  </div>
                )}

                {/* Mode tabs */}
                {step === "phone" && (
                  <div className="mt-5">
                    <div className="flex w-full gap-1.5 rounded-xl bg-red-50 p-1">
                      <button
                        type="button"
                        onClick={() => handleModeChange("mobile")}
                        className={`
                          flex h-10 flex-1 items-center justify-center
                          rounded-lg
                          px-2
                          text-[13px]
                          font-semibold
                          transition-all
                          sm:text-sm
                          ${
                            mode === "mobile"
                              ? "bg-white text-red-600 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }
                        `}
                      >
                        Mobile Number
                      </button>

                      <button
                        type="button"
                        onClick={() => handleModeChange("email")}
                        className={`
                          flex h-10 flex-1 items-center justify-center
                          rounded-lg
                          px-2
                          text-[13px]
                          font-semibold
                          transition-all
                          sm:text-sm
                          ${
                            mode === "email"
                              ? "bg-white text-red-600 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }
                        `}
                      >
                        Email
                      </button>
                    </div>
                  </div>
                )}

                {/* Forms */}
                {step === "phone" && (
                  <div className="mt-4">
                    {/* Mobile form */}
                    {mode === "mobile" && (
                      <form
                        onSubmit={handlePhoneContinue}
                        className="flex flex-col gap-3"
                      >
                        <div
                          className="
                            flex h-[50px]
                            overflow-hidden
                            rounded-xl
                            border border-gray-300
                            bg-white
                            shadow-sm
                            transition-all
                            focus-within:border-red-400
                            focus-within:ring-2
                            focus-within:ring-red-100
                          "
                        >
                          <div
                            className="
                              relative
                              flex
                              shrink-0
                              items-center
                              gap-1.5
                              border-r
                              border-gray-300
                              bg-gray-50
                              px-3
                            "
                          >
                            <span className="text-base leading-none">
                              {selectedCountry.flag}
                            </span>

                            <span className="text-sm font-semibold text-gray-900">
                              {selectedCountry.code}
                            </span>

                            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />

                            <select
                              value={countryCode}
                              onChange={(e) =>
                                setCountryCode(e.target.value)
                              }
                              className="
                                absolute inset-0
                                h-full w-full
                                cursor-pointer
                                opacity-0
                              "
                            >
                              {countryCodes.map((c) => (
                                <option
                                  key={c.code}
                                  value={c.code}
                                >
                                  {c.flag} {c.code} ({c.name})
                                </option>
                              ))}
                            </select>
                          </div>

                          <input
                            type="tel"
                            inputMode="numeric"
                            placeholder="10-digit number"
                            value={phone}
                            onChange={(e) =>
                              setPhone(
                                e.target.value.replace(/\D/g, ""),
                              )
                            }
                            maxLength={15}
                            required
                            className="
                              min-w-0
                              flex-1
                              bg-white
                              px-3.5
                              text-base
                              font-semibold
                              text-gray-900
                              outline-none
                              placeholder:text-sm
                              placeholder:font-normal
                              placeholder:text-gray-400
                            "
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={
                            loading || phone.length < 7
                          }
                          className="
                            h-11
                            w-full
                            rounded-full
                            bg-red-600
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:bg-gray-300
                            disabled:text-gray-500
                          "
                        >
                          <span>
                            {loading ? "Sending..." : "Continue"}
                          </span>

                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                      </form>
                    )}

                    {/* Email form */}
                    {mode === "email" && (
                      <form
                        onSubmit={handleEmailContinue}
                        className="flex flex-col gap-3"
                      >
                        <input
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          required
                          className="
                            h-[50px]
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-3.5
                            text-base
                            text-gray-900
                            outline-none
                            transition-all
                            placeholder:text-sm
                            placeholder:text-gray-400
                            focus:border-red-400
                            focus:ring-2
                            focus:ring-red-100
                          "
                        />

                        <Button
                          type="submit"
                          disabled={loading || !email}
                          className="
                            h-11
                            w-full
                            rounded-full
                            bg-red-600
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:bg-gray-300
                            disabled:text-gray-500
                          "
                        >
                          {loading ? "Sending..." : "Continue"}
                        </Button>
                      </form>
                    )}
                  </div>
                )}

                {/* OTP */}
                {step === "otp" && (
                  <form
                    onSubmit={handleOtpVerify}
                    className="mt-5"
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="0 0 0 0 0 0"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6),
                        )
                      }
                      maxLength={6}
                      required
                      autoFocus
                      className="
                        h-[54px]
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        text-center
                        text-2xl
                        font-bold
                        tracking-[0.35em]
                        outline-none
                        transition-all
                        placeholder:text-gray-300
                        focus:border-red-400
                        focus:ring-2
                        focus:ring-red-100
                      "
                    />

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={
                        resendCooldown > 0 || loading
                      }
                      className="
                        mt-2.5
                        block
                        w-full
                        text-center
                        text-xs
                        font-semibold
                        text-gray-600
                        transition
                        hover:text-red-600
                        disabled:text-gray-400
                      "
                    >
                      {resendCooldown > 0
                        ? `Resend in ${resendCooldown}s`
                        : "Resend OTP"}
                    </button>

                    <Button
                      type="submit"
                      disabled={
                        loading || otp.length !== 6
                      }
                      className="
                        mt-3
                        h-11
                        w-full
                        rounded-full
                        bg-red-600
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                        disabled:bg-gray-300
                        disabled:text-gray-500
                      "
                    >
                      {loading ? "Verifying..." : "Continue"}
                    </Button>
                  </form>
                )}

                {/* Terms */}
                <div className="mt-auto pt-6">
                  <p className="mx-auto max-w-[310px] text-center text-[11px] leading-[17px] text-gray-600 sm:text-xs">
                    By continuing, you agree to our{" "}
                    <a
                      href="/terms"
                      className="font-semibold text-red-600 hover:text-red-700 hover:underline"
                    >
                      Terms
                    </a>{" "}
                    &{" "}
                    <a
                      href="/privacy"
                      className="font-semibold text-red-600 hover:text-red-700 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}