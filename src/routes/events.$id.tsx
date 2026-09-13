import { createFileRoute, Link } from "@tanstack/react-router";
import { notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Users, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { events } from "@/lib/eventra/data";
import { useI18n } from "@/lib/eventra/i18n";
import { CategoryChips } from "@/components/eventra/category-chips";
import { useState } from "react";
import { categories, type Category } from "@/lib/eventra/data";

export const Route = createFileRoute("/events/$id")({
  component: EventDetailPage,
  loader: ({ params }) => {
    const event = events.find((e) => e.id === params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    const event = loaderData?.event;
    const title = event ? `${event.titleMs} — EVENTRA` : "Acara — EVENTRA";
    return {
      meta: [
        { title },
        { name: "description", content: "Event details on EVENTRA." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Event details on EVENTRA." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function EventDetailPage() {
  const { lang, t } = useI18n();
  const { event } = Route.useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const title = lang === "ms" ? event.titleMs : event.titleEn;
  const venue = lang === "ms" ? event.venueMs : event.venueEn;
  const description = lang === "ms" ? event.descriptionMs : event.descriptionEn;
  const categoryLabel =
    categories.find((c) => c.id === event.category)?.[lang === "ms" ? "labelMs" : "labelEn"] ??
    event.category;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-8">
      <div className="lg:col-span-8">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-sub transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          {t.discover}
        </Link>

        <div className="overflow-hidden rounded-3xl border-2 border-ink">
          <img
            src={event.image}
            alt={title}
            width={1024}
            height={640}
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="bg-canvas p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-coral px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-canvas">
                {categoryLabel}
              </span>
              <span className="rounded-full border-2 border-ink bg-canvas px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">
                {event.date}
              </span>
            </div>
            <h1 className="mt-3 font-display text-3xl leading-[0.92] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink/80">
              {description}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-fresh p-3">
                <MapPin className="size-5 shrink-0 text-ink" />
                <div>
                  <p className="text-xs font-bold text-sub">{t.venue}</p>
                  <p className="text-sm font-bold text-ink">{venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-gold p-3">
                <Calendar className="size-5 shrink-0 text-ink" />
                <div>
                  <p className="text-xs font-bold text-sub">{t.schedule}</p>
                  <p className="text-sm font-bold text-ink">{event.date} · {event.time}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-ink/70">
              <Users className="size-4" />
              <span>{event.going} {t.going}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border-2 border-ink bg-canvas p-5 sm:p-6">
          <h2 className="font-display text-xl text-ink">Programme / Atur cara</h2>
          <ul className="mt-3 space-y-3">
            <li className="flex gap-3">
              <span className="font-mono text-xs text-sub">10:00</span>
              <span className="text-sm text-ink">Registration / Pendaftaran</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-sub">11:00</span>
              <span className="text-sm text-ink">Opening ceremony / Majlis perasmian</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-sub">13:00</span>
              <span className="text-sm text-ink">Main activity / Aktiviti utama</span>
            </li>
          </ul>
        </div>
      </div>

      <aside className="mt-6 lg:col-span-4 lg:mt-0">
        <div className="sticky top-24 space-y-5">
          <div className="rounded-3xl border-2 border-ink bg-canvas p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
              {t.scanAtGate}
            </p>
            <div className="mt-3 grid grid-cols-6 gap-1.5 rounded-2xl border-2 border-dashed border-ink/30 bg-canvas p-4">
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className={`aspect-square rounded-[3px] ${
                    [0, 2, 4, 7, 9, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34].includes(i)
                      ? "bg-ink"
                      : "bg-ink/30"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-sub">{t.qrShownOnRegister}</p>
            <button className="mt-4 w-full rounded-xl bg-ink py-3 text-sm font-bold text-canvas transition-colors hover:bg-coral">
              {t.registerNow}
            </button>
          </div>

          <div className="rounded-3xl border-2 border-ink bg-gold p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
              {t.organizerContact}
            </p>
            <p className="mt-1 font-display text-lg text-ink">Majlis Komuniti Kemaman</p>
            <p className="text-sm text-ink/70">eventra@kemaman.gov.my</p>
          </div>

          <div className="flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-canvas py-2.5 text-sm font-bold text-ink transition-colors hover:bg-ink/5">
              <Share2 className="size-4" /> Share
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-canvas py-2.5 text-sm font-bold text-ink transition-colors hover:bg-ink/5">
              <Bookmark className="size-4" /> {t.saved}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
