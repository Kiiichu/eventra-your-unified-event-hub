import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Bot, UserRound, PhoneForwarded } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({
    meta: [
      { title: "Sokongan AI & PIC — EVENTRA" },
      { name: "description", content: "Ask the EVENTRA assistant about events, or get routed to the event PIC." },
      { property: "og:title", content: "Sokongan AI & PIC — EVENTRA" },
      { property: "og:description", content: "Ask the EVENTRA assistant about events, or get routed to the event PIC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

interface Msg {
  text: string;
  sender: "user" | "bot";
}

function ChatPage() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Msg[]>([
    { text: t.chatbotGreeting, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [routing, setRouting] = useState(false);

  const quick = [
    "Parking? / Tempat letak kereta?",
    "Masa mula? / Start time?",
    "Tiket percuma? / Free entry?",
  ];

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Acara bermula 10:00 pagi, masuk percuma. / Event starts 10:00 am, free entry.", sender: "bot" },
      ]);
    }, 700);
  };

  const escalate = () => {
    setRouting(true);
    setMessages((prev) => [...prev, { text: t.chatbotEscalate, sender: "user" }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "PIC: Encik Rahim (Majlis Komuniti Kemaman) · +60 9-859 1122", sender: "bot" },
      ]);
      setRouting(false);
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-sub">
        {t.chatSupport}
      </p>
      <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
        EVENTRA BOT
      </h1>

      <div className="mt-5 flex flex-col overflow-hidden rounded-3xl border-2 border-ink bg-canvas">
        <div className="min-h-[320px] flex-1 space-y-3 p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.sender === "user" ? "justify-end" : ""}`}>
              {m.sender === "bot" && (
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-fresh text-ink">
                  <Bot className="size-4" />
                </span>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                  m.sender === "user" ? "bg-coral text-canvas" : "bg-canvas text-ink border-2 border-ink"
                }`}
              >
                {m.text}
              </div>
              {m.sender === "user" && (
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-gold text-ink">
                  <UserRound className="size-4" />
                </span>
              )}
            </div>
          ))}

          {routing && (
            <div className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-ink bg-gold px-3 py-2 text-sm font-bold text-ink">
              <PhoneForwarded className="size-4 animate-pulse" />
              {t.transferringPIC}
            </div>
          )}
        </div>

        <div className="border-t-2 border-ink p-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-sub">
            {t.quickReplies}
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border-2 border-ink bg-canvas px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-ink/5"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Type a message…"
              className="flex-1 rounded-full border-2 border-ink bg-canvas px-4 py-2 text-sm text-ink placeholder:text-sub/60 focus:outline-none"
            />
            <button
              onClick={() => send(input)}
              className="grid size-10 place-items-center rounded-full bg-ink text-canvas"
              aria-label="Send"
            >
              <Send className="size-4" />
            </button>
          </div>
          <button
            onClick={escalate}
            className="mt-2 w-full rounded-xl bg-coral py-2.5 text-sm font-bold text-canvas transition-opacity hover:opacity-90"
          >
            {t.chatbotEscalate}
          </button>
        </div>
      </div>
    </div>
  );
}
