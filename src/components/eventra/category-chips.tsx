import { categories, type Category } from "@/lib/eventra/data";
import { useI18n } from "@/lib/eventra/i18n";

interface CategoryChipsProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  const { lang, t } = useI18n();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
              isActive
                ? "bg-coral text-canvas"
                : "border-2 border-ink bg-canvas text-ink hover:bg-ink/5"
            }`}
          >
            {lang === "ms" ? cat.labelMs : cat.labelEn}
          </button>
        );
      })}
    </div>
  );
}
