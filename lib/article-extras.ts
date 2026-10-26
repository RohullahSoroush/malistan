// Editorial extras that sit between an article's chapters: facts, quotes, photos, timelines, glossaries.
import { slugify } from "./slug";

export type Fact = { label: string; value: string; note?: string };
export type TimelineEvent = { year: string; title: string; text: string; source?: string };
export type GlossaryTerm = { term: string; native?: string; meaning: string };
export type Faq = { q: string; a: string };

export type Block =
  | { after: number; type: "photo"; id: string; caption?: string }
  | { after: number; type: "quote"; text: string; cite?: string }
  | { after: number; type: "timeline"; title: string; events: TimelineEvent[] }
  | { after: number; type: "glossary"; title: string; terms: GlossaryTerm[] };

export type ArticleExtras = {
  glance: Fact[];
  blocks: Block[];
  faq?: Faq[];
};

export const articleOrder = ["history", "places", "culture", "people", "about"] as const;

export const villages = [
  { name: "Mir Adina", native: "میرآدینه", note: "District centre", anchor: slugify("Mir Adina · میرآدینه — the district centre") },
  { name: "Maknak", native: "مکنک", note: "Best-documented village", anchor: slugify("Maknak · مکنک") },
  { name: "Now Deh", native: "نودِه", note: "Village of songs", anchor: slugify("Now Deh · نودِه — the village of songs") },
  { name: "Pashia", native: "پشیه", note: "Highland region", anchor: slugify("Pashia and Sheer Dagh") },
  { name: "Sheer Dagh", native: "شیرداغ", note: "Highland region", anchor: slugify("Pashia and Sheer Dagh") },
];

