// "use client";

// import React from "react";
// import {
//   Headphones,
//   Mail,
//   MapPin,
//   MessageCircle,
//   Phone,
//   Send,
// } from "lucide-react";

// const Banner = () => {
//   return (
//     <section className="relative w-full overflow-hidden bg-white">
//       <div className="mx-auto max-w-7xl px-6 pt-0 pb-12 lg:px-8 lg:pb-16 lg:pt-0">
//         <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
//           <div className="relative z-10">
//             <h1 className="mt-2 text-[23px] font-bold tracking-tight text-gray-900 whitespace-nowrap sm:text-3xl md:text-4xl">
//               Let&apos;s Start a
//               <br />
//               <span className="text-red-500">Conversation</span>
//             </h1>

//             <div className="mt-5 flex items-center gap-2">
//               <span className="h-1 w-16 rounded-full bg-red-500" />
//               <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
//             </div>

//             <p className="mt-6 max-w-[540px] text-base leading-8 text-slate-600 md:text-lg">
//               Have questions about courses, universities, admissions, or your
//               career? Our team is here to guide you with the right information
//               and support.
//             </p>

           

            
//             <div className="mt-7 flex flex-col gap-4 sm:flex-row">
//               <button className="inline-flex h-11 w-fit items-center justify-center self-start rounded-[13px] bg-[#f83d46] px-5 text-sm font-bold text-white shadow-[0_10px_18px_rgba(248,61,70,0.28)] transition hover:bg-[#ef343d] active:scale-[0.99]">
//               <Send size={19} />
//                Contact Our Team
//               </button>

//               <button className="inline-flex h-11 w-[170px] items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-[#dfe5ee] bg-white px-5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99]">
//                <MessageCircle size={19} />
//                 Explore Support
//               </button>
//             </div>

           

            
          
//           </div>

//           <div className="relative min-h-[500px] lg:min-h-[620px]">
//             <div className="absolute bottom-0 right-0 h-[90%] w-[94%] overflow-hidden rounded-bl-[80px] rounded-br-[32px] rounded-tl-[80px] rounded-tr-[32px] shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
//               <img
//                 src="/contact/bannerimg.png"
//                 alt="Contact Us"
//                 className="h-full w-full object-cover object-center"
//               />
//             </div>

//             <div className="absolute bottom-3 left-0 grid grid-cols-5 gap-2">
//               {Array.from({ length: 20 }).map((_, index) => (
//                 <span key={index} className="h-1 w-1 rounded-full bg-red-500" />
//               ))}
//             </div>

//             <div className="absolute bottom-6 left-0 z-10 w-[210px] rounded-2xl bg-red-500 p-6 text-white shadow-xl shadow-red-500/20">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
//                 <Headphones size={23} />
//               </div>

//               <h3 className="mt-4 text-lg font-bold">
//                 We&apos;re here
//                 <br />
//                 to help!
//               </h3>

//               <div className="my-4 h-px w-full bg-white/30" />

//               <p className="text-sm leading-6 text-white/95">
//                 Get the answers
//                 <br />
//                 you need.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;


"use client";

import React from "react";
import {
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-0 pb-8 sm:px-6 md:pb-12 lg:px-8 lg:pb-16 lg:pt-0">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10">
            <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
              Let&apos;s Start a
              <br />
              <span className="text-red-500">Conversation</span>
            </h1>

            <div className="mt-4 sm:mt-5 flex items-center gap-2">
              <span className="h-1 w-12 sm:w-16 rounded-full bg-red-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            </div>

            <p className="mt-4 sm:mt-6 max-w-[540px] text-sm sm:text-base leading-6 sm:leading-8 text-slate-600 lg:text-lg">
              Have questions about courses, universities, admissions, or your
              career? Our team is here to guide you with the right information
              and support.
            </p>

            {/* Quick Contact Badges */}
            <div className="mt-5 flex flex-wrap gap-3 items-center">
              <a
                href="tel:18001216201"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-bold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all shadow-xs"
              >
                <Phone size={16} className="text-red-500 shrink-0" />
                <span>1800-121-6201 (Toll Free)</span>
              </a>

              <a
                href="mailto:support@ecampusapp.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-bold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-xs"
              >
                <Mail size={16} className="text-blue-500 shrink-0" />
                <span>support@ecampusapp.com</span>
              </a>
            </div>

            <div className="mt-6 sm:mt-7 flex flex-col gap-3 sm:gap-4 sm:flex-row">
              <a
                href="tel:18001216201"
                className="inline-flex h-9 sm:h-11 w-fit items-center gap-2 justify-center self-start rounded-[13px] bg-[#f83d46] px-4 sm:px-5 text-xs sm:text-sm font-bold text-white shadow-[0_10px_18px_rgba(248,61,70,0.28)] transition hover:bg-[#ef343d] active:scale-[0.99]"
              >
                <Phone size={16} className="sm:size-[19px]" />
                Call Counsellor Now
              </a>

              <a
                href="https://wa.me/919355907564"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 sm:h-11 w-fit items-center gap-2 justify-center self-start rounded-[13px] border border-slate-200 bg-white px-4 sm:px-5 text-xs sm:text-sm font-bold text-slate-800 shadow-sm transition hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 active:scale-[0.99]"
              >
                <MessageCircle size={16} className="sm:size-[19px] text-emerald-500" />
                WhatsApp Chat
              </a>
            </div>

           

            
          
          </div>

          <div className="relative min-h-[250px] sm:min-h-[300px] lg:min-h-[380px]">
            <div className="absolute bottom-0 right-0 h-[90%] w-[90%] sm:h-[85%] sm:w-[75%] overflow-hidden rounded-bl-[40px] sm:rounded-bl-[60px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tl-[40px] sm:rounded-tl-[60px] rounded-tr-[16px] sm:rounded-tr-[24px] shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
              <img
                src="/contact/bannerimg.png"
                alt="Contact Us"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute bottom-2 sm:bottom-3 left-0 grid grid-cols-5 gap-1 sm:gap-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <span key={index} className="h-0.5 sm:h-1 w-0.5 sm:w-1 rounded-full bg-red-500" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;