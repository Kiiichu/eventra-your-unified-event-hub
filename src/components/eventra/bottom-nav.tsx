import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, Bell, User, SlidersHorizontal } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";

export function BottomNav() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    { to: "/", icon: Home, label: t.discover, accent: false },
    { to: "/schedule", icon: Calendar, label: t.schedule, accent: false },
    { to: "/", icon: SlidersHorizontal, label: t.filter, accent: true },
    { to: "/notifications", icon: Bell, label: t.notifications, accent: false },
    { to: "/profile", icon: User, label: t.profile, accent: false },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-ink bg-canvas md:hidden">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {navItems.map(({ to, icon: Icon, label, accent }, i) => {
          const active = !accent && pathname === to;
          return (
            <Link
              key={`${to}-${i}`}
              to={to}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-ink" : "text-sub"
              }`}
            >
              <span
                className={
                  accent
                    ? "grid size-9 place-items-center rounded-full border-2 border-ink bg-fresh text-ink"
                    : ""
                }
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className="text-[10px] font-bold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
