import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useI18n } from "@/lib/eventra/i18n";

export function Chatbot() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: t.chatbotGreeting, sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Saya akan hubungi PIC untuk anda. / I will connect you to the PIC.", sender: "bot" },
      ]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 grid size-14 place-items-center rounded-full border-2 border-ink bg-coral text-canvas shadow-lg transition-transform hover:scale-105 md:bottom-6"
        aria-label="Open chat"
      >
        <MessageCircle className="size-6" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border-2 border-ink bg-canvas shadow-2xl md:bottom-6">
          <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3 text-canvas">
            <span className="font-display text-lg">EVENTRA Bot</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ maxHeight: "320px" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  m.sender === "user"
                    ? "ml-auto bg-coral text-canvas"
                    : "bg-fresh text-ink"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="border-t-2 border-ink p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Type a message…"
                className="flex-1 rounded-full border-2 border-ink bg-canvas px-3 py-2 text-sm text-ink placeholder:text-sub/60 focus:border-ink focus:outline-none"
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
              onClick={() => send(t.chatbotEscalate)}
              className="mt-2 w-full rounded-xl border-2 border-ink py-2 text-xs font-bold text-ink transition-colors hover:bg-ink/5"
            >
              {t.chatbotEscalate}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
