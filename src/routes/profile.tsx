import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Profil — EVENTRA" },
      { name: "description", content: "Your EVENTRA profile and settings." },
      { property: "og:title", content: "Profil — EVENTRA" },
      { property: "og:description", content: "Your EVENTRA profile and settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function ProfilePage() {
  return <div className="p-6 text-ink">Profile page placeholder</div>;
}
