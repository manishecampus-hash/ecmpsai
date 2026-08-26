import { Footer } from "@/components/layout/footer";
import MbaAdmissionProcedure from "@/components/online-mba/admission-procedure/admission-procedure";
import AdmissionProcedureFAQ from "@/components/online-mba/admission-procedure/admission-procedure-faq";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";

import SubHeader from "@/components/subheader/sub-header";

export default function OnlineMbaPage() {
  return (

<main>
<SubHeader/>
    <MbaAdmissionProcedure/>
    <ImportantPages/>
    <AdmissionProcedureFAQ/>
    <Footer/>
</main>
    
     );
}