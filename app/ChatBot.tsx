"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  visible?: boolean;
}

export default function ChatBot({ visible = true }: ChatBotProps) {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Bocadillo aparece 2s después de que el componente sea visible
  useEffect(() => {
    if (!visible || bubbleDismissed || open) return;
    const t = setTimeout(() => setBubble(true), 2000);
    return () => clearTimeout(t);
  }, [visible, bubbleDismissed, open]);

  // Ocultar bocadillo al abrir chat
  useEffect(() => {
    if (open) setBubble(false);
  }, [open]);

  // Mensaje de bienvenida la primera vez que se abre
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "¡Hola! 👋 Soy el asistente de Ital Reformas. Estoy aquí para ayudarte con cualquier consulta sobre reformas, presupuestos o nuestros servicios. ¿En qué puedo ayudarte?",
      }]);
    }
  }, [open]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!res.ok) throw new Error("Error en la respuesta");
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, ha habido un problema técnico. Puedes llamarnos al +34 653 046 233 o escribirnos a gestion@italreformas.com" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start gap-3" style={{ fontFamily: "'Jost', sans-serif" }}>

      {/* Bocadillo automático */}
      <AnimatePresence>
        {bubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FAFAF5] shadow-xl px-5 py-4 max-w-[230px] cursor-pointer"
            style={{ border: "1px solid rgba(28,61,46,0.15)" }}
            onClick={() => { setOpen(true); setBubbleDismissed(true); }}>
            {/* Triángulo apuntando al botón */}
            <div className="absolute -bottom-[9px] left-5 w-4 h-4 bg-[#FAFAF5] rotate-45"
              style={{ borderRight: "1px solid rgba(28,61,46,0.15)", borderBottom: "1px solid rgba(28,61,46,0.15)" }} />
            <p className="text-[#0E0E0C] text-sm font-light leading-relaxed pr-4">
              👋 ¿Hablamos? Estoy aquí para ayudarte
            </p>
            <button onClick={(e) => { e.stopPropagation(); setBubble(false); setBubbleDismissed(true); }}
              className="absolute top-2 right-2.5 text-[#0E0E0C]/30 hover:text-[#0E0E0C] text-xs transition-colors leading-none">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ventana de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FAFAF5] shadow-2xl w-[340px] flex flex-col overflow-hidden"
            style={{ height: "480px", border: "1px solid rgba(28,61,46,0.12)" }}>

            {/* Header */}
            <div className="bg-[#1C3D2E] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <div>
                  <p className="text-[#FAFAF5] text-sm font-light tracking-wide">Asistente Ital Reformas</p>
                  <p className="text-[#FAFAF5]/50 text-[10px] tracking-widest uppercase font-light">IA · Respuesta inmediata</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#FAFAF5]/50 hover:text-[#FAFAF5] transition-colors text-lg leading-none">✕</button>
            </div>

            {/* Línea tricolor */}
            <div className="flex h-[3px] flex-shrink-0">
              <div className="flex-1 bg-[#1C3D2E]" />
              <div className="flex-1 bg-[#FAFAF5] border-y border-[#0E0E0C]/5" />
              <div className="flex-1 bg-[#8B1A2A]" />
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] px-4 py-3 text-sm font-light leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#8B1A2A] text-[#FAFAF5]"
                      : "bg-[#F0EDE4] text-[#0E0E0C] border border-[#0E0E0C]/6"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#F0EDE4] border border-[#0E0E0C]/6 px-4 py-3 flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#1C3D2E]/40" />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sugerencias rápidas — solo al inicio */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {["¿Qué servicios ofrecéis?", "Quiero un presupuesto", "¿Dónde estáis?"].map(s => (
                  <button key={s} onClick={() => setInput(s)}
                    className="text-[10px] tracking-wide px-3 py-1.5 border border-[#1C3D2E]/20 text-[#1C3D2E] hover:bg-[#1C3D2E] hover:text-[#FAFAF5] transition-all duration-300 font-light">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#0E0E0C]/8 flex gap-2 flex-shrink-0">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-transparent text-[#0E0E0C] placeholder-[#0E0E0C]/30 text-sm font-light focus:outline-none" />
              <button onClick={sendMessage} disabled={!input.trim() || loading}
                className="w-9 h-9 bg-[#8B1A2A] flex items-center justify-center hover:bg-[#1C3D2E] transition-colors duration-300 disabled:opacity-30 flex-shrink-0">
                <svg className="w-4 h-4 text-[#FAFAF5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <motion.button
        onClick={() => { setOpen(!open); setBubble(false); setBubbleDismissed(true); }}
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 180, damping: 15 }}
        className="w-14 h-14 bg-[#1C3D2E] rounded-full flex items-center justify-center shadow-2xl shadow-[#1C3D2E]/25 relative">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
              className="text-[#FAFAF5] text-lg">✕</motion.span>
          ) : (
            <motion.svg key="chat"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
              className="w-6 h-6 text-[#FAFAF5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
        {/* Punto verde online */}
        {!open && <div className="absolute top-0 right-0 w-3 h-3 bg-[#4ade80] rounded-full border-2 border-[#FAFAF5]" />}
      </motion.button>
    </div>
  );
}