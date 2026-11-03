import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site-url";
import { founder, graph, pages, siteGraph, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Ambient } from "@/components/layout/ambient";
import { Experience } from "@/components/layout/experience";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Announcement } from "@/components/layout/announcement";
import { getArchive } from "@/lib/archive";
import { SoundLayer } from "@/components/sound/sound-layer";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/components.css";
import "@/styles/home.css";
import "@/styles/pages.css";
import "@/styles/contact.css";

// Runs before first paint so the saved theme never flashes.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');var p=null;try{p=localStorage.getItem('malistan-theme')}catch(e){}var dark=p==='dark'||(p!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);d.dataset.theme=dark?'dark':'light'})()`;

const home = pages.home;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: home.title, template: `%s | ${SITE_NAME}` },
  description: home.description,
  applicationName: SITE_NAME,
  keywords: [
    "Malistan", "Malestan", "مالستان", "Malistan district", "Malistan Ghazni", "Ghazni", "Afghanistan",
    "Hazarajat", "Hazara", "Hazaragi", "Mir Adina", "Maknak", "Now Deh", "Safdar Ali Malistani", "Rohullah Mohammadi",
  ],
  authors: [{ name: founder.name, url: founder.url }],
  creator: founder.name,
  publisher: SITE_NAME,
  category: "culture",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: home.title,
    description: home.description,
    images: [{ url: home.image, width: 1200, height: 630, alt: home.imageAlt, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image", title: home.title, description: home.description, images: [home.image] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b110e" },
  ],
};

// Content comes from the archive database (edited at admin.malistan.org); pages refresh at most once a minute.
export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const archive = await getArchive();
  const search = archive.order.map((slug) => {
    const a = archive.articles[slug]!;
    return { slug, title: a.title, eyebrow: a.eyebrow, text: `${a.intro} ${a.sections.map((s) => `${s.title} ${s.text}`).join(" ")}` };
  });
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preload" href="/fonts/display.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.open-meteo.com" crossOrigin="anonymous" />
      </head>
      <body>
        <JsonLd data={graph(siteGraph())} />
        <a className="skip-link" href="#main">Skip to content</a>
        <Ambient />
        <Experience />
        <SoundLayer />
        <Header articles={search} />
        {children}
        <Footer />
        {archive.settings.announcement && <Announcement text={archive.settings.announcement} href={archive.settings.announcementUrl} />}
      </body>
    </html>
  );
}
