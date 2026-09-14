import { Link, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";

export function TopNav() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const linkClass = (to: string) =>
    `rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
      pathname === to
        ? "bg-ink text-canvas"
        : "text-ink hover:bg-ink/5"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-ink">
            {t.appName}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-sub sm:inline">
            · {t.tagline}
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-sub">
            Jom Temui
          </span>
          <Link to="/" className={linkClass("/")}>
            {t.discover}
          </Link>
          <Link to="/schedule" className={linkClass("/schedule")}>
            {t.schedule}
          </Link>
          <Link to="/profile" className={linkClass("/profile")}>
            {t.profile}
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-sub" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="h-9 w-48 rounded-full border-2 border-ink bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-sub/60 focus:border-ink focus:outline-none lg:w-64"
            />
          </div>
          <Link
            to="/submit"
            className="hidden rounded-full bg-coral px-3 py-1.5 text-sm font-bold text-canvas transition-colors hover:opacity-90 sm:inline-block"
          >
            + {t.submitEvent}
          </Link>
          <Link
            to="/profile"
            className="grid size-9 place-items-center rounded-full bg-fresh font-display text-sm text-ink"
          >
            ZR
          </Link>
        </div>
      </div>
    </header>
  );
}
