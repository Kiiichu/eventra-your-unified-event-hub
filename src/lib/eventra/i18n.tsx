import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "ms" | "en";

export interface Labels {
  appName: string;
  tagline: string;
  greeting: string;
  homeTitle: string;
  homeSubtitle: string;
  discover: string;
  schedule: string;
  myEvents: string;
  notifications: string;
  profile: string;
  submitEvent: string;
  filter: string;
  district: string;
  category: string;
  allDistricts: string;
  allCategories: string;
  register: string;
  getQRTicket: string;
  free: string;
  going: string;
  nearYou: string;
  viewCalendar: string;
  communityHelp: string;
  inviteFriends: string;
  searchPlaceholder: string;
  today: string;
  thisWeek: string;
  open: string;
  market: string;
  culture: string;
  sports: string;
  education: string;
  kids: string;
  details: string;
  scanAtGate: string;
  qrShownOnRegister: string;
  registerNow: string;
  upcoming: string;
  past: string;
  saved: string;
  noNotifications: string;
  submitForReview: string;
  eventTitle: string;
  venue: string;
  description: string;
  organizerContact: string;
  uploadPoster: string;
  language: string;
  notificationSettings: string;
  logout: string;
  chatbotGreeting: string;
  chatbotEscalate: string;
}

export const labels: Record<Lang, Labels> = {
  ms: {
    appName: "EVENTRA",
    tagline: "Kemaman",
    greeting: "Selamat pagi",
    homeTitle: "APAKAH\nHARI INI",
    homeSubtitle: "What's on in Kemaman today",
    discover: "Penemuan",
    schedule: "Jadual",
    myEvents: "Acara saya",
    notifications: "Notifikasi",
    profile: "Profil",
    submitEvent: "Hantar Acara",
    filter: "Tapis",
    district: "Daerah",
    category: "Kategori",
    allDistricts: "Seluruh Daerah",
    allCategories: "Semua",
    register: "Daftar",
    getQRTicket: "Daftar & QR",
    free: "Percuma",
    going: "orang",
    nearYou: "Hampir Di Sini",
    viewCalendar: "Lihat kalendar",
    communityHelp: "Bantu komuniti",
    inviteFriends: "Ajak rakanmu",
    searchPlaceholder: "Cari acara, tempat, tarikh…",
    today: "Hari ini",
    thisWeek: "Minggu ini",
    open: "Buka",
    market: "Pasar",
    culture: "Budaya",
    sports: "Sukan",
    education: "Pendidikan",
    kids: "Kanak-kanak",
    details: "Detail",
    scanAtGate: "Skod QR kehadiran",
    qrShownOnRegister: "Dipaparkan semasa daftar",
    registerNow: "Daftar sekarang",
    upcoming: "Akan datang",
    past: "Lepas",
    saved: "Simpan",
    noNotifications: "Tiada notifikasi",
    submitForReview: "Hantar untuk semakan",
    eventTitle: "Tajuk acara",
    venue: "Tempat",
    description: "Keterangan",
    organizerContact: "Hubungan penganjur",
    uploadPoster: "Muat naik poster",
    language: "Bahasa",
    notificationSettings: "Tetapan notifikasi",
    logout: "Log keluar",
    chatbotGreeting: "Hai! Saya EVENTRA Bot. Ada soalan tentang acara?",
    chatbotEscalate: "Hubungi PIC",
  },
  en: {
    appName: "EVENTRA",
    tagline: "Kemaman",
    greeting: "Good morning",
    homeTitle: "WHAT'S ON\nTODAY",
    homeSubtitle: "Discover events in Kemaman",
    discover: "Discover",
    schedule: "Schedule",
    myEvents: "My Events",
    notifications: "Notifications",
    profile: "Profile",
    submitEvent: "Submit Event",
    filter: "Filter",
    district: "District",
    category: "Category",
    allDistricts: "All Districts",
    allCategories: "All",
    register: "Register",
    getQRTicket: "Register & QR",
    free: "Free",
    going: "going",
    nearYou: "Near You",
    viewCalendar: "View calendar",
    communityHelp: "Help the community",
    inviteFriends: "Invite friends",
    searchPlaceholder: "Search events, places, dates…",
    today: "Today",
    thisWeek: "This week",
    open: "Open",
    market: "Market",
    culture: "Culture",
    sports: "Sports",
    education: "Education",
    kids: "Kids",
    details: "Details",
    scanAtGate: "Scan attendance QR",
    qrShownOnRegister: "Shown after registration",
    registerNow: "Register now",
    upcoming: "Upcoming",
    past: "Past",
    saved: "Saved",
    noNotifications: "No notifications",
    submitForReview: "Submit for review",
    eventTitle: "Event title",
    venue: "Venue",
    description: "Description",
    organizerContact: "Organizer contact",
    uploadPoster: "Upload poster",
    language: "Language",
    notificationSettings: "Notification settings",
    logout: "Log out",
    chatbotGreeting: "Hi! I'm the EVENTRA bot. Any event questions?",
    chatbotEscalate: "Contact PIC",
  },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Labels;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ms");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "ms" ? "en" : "ms"));
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: labels[lang], toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
