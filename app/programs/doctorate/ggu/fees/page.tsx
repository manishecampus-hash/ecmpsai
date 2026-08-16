import { Footer } from "@/components/layout/footer";
import FeesStructureFAQ from "@/components/programs/ggu/fees/fee-faq";
import Fees from "@/components/programs/ggu/fees/fees";

import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";

export default function Page() {
  return (
    <>
      <GguSubHeader />
      <Fees />
      <FeesStructureFAQ />
      <Footer />
    </>
  );
}
