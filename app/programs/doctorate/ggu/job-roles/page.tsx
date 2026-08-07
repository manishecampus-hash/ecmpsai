import { Footer } from "@/components/layout/footer";
import GGUEMIDetails from "@/components/programs/ggu/emi-details/emi-details";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";
import GGUDoctorateTestimonials from "@/components/programs/ggu/ggu-testimonials-section";
import DoctorateUniversitySection from "@/components/programs/ggu/ggu-university-section";
import GGUJobRoles from "@/components/programs/ggu/job-roles/job-roles";
import JobRolesFAQ from "@/components/programs/ggu/job-roles/jobrolesfaq";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <GGUJobRoles />
      <JobRolesFAQ />
      <DoctorateUniversitySection />
      <GGUDoctorateTestimonials />
      <Footer />
    </>
  );
}
