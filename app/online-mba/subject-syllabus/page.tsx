import { Footer } from "@/components/layout/footer";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";
import SubjectSyllabus from "@/components/online-mba/subject-syllabus/subject-syllabus";
import FAQSection from "@/components/online-mba/subject-syllabus/syllabus-faq";
import SubHeader from "@/components/subheader/sub-header";

export default function OnlineMbaPage() {
  return (

<main>
<SubHeader/>
<SubjectSyllabus/>
<ImportantPages/>
<FAQSection/>
<Footer/>
</main>


     );
}