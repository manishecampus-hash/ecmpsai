import { Footer } from "@/components/layout/footer";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";
import SpecializationFaq from "@/components/programs/ggu/specializations/specializationfaq";
import GGUSpecializationsCarousel from "@/components/programs/ggu/who-can-apply/gguspecializationscarousel";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <GGUSpecializationsCarousel />;
      <SpecializationFaq />
      <DoctorateUniversitySection />
      <GGUDoctorateTestimonials />
      <Footer />
    </>
  );
}
