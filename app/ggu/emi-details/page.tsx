import { Footer } from "@/components/layout/footer";
import GGUEMIDetails from "@/components/programs/ggu/emi-details/emi-details";
import EmiFAQ from "@/components/programs/ggu/emi-details/emifaq";
import GguSubHeader from "@/components/programs/ggu/ggu-sub-header";

export default function Page() {
  return (
    <>
      <GguSubHeader />

      <GGUEMIDetails />
      <EmiFAQ />
      <Footer />
    </>
  );
}
