import Image from "next/image";

// Media coverage from the homepage API, shown as a scrolling strip of publication logos.
// Each logo opens the article it links to (same redirectUrl as before).

type MediaArticle = {
  name?: string;
  logo?: string;
  redirectUrl?: string;
  href?: string;
  displayOrder?: number;
  isActive?: boolean;
};

// Trimmed logo files for the outlets that have covered eCampus, used when the CMS entry has no logo.
// Keys are the outlet name in lowercase with spaces and punctuation removed.
const LOCAL_LOGOS: Record<string, { src: string; width: number }> = {
  lokmattimes: { src: "/press/logos/lokmat-times.webp", width: 326 },
  hindustantimes: { src: "/press/logos/hindustan-times.webp", width: 560 },
  theprint: { src: "/press/logos/theprint.webp", width: 353 },
  ani: { src: "/press/logos/ani.webp", width: 156 },
  digpu: { src: "/press/logos/digpu.webp", width: 189 },
  latestly: { src: "/press/logos/latestly.webp", width: 297 },
  dailyhunt: { src: "/press/logos/dailyhunt.webp", width: 260 },
};
const LOGO_HEIGHT = 72;

const keyOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

export function MediaMarquee({ articles }: { articles?: MediaArticle[] }) {
  const items = (articles ?? [])
    .filter((a) => a?.name && a.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((a) => {
      const name = a.name as string;
      const local = LOCAL_LOGOS[keyOf(name)];
      const href = a.redirectUrl || a.href || "";
      return {
        name,
        href: href && href !== "#" ? href : "",
        logo: a.logo ? { src: a.logo, width: 180 } : local,
      };
    });

  if (items.length === 0) return null;

  // The list is rendered twice so the -50% scroll loops without a gap; the copy is hidden from assistive tech.
  const loop = [...items, ...items];

  return (
    <section aria-labelledby="in-the-news" className="w-full border-y border-gray-200 bg-[#f5f5f5] py-7 sm:py-9">
      <h2 id="in-the-news" className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        As featured in
      </h2>

      <div className="group relative mx-auto mt-6 max-w-[1400px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto">
        {/* Pauses on hover and for keyboard focus only — a clicked logo keeps focus after its article opens in a
            new tab, so pausing on any focus left the strip stopped when the visitor came back */}
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] [.group:has(a:focus-visible)_&]:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((item, i) => {
            const isCopy = i >= items.length;
            const visual = item.logo ? (
              <Image
                src={item.logo.src}
                alt={`${item.name} logo`}
                width={item.logo.width}
                height={LOGO_HEIGHT}
                // Already small, pre-sized WebP files — served as-is so the repeated copy comes straight from cache
                unoptimized
                // Lazy-loading doesn't notice images that slide in via a CSS animation, so the repeated copy
                // loads up front — at the lowest priority so it never competes with the page's main content
                loading={isCopy ? "eager" : "lazy"}
                fetchPriority={isCopy ? "low" : undefined}
                className="h-7 w-auto opacity-60 grayscale transition duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 sm:h-9"
              />
            ) : (
              <span className="whitespace-nowrap text-xl font-extrabold tracking-tight text-gray-500 transition-colors group-hover/logo:text-gray-900 sm:text-2xl">
                {item.name}
              </span>
            );

            return (
              <li key={`${item.name}-${i}`} aria-hidden={isCopy || undefined} className="flex-shrink-0 px-7 sm:px-12">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isCopy ? -1 : undefined}
                    aria-label={`Read eCampus coverage in ${item.name} (opens in a new tab)`}
                    title={`Read on ${item.name}`}
                    className="group/logo flex items-center focus-visible:underline"
                  >
                    {visual}
                  </a>
                ) : (
                  <span className="group/logo flex items-center">{visual}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
