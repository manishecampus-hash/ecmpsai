import { Footer } from "@/components/layout/footer";
import EducationLoans from "@/components/online-mba/education-loans/education-loans";
import EducationLoansFAQ from "@/components/online-mba/education-loans/education-loans-faq";
import SubEligibilityDuration from "@/components/online-mba/eligibility-duration/eligibility-duration";
import EligibilityDurationFAQ from "@/components/online-mba/eligibility-duration/eligibility-duration-faq";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";
import SubHeader from "@/components/subheader/sub-header";

export default function OnlineMbaPage() {
  return (

<main>
<SubHeader/>
    <EducationLoans/>
    <ImportantPages/>
  <EducationLoansFAQ/>
    <Footer/>
</main>
    
     );
}