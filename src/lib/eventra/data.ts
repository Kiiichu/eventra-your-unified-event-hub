import eventPasar from "@/assets/event-pasar.jpg";
import eventBudaya from "@/assets/event-budaya.jpg";
import eventSukan from "@/assets/event-sukan.jpg";
import eventPendidikan from "@/assets/event-pendidikan.jpg";

export type District =
  | "all"
  | "cukai"
  | "geliga"
  | "kijal"
  | "kemasik"
  | "kerteh"
  | "binjai";

export const districts: { id: District; labelMs: string; labelEn: string }[] = [
  { id: "all", labelMs: "Seluruh Daerah", labelEn: "All Districts" },
  { id: "cukai", labelMs: "Cukai", labelEn: "Cukai" },
  { id: "geliga", labelMs: "Geliga", labelEn: "Geliga" },
  { id: "kijal", labelMs: "Kijal", labelEn: "Kijal" },
  { id: "kemasik", labelMs: "Kemasik", labelEn: "Kemasik" },
  { id: "kerteh", labelMs: "Kerteh", labelEn: "Kerteh" },
  { id: "binjai", labelMs: "Binjai", labelEn: "Binjai" },
];

export type Category =
  | "all"
  | "market"
  | "culture"
  | "sports"
  | "education"
  | "kids";

export const categories: { id: Category; labelMs: string; labelEn: string }[] = [
  { id: "all", labelMs: "Semua", labelEn: "All" },
  { id: "market", labelMs: "Pasar", labelEn: "Market" },
  { id: "culture", labelMs: "Budaya", labelEn: "Culture" },
  { id: "sports", labelMs: "Sukan", labelEn: "Sports" },
  { id: "education", labelMs: "Pendidikan", labelEn: "Education" },
  { id: "kids", labelMs: "Kanak-kanak", labelEn: "Kids" },
];

export interface Event {
  id: string;
  titleMs: string;
  titleEn: string;
  category: Category;
  district: District;
  venueMs: string;
  venueEn: string;
  date: string;
  time: string;
  price: number;
  currency: string;
  going: number;
  image: string;
  descriptionMs: string;
  descriptionEn: string;
  color: "coral" | "fresh" | "gold" | "canvas";
}

export const events: Event[] = [
  {
    id: "pasar-malam-terengganu",
    titleMs: "Pasar Malam Terengganu",
    titleEn: "Terengganu Night Market",
    category: "market",
    district: "cukai",
    venueMs: "Warisan Lane, Cukai",
    venueEn: "Warisan Lane, Cukai",
    date: "2026-09-18",
    time: "7:00 PM",
    price: 0,
    currency: "RM",
    going: 210,
    image: eventPasar,
    descriptionMs:
      "Tiga puluh gerai makanan dan kerajinan tempatan dengan parking percuma dan persembahan akustik selepas 9 malam.",
    descriptionEn:
      "Thirty food and craft stalls with free parking and live acoustic performances after 9pm.",
    color: "coral",
  },
  {
    id: "zaman-kanak-kanak",
    titleMs: "Zaman Kanak-kanak",
    titleEn: "Children's Heritage Day",
    category: "culture",
    district: "kijal",
    venueMs: "Dewan Majlis Kijal",
    venueEn: "Kijal Council Hall",
    date: "2026-09-19",
    time: "10:00 AM",
    price: 0,
    currency: "RM",
    going: 120,
    image: eventBudaya,
    descriptionMs:
      "Cerita tradisional, permainan klasik dan tarian komuniti untuk keluarga. Masuk percuma.",
    descriptionEn:
      "Traditional storytelling, classic games and community dance for families. Free entry.",
    color: "fresh",
  },
  {
    id: "laga-bola-komuniti",
    titleMs: "Laga Bola Komuniti",
    titleEn: "Community Football Match",
    category: "sports",
    district: "kerteh",
    venueMs: "Padang Chukai",
    venueEn: "Chukai Field",
    date: "2026-09-20",
    time: "5:00 PM",
    price: 10,
    currency: "RM",
    going: 64,
    image: eventSukan,
    descriptionMs:
      "Perlawanan persahabatan bola sepak untuk semua. Daftar pasukan empat orang.",
    descriptionEn:
      "Friendly football match open to all. Register a squad of four.",
    color: "gold",
  },
  {
    id: "jom-ulangkaji-spm",
    titleMs: "Jom Ulangkaji SPM",
    titleEn: "SPM Revision Session",
    category: "education",
    district: "cukai",
    venueMs: "Perpustakaan Daerah Kemaman",
    venueEn: "Kemaman District Library",
    date: "2026-09-21",
    time: "9:00 AM",
    price: 0,
    currency: "RM",
    going: 88,
    image: eventPendidikan,
    descriptionMs:
      "Sesi ulangkaji percuma dengan mentor berpengalaman. Bawa buku nota sendiri.",
    descriptionEn:
      "Free revision session with experienced mentors. Bring your own notebooks.",
    color: "canvas",
  },
];

export const featuredEvent = events[0];

export interface MyEvent {
  id: string;
  eventId: string;
  titleMs: string;
  titleEn: string;
  date: string;
  time: string;
  color: "gold" | "coral" | "fresh";
  initials: string;
  status: "registered" | "attended";
}

export const myEvents: MyEvent[] = [
  {
    id: "my-1",
    eventId: "jom-ulangkaji-spm",
    titleMs: "Jom Ulangkaji SPM",
    titleEn: "SPM Revision Session",
    date: "2026-09-21",
    time: "9:00 AM",
    color: "gold",
    initials: "JU",
    status: "registered",
  },
  {
    id: "my-2",
    eventId: "pasar-malam-terengganu",
    titleMs: "Pasar Malam Terengganu",
    titleEn: "Terengganu Night Market",
    date: "2026-09-18",
    time: "4:30 PM",
    color: "coral",
    initials: "PT",
    status: "registered",
  },
];

export interface Notification {
  id: string;
  titleMs: string;
  titleEn: string;
  bodyMs: string;
  bodyEn: string;
  type: "registration" | "change" | "reminder" | "system";
  date: string;
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: "n1",
    titleMs: "Pendaftaran disahkan",
    titleEn: "Registration confirmed",
    bodyMs: "Pasar Malam Terengganu · 18 Sep, 7:00 malam",
    bodyEn: "Terengganu Night Market · 18 Sep, 7:00 PM",
    type: "registration",
    date: "2026-09-13T08:00:00",
    read: false,
  },
  {
    id: "n2",
    titleMs: "Perubahan tempat",
    titleEn: "Venue change",
    bodyMs: "Zaman Kanak-kanak kini di Dewan Majlis Kijal.",
    bodyEn: "Children's Heritage Day is now at Kijal Council Hall.",
    type: "change",
    date: "2026-09-12T14:30:00",
    read: false,
  },
  {
    id: "n3",
    titleMs: "Peringatan acara",
    titleEn: "Event reminder",
    bodyMs: "Laga Bola Komuniti bermula 5:00 petang ini.",
    bodyEn: "Community Football Match starts at 5:00 PM today.",
    type: "reminder",
    date: "2026-09-11T09:15:00",
    read: true,
  },
];
