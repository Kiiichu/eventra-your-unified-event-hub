import { createFileRoute } from "@tanstack/react-router";
import { events } from "@/lib/eventra/data";

export const Route = createFileRoute("/events/$id")({
  component: EventDetailPage,
  head: ({ params }) => {
    const event = events.find((e) => e.id === params.id);
    const title = event ? `${event.titleMs} — EVENTRA` : "Acara — EVENTRA";
    return {
      meta: [
        { title },
        { name: "description", content: "Event details on EVENTRA." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Event details on EVENTRA." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function EventDetailPage() {
  return <div className="p-6 text-ink">Event detail page placeholder</div>;
}
