export const sources = [
  {
    id: "unhcr",
    name: "UNHCR · Malistan district profile",
    date: "24 February 2003",
    url: "https://www.ecoi.net/en/file/redirect/10552_accord216_malistan.pdf",
    note: "A historical field profile. Its population, services and travel-time estimates describe 2003, not today.",
  },
  {
    id: "study",
    name: "Kamal et al. · Women and livestock management in Maknak",
    date: "5 December 2022",
    url: "https://www.ajrsp.com/en/Archive/issue-44/2.pdf",
    note: "Original research based on interviews with 120 women; findings apply to the study sample.",
  },
  {
    id: "music",
    name: "Hasht-e Subh · The puzzle of Abay Mirza",
    date: "22 July 2019",
    url: "https://8am.media/fa/abai-mirza-puzzle/",
    note: "A Dari-language local account by Kawa Ahmadzada, questioning commonly repeated musical attributions.",
  },
  {
    id: "obituary",
    name: "Ali Shir Shaher · Remembering Abay Mirza",
    date: "21 July 2016",
    url: "https://alishershaher2.wordpress.com/2016/07/21/پنج-دهه-آوازخوانی؛-گل-صد-برگ-مالستان-در/",
    note: "The reporter's published obituary, originally written for Khabarnama. Read alongside the differing 2019 account.",
  },
  {
    id: "geo",
    name: "Wikipedia · Malistan district",
    date: "Reference overview",
    url: "https://en.wikipedia.org/wiki/Malistan_District",
    note: "Secondary orientation source. Estimates differ across editions; no current population total is asserted here.",
  },
];

export const photos = [
  {
    src: "/images/malistan-valley.webp",
    title: "A valley called home",
    category: "Landscapes",
    author: "Danial",
    description: "Mountain slopes and cultivated land in Malistan, Ghazni province.",
    source: "https://commons.wikimedia.org/wiki/File:Malestan_1.jpg",
  },
  {
    src: "/images/malistan-winter.webp",
    title: "Winter in Malistan",
    category: "Seasons",
    author: "Mohammad Reza Rahmani",
    description: "Snow settles over the highland landscape of Malistan, at 2,800 metres above sea level.",
    source: "https://commons.wikimedia.org/wiki/File:مالستان.jpg",
  },
];

export type Article = {
  title: string;
  eyebrow: string;
  intro: string;
  image: string;
  sections: { title: string; text: string; source?: string }[];
};

