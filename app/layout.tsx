import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import { Experience } from "@/components/experience";
import "./globals.css";
import "./editorial.css";
import "./appearance.css";
const site = siteUrl;
// Apply the saved preference before first paint; the switcher owns subsequent changes.
const themeScript = `(function(){var p='system';try{p=localStorage.getItem('malistan-theme')||'system'}catch(e){}var dark=p==='dark'||(p!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=dark?'dark':'light'})()`;
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Malistan — A Place. A People. A Story.",
    template: "%s | Malistan Archive",
  },
  description:
    "Discover Malistan (مالستان), Ghazni, Afghanistan. Explore its mountain landscapes, history, Hazara cultural heritage, people and a growing community photo archive.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Malistan Archive",
    title: "Malistan — A Place. A People. A Story.",
    description:
      "A community archive celebrating Malistan, its people and its stories.",
    images: [
      {
        url: "/images/malistan-valley.webp",
        width: 1280,
        height: 853,
        alt: "The mountainous landscape of Malistan, Afghanistan",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <Experience />
        {children}
        <Footer />
      </body>
    </html>
  );
}
