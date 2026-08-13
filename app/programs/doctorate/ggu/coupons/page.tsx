import { Footer } from "@/components/layout/footer";
import GGUCoupons from "@/components/programs/ggu/coupons/coupons";
import GGUCouponsFAQ from "@/components/programs/ggu/coupons/couponsfaq";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";

export default function Page() {
  return (
    <>
      <GguSubHeader />

      <GGUCoupons />
      <GGUCouponsFAQ />
      {/* <DoctorateUniversitySection />
      <GGUDoctorateTestimonials /> */}
      <Footer />
    </>
  );
}
