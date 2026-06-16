import Image from "next/image";
import { User } from "lucide-react";

type Props = {
  author: string;
  authorBio: string;
  authorImage: string;
};

export function AuthorCard({ author, authorBio, authorImage }: Props) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="relative h-11 w-11 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent-soft)" }}
        >
          {authorImage ? (
            <Image
              src={authorImage}
              alt={author}
              fill
              className="object-cover"
            />
          ) : (
            <span
              style={{
                color: "var(--accent)",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {initials}
            </span>
          )}
        </div>
        <div>
          <p
            style={{
              color: "var(--text-primary)",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            {author}
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
            Author
          </p>
        </div>
      </div>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.8rem",
          lineHeight: 1.6,
        }}
      >
        {authorBio}
      </p>
    </div>
  );
}
