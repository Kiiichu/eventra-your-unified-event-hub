import { districts, type District } from "@/lib/eventra/data";
import { useI18n } from "@/lib/eventra/i18n";

interface DistrictFilterProps {
  selected: District;
  onSelect: (district: District) => void;
}

export function DistrictFilter({ selected, onSelect }: DistrictFilterProps) {
  const { lang, t } = useI18n();

  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
        {t.district}
      </p>
      <div className="space-y-1.5">
        {districts.map((d) => {
          const isActive = selected === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onSelect(d.id)}
              className={`w-full rounded-xl border-2 px-3 py-2 text-left text-sm font-bold transition-colors ${
                isActive
                  ? "border-ink bg-coral text-canvas"
                  : "border-ink bg-canvas text-ink hover:bg-ink/5"
              }`}
            >
              {lang === "ms" ? d.labelMs : d.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
