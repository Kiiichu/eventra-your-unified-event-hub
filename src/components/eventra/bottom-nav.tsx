import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, Bell, User } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";

export function BottomNav() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    { to: "/", icon: Home, label: t.discover },
    { to: "/schedule", icon: Calendar, label: t.schedule },
    { to: "/notifications", icon: Bell, label: t.notifications },
    { to: "/profile", icon: User, label: t.profile },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-ink bg-canvas md:hidden">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-4">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-ink" : "text-sub"
              }`}
            >
              <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
