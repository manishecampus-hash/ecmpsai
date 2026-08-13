import { Footer } from "@/components/layout/footer";

import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";
import GGUSyllabusPage from "@/components/programs/ggu/syllabus/syllabus";
import SyllabusFAQ from "@/components/programs/ggu/syllabus/syllabusfaq";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <GGUSyllabusPage />
      <SyllabusFAQ />

      {/* <DoctorateUniversitySection /> */}
      {/* <GGUDoctorateTestimonials /> */}
      <Footer />
    </>
  );
}
