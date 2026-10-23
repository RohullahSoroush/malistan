# Malistan Archive

A static community heritage website for Malistan (مالستان), Ghazni, Afghanistan. Built for Muhammadi with Next.js App Router, TypeScript, Tailwind CSS 4, Lucide icons and lightweight Motion animations.

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Next.js. For verification and production:

```sh
npm run check
npm run build
```

`next build` statically exports the website to `out/`. There is no backend, database, account system or upload endpoint.

## Pages and interactions

- Landing page, history, places, culture, people, about, gallery, and sources.
- Client-side archive search, mobile navigation, photo category filters, accessible native image dialog.
- Click-to-load OpenStreetMap centred near Mir Adina. The initial decorative illustration does not depict district boundaries.
- Motion scroll reveals with reduced-motion support. Content remains visible without animations.
- Per-page metadata, canonical links, Open Graph, Place JSON-LD, sitemap, robots.txt and static rendering.

## Content and images

Edit `lib/content.ts` for articles, source records and photo metadata. Edit `app/page.tsx` for the landing-page narrative. Add photos under `public/images/` and corresponding metadata in `photos`. New article keys automatically create static routes and appear in the sitemap and archive search.

The two opening photographs are real Malistan images from Wikimedia Commons, credited to Danial and Mohammad Reza Rahmani under CC BY-SA 4.0. WebP copies have been resized; layouts may crop them. Keep the attribution and original-source links on `/sources`. Do not assume other internet images can be republished.

The research uses UNHCR’s 2003 district profile, a 2022 Maknak livelihoods study, local cultural reporting and a geographic overview. Source dates and disputed musical attributions are visible. The archive does not assert a current population count or provide current travel guidance. The film collection is honestly marked as forthcoming. Contribution instructions currently direct people to the founder; no online submissions are collected.

## Deploy on Vercel

Import the GitHub repository into Vercel and select Next.js. The default build command is `npm run build`. Add `NEXT_PUBLIC_SITE_URL` with the final public origin (for example `https://your-project.vercel.app`) and rebuild so canonical links, Open Graph image URLs, sitemap and robots.txt use the production domain. Never put private tokens in this variable or commit `.env` files.

`npm run build` also works with ordinary static hosting using the generated `out/` directory. For search indexing after publication, register the final domain in Google Search Console and submit `/sitemap.xml`; indexing and rankings are not guaranteed by implementation alone.
