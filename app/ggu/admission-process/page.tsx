import { Footer } from "@/components/layout/footer";
import GGUAdmissionProcess from "@/components/programs/ggu/admission-process/admission-process";
import AdmissionFAQ from "@/components/programs/ggu/admission-process/admission-process-faq";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <GGUAdmissionProcess />;
      <AdmissionFAQ />
      {/* <DoctorateUniversitySection />
      <GGUDoctorateTestimonials /> */}
      <Footer />
    </>
  );
}