export const articles: Record<string, Article> = {
  history: {
    title: "A place with a past.\nA story still unfolding.",
    eyebrow: "History & heritage",
    intro:
      "For centuries Malistan's mountain valleys have sheltered a resilient people. Understanding this land means listening to those who call it home—and reading the historical record with honesty and care.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "The highlands of Ghazni",
        text: "Malistan sits in the central highlands of Afghanistan's Ghazni province, also written Malestan, and in Dari as مالستان. The district lies at an elevation of roughly 2,800 metres (9,200 feet), placing it among Afghanistan's highest-altitude communities. Its area covers approximately 1,978 square kilometres of mountain terrain, valleys and seasonal watercourses. Coordinates place the district centre near 33°18′N, 67°10′E.",
        source: "geo",
      },
      {
        title: "The Hazara homeland · Hazarajat",
        text: "Malistan forms part of the broader Hazarajat region—the historic homeland of the Hazara people in central Afghanistan. During the period of Dost Mohammad Khan in the 1830s, Hazarajat operated as a semi-autonomous area, distinct from Kabul's direct authority. Malistan's population is predominantly Hazara, with some estimates placing that proportion at ninety percent or higher.",
        source: "geo",
      },
      {
        title: "A historical snapshot: 2003",
        text: "A UNHCR district profile published in 2003 described Malistan as a mountainous area with nine named regions: Mir-a-Dina, Maknak, Pashia, Sheer Dagh and others. The report recorded proposals to reorganise the district into four sub-districts to ease access to courts and services, though these proposals had not been implemented at the time of publication. Population estimates from this period varied widely, with some figures suggesting around 100,000 to 150,000 residents.",
        source: "unhcr",
      },
      {
        title: "Displacement and the diaspora",
        text: "During the Soviet-Afghan War and the subsequent Taliban period, significant numbers of Malistan's residents fled to neighbouring countries—primarily Iran and Pakistan—as refugees. UNHCR recorded the repatriation of approximately 3,801 residents through formal systems between 2002 and 2008, with the largest returns occurring in 2002 and 2003. Today, Malistan people form a significant diaspora community, maintaining connections to the district through family, remittances and cultural ties.",
        source: "unhcr",
      },
      {
        title: "Post-2001 reconstruction and hope",
        text: "After the fall of the Taliban regime in 2001, Malistan entered a period of investment in education and community development. By 2008, some 182 Community Development Committees were reportedly active in the district. The commitment of local families to education during this period became something of a byword: observers noted that Hazara households would forgo basic comforts in order to send children to school.",
        source: "geo",
      },
      {
        title: "Everyday history matters, too",
        text: "Family photographs, school records, letters and accounts of village life can tell stories that administrative reports overlook. This archive is intended to grow with those memories—with dates, names and permission from their owners. The residents of Malistan carry a history that no single document can contain.",
      },
      {
        title: "Reading the record responsibly",
        text: "Older reports reflect their own historical moment. They cannot tell us today's population, road access or public services. We keep source dates visible throughout this archive and leave uncertain details open for further documentation. Where accounts differ, we note the disagreement rather than choosing one version.",
      },
    ],
  },
  places: {
    title: "Many valleys.\nOne Malistan.",
    eyebrow: "Places & landscape",
    intro:
      "At 2,800 metres above sea level, Malistan's landscape is one of the most dramatic in central Afghanistan. From the district centre to the furthest mountain village, every valley holds a story.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "Mir Adina · میرآدینه — the district centre",
        text: "Mir Adina is the administrative centre of Malistan district. Spellings in English include Mir-a-Dina, Miradina and Mir Adina; in Dari it is written میرآدینه. The district's government offices, main bazaar and health facilities are concentrated here. The map on this site marks an approximate location; it does not draw formal administrative boundaries.",
        source: "geo",
      },
      {
        title: "Maknak · مکنک",
        text: "Maknak is one of the district's best-documented communities thanks to a rigorous 2022 academic study. Researchers interviewed 120 women in Maknak about livestock care—cows, sheep, goats and poultry—and the practical knowledge required for rural livelihoods at high altitude. The study found that women in Maknak carried a disproportionate share of livestock-management responsibilities and called for veterinary training to reach them directly.",
        source: "study",
      },
      {
        title: "Now Deh · نودِه — the village of songs",
        text: "A local account published in Hasht-e Subh describes Now Deh as a community with a distinctive musical tradition, one that produced several generations of performers. The family of Safdar Ali Malistani is linked to this village. Musical knowledge was practised across families in Now Deh, by women and men alike, in ways that shaped Hazaragi folk sound for generations.",
        source: "music",
      },
      {
        title: "Pashia and Sheer Dagh",
        text: "The UNHCR historical profile names Pashia and Sheer Dagh among Malistan's nine administrative regions. Both lie within the district's highland terrain. Detailed community-level documentation of these areas remains limited in published sources; future editions of this archive hope to include local accounts and photographs.",
        source: "unhcr",
      },
      {
        title: "The landscape and its seasons",
        text: "Malistan's altitude shapes life fundamentally. Winters are cold and snow-covered, often isolating villages from each other and from the provincial capital. Summers bring warmth and a brief growing season. The district's main crops include wheat, maize, peas, grapes, almonds, potatoes, onions and various herbs. Livestock—sheep, goats, cattle—graze the highland pastures and provide wool and dairy products alongside meat.",
        source: "unhcr",
      },
      {
        title: "Mountain neighbours",
        text: "The UNHCR historical profile places Ajristan district to the north, Nawur to the northeast, Jaghori to the south, and Uruzgan province to the southwest. The road connecting Malistan to Qarabagh district and onward to Jaghori has historically been the district's main link to markets and provincial services. Place names and administrative divisions should always be read in the context of their source date.",
        source: "unhcr",
      },
    ],
  },
  culture: {
    title: "The sound of belonging.",
    eyebrow: "Culture & everyday life",
    intro:
      "Music, language and practical knowledge have connected Malistan's villages for generations. Culture here is not a relic—it is the air people breathe.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "Hazaragi — a language of identity",
        text: "The people of Malistan speak Hazaragi, a variety of Dari (Persian) with its own distinct vocabulary and intonation developed over centuries in the central Afghan highlands. Language is an essential medium through which family stories, songs, proverbs and knowledge travel between generations. In the diaspora, preserving Hazaragi has become an act of cultural continuity as much as communication.",
        source: "study",
      },
      {
        title: "A living musical inheritance",
        text: "Malistan is associated with a rich tradition of Hazaragi folk music. Performers such as Safdar Ali Malistani have carried this sound into wider Afghan musical life. A local account describes Now Deh as a village where music was practised across several families, by women and men, in a way that made musical knowledge communal rather than exceptional. The district's musical heritage spans instrumental performance, poetry and vocal styles particular to the Hazarajat.",
        source: "music",
      },
      {
        title: "Remembering Abay Mirza",
        text: "Abay Mirza—also remembered as Mother Mirza—is a celebrated figure in accounts of Malistan's cultural life. A 2016 obituary reports her death in Malistan on 21 July of that year, after several decades associated with folk performance. A later 2019 local account challenges some attributions in the familiar narrative, including questions about which songs are genuinely hers. We link both accounts in our source library, so readers can weigh them side by side.",
        source: "obituary",
      },
      {
        title: "Wool weaving — Nammad and Glem",
        text: "Wool working is a traditional craft across several Ghazni districts, including Malistan. Local craftspeople make felt floor coverings known as Nammad and woven rugs called Glem from the wool of highland sheep. These items are domestic objects and a form of artistic expression—their patterns carry aesthetic traditions that vary by village. Wool working is a livelihood as much as a craft, linking livestock care to finished goods.",
        source: "study",
      },
      {
        title: "Women's knowledge and role in agriculture",
        text: "Research in Maknak highlights how central women's labour is to Malistan's agricultural economy. Women manage the daily care of livestock, make decisions about feed and health, and process wool and dairy products. This practical knowledge—accumulated and transmitted between women across generations—is a form of expertise that formal institutions have largely failed to document or support with appropriate training and resources.",
        source: "study",
      },
      {
        title: "Nowruz and community life",
        text: "Like Hazara communities across Afghanistan, Malistan marks the Persian New Year Nowruz (نوروز) as a major celebration. The spring festival aligns with the agricultural calendar—it marks the end of winter isolation and the beginning of the planting season. Community gatherings, shared meals and the renewal of social bonds across the district's villages give Nowruz a particular significance in mountain communities where winter can bring months of separation.",
      },
    ],
  },
  people: {
    title: "The people behind\nthe place.",
    eyebrow: "People of Malistan",
    intro:
      "A district's character is written in its people. These are some of the names that have given Malistan its voice—artists, scholars and community members whose stories deserve to be preserved.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "Safdar Ali Malistani · صفدرعلی مالستانی",
        text: "A musician associated with Malistan's folk tradition and the village of Now Deh. Safdar Ali Malistani is among the best-documented performers to emerge from the district. A 2019 account by Kawa Ahmadzada discusses his musical family background and argues that several recordings commonly attributed to other performers are actually his. The full scope of his catalogue and biography remains an area for careful, sourced documentation.",
        source: "music",
      },
      {
        title: "Abay Mirza · آبه میرزا",
        text: "Also remembered as Mother Mirza, Abay Mirza is a prominent figure in writing about Malistan's musical heritage. A 2016 obituary reports her death in Malistan on 21 July that year. The same account suggests she was active in performance for roughly five decades. A later local account, published in 2019, challenges parts of the established narrative—including which voice and songs are genuinely hers. We preserve both accounts rather than asserting a single version.",
        source: "obituary",
      },
      {
        title: "A note on attribution and memory",
        text: "Cultural memory is layered. The same story reaches different communities with different names attached. This archive treats disputed attributions with care: we name the disagreement, link the competing sources, and resist the temptation to simplify for the sake of a cleaner narrative. The truth of cultural history is often found in exactly this kind of honest uncertainty.",
        source: "music",
      },
      {
        title: "Hazara scholars and educators",
        text: "Malistan has consistently produced scholars and educators who have gone on to study and teach in Kabul, Iran, and abroad. The district's strong culture of valuing education—documented by observers who noted families sacrificing material comforts to fund schooling—has created a tradition of intellectual achievement that deserves dedicated documentation in a future edition of this archive.",
        source: "geo",
      },
      {
        title: "There are many more stories to tell",
        text: "Future profiles can include community leaders, teachers, writers, athletes, aid workers, diaspora activists and anyone whose contribution is first known in their own village. Each addition should include a verifiable connection to Malistan, at least one source, and—for portraits—permission from the subject or their family. The archive welcomes submissions from anyone with knowledge to share.",
      },
    ],
  },
  about: {
    title: "For Malistan.\nFor generations.",
    eyebrow: "About the archive",
    intro:
      "An independent community archive, founded by Rohullah Mohammadi out of love for his hometown in Ghazni, Afghanistan. Built to last. Designed to grow.",
    image: "/images/malistan-winter.webp",
    sections: [
      {
        title: "Why this archive exists",
        text: "Rohullah Mohammadi founded the Malistan Archive because he believed his home district deserved a thoughtful, permanent presence on the internet. Too many places like Malistan exist only in the margin notes of larger histories—visible when there is conflict, invisible when there is culture, community and everyday life. This archive is a small act of correcting that imbalance.",
      },
      {
        title: "About the founder · Rohullah Mohammadi",
        text: "Rohullah Mohammadi is a designer and technologist from Malistan, Ghazni. He built this archive from the ground up—researching, designing, writing and coding every element. His work on the archive reflects a conviction that the diaspora has a responsibility to document what it loves, and a belief that good design can make a community's story accessible to the world.",
      },
      {
        title: "A home for our shared memory",
        text: "Malistan deserves a thoughtful place on the internet: somewhere to discover its landscapes, learn about its culture and find the stories of its people. This first edition brings together researched articles, openly licensed photographs and a source library that is honest about what it knows and what it does not. Future editions will add oral histories, locally contributed photographs and carefully verified profiles.",
      },
      {
        title: "Made to grow",
        text: "The archive is not a fixed publication—it is designed to expand. Local photographs, films, oral histories and verified profiles will be added over time. The goal is to make knowledge about Malistan easy to find, clearly organised and accessible to people at home and in the diaspora alike.",
      },
      {
        title: "Our editorial promise",
        text: "Sources are always linked. Historical estimates are always dated. Disputed accounts are identified rather than smoothed over. Photographs retain their credits and licences. Corrections and first-hand knowledge help make the archive more accurate and more complete.",
      },
      {
        title: "Contribute to a future edition",
        text: "If you have a photograph, a family memory, a voice recording, or knowledge of a person from Malistan whose story belongs here: prepare the original file, its approximate date and location, the creator's name, a short description, and your permission to publish. The archive does not collect contributions through this website in its current edition—please share them directly with the founder through rohullah.me.",
      },
    ],
  },
};
