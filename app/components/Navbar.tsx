"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Trabaja con nosotros", href: "/nosotros#trabaja" },
];

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!transparent) return;
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [transparent]);

  const isTransparentMode = transparent && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isTransparentMode
            ? "bg-transparent"
            : "bg-[#FAFAF5]/96 backdrop-blur-lg border-b border-[#0E0E0C]/6"
        }`}>
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">

          {/* Logo — más pequeño en móvil para no pegarse al burger */}
          <Link href="/"
            onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)}
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex flex-col gap-0.5 h-5 sm:h-6 flex-shrink-0">
              <div className="flex-1 w-[3px] bg-[#1C3D2E]" />
              <div className="flex-1 w-[3px] bg-transparent border border-[#FAFAF5]/20" />
              <div className="flex-1 w-[3px] bg-[#8B1A2A]" />
            </div>
            <span className={`font-display font-light tracking-[0.13em] sm:tracking-[0.18em] text-lg sm:text-2xl transition-colors duration-500 ${
              isTransparentMode ? "text-[#FAFAF5]" : "text-[#0E0E0C]"
            }`}
            style={{ fontFamily: "'Cormorant', serif" }}>
              ITAL <span className="text-[#8B1A2A]">REFORMAS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.filter(l => l.label !== "Trabaja con nosotros").map((l, i) => {
              const isActive = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <motion.div key={l.label}
                  initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.4 }}>
                  <Link href={l.href}
                    onClick={() => { if (!l.href.includes('#')) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`relative text-[12px] tracking-[0.22em] uppercase font-light transition-colors duration-300 group ${
                      isActive
                        ? "text-[#8B1A2A]"
                        : isTransparentMode
                          ? "text-[#FAFAF5]/80 hover:text-[#FAFAF5]"
                          : "text-[#0E0E0C]/55 hover:text-[#0E0E0C]"
                    }`}
                    style={{ fontFamily: "'Jost', sans-serif" }}>
                    {l.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-[#8B1A2A] transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/nosotros#trabaja"
              className={`text-[11px] tracking-[0.18em] uppercase font-light transition-colors duration-300 ${
                isTransparentMode ? "text-[#FAFAF5]/50 hover:text-[#FAFAF5]" : "text-[#0E0E0C]/40 hover:text-[#0E0E0C]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif" }}>
              Trabaja con nosotros
            </Link>
            <a href="https://wa.me/34653046233" target="_blank"
              className="inline-flex items-center gap-3 px-7 py-3 bg-[#1C3D2E] text-[#FAFAF5] text-[11px] tracking-[0.22em] uppercase font-light hover:bg-[#8B1A2A] transition-all duration-500"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              Presupuesto gratis
            </a>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col gap-1.5 flex-shrink-0">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${isTransparentMode ? "bg-[#FAFAF5]" : "bg-[#0E0E0C]"}`} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              className={`block w-6 h-px transition-colors duration-300 ${isTransparentMode ? "bg-[#FAFAF5]" : "bg-[#0E0E0C]"}`} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${isTransparentMode ? "bg-[#FAFAF5]" : "bg-[#0E0E0C]"}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0E0E0C] flex flex-col justify-center px-8 gap-0">
            {NAV.map((l, i) => (
              <motion.div key={l.label}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}>
                <Link href={l.href}
                  onClick={() => {
                    setMenuOpen(false);
                    if (!l.href.includes('#')) {
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }
                  }}
                  className="block font-display font-light text-[#FAFAF5] py-4 border-b border-[#FAFAF5]/8 hover:text-[#8B1A2A] transition-colors"
                  style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.8rem, 7vw, 3.5rem)" }}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.a href="https://wa.me/34653046233" target="_blank"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-6 inline-flex items-center gap-3 px-7 py-4 bg-[#8B1A2A] text-[#FAFAF5] text-sm tracking-widest uppercase font-light self-start"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              WhatsApp →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}