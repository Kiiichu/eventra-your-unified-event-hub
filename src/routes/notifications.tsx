import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CalendarCheck, AlertCircle, Clock } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";
import { notifications } from "@/lib/eventra/data";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
  head: () => ({
    meta: [
      { title: "Notifikasi — EVENTRA" },
      { name: "description", content: "Your EVENTRA notifications." },
      { property: "og:title", content: "Notifikasi — EVENTRA" },
      { property: "og:description", content: "Your EVENTRA notifications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function NotificationsPage() {
  const { lang, t } = useI18n();

  const iconMap = {
    registration: CalendarCheck,
    change: AlertCircle,
    reminder: Clock,
    system: Bell,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
          {t.notifications}
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {t.notifications}
        </h1>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <Link
              key={n.id}
              to="/events/$id"
              params={{ id: "pasar-malam-terengganu" }}
              className={`flex items-start gap-4 rounded-3xl border-2 border-ink p-4 transition-colors hover:bg-ink/5 ${
                n.read ? "bg-canvas" : "bg-fresh"
              }`}
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-canvas">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink">
                  {lang === "ms" ? n.titleMs : n.titleEn}
                </p>
                <p className="text-sm text-sub">
                  {lang === "ms" ? n.bodyMs : n.bodyEn}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-sub">
                  {new Date(n.date).toLocaleDateString(lang === "ms" ? "ms-MY" : "en-MY", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {!n.read && <span className="mt-2 size-2 shrink-0 rounded-full bg-coral" />}
            </Link>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="mt-8 rounded-3xl border-2 border-ink bg-canvas p-8 text-center">
          <p className="text-ink">{t.noNotifications}</p>
        </div>
      )}
    </div>
  );
}
