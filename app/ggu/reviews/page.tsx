import { Footer } from "@/components/layout/footer";
import GGUEMIDetails from "@/components/programs/ggu/emi-details/emi-details";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";
import GGUReviews from "@/components/programs/ggu/reviews/reviews";
import GGUReviewsFAQ from "@/components/programs/ggu/reviews/reviewsfaq";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <GGUReviews />
      <GGUReviewsFAQ />
      {/* <DoctorateUniversitySection />
      <GGUDoctorateTestimonials /> */}
      <Footer />
    </>
  );
}
