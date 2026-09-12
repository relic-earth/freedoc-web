"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  ts?: string;
}

const SUGGESTIONS = [
  "I have a headache and fever",
  "What are symptoms of strep throat?",
  "Is this medication safe to combine?",
  "How long does a cold last?",
  "When should I go to the ER?",
  "Child won't stop coughing",
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatMessage(text: string) {
  return text.split("\n").map((line, i) => (
    <p key={i}>{line || " "}</p>
  ));
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content, ts: getTime() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages([...updated, { role: "assistant", content: data.message, ts: getTime() }]);
      } else {
        setMessages([...updated, { role: "assistant", content: "Something went wrong. Please try again.", ts: getTime() }]);
      }
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Connection error. Please try again.", ts: getTime() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-cross" />
            <span className="logo-text">FreeDoc</span>
          </div>
          <div className="logo-sub">Free medical guidance</div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-label">Channels</div>
          <button className="sidebar-item active">
            <div className="sidebar-item-dot" />
            general-health
          </button>
          <button className="sidebar-item">
            <div className="sidebar-item-dot blue" />
            symptoms
          </button>
          <button className="sidebar-item">
            <div className="sidebar-item-dot blue" />
            medications
          </button>
          <button className="sidebar-item">
            <div className="sidebar-item-dot blue" />
            mental-health
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="disclaimer-pill">
            ⚠️ For information only. Not a substitute for professional medical advice. Emergencies: call 911.
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-panel">
        <div className="channel-header">
          <span style={{ fontSize: "1rem" }}>✚</span>
          <span className="channel-name">#general-health</span>
          <div className="channel-status">
            <div className="status-dot" />
            <span className="status-text">FreeDoc AI · Online</span>
          </div>
          <a href="tel:911" className="call-911-btn">CALL 911</a>
        </div>

        <div className="messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-hero" />
              <h2>Ask a health question</h2>
              <p>
                Free AI medical guidance, 24/7. Ask about symptoms, medications, conditions, or anything health-related.
              </p>
              <div className="suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="suggestion-chip"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="msg-group">
                <div className="msg-row">
                  <div className={`msg-avatar ${msg.role === "user" ? "user" : "doc"}`}>
                    {msg.role === "user" ? "You" : ""}
                  </div>
                  <div className="msg-content">
                    <div className="msg-meta">
                      <span className={`msg-name ${msg.role === "assistant" ? "doc-name" : ""}`}>
                        {msg.role === "user" ? "You" : "FreeDoc"}
                      </span>
                      {msg.ts && <span className="msg-time">{msg.ts}</span>}
                    </div>
                    <div className="msg-text">
                      {formatMessage(msg.content)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="typing-row">
              <div className="msg-avatar doc" />
              <div className="typing-dots">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize();
              }}
              onKeyDown={handleKey}
              placeholder="Ask a health question... (Enter to send)"
              rows={1}
              disabled={loading}
              autoFocus
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="input-hint">Shift+Enter for new line · Not a substitute for professional care</div>
        </div>
      </main>
    </div>
  );
}
