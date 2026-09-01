import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // Apply proxy to all paths except files and assets
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Exclude static assets, Next.js internal calls, favicon, and API paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL || "http://localhost:5000";
    const requestUrl = `${apiUrl}/redirects/match?url=${encodeURIComponent(pathname)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const res = await fetch(requestUrl, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json"
      }
    });
    
    clearTimeout(timeoutId);

    if (res.ok && res.status !== 204) {
      const text = await res.text();
      if (text.trim()) {
        const redirectRule = JSON.parse(text);
        if (redirectRule && redirectRule.newUrl) {
          const { newUrl, type } = redirectRule;
          const statusCode = type === 301 ? 301 : 302;

          let destination = newUrl;
          // If relative URL, build absolute URL using current request host and origin
          if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
            const origin = request.nextUrl.origin;
            destination = `${origin}${newUrl}${search}`;
          }

          return NextResponse.redirect(destination, statusCode);
        }
      }
    }
  } catch (err) {
    console.error("Redirect proxy error:", err);
  }

  return NextResponse.next();
}
