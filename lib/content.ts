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
    note: "The reporter’s published obituary, originally written for Khabarnama. Read alongside the differing 2019 account.",
  },
  {
    id: "geo",
    name: "Wikipedia · Malistan district and town",
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
    description: "Mountain slopes and cultivated land in Malistan.",
    source: "https://commons.wikimedia.org/wiki/File:Malestan_1.jpg",
  },
  {
    src: "/images/malistan-winter.webp",
    title: "Winter in Malistan",
    category: "Seasons",
    author: "Mohammad Reza Rahmani",
    description: "Snow settles over the highland landscape of Malistan.",
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
      "Understanding Malistan means listening to the people who call it home, and reading the historical record with care.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "The highlands of Ghazni",
        text: "Malistan belongs to Ghazni province in Afghanistan’s central highlands. It is also written as Malestan, and in Dari as مالستان. The district is associated with the wider Hazara cultural region.",
        source: "geo",
      },
      {
        title: "A historical snapshot: 2003",
        text: "UNHCR described a mountainous district with nine named regions, including Mir-a-Dina, Maknak, Pashia and Sheer Dagh. The report also recorded proposals to reorganise the district, while noting that those proposals had not been implemented at the time.",
        source: "unhcr",
      },
      {
        title: "Everyday history matters, too",
        text: "Family photographs, school records, letters and accounts of village life can tell stories that administrative reports overlook. This archive is intended to grow with those memories, with dates, names and permission from their owners.",
      },
      {
        title: "Reading the record responsibly",
        text: "Older reports reflect their own period. They cannot establish today’s population, road access or public services. We keep source dates visible and leave uncertain details open for further documentation.",
      },
    ],
  },
  places: {
    title: "Many valleys.\nOne Malistan.",
    eyebrow: "Places & landscape",
    intro:
      "Get to know a district shaped by mountains, village communities and the land between them.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "Mir Adina · میرآدینه",
        text: "Mir Adina is identified as the district centre. Spellings include Mir-a-Dina and Miradina. The map on this site marks an approximate location near the centre; it does not draw an administrative boundary.",
        source: "geo",
      },
      {
        title: "Maknak · مکنک",
        text: "Maknak is a study location in published research on rural livelihoods. A 2022 paper documents women’s work caring for livestock and the need for veterinary training.",
        source: "study",
      },
      {
        title: "The village of Now Deh",
        text: "A local account published in Hasht-e Subh describes Now Deh as a village with a strong tradition of music-making across families, including the family of Safdar Ali Malistani.",
        source: "music",
      },
      {
        title: "Mountain neighbours",
        text: "UNHCR’s historical profile places Ajristan to the north, Nawur to the northeast, Jaghori to the south and Uruzgan to the southwest. Place names and administrative divisions should always be read in the context of the source date.",
        source: "unhcr",
      },
    ],
  },
  culture: {
    title: "The sound of belonging.",
    eyebrow: "Culture & everyday life",
    intro:
      "Music, language and rural knowledge connect Malistan’s villages with a much wider community.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "Hazaragi voices",
        text: "The 2022 Malistan study describes local residents as Hazara and identifies their speech as the Hazaragi variety of Dari. Language is an essential part of how family stories, songs and knowledge travel between generations.",
        source: "study",
      },
      {
        title: "A living musical inheritance",
        text: "Malistan is associated with folk music and performers such as Safdar Ali Malistani. A local account describes Now Deh as a place where music was practised by women and men across several families.",
        source: "music",
      },
      {
        title: "Remembering Abay Mirza",
        text: "Abay Mirza is a celebrated name in accounts of Malistan’s cultural life. Published stories about her differ. Her profile here links both an obituary and a later local account so readers can distinguish remembrance from disputed attribution.",
        source: "obituary",
      },
      {
        title: "Knowledge rooted in the land",
        text: "Research in Maknak highlights women’s involvement in livestock care. Cows, sheep, goats and poultry feature in the study, reminding us that the district’s heritage includes practical knowledge as well as performance.",
        source: "study",
      },
    ],
  },
  people: {
    title: "The people behind\nthe place.",
    eyebrow: "People of Malistan",
    intro:
      "An opening collection of cultural profiles, with room for the teachers, artists and community builders whose stories deserve to be preserved.",
    image: "/images/malistan-valley.webp",
    sections: [
      {
        title: "Safdar Ali Malistani · صفدرعلی مالستانی",
        text: "A musician associated with Malistan’s folk tradition and Now Deh. Kawa Ahmadzada’s 2019 account discusses his musical family and argues that some recordings attributed to Abay Mirza are actually his. Specific recording credits require further verification.",
        source: "music",
      },
      {
        title: "Abay Mirza · آبه میرزا",
        text: "Also remembered as Mother Mirza, she is a prominent figure in writing about Malistan’s musical heritage. A 2016 obituary reports her death in Malistan on 21 July that year. A later local account challenges parts of the familiar story, including song and voice attributions.",
        source: "obituary",
      },
      {
        title: "A note on attribution",
        text: "We preserve differing accounts rather than assigning disputed recordings or compositions to a person. The 2019 article provides an alternative local perspective and is included in our source library.",
        source: "music",
      },
      {
        title: "There are more stories to tell",
        text: "Future profiles can include educators, writers, athletes, musicians and people whose contribution is known first in their own village. Each addition should include a verifiable connection to Malistan, a source, and permission for any portrait.",
      },
    ],
  },
  about: {
    title: "For Malistan.\nFor generations.",
    eyebrow: "About the archive",
    intro:
      "An independent community archive, founded by Rohullah Mohammadi out of love for his hometown in Ghazni, Afghanistan.",
    image: "/images/malistan-winter.webp",
    sections: [
      {
        title: "A home for our shared memory",
        text: "Malistan deserves a thoughtful place on the internet: somewhere to discover its landscapes, learn about its culture and find the stories of its people. This first edition brings together an initial set of researched articles and openly licensed photographs.",
      },
      {
        title: "Made to grow",
        text: "The archive will expand with local photographs, films, oral histories and carefully researched profiles. The goal is to make knowledge about Malistan easy to find, clearly organised and accessible to people at home and abroad.",
      },
      {
        title: "Our editorial promise",
        text: "Sources are linked. Historical estimates remain dated. Disputed accounts are identified. Images retain their credits and licences. Corrections and first-hand knowledge will help make the archive more complete.",
      },
      {
        title: "Contribute to a future edition",
        text: "Prepare the original photo or recording, its location and approximate date, the creator’s name, permission to publish, and a short description. Contributions are not collected online in this edition; please share them directly with the archive’s founder.",
      },
    ],
  },
};
