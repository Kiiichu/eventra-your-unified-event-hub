import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useI18n } from "@/lib/eventra/i18n";
import { categories, districts, events, featuredEvent, myEvents, type Category, type District } from "@/lib/eventra/data";
import { CategoryChips } from "@/components/eventra/category-chips";
import { DistrictFilter } from "@/components/eventra/district-filter";
import { EventCard } from "@/components/eventra/event-card";
import { LanguageToggle } from "@/components/eventra/language-toggle";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "EVENTRA — Kemaman" },
      { name: "description", content: "Discover community events in Kemaman with EVENTRA." },
      { property: "og:title", content: "EVENTRA — Kemaman" },
      { property: "og:description", content: "Discover community events in Kemaman with EVENTRA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function HomePage() {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<District>("all");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const catMatch = selectedCategory === "all" || event.category === selectedCategory;
      const distMatch = selectedDistrict === "all" || event.district === selectedDistrict;
      return catMatch && distMatch;
    });
  }, [selectedCategory, selectedDistrict]);

  const featuredTitle = lang === "ms" ? featuredEvent.titleMs : featuredEvent.titleEn;
  const featuredDesc = lang === "ms" ? featuredEvent.descriptionMs : featuredEvent.descriptionEn;
  const featuredVenue = lang === "ms" ? featuredEvent.venueMs : featuredEvent.venueEn;

  const activeDistrictLabel =
    districts.find((d) => d.id === selectedDistrict)?.[lang === "ms" ? "labelMs" : "labelEn"] ??
    t.allDistricts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-8">
      {/* Left sidebar — desktop only */}
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-24 space-y-6">
          <DistrictFilter selected={selectedDistrict} onSelect={setSelectedDistrict} />
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
              {t.category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                      active
                        ? "bg-ink text-canvas"
                        : "border-2 border-ink bg-canvas text-ink hover:bg-ink/5"
                    }`}
                  >
                    {lang === "ms" ? cat.labelMs : cat.labelEn}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border-2 border-ink bg-gold p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
              {t.inviteFriends}
            </p>
            <p className="mt-1 font-display text-lg leading-tight text-ink">
              {t.communityHelp}
            </p>
            <Link
              to="/submit"
              className="mt-3 inline-block w-full rounded-xl bg-ink py-2 text-center text-sm font-bold text-canvas transition-colors hover:opacity-90"
            >
              {t.submitEvent}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <section className="lg:col-span-9">
        {/* Mobile header */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
              {t.greeting}
            </p>
            <p className="font-display text-xl leading-none text-ink">Zizan</p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Link
              to="/profile"
              className="grid size-9 place-items-center rounded-full bg-fresh font-display text-sm text-ink"
            >
              ZR
            </Link>
          </div>
        </div>

        {/* Hero / featured event */}
        <div className="mb-6 overflow-hidden rounded-3xl border-2 border-ink bg-coral p-5 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-canvas">
              {t.discover}
            </span>
            <span className="rounded-full bg-canvas px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
              Featured
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl leading-[0.92] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {featuredTitle}
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/80">
            {featuredDesc}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/70">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <span className="size-2 rounded-full bg-canvas"></span>
              {featuredEvent.date} · {featuredEvent.time}
            </span>
            <span>{featuredVenue}</span>
            <span>{featuredEvent.going} {t.going}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/events/$id"
              params={{ id: featuredEvent.id }}
              className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-canvas shadow-lg transition-colors hover:bg-canvas hover:text-ink"
            >
              {t.registerAutofill}
            </Link>
            <button className="rounded-full border-2 border-ink bg-canvas px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-ink/5">
              {t.viewCalendar}
            </button>
          </div>
        </div>

        {/* Mobile category chips */}
        <div className="mb-4 lg:hidden">
          <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Mobile filter pill */}
        <div className="mb-4 lg:hidden">
          <button className="flex w-full items-center justify-between rounded-2xl border-2 border-ink bg-fresh px-4 py-2.5 text-sm font-bold text-ink">
            <span>{activeDistrictLabel}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              {t.filter} ▾
            </span>
          </button>
        </div>

        {/* My events — mobile only */}
        <div className="mb-6 lg:hidden">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-sub">
            {t.myEvents} · {myEvents.length}
          </p>
          <div className="space-y-2">
            {myEvents.map((event) => (
              <Link
                key={event.id}
                to="/events/$id"
                params={{ id: event.eventId }}
                className={`flex items-center gap-3 rounded-2xl border-2 border-ink p-2.5 ${
                  event.color === "gold"
                    ? "bg-gold"
                    : event.color === "coral"
                    ? "bg-coral"
                    : "bg-fresh"
                }`}
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink font-display text-xs text-canvas">
                  {event.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold leading-tight text-ink">
                    {lang === "ms" ? event.titleMs : event.titleEn}
                  </p>
                  <p className="font-mono text-[10px] text-sub">
                    {event.date} · {event.time}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Events grid */}
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
            {t.nearYou}
          </h2>
          <span className="hidden text-sm font-medium text-sub sm:inline">
            {filteredEvents.length} {t.going}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="mt-8 rounded-3xl border-2 border-ink bg-canvas p-8 text-center">
            <p className="font-display text-xl text-ink">Tiada acara dijumpai</p>
            <p className="mt-1 text-sm text-sub">No events found for the selected filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
