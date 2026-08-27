import { Footer } from "@/components/layout/footer";
import Coupons from "@/components/online-mba/coupons/coupons";
import CouponsFAQ from "@/components/online-mba/coupons/coupons-faq";
import ImportantPages from "@/components/online-mba/subject-syllabus/importantpages";
import SubHeader from "@/components/subheader/sub-header";

export default function OnlineMbaPage() {
  return (

<main>
<SubHeader/>
<ImportantPages/>
<Coupons/>
<CouponsFAQ/>
<Footer/>
</main>


     );
}