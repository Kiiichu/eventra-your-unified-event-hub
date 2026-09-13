import { createFileRoute } from "@tanstack/react-router";
import { Bell, Bookmark, QrCode, LogOut, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";
import { LanguageToggle } from "@/components/eventra/language-toggle";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Profil — EVENTRA" },
      { name: "description", content: "Your EVENTRA profile and settings." },
      { property: "og:title", content: "Profil — EVENTRA" },
      { property: "og:description", content: "Your EVENTRA profile and settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function ProfilePage() {
  const { t } = useI18n();

  const menu = [
    { icon: QrCode, label: t.myEvents, value: "2" },
    { icon: Bookmark, label: t.saved, value: "5" },
    { icon: Bell, label: t.notifications, value: "2" },
    { icon: LogOut, label: t.logout, value: "" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="grid size-16 place-items-center rounded-3xl bg-fresh font-display text-2xl text-ink">
          AL
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
            {t.profile}
          </p>
          <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Aisyah Lokman
          </h1>
          <p className="text-sm text-sub">aisyah.lokman@email.com</p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-3xl border-2 border-ink bg-canvas p-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-sub">
          {t.language}
        </span>
        <LanguageToggle />
      </div>

      <div className="space-y-3">
        {menu.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center justify-between rounded-3xl border-2 border-ink bg-canvas p-4 text-left transition-colors hover:bg-ink/5"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-ink text-canvas">
                <item.icon className="size-5" />
              </div>
              <span className="font-bold text-ink">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && (
                <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-canvas">
                  {item.value}
                </span>
              )}
              <ChevronRight className="size-4 text-sub" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border-2 border-ink bg-gold p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
          {t.notificationSettings}
        </p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink">Registration alerts</span>
            <div className="h-5 w-10 rounded-full bg-ink p-0.5">
              <div className="ml-auto size-4 rounded-full bg-canvas" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink">Venue change alerts</span>
            <div className="h-5 w-10 rounded-full bg-ink p-0.5">
              <div className="ml-auto size-4 rounded-full bg-canvas" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
