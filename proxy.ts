// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "ecampus_super_secret_jwt_key_987654321_2026"
);

const ACCESS_TOKEN_COOKIE = "ecampus_access_token";
const REFRESH_TOKEN_COOKIE = "ecampus_refresh_token";

const PROTECTED_PREFIXES = ["/dashboard", "/profile", "/settings", "/account"];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Exclude static assets, Next internal calls, images, and API paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Canonical domain redirect
  const host = request.headers.get("host")?.split(":")[0] || "";
  if (host === "ecampusapp.com") {
    return NextResponse.redirect(
      `https://www.ecampusapp.com${pathname}${search}`,
      308
    );
  }

  // 3. Extract and verify Access Token
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  let tokenPayload: any = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      tokenPayload = payload;
    } catch {
      tokenPayload = null;
    }
  }

  const isProtectedPath = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // 4. CORE STATE MACHINE ENFORCEMENT:
  // If user is authenticated in PENDING_PHONE_VERIFICATION state,
  // they are strictly restricted to /verify-phone!
  if (
    tokenPayload &&
    (tokenPayload.status === "PENDING_PHONE_VERIFICATION" ||
      tokenPayload.scope === "phone_verification")
  ) {
    if (pathname !== "/verify-phone" && !pathname.startsWith("/api/auth")) {
      const verifyUrl = new URL("/verify-phone", request.url);
      verifyUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(verifyUrl);
    }
  }

  // 5. If user is ACTIVE and visits /verify-phone, redirect to dashboard
  if (
    pathname === "/verify-phone" &&
    tokenPayload &&
    tokenPayload.status === "ACTIVE"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 6. Gated Route Protection
  if (isProtectedPath) {
    if (!tokenPayload) {
      // Check if a 30-day refresh token cookie exists to automatically renew the session
      const rawRefreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
      if (rawRefreshToken) {
        try {
          const refreshUrl = new URL("/api/auth/token/refresh", request.url);
          const refreshRes = await fetch(refreshUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              cookie: `${REFRESH_TOKEN_COOKIE}=${rawRefreshToken}`,
            },
            body: JSON.stringify({ refresh_token: rawRefreshToken }),
          });

          if (refreshRes.ok) {
            const setCookies = refreshRes.headers.getSetCookie?.() || [];
            let renewedToken: string | null = null;
            for (const c of setCookies) {
              const match = c.match(/ecampus_access_token=([^;]+)/);
              if (match) {
                renewedToken = match[1];
                break;
              }
            }

            if (renewedToken) {
              try {
                const { payload } = await jwtVerify(renewedToken, JWT_SECRET);
                tokenPayload = payload;
                if (tokenPayload?.status === "ACTIVE") {
                  const nextRes = NextResponse.next();
                  for (const c of setCookies) {
                    nextRes.headers.append("set-cookie", c);
                  }
                  return nextRes;
                }
              } catch {}
            }
          }
        } catch {
          // Ignore refresh network failure and proceed to login redirect
        }
      }

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (tokenPayload.status !== "ACTIVE") {
      const verifyUrl = new URL("/verify-phone", request.url);
      verifyUrl.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(verifyUrl);
    }
  }

  // 7. Dynamic backend redirects from proxy.ts (for landing pages / slugs)
  if (pathname !== "/" && pathname !== "") {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_ECAMPUS_FRONTEND_API_URL ||
        "http://localhost:5000";
      const requestUrl = `${apiUrl}/redirects/match?url=${encodeURIComponent(
        pathname
      )}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600);

      const res = await fetch(requestUrl, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      clearTimeout(timeoutId);

      if (res.ok && res.status !== 204) {
        const text = await res.text();
        if (text.trim()) {
          const rule = JSON.parse(text);
          if (rule && rule.newUrl) {
            const statusCode = rule.type === 301 ? 301 : 302;
            let destination = rule.newUrl;
            if (
              !rule.newUrl.startsWith("http://") &&
              !rule.newUrl.startsWith("https://")
            ) {
              destination = `${request.nextUrl.origin}${rule.newUrl}${search}`;
            }
            return NextResponse.redirect(destination, statusCode);
          }
        }
      }
    } catch {
      // Non-blocking redirect lookup failure fallback
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
