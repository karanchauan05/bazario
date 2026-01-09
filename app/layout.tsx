import type { Metadata, Viewport } from "next";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { TickerBar } from "@/components/layout/TickerBar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const zenKaku = Zen_Kaku_Gothic_Antique({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen",
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCF7F3' },
    { media: '(prefers-color-scheme: dark)', color: '#0B485D' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Bazario - Premium Marketplace",
    template: "%s | Bazario"
  },
  description: "The best place to buy and sell premium goods locally. Experience the new standard of online classifieds.",
  openGraph: {
    title: "Bazario - Premium Marketplace",
    description: "The best place to buy and sell premium goods locally.",
    url: 'https://bazario.vercel.app',
    siteName: 'Bazario',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bazario - Premium Marketplace",
    description: "The best place to buy and sell premium goods locally.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(zenKaku.variable, "min-h-screen flex flex-col bg-background font-sans")}>
        <Navbar />
        <TickerBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
