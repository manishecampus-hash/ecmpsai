import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { Calendar, Sparkles } from "lucide-react";
import EventsDirectory, { EventItem } from "@/components/events/events-directory";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "eCampus Events, Masterclasses & Webinars",
  description: "Join insightful masterclasses, virtual education fairs, career webinars, and summits hosted by eCampus and partner universities.",
};

function mapDbEventToEventItem(dbEvent: any): EventItem {
  let formattedDate = "Coming Soon";
  if (dbEvent.createdAt) {
    try {
      formattedDate = new Date(dbEvent.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      formattedDate = dbEvent.createdAt;
    }
  }

  const rawSlug = (dbEvent.url || dbEvent.slug || "").replace(/^\/+|\/+$/g, "");
  const cleanSlug = rawSlug.replace(/^events\//i, "");

  return {
    id: dbEvent.id || dbEvent._id || String(Math.random()),
    title: dbEvent.title || "Untitled Event",
    slug: cleanSlug,
    category: dbEvent.category || "General",
    publisher: dbEvent.publisher || "eCampus Team",
    publisherImage: dbEvent.publisherImage || "",
    imageUrl: dbEvent.imageUrl || "",
    mobileImageUrl: dbEvent.mobileImageUrl || "",
    excerpt: dbEvent.excerpt || "",
    description: dbEvent.excerpt || "",
    content: dbEvent.content || "",
    date: formattedDate,
    view: typeof dbEvent.view === "number" ? dbEvent.view.toLocaleString() : "0",
    status: dbEvent.status || "active",
    tags: dbEvent.tags || [],
    updatedAt: dbEvent.updatedAt || "",
    createdAt: dbEvent.createdAt || "",
  };
}

async function getEvents(): Promise<EventItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${apiUrl}/events`, {
      next: { revalidate: 15 },
    });
    if (res.ok) {
      const dbEvents = await res.json();
      if (Array.isArray(dbEvents) && dbEvents.length > 0) {
        const activeEvents = dbEvents.filter((item: any) => item.status !== "inactive");
        return activeEvents.map(mapDbEventToEventItem);
      }
    }
  } catch (err) {
    console.error("Error fetching events from API:", err);
  }
  return [];
}

export default async function EventsPage() {
  const allEvents = await getEvents();

  return (
    <main className={`min-h-screen bg-white text-gray-700 ${poppins.className}`}>
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white py-14 sm:py-20 border-b border-gray-100">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles size={14} className="text-blue-600" />
            <span>eCampus Learning Events & Webinars</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Connect, Learn & Grow with Industry Experts
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover upcoming masterclasses, university admission webinars, career panels, and education workshops tailored for distance and online learners.
          </p>
        </div>
      </section>

      {/* Directory of Events */}
      <EventsDirectory events={allEvents} />

      <Footer />
    </main>
  );
}
