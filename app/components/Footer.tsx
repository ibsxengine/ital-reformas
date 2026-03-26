"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0C] border-t border-[#FAFAF5]/5 py-10" style={{ fontFamily: "'Jost', sans-serif" }}>
      <div className="max-w-[1360px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-5">
        <span className="font-display text-xl font-light tracking-[0.2em] text-[#FAFAF5]/30"
          style={{ fontFamily: "'Cormorant', serif" }}>
          ITAL <span className="text-[#8B1A2A]">REFORMAS</span>
        </span>
        <p className="text-[10px] tracking-[0.1em] text-[#FAFAF5]/15 font-light text-center">
          © 2025 Ital Reformas Cavallo, S.L. · CIF: B42899625 · Todos los derechos reservados
        </p>
        <div className="flex gap-1">
          <div className="w-7 h-[3px] bg-[#1C3D2E]" />
          <div className="w-7 h-[3px] bg-[#FAFAF5]/12" />
          <div className="w-7 h-[3px] bg-[#8B1A2A]" />
        </div>
      </div>
    </footer>
  );
}