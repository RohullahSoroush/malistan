// Generated from the original photographs (dimensions and blur previews included).
export type PhotoCategory = "Landscapes" | "Fields & paths" | "Pastures & streams" | "Seasons";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  blur: `data:image/${string}`;
  title: string;
  description: string;
  category: PhotoCategory;
  author: string;
  credit: string;
  license: string;
  licenseUrl?: string;
  source?: string;
};

export const photoCategories: PhotoCategory[] = ["Landscapes", "Fields & paths", "Pastures & streams", "Seasons"];

export const photos: Photo[] = [
  {
    id: "malistan-valley-panorama",
    src: "/images/malistan-valley-panorama.webp",
    width: 1080,
    height: 1080,
    blur: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAgCdASoQABAAA4BaJYgCdAEQEFomxFYUAAD+7UnEmNeVmo+EsZ6hfSLGXPgZ0R6hjg3a+KddjMmkXDO2TwVj7Y3xVKw/8UodDSAA",
    title: "The valley from above",
    description: "Poplar groves, green fields and village homes spread beneath the bare peaks of Malistan.",
    category: "Landscapes",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-autumn-valley",
    src: "/images/malistan-autumn-valley.webp",
    width: 1080,
    height: 1080,
    blur: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAQCdASoQABAAA4BaJaACdACx5pAFKAD+3/kpACqq4SZC9OVZLTCKAzsUknfvubAzxmAEhWoVOggGp13QLcp+gKFI9u3cW5x8BzPti2HD07YZ7Qn4OsuAAAA=",
    title: "Autumn gold",
    description: "Poplars turning gold in autumn, with the mountains of Malistan rising behind them.",
    category: "Seasons",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-stream",
    src: "/images/malistan-stream.webp",
    width: 1080,
    height: 1080,
    blur: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAQAgCdASoQABAAA4BaJagCdADv1AvPUNwAAP7BhlctEfi6ydYkGGcMKc0DWGdrAnaOF8LJ1JSLyXTNuIy1ZNxw9siVpHxpYdmEvBC7KozunXXH1vCP9fsYA30QkAAA",
    title: "A mountain stream",
    description: "A clear, shallow stream runs between willows and grassy banks.",
    category: "Pastures & streams",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-poplar-road",
    src: "/images/malistan-poplar-road.webp",
    width: 765,
    height: 1020,
    blur: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoMABAAA4BaJQBdgBupRKPGhDWAAP712jmcui20TmriqXY0TGAzDDLqAKVvY82F0lhaZ67+21rHEi3ajO7YxnZs9Z4RAAAA",
    title: "The poplar road",
    description: "A gravel road runs through a tall avenue of white-barked poplars.",
    category: "Fields & paths",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-flock",
    src: "/images/malistan-flock.webp",
    width: 1020,
    height: 574,
    blur: "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoQAAkAA4BaJZQC7AEVYhiIrgAA/tz9bRbHqDtVue9OjgDqErDDImHnRml3wfKmWlAAAA==",
    title: "Evening flock",
    description: "A flock grazes a harvested field in the evening light, below a wall of poplars.",
    category: "Pastures & streams",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-wheat-field",
    src: "/images/malistan-wheat-field.webp",
    width: 1020,
    height: 765,
    blur: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAwAA4BaJZACdADiX9QOkIAA/ve/Lu8kDnSf9uQLoGUoZFW9i8gJLlc8WCcSk/MJOlMwRYBn32RGLtsgHPTP/LvYbpMFulRbEAAA",
    title: "Golden harvest",
    description: "A field of ripe grain beside rows of young trees and a stony village path.",
    category: "Fields & paths",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-clouds-valley",
    src: "/images/malistan-clouds-valley.webp",
    width: 1080,
    height: 1080,
    blur: "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAQAgCdASoQABAAA4BaJbACdAEfcfj+dDgwAP7g1FC5O21J6WPq3/H3ZCC3C4+qO5UWJedFVviKj8HgqS3V4qJakmNKfBxBkqBAAA==",
    title: "Clouds over the peaks",
    description: "Summer clouds drift over the mountains above a dense belt of poplars.",
    category: "Landscapes",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-hay-path",
    src: "/images/malistan-hay-path.webp",
    width: 1020,
    height: 765,
    blur: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAwAgCdASoQAAwAA4BaJYgCdAEfBK5SJ6jcAAD+q0ef71SBnxTVBGGCpmijlXAzw8JqMtbv6Qel+hIiwZbkUNQMVPkg10RE8BZNyR84QuIHovzyqf6MNRzS8wJgAAAA",
    title: "The path through the hay",
    description: "A footpath curves past a freshly cut hay field towards the poplars.",
    category: "Fields & paths",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-rooftops-spring",
    src: "/images/malistan-rooftops-spring.webp",
    width: 1020,
    height: 765,
    blur: "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoQAAwAA4BaJZgCdGuAAszrr30AAP3imA19TPOrSqz6k6U3Y5lznFVVMmOjQhxwvplX4HBLTbAulCQyxAAAAA==",
    title: "Rooftops in spring",
    description: "Flat earthen rooftops look out over the green valley and the mountains in spring.",
    category: "Landscapes",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-clover-field",
    src: "/images/malistan-clover-field.webp",
    width: 1020,
    height: 765,
    blur: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAQCdASoQAAwAA4BaJaACsADsmTk7VQAA4nTb5wuhz2k0Jv8GtAHrh9bHBunN9SQeNKC5YcY+dTuQPBiWBvNAPzL099Av0VBoB9YvHoA1eWEoV5x3W/gXFWASvEAA",
    title: "Green fields",
    description: "A green field ringed by tall poplars and willows on a summer day.",
    category: "Fields & paths",
    author: "Rohullah Mohammadi",
    credit: "Shared by Rohullah Mohammadi",
    license: "All rights reserved",
  },
  {
    id: "malistan-valley",
    src: "/images/malistan-valley.webp",
    width: 1280,
    height: 853,
    blur: "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAsAA4BaJZAC7AD0SQeg9kAA/udCCrqWhB69WfJHRLOUs1SJGSFWC4d+kF0c+RSFyJVlZvOTAAAA",
    title: "A valley called home",
    description: "Mountain slopes and cultivated land in Malistan, Ghazni province.",
    category: "Landscapes",
    author: "Danial",
    credit: "Photograph by Danial",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Malestan_1.jpg",
  },
  {
    id: "malistan-winter",
    src: "/images/malistan-winter.webp",
    width: 1800,
    height: 1350,
    blur: "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoQAAwAA4BaJZACdADal+Uu44AA7Xzj+jAz+YWfFOVqSkiWdJjrgv6Oyr/Ibm0xxzXZMvTnFho960+72N0pgCc2gAA=",
    title: "Winter in Malistan",
    description: "Snow settles over the highland landscape of Malistan, at 2,800 metres above sea level.",
    category: "Seasons",
    author: "Mohammad Reza Rahmani",
    credit: "Photograph by Mohammad Reza Rahmani",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:مالستان.jpg",
  },
];

export function photo(id: string): Photo {
  const found = photos.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown photo: ${id}`);
  return found;
}
