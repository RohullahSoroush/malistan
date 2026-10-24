import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site-url";
import { Ambient } from "@/components/layout/ambient";
import { Experience } from "@/components/layout/experience";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/components.css";
import "@/styles/home.css";
import "@/styles/pages.css";

// Runs before first paint so the saved theme never flashes.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');var p=null;try{p=localStorage.getItem('malistan-theme')}catch(e){}var dark=p==='dark'||(p!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);d.dataset.theme=dark?'dark':'light'})()`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Malistan — A Place. A People. A Story.",
    template: "%s | Malistan Archive",
  },
  description:
    "Discover Malistan (مالستان), Ghazni, Afghanistan — mountain landscapes at 2,800 m, Hazara history, Hazaragi music and culture, its people, and a growing photo archive. Founded by Rohullah Mohammadi.",
  keywords: ["Malistan", "Malestan", "مالستان", "Ghazni", "Afghanistan", "Hazarajat", "Hazara", "Mir Adina", "Hazaragi", "Rohullah Mohammadi"],
  authors: [{ name: "Rohullah Mohammadi", url: "https://rohullah.me" }],
  creator: "Rohullah Mohammadi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Malistan Archive",
    title: "Malistan — A Place. A People. A Story.",
    description: "A community archive celebrating Malistan, Ghazni — its landscapes, culture and people.",
    images: [{ url: "/images/og-malistan.jpg", width: 1200, height: 630, alt: "Poplar groves and village homes beneath the mountains of Malistan, Ghazni" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f17" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Ambient />
        <Experience />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
