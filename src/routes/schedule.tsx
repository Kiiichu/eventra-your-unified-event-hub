import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/schedule")({
  component: SchedulePage,
  head: () => ({
    meta: [
      { title: "Jadual — EVENTRA" },
      { name: "description", content: "Your upcoming events in Kemaman." },
      { property: "og:title", content: "Jadual — EVENTRA" },
      { property: "og:description", content: "Your upcoming events in Kemaman." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function SchedulePage() {
  return <div className="p-6 text-ink">Schedule page placeholder</div>;
}
