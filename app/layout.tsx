import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/layout/navbar';
// import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
// import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'eCampus — Your Career Starts Here',
  description: 'AI-powered education discovery for Indian Gen Z. Find your perfect degree, compare universities, and get personalised career guidance in seconds.',
  openGraph: {
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {/* Top Navigation */}
          <Navbar />

          {/* Main Content Area - flex-1 keeps it stretched */}
          <main className="flex-1 pb-16 md:pb-0 pt-16">
            {children}
          </main>

          {/* <Footer /> */}
          {/* <MobileBottomNav /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}