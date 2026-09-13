import { useI18n } from "@/lib/eventra/i18n";

export function LanguageToggle() {
  const { lang, toggleLang } = useI18n();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 rounded-full border-2 border-ink bg-canvas px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-ink/5"
      aria-label="Toggle language"
    >
      <span className={lang === "ms" ? "text-ink" : "text-sub"}>BM</span>
      <span className="text-sub">/</span>
      <span className={lang === "en" ? "text-ink" : "text-sub"}>EN</span>
    </button>
  );
}
