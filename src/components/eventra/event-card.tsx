import { Link } from "@tanstack/react-router";
import { categories, type Event } from "@/lib/eventra/data";
import { useI18n } from "@/lib/eventra/i18n";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { lang, t } = useI18n();

  const categoryLabel =
    categories.find((c) => c.id === event.category)?.[lang === "ms" ? "labelMs" : "labelEn"] ??
    event.category;

  const bgMap = {
    coral: "bg-coral",
    fresh: "bg-fresh",
    gold: "bg-gold",
    canvas: "bg-canvas",
  };

  const title = lang === "ms" ? event.titleMs : event.titleEn;
  const venue = lang === "ms" ? event.venueMs : event.venueEn;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border-2 border-ink ${bgMap[event.color]}`}
    >
      <Link to="/events/$id" params={{ id: event.id }}>
        <img
          src={event.image}
          alt={title}
          width={1024}
          height={640}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-canvas">
            {categoryLabel}
          </span>
          <span className="font-mono text-[10px] text-ink/60">
            {venue} · {event.time}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl leading-tight text-ink sm:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink/70">
          {lang === "ms" ? event.descriptionMs : event.descriptionEn}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-ink/15 pt-3">
          <Link
            to="/events/$id"
            params={{ id: event.id }}
            className="flex-1 rounded-xl bg-ink py-2.5 text-center text-sm font-bold text-canvas transition-colors hover:bg-canvas hover:text-ink"
          >
            {t.getQRTicket}
          </Link>
          <span className="font-mono text-[10px] text-ink/60">
            {event.price === 0 ? t.free : `${event.currency}${event.price}`}
          </span>
        </div>
      </div>
    </article>
  );
}
