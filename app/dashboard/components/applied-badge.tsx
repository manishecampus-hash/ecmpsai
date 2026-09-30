// Social-proof row shown under a university's apply buttons: "RI A SM • 1.2k+ applied"

const AVATAR_POOL = [
  { initials: "RI", className: "bg-rose-100 text-rose-700" },
  { initials: "A", className: "bg-red-600 text-white" },
  { initials: "SM", className: "bg-slate-800 text-white" },
  { initials: "PK", className: "bg-amber-100 text-amber-700" },
  { initials: "N", className: "bg-emerald-100 text-emerald-700" },
  { initials: "AV", className: "bg-sky-100 text-sky-700" },
  { initials: "D", className: "bg-violet-100 text-violet-700" },
];

export function formatApplied(count: number) {
  if (count >= 1000) {
    const k = Math.floor((count / 1000) * 10) / 10;
    return `${Number.isInteger(k) ? k.toFixed(0) : k}k+`;
  }
  return `${Math.floor(count / 10) * 10}+`;
}

// Stable per-university pick (FNV-1a hash of the id) so each card shows its own trio of avatars
function pickAvatars(seed: string) {
  let h = 2166136261;
  for (const ch of `applied${seed}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const picked: number[] = [];
  let x = h;
  while (picked.length < 3) {
    const i = x % AVATAR_POOL.length;
    if (!picked.includes(i)) picked.push(i);
    x = Math.floor(x / AVATAR_POOL.length) || (x + 0x9e3779b1) >>> 0;
  }
  return picked.map((i) => AVATAR_POOL[i]);
}

export default function AppliedBadge({ count, seed }: { count: number; seed: string }) {
  return (
    <div className="flex w-full items-center justify-center gap-1.5 text-xs">
      <div className="flex -space-x-1" aria-hidden>
        {pickAvatars(seed).map((a, i) => (
          <span
            key={i}
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[7.5px] font-bold ring-[1.5px] ring-white ${a.className}`}
          >
            {a.initials}
          </span>
        ))}
      </div>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <span className="whitespace-nowrap text-gray-500">
        <span className="font-semibold text-gray-900">{formatApplied(count)}</span> applied
      </span>
    </div>
  );
}
