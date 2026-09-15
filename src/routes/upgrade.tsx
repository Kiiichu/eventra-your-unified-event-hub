import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Store, CalendarPlus, Clock, Upload } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";
import { districts, type District } from "@/lib/eventra/data";

export const Route = createFileRoute("/upgrade")({
  component: UpgradePage,
  head: () => ({
    meta: [
      { title: "Naik Taraf Akaun — EVENTRA" },
      {
        name: "description",
        content: "Apply to become an EVENTRA event organizer or vendor in Kemaman.",
      },
      { property: "og:title", content: "Naik Taraf Akaun — EVENTRA" },
      {
        property: "og:description",
        content: "Apply to become an EVENTRA event organizer or vendor in Kemaman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type Role = "organizer" | "vendor";

function UpgradePage() {
  const { lang, t } = useI18n();
  const [role, setRole] = useState<Role>("organizer");
  const [district, setDistrict] = useState<District>("all");
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full rounded-xl border-2 border-ink bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-sub/60 focus:border-ink focus:outline-none";
  const labelClass = "mb-1 block font-mono text-[10px] uppercase tracking-widest text-sub";

  const roleOptions = [
    {
      id: "organizer" as const,
      icon: CalendarPlus,
      title: t.becomeOrganizer,
      desc: t.organizerDesc,
      bg: "bg-coral",
    },
    {
      id: "vendor" as const,
      icon: Store,
      title: t.becomeVendor,
      desc: t.vendorDesc,
      bg: "bg-fresh",
    },
  ];

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
          {t.accountType} · {t.publicUser}
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {t.upgradeAccount}
        </h1>
        <p className="mt-1 text-sm text-sub">{t.upgradeSubtitle}</p>
      </div>

      {submitted ? (
        <div className="rounded-3xl border-2 border-dashed border-ink bg-gold p-6 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-ink text-canvas">
            <Clock className="size-6" />
          </div>
          <h2 className="mt-3 font-display text-2xl text-ink">{t.pendingApproval}</h2>
          <p className="mt-1 text-sm text-ink/80">{t.pendingNote}</p>
          <Link
            to="/profile"
            className="mt-4 inline-block rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-canvas transition-opacity hover:opacity-90"
          >
            {t.profile}
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {roleOptions.map((opt) => {
              const active = role === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRole(opt.id)}
                  className={`rounded-3xl border-2 border-ink p-4 text-left transition-all ${
                    active ? `${opt.bg} shadow-[4px_4px_0_0] shadow-ink` : "bg-canvas hover:bg-ink/5"
                  }`}
                >
                  <div className="grid size-10 place-items-center rounded-full bg-ink text-canvas">
                    <opt.icon className="size-5" />
                  </div>
                  <p className="mt-2 font-display text-lg leading-tight text-ink">{opt.title}</p>
                  <p className="mt-1 text-xs text-ink/70">{opt.desc}</p>
                </button>
              );
            })}
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div>
              <label className={labelClass}>
                {role === "organizer" ? t.organizationName : t.businessName}
              </label>
              <input
                className={inputClass}
                placeholder={
                  role === "organizer"
                    ? "Contoh: Persatuan Belia Cukai"
                    : "Contoh: Warung Mak Yah"
                }
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t.registrationNo}</label>
                <input className={inputClass} placeholder="SSM / ROS No." />
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

            <div>
              <label className={labelClass}>
                {role === "organizer" ? t.eventExperience : t.stallType}
              </label>
              <input
                className={inputClass}
                placeholder={
                  role === "organizer"
                    ? "Contoh: 3 karnival komuniti sejak 2023"
                    : "Contoh: Makanan & minuman"
                }
              />
            </div>

            <div>
              <label className={labelClass}>{t.organizerContact}</label>
              <input className={inputClass} placeholder="+60 13-555 0192" />
            </div>

            <div>
              <label className={labelClass}>{t.reasonToUpgrade}</label>
              <textarea
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Ceritakan sedikit tentang aktiviti anda..."
              />
            </div>

            <div>
              <label className={labelClass}>{t.uploadDocuments}</label>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/50 bg-canvas py-6 text-sm font-bold text-sub transition-colors hover:bg-ink/5"
              >
                <Upload className="size-4" />
                SSM / IC / Surat sokongan
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-ink py-3 text-sm font-bold text-canvas transition-colors hover:bg-coral"
            >
              {t.submitApplication}
            </button>
            <p className="text-center text-xs text-sub">{t.adminReviewNote}</p>
          </form>
        </>
      )}
    </div>
  );
}
