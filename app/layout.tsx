import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import "./globals.css";
const site = siteUrl;
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
        height: 720,
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
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
