import { createFileRoute } from "@tanstack/react-router";

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
  return <div className="p-6 text-ink">Submit page placeholder</div>;
}
