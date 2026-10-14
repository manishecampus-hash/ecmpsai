// Turns the course's own content into the text read aloud by the hero's "Listen Podcast".

const plain = (value: unknown) =>
  typeof value === "string"
    ? value
        .replace(/<\/(p|li|h\d)>/gi, ". ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&(rsquo|#39);/g, "'")
        .replace(/\*/g, "")
        .replace(/\s+/g, " ")
        .replace(/\s+([.,!?:])/g, "$1")
        .replace(/([.!?:])\./g, "$1")
        .trim()
    : "";

export function buildPodcastScript(details: any): string {
  const parts: string[] = [];
  const add = (text: unknown) => {
    const t = plain(text);
    if (t) parts.push(/[.!?]$/.test(t) ? t : `${t}.`);
  };

  add(details?.banner?.heading);
  add(details?.banner?.description);
  add(details?.about?.description);
  for (const item of details?.keyHighlights?.list ?? []) add(`${item?.title ?? ""}. ${item?.text ?? ""}`);
  add(details?.eligibility?.eligCriteria);
  add(details?.eligibility?.durationText);

  return parts.join(" ");
}
