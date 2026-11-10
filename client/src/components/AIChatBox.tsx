import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type AIChatBoxProps = {
  messages: Message[];
  onSendMessage: (content: string) => void | Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  height?: string | number;
  emptyStateMessage?: string;
  suggestedPrompts?: string[];
};

export function AIChatBox({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Type your message…",
  className,
  height = "600px",
  emptyStateMessage = "Start a conversation with AI",
  suggestedPrompts = [],
}: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const displayMessages = messages.filter((message) => message.role !== "system");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [displayMessages.length, isLoading]);

  const submit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    void onSendMessage(trimmed);
    setInput("");
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  return (
    <div className={cn("ask-chat-box", className)} style={{ height }}>
      <div className="ask-chat-messages" ref={scrollRef} aria-live="polite">
        {displayMessages.length === 0 ? (
          <div className="ask-chat-empty">
            <div className="ask-chat-empty-copy"><Sparkles size={20} /><p>{emptyStateMessage}</p></div>
            <div className="ask-chat-suggestions">
              {suggestedPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => void onSendMessage(prompt)} disabled={isLoading}>{prompt}</button>)}
            </div>
          </div>
        ) : (
          <div className="ask-chat-thread">
            {displayMessages.map((message, index) => (
              <div className={cn("ask-chat-message", message.role === "user" ? "ask-chat-message--user" : "ask-chat-message--assistant")} key={`${message.role}-${index}`}>
                <span className="ask-chat-avatar" aria-hidden="true">{message.role === "user" ? <User size={13} /> : <Sparkles size={13} />}</span>
                <div className="ask-chat-bubble">{message.role === "assistant" ? <Streamdown>{message.content}</Streamdown> : <p>{message.content}</p>}</div>
              </div>
            ))}
            {isLoading && <div className="ask-chat-message ask-chat-message--assistant"><span className="ask-chat-avatar" aria-hidden="true"><Sparkles size={13} /></span><div className="ask-chat-bubble ask-chat-loading"><Loader2 size={15} className="animate-spin" /><span>Thinking…</span></div></div>}
          </div>
        )}
      </div>
      <div className="ask-chat-input-wrap">
        <Textarea ref={textareaRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submit(); } }} placeholder={placeholder} aria-label="Ask Princely AI a question" rows={1} className="ask-chat-input" />
        <Button type="button" size="icon" onClick={submit} disabled={!input.trim() || isLoading} aria-label="Send question"><Send size={15} /></Button>
      </div>
      <p className="ask-chat-hint">Enter to send · Shift + Enter for a new line</p>
    </div>
  );
}
