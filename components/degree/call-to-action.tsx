import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CallToActionProps {
  degreeName: string;
}

export const CallToAction = ({ degreeName }: CallToActionProps) => {
  return (
    <section className="bg-gradient-to-r from-[#4F46E5] to-blue-600 rounded-3xl p-8 text-center shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-2">
        Ready to start your {degreeName} journey?
      </h2>
      <p className="text-white/80 mb-6 text-sm max-w-lg mx-auto">
        Get personalised university recommendations based on your profile and
        career goals.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button className="bg-white text-[#4F46E5] hover:bg-white/90 font-bold px-8 rounded-full">
          Get AI Recommendations
        </Button>
        <Link href="/compare">
          <Button
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 rounded-full px-8"
          >
            Compare Universities
          </Button>
        </Link>
      </div>
    </section>
  );
};
