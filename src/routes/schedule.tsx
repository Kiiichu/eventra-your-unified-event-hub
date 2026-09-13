import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, QrCode } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";
import { myEvents } from "@/lib/eventra/data";

export const Route = createFileRoute("/schedule")({
  component: SchedulePage,
  head: () => ({
    meta: [
      { title: "Jadual — EVENTRA" },
      { name: "description", content: "Your upcoming events in Kemaman." },
      { property: "og:title", content: "Jadual — EVENTRA" },
      { property: "og:description", content: "Your upcoming events in Kemaman." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function SchedulePage() {
  const { lang, t } = useI18n();
  const [tab, setTab] = useState<"upcoming" | "past" | "saved">("upcoming");

  const tabs: { id: typeof tab; label: string }[] = [
    { id: "upcoming", label: t.upcoming },
    { id: "past", label: t.past },
    { id: "saved", label: t.saved },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
            {t.schedule}
          </p>
          <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {t.myEvents}
          </h1>
        </div>
        <div className="flex gap-2">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                tab === id
                  ? "bg-ink text-canvas"
                  : "border-2 border-ink bg-canvas text-ink hover:bg-ink/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {myEvents.map((event) => (
          <Link
            key={event.id}
            to="/events/$id"
            params={{ id: event.eventId }}
            className="flex items-center gap-4 rounded-3xl border-2 border-ink bg-canvas p-4 transition-colors hover:bg-ink/5"
          >
            <div
              className={`grid size-14 shrink-0 place-items-center rounded-2xl font-display text-lg text-ink ${
                event.color === "gold"
                  ? "bg-gold"
                  : event.color === "coral"
                  ? "bg-coral text-canvas"
                  : "bg-fresh"
              }`}
            >
              {event.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-lg text-ink">
                {lang === "ms" ? event.titleMs : event.titleEn}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-sub">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {event.date} · {event.time}
                </span>
              </div>
            </div>
            <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
              <QrCode className="size-8 text-ink" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-sub">QR</span>
            </div>
          </Link>
        ))}
      </div>

      {myEvents.length === 0 && (
        <div className="mt-8 rounded-3xl border-2 border-ink bg-canvas p-8 text-center">
          <p className="font-display text-xl text-ink">Tiada acara</p>
          <p className="mt-1 text-sm text-sub">No events in this section yet.</p>
        </div>
      )}
    </div>
  );
}
