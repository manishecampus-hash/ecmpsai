import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeAutoLinks(html: string): string {
  if (!html) return html;
  // Remove script tags to prevent React 19 console warnings
  const cleanHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  return cleanHtml.replace(
    /<a\s+[^>]*href=["']https?:\/\/([^"'/]+)\/?["'][^>]*>(.*?)<\/a>/gi,
    (match, host, text) => {
      const cleanHost = host.trim().toLowerCase();
      const cleanText = text.replace(/<[^>]*>/g, "").trim().toLowerCase();
      if (
        cleanHost === cleanText ||
        /^(b\.tech|m\.tech|ph\.d|b\.com|m\.com|b\.sc|m\.sc|e\.g|i\.e)\b/i.test(cleanHost)
      ) {
        return text;
      }
      return match;
    }
  );
}

