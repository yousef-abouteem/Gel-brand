"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/language";
import { ChatIcon, CloseIcon, SendIcon } from "./Icons";
import { Owl } from "./Owl";

type Message = { role: "user" | "model"; text: string };

const MAX_LENGTH = 500;

// Escapes HTML, then turns **bold** into <strong> and keeps phone numbers left-to-right
// so "+974 3112 1124" doesn't get reordered inside Arabic text.
function renderText(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\+?\d[\d ]{6,}\d/g, '<bdi dir="ltr">$&</bdi>')
    .replace(/\n/g, "<br>");
}

export function ChatWidget() {
  const { t, lang } = useLanguage();
  const { isOpen: cartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending, error]);

  async function send(text: string) {
    const clean = text.trim().slice(0, MAX_LENGTH);
    if (!clean || pending) return;

    const history: Message[] = [...messages, { role: "user", text: clean }];
    setMessages(history);
    setInput("");
    setError(false);
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, history: history.slice(-10) }),
      });
      const data: { reply?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(`Chat failed: ${res.status}`);
      setMessages((prev) => [...prev, { role: "model", text: data.reply!.slice(0, 2000) }]);
    } catch {
      // Drop the unanswered question so the history keeps alternating user/model turns.
      setMessages((prev) => prev.slice(0, -1));
      setInput(clean);
      setError(true);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input);
  }

  const suggestions = [t("chat_suggest1"), t("chat_suggest2"), t("chat_suggest3")];

  return (
    <div className={`chat${cartOpen ? " is-hidden" : ""}`}>
      {open && (
        <section className="chat__panel" aria-label={t("chat_name")}>
          <header className="chat__head">
            <span className="chat__avatar">
              <Owl tone="light" height={26} />
            </span>
            <div>
              <p className="chat__name">{t("chat_name")}</p>
              <p className="chat__status">{t("chat_status")}</p>
            </div>
            <button type="button" className="icon-button icon-button--light" onClick={() => setOpen(false)} aria-label={t("chat_close")}>
              <CloseIcon />
            </button>
          </header>

          <div className="chat__messages" ref={listRef} aria-live="polite">
            <p className="bubble bubble--model">{t("chat_welcome")}</p>

            {messages.length === 0 && (
              <div className="chat__suggestions">
                {suggestions.map((s) => (
                  <button key={s} type="button" className="chip" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <p
                key={i}
                className={`bubble bubble--${m.role}`}
                dir="auto"
                dangerouslySetInnerHTML={{ __html: renderText(m.text) }}
              />
            ))}

            {pending && (
              <p className="bubble bubble--model bubble--typing" aria-label="…">
                <span />
                <span />
                <span />
              </p>
            )}
            {error && (
              <p className="bubble bubble--error" dangerouslySetInnerHTML={{ __html: renderText(t("chat_error")) }} />
            )}
          </div>

          <form className="chat__form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat_placeholder")}
              maxLength={MAX_LENGTH}
              aria-label={t("chat_placeholder")}
              dir="auto"
            />
            <button type="submit" className="chat__send" disabled={pending || !input.trim()} aria-label={t("chat_send")}>
              <SendIcon />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat__launcher"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t("chat_close") : t("chat_open")}
      >
        {open ? <CloseIcon size={22} /> : <ChatIcon />}
      </button>
    </div>
  );
}
