import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppShell } from "@/components/layout/app-shell";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  referrer: "strict-origin-when-cross-origin",
  title: "eCampus — Your Career Starts Here",
  description:
    "AI-powered education discovery for Indian Gen Z. Find your perfect degree, compare universities, and get personalised career guidance in seconds.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    images: [{ url: "" }],
  },

  twitter: {
    card: "summary_large_image",
    images: [{ url: "" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18451315310"
          strategy="afterInteractive"
        />
        <Script id="google-tag-aw-18451315310" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18451315310');
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
