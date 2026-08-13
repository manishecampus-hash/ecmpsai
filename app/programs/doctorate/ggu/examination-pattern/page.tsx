import { Footer } from "@/components/layout/footer";
import ExamPattern from "@/components/programs/ggu/examination-pattern/examination-pattern";
import ExamPatternFAQ from "@/components/programs/ggu/examination-pattern/exampatternfaq";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";

export default function Page() {
  return (
    <>
      <GguSubHeader />

      <ExamPattern />
      <ExamPatternFAQ />
      {/* <DoctorateUniversitySection />
      <GGUDoctorateTestimonials /> */}
      <Footer />
    </>
  );
}
