"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VALORES = [
  { icon: "⏱", title: "Puntualidad", desc: "Cumplimos los plazos acordados siempre, sin excusas." },
  { icon: "🤝", title: "Transparencia", desc: "Comunicación constante y presupuesto cerrado desde el inicio." },
  { icon: "🏆", title: "Calidad", desc: "Materiales de primera y acabados que duran en el tiempo." },
  { icon: "🔒", title: "Garantía", desc: "Todos nuestros trabajos tienen garantía por escrito." },
];

export default function NosotrosPage() {
  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#FAFAF5] text-[#0E0E0C] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        .font-display { font-family: 'Cormorant', serif; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #8B1A2A; }
        input[type="file"]::file-selector-button {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.5);
          padding: 6px 14px;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Jost', sans-serif;
        }
        input[type="file"]::file-selector-button:hover {
          background: #8B1A2A;
          color: white;
          border-color: #8B1A2A;
        }
      `}</style>

      <Navbar transparent={false} />

      {/* HERO — pt-40 para no solapar con menú */}
      <section className="pt-40 pb-28 bg-[#FAFAF5]">
        <div className="max-w-[1360px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-6">Sobre nosotros</p>
            <h1 className="font-display font-light text-[#0E0E0C] leading-tight mb-10"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}>
              Precisión italiana.<br /><span className="italic text-[#1C3D2E]">Desde 2012.</span>
            </h1>
            <p className="text-[#0E0E0C]/65 font-light leading-[1.95] text-lg mb-6">
              Somos Ital Reformas Cavallo, S.L., una empresa especializada en reformas integrales y mantenimiento de comunidades de vecinos en Madrid.
            </p>
            <p className="text-[#0E0E0C]/45 font-light leading-[1.95]">
              Nuestra filosofía es simple: hacer las cosas bien a la primera. Sin excusas, sin sorpresas en el presupuesto, con comunicación constante y entregando siempre en el plazo acordado.
            </p>
            <div className="mt-10 flex gap-1">
              <div className="w-12 h-[3px] bg-[#1C3D2E]" />
              <div className="w-12 h-[3px] bg-[#0E0E0C]/10" />
              <div className="w-12 h-[3px] bg-[#8B1A2A]" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=90"
              alt="Equipo Ital Reformas" className="w-full h-[560px] object-cover" />
            <div className="absolute bottom-0 left-0 right-0 h-[5px] flex">
              <div className="flex-1 bg-[#1C3D2E]" /><div className="flex-1 bg-[#FAFAF5]" /><div className="flex-1 bg-[#8B1A2A]" />
            </div>
            <div className="absolute top-7 right-7 bg-[#FAFAF5]/95 px-5 py-3 border-l-2 border-[#8B1A2A]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#0E0E0C]/45">Fundada en</p>
              <p className="font-display text-2xl font-light text-[#0E0E0C]">2012</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-[#1C3D2E]">
        <div className="max-w-[1360px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#FAFAF5]/10">
          {[
            { num: "150+", label: "Proyectos completados" },
            { num: "12", label: "Años de experiencia" },
            { num: "80+", label: "Comunidades gestionadas" },
            { num: "4.9★", label: "Valoración Google" },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="px-8 py-8 text-center group">
              <div className="font-display text-5xl font-light text-[#FAFAF5] mb-2 group-hover:text-[#8B1A2A] transition-colors">{s.num}</div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#FAFAF5]/55 font-light">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALORES */}
      <section className="py-36 bg-[#E8E0D0]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-16 text-center">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-5">Lo que nos define</p>
            <h2 className="font-display font-light text-[#0E0E0C]" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
              Nuestros <span className="italic text-[#1C3D2E]">valores.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-px bg-[#0E0E0C]/10">
            {VALORES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#E8E0D0] p-10 group hover:bg-[#1C3D2E] transition-all duration-500">
                <div className="text-3xl mb-5 group-hover:scale-110 transition-transform"
                  style={{ filter: "sepia(1) saturate(3) hue-rotate(310deg) brightness(0.6)" }}>{v.icon}</div>
                <h3 className="font-display text-2xl font-light text-[#0E0E0C] group-hover:text-[#FAFAF5] transition-colors mb-3">{v.title}</h3>
                <p className="text-[#0E0E0C]/60 font-light text-sm leading-relaxed group-hover:text-[#FAFAF5]/80 transition-colors">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRABAJA CON NOSOTROS */}
      <section id="trabaja" className="py-36 bg-[#0E0E0C]">
        <div className="max-w-[1360px] mx-auto px-8 grid md:grid-cols-2 gap-24 items-start">

          {/* Info — todo en blanco legible */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2 }}>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-7">Únete al equipo</p>
            <h2 className="font-display font-light text-[#FAFAF5] leading-tight mb-10"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
              Trabaja con<br /><span className="italic text-[#1C3D2E]">nosotros.</span>
            </h2>

            {/* Descripción en blanco — mismo color que los bullets */}
            <p className="text-[#FAFAF5]/80 font-light leading-[1.95] text-base mb-10">
              Buscamos profesionales apasionados por la construcción y el detalle. Técnicos, oficiales de obra y gestores de proyectos que quieran formar parte de un equipo serio y en crecimiento.
            </p>

            {/* Bullets — espacio extra antes del formulario */}
            <div className="space-y-5">
              {["Contrato estable y condiciones competitivas", "Proyectos de alto nivel en Madrid", "Equipo joven y profesional", "Formación continua"].map(b => (
                <div key={b} className="flex items-center gap-3 text-[0.95rem] text-[#FAFAF5]/80 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A2A] flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Formulario — con espacio arriba suficiente */}
          <motion.form
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.15 }}
            onSubmit={e => e.preventDefault()} className="space-y-7 pt-2">
            {[
              { placeholder: "Nombre completo", type: "text" },
              { placeholder: "Email", type: "email" },
              { placeholder: "Teléfono", type: "tel" },
              { placeholder: "Especialidad / Puesto al que aplicas", type: "text" },
            ].map(f => (
              <input key={f.placeholder} type={f.type} placeholder={f.placeholder}
                className="w-full bg-transparent border-b-2 border-[#FAFAF5]/15 text-[#FAFAF5] placeholder-[#FAFAF5]/40 py-4 text-base font-light focus:outline-none focus:border-[#8B1A2A] transition-colors" />
            ))}
            <textarea placeholder="Cuéntanos sobre ti y tu experiencia..." rows={3}
              className="w-full bg-transparent border-b-2 border-[#FAFAF5]/15 text-[#FAFAF5] placeholder-[#FAFAF5]/40 py-4 text-base font-light focus:outline-none focus:border-[#8B1A2A] transition-colors resize-none" />

            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#FAFAF5]/35 font-light">Adjunta tu currículum</p>
              <input type="file" accept=".pdf,.doc,.docx" className="w-full text-[#FAFAF5]/50 text-sm font-light py-2" />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#FAFAF5]/35 font-light">Carta de presentación o recomendación (opcional)</p>
              <input type="file" accept=".pdf,.doc,.docx" className="w-full text-[#FAFAF5]/50 text-sm font-light py-2" />
            </div>

            <button type="submit"
              className="w-full py-5 bg-[#1C3D2E] text-[#FAFAF5] text-[11px] tracking-[0.25em] uppercase font-light hover:bg-[#8B1A2A] transition-all duration-500 mt-2">
              Enviar candidatura
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}