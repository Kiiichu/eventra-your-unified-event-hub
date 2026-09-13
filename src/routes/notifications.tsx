import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
  head: () => ({
    meta: [
      { title: "Notifikasi — EVENTRA" },
      { name: "description", content: "Your EVENTRA notifications." },
      { property: "og:title", content: "Notifikasi — EVENTRA" },
      { property: "og:description", content: "Your EVENTRA notifications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function NotificationsPage() {
  return <div className="p-6 text-ink">Notifications page placeholder</div>;
}
