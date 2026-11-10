import { AIChatBox, type Message } from "@/components/AIChatBox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { imagePath } from "@/images";
import { useEffect, useState } from "react";

const welcomeMessage =
  "Hi, I'm Princely's portfolio assistant.\n\nI can help you learn about his skills, projects, experience, education and professional background.";

const suggestedPrompts = [
  "What skills does Princely have?",
  "What projects has he built?",
  "What technologies does he use?",
  "What is he currently doing?",
  "Tell me about his AI experience.",
];

export function AskPrincelyAI({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "Portfolio-only assistant context" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const sendMessage = async (content: string) => {
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask-princely", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      const payload = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !payload.answer) {
        throw new Error(payload.error || "The assistant could not respond.");
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.answer! }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant is temporarily unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="ask-princely-panel" aria-label="Ask Princely AI">
      <div className="ask-princely-head">
        <div className="ask-princely-brand">
          <img className="ask-princely-logo ask-princely-logo--light" src={imagePath("ask-princely-ai-lightmode.png")} alt="" aria-hidden="true" />
          <img className="ask-princely-logo ask-princely-logo--dark" src={imagePath("ask-princely-ai-darkmode.png")} alt="" aria-hidden="true" />
          <div>
            <span className="eyebrow">Ask Princely AI</span>
            <p>Ask me about Princely's work, skills, projects and experience.</p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ask-princely-close"
          onClick={onClose}
          aria-label="Close Ask Princely AI"
        >
          <X size={18} strokeWidth={1.8} />
        </Button>
      </div>
      <AIChatBox
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        height="min(640px, calc(100dvh - 170px))"
        placeholder="Ask about Princely's portfolio…"
        emptyStateMessage={welcomeMessage}
        suggestedPrompts={suggestedPrompts}
        className="ask-princely-chat"
      />
      {error && <p className="ask-princely-error" role="alert">{error}</p>}
    </section>
  );
}
