import "./globals.css";
import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/navbar";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
  weight: ["500", "600", "700"],
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
    <html
      lang="en"
      className={`${inter.variable} ${quicksand.variable} font-sans`}
      suppressHydrationWarning
    >
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
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-white text-slate-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Navbar />

          <main className="flex-1 pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