export const extras: Record<string, ArticleExtras> = {
  history: {
    glance: [
      { label: "Homeland", value: "Hazarajat", note: "Semi-autonomous in the 1830s" },
      { label: "Named regions (2003)", value: "9", note: "UNHCR district profile" },
      { label: "Returnees 2002–08", value: "3,801", note: "Through formal UNHCR systems" },
      { label: "Community committees", value: "182", note: "Reported active by 2008" },
    ],
    blocks: [
      {
        after: 1,
        type: "timeline",
        title: "Malistan through time",
        events: [
          { year: "1830s", title: "A semi-autonomous Hazarajat", text: "Under Dost Mohammad Khan, the Hazara highlands operate largely apart from Kabul's direct authority.", source: "geo" },
          { year: "1979–1990s", title: "War and displacement", text: "The Soviet–Afghan war and the Taliban years push many families towards Iran and Pakistan.", source: "unhcr" },
          { year: "2001", title: "A turning point", text: "After the fall of the Taliban regime, investment in schools and community development begins.", source: "geo" },
          { year: "2002–2003", title: "The great return", text: "The largest waves of formal repatriation bring families back to the valleys.", source: "unhcr" },
          { year: "2003", title: "The UNHCR profile", text: "A field profile records nine named regions and proposals for four sub-districts.", source: "unhcr" },
          { year: "2008", title: "182 committees", text: "Community Development Committees are reported active across the district.", source: "geo" },
          { year: "2016", title: "Remembering Abay Mirza", text: "The celebrated folk singer dies in Malistan after decades of performance.", source: "obituary" },
          { year: "2026", title: "This archive", text: "The Malistan Archive opens its first edition, with every source dated and linked." },
        ],
      },
      { after: 2, type: "photo", id: "malistan-rooftops-spring", caption: "Earthen rooftops above the spring valley — the view that generations have returned to." },
      { after: 3, type: "quote", text: "Hazara households would forgo basic comforts in order to send children to school.", cite: "Observers of post-2001 Malistan" },
      { after: 4, type: "photo", id: "malistan-hay-path", caption: "A footpath between hay fields: everyday history that administrative reports overlook." },
    ],
  },
  places: {
    glance: [
      { label: "Elevation", value: "2,800 m", note: "Among Afghanistan's highest communities" },
      { label: "Area", value: "~1,978 km²", note: "Mountain valleys and pastures" },
      { label: "District centre", value: "Mir Adina", note: "Offices, bazaar, health facilities" },
      { label: "Coordinates", value: "33°18′N 67°10′E", note: "Approximate centre" },
    ],
    blocks: [
      { after: 0, type: "photo", id: "malistan-valley-panorama", caption: "The valley from above: poplar groves, fields and village homes beneath bare peaks." },
      { after: 2, type: "quote", text: "Musical knowledge was practised across families in Now Deh, by women and men alike.", cite: "Hasht-e Subh, 2019" },
      { after: 3, type: "photo", id: "malistan-stream", caption: "A mountain stream between willows — the water that makes the valley floor green." },
      { after: 4, type: "photo", id: "malistan-wheat-field", caption: "Ripe grain beside young trees: the short, abundant growing season at 2,800 metres." },
    ],
  },
  culture: {
    glance: [
      { label: "Language", value: "Hazaragi", note: "A variety of Dari with its own vocabulary" },
      { label: "Crafts", value: "Nammad & Glem", note: "Felt and woven rugs from highland wool" },
      { label: "Festival", value: "Nowruz", note: "The Persian New Year, in spring" },
      { label: "Village of songs", value: "Now Deh", note: "Home of a musical tradition" },
    ],
    blocks: [
      { after: 1, type: "photo", id: "malistan-flock", caption: "An evening flock below the poplars — the wool behind Nammad and Glem." },
      { after: 2, type: "quote", text: "Culture here is not a relic. It is the air people breathe.", cite: "Malistan Archive" },
      {
        after: 3,
        type: "glossary",
        title: "Words from the valley",
        terms: [
          { term: "Hazaragi", native: "هزارگی", meaning: "The variety of Dari spoken by the Hazara, with its own words, sounds and proverbs." },
          { term: "Nammad", native: "نمد", meaning: "A felt floor covering pressed from highland wool, patterned by village tradition." },
          { term: "Glem", native: "گلیم", meaning: "A flat-woven rug, lighter than a knotted carpet, woven from local wool." },
          { term: "Dambura", native: "دمبوره", meaning: "A two-stringed, long-necked lute at the heart of Hazaragi folk music." },
          { term: "Nowruz", native: "نوروز", meaning: "The Persian New Year on the spring equinox, celebrated with visits and shared meals." },
          { term: "Hazarajat", native: "هزاره‌جات", meaning: "The historic Hazara homeland across Afghanistan's central highlands." },
        ],
      },
      { after: 5, type: "photo", id: "malistan-clover-field", caption: "Green fields ringed by poplars — the landscape that shapes the year's celebrations." },
    ],
  },
  people: {
    glance: [
      { label: "Documented voices", value: "2", note: "Safdar Ali Malistani, Abay Mirza" },
      { label: "Musical village", value: "Now Deh", note: "Where music was communal" },
      { label: "Accounts compared", value: "2016 · 2019", note: "Obituary and later local account" },
      { label: "Open invitation", value: "Always", note: "Profiles with a source and permission" },
    ],
    blocks: [
      { after: 0, type: "photo", id: "malistan-poplar-road", caption: "The poplar road: the kind of path that leads musicians, scholars and teachers out into the world and home again." },
      { after: 2, type: "quote", text: "We name the disagreement, link the competing sources, and resist the temptation to simplify.", cite: "The archive's editorial promise" },
      { after: 3, type: "photo", id: "malistan-clouds-valley", caption: "Summer clouds over the peaks that so many of Malistan's people carry with them abroad." },
    ],
  },
  about: {
    glance: [
      { label: "Founded", value: "2026", note: "First edition, October" },
      { label: "Founder", value: "Rohullah Mohammadi", note: "Software developer from Malistan" },
      { label: "Sources linked", value: "5", note: "Each one dated" },
      { label: "Photographs", value: "12", note: "With credits and licences" },
    ],
    blocks: [
      { after: 0, type: "photo", id: "malistan-autumn-valley", caption: "Poplars turning gold — the place this archive was built for." },
      { after: 2, type: "quote", text: "Too many places like Malistan exist only in the margin notes of larger histories.", cite: "Rohullah Mohammadi" },
    ],
    faq: [
      { q: "What is Malistan?", a: "Malistan (مالستان, also written Malestan) is a mountain district in Ghazni Province, central Afghanistan. It sits at about 2,800 metres and is part of Hazarajat, the historic Hazara homeland." },
      { q: "Where exactly is Malistan?", a: "In the central highlands of Ghazni Province, at roughly 33°18′N, 67°10′E. Ajristan lies to the north, Nawur to the northeast, Jaghori to the south and Uruzgan province to the southwest. The district centre is Mir Adina." },
      { q: "What language do people in Malistan speak?", a: "Hazaragi, a variety of Dari (Persian) with its own vocabulary and intonation. It carries the district's songs, proverbs and stories between generations." },
      { q: "Who built the Malistan Archive?", a: "Rohullah Mohammadi, a software developer from Malistan. He researched, wrote and engineered the archive from the ground up as an independent community project." },
      { q: "How can I contribute a photograph or story?", a: "Prepare the original file, its approximate date and place, the creator's name, a short description and your permission to publish, then share it with the founder through rohullah.me. Every contribution is credited." },
      { q: "Can I reuse the photographs?", a: "The two Wikimedia Commons photographs are licensed CC BY-SA 4.0. The photographs shared by Rohullah Mohammadi are all rights reserved — please ask before reusing them." },
    ],
  },
};
