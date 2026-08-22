import { Footer } from "@/components/layout/footer";
import GGUFaculty from "@/components/programs/ggu/faculty/faculty";
import FacultyFAQ from "@/components/programs/ggu/faculty/facultyfaq";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <GGUFaculty />
      <FacultyFAQ />
      {/* <DoctorateUniversitySection />
      <GGUDoctorateTestimonials /> */}
      <Footer />
    </>
  );
}
