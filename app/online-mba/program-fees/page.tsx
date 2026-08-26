import { Footer } from "@/components/layout/footer";
import ProgramFeesFAQ from "@/components/online-mba/program-fees/program-fee-faq";
import SubProgramFees from "@/components/online-mba/program-fees/sub-program-fees";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";

import SubHeader from "@/components/subheader/sub-header";

export default function OnlineMbaPage() {
  return (

<main>
<SubHeader/>
   <SubProgramFees/>
<ImportantPages/>
<ProgramFeesFAQ/>
   <Footer/>
</main>
    
     );
}