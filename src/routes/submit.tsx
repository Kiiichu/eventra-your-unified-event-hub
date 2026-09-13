import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";
import { categories, districts, type Category, type District } from "@/lib/eventra/data";

export const Route = createFileRoute("/submit")({
  component: SubmitPage,
  head: () => ({
    meta: [
      { title: "Hantar Acara — EVENTRA" },
      { name: "description", content: "Submit a community event to EVENTRA." },
      { property: "og:title", content: "Hantar Acara — EVENTRA" },
      { property: "og:description", content: "Submit a community event to EVENTRA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function SubmitPage() {
  const { lang, t } = useI18n();
  const [category, setCategory] = useState<Category>("all");
  const [district, setDistrict] = useState<District>("all");

  const inputClass =
    "w-full rounded-xl border-2 border-ink bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-sub/60 focus:border-ink focus:outline-none";
  const labelClass = "mb-1 block font-mono text-[10px] uppercase tracking-widest text-sub";

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-sub transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        {t.discover}
      </Link>

      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
          {t.communityHelp}
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {t.submitEvent}
        </h1>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className={labelClass}>{t.eventTitle}</label>
          <input className={inputClass} placeholder="Contoh: Karnival Komuniti Kemaman" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t.category}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {lang === "ms" ? c.labelMs : c.labelEn}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t.district}</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value as District)}
              className={inputClass}
            >
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {lang === "ms" ? d.labelMs : d.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t.venue}</label>
            <input className={inputClass} placeholder="Dewan / Padang / Jalan" />
          </div>
          <div>
            <label className={labelClass}>Tarikh / Date</label>
            <input type="date" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.description}</label>
          <textarea
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Ceritakan sedikit tentang acara ini..."
          />
        </div>

        <div>
          <label className={labelClass}>{t.organizerContact}</label>
          <input className={inputClass} placeholder="Email atau nombor telefon" />
        </div>

        <div>
          <label className={labelClass}>{t.uploadPoster}</label>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/50 bg-canvas py-6 text-sm font-bold text-sub transition-colors hover:bg-ink/5"
          >
            <Upload className="size-4" />
            Klik untuk muat naik
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-ink py-3 text-sm font-bold text-canvas transition-colors hover:bg-coral"
        >
          {t.submitForReview}
        </button>
      </form>
    </div>
  );
}
