import { Footer } from "@/components/layout/footer";
import GGUDoctorateHero from "@/components/programs/ggu/ggu-hero";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";
import GGUWhoCanApply from "@/components/programs/ggu/who-can-apply/who-can-apply";
import WhoFaq from "@/components/programs/ggu/who-can-apply/who-faq";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <GGUDoctorateHero />
      <GGUWhoCanApply />
      <WhoFaq />
      <DoctorateUniversitySection />
      <GGUDoctorateTestimonials />
      <Footer />
    </>
  );
}
