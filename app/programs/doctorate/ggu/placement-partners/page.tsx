import { Footer } from "@/components/layout/footer";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";
import GGUPlacementPartners from "@/components/programs/ggu/placement-partners/placement-partners";
import PlacementPartnersFAQ from "@/components/programs/ggu/placement-partners/placement-partners-faq ";

export default function Page() {
  return (
    <>
      <GguSubHeader />

      <GGUPlacementPartners />
      <PlacementPartnersFAQ />

      {/* <DoctorateUniversitySection />
      <GGUDoctorateTestimonials /> */}
      <Footer />
    </>
  );
}
