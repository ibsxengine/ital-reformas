"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PROYECTOS = [
  {
    id: 1, title: "Comunidad Lavapiés", cat: "Reforma Integral", year: "2024",
    location: "Madrid Centro", m2: "1.200 m²", duracion: "14 semanas",
    desc: "Reforma integral completa de zonas comunes, portal y fachada de edificio de 24 viviendas en el corazón de Lavapiés. Incluye impermeabilización de cubierta, pintura de fachada y renovación completa del portal.",
    imgs: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=90",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=90",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90",
    ],
    size: "large",
    wa: "Hola%2C%20he%20visto%20el%20proyecto%20Comunidad%20Lavapi%C3%A9s%20y%20me%20gustar%C3%ADa%20algo%20similar",
  },
  {
    id: 2, title: "Edificio Salamanca", cat: "Fachada", year: "2024",
    location: "Barrio Salamanca", m2: "800 m²", duracion: "8 semanas",
    desc: "Rehabilitación completa de fachada con sistema SATE, impermeabilización y pintura de última generación en edificio residencial de lujo.",
    imgs: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1400&q=90",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90",
    ],
    size: "medium",
    wa: "Hola%2C%20he%20visto%20el%20proyecto%20Edificio%20Salamanca%20y%20me%20interesa%20un%20presupuesto%20similar",
  },
  {
    id: 3, title: "Residencial Norte", cat: "Mantenimiento", year: "2023",
    location: "Hortaleza", m2: "3.500 m²", duracion: "Contrato anual",
    desc: "Plan de mantenimiento integral anual para comunidad de 80 viviendas. Gestión de portales, rampas, vallados, cubiertas y zonas comunes.",
    imgs: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=90",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=90",
    ],
    size: "medium",
    wa: "Hola%2C%20me%20interesa%20un%20plan%20de%20mantenimiento%20como%20el%20de%20Residencial%20Norte",
  },
  {
    id: 4, title: "Torre Arganzuela", cat: "Reforma Integral", year: "2023",
    location: "Arganzuela", m2: "600 m²", duracion: "8 semanas",
    desc: "Transformación completa de planta baja comercial a espacio de oficinas premium. Reforma integral con nuevas instalaciones, tabiquería y acabados de lujo.",
    imgs: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=90",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
    ],
    size: "large",
    wa: "Hola%2C%20he%20visto%20Torre%20Arganzuela%20y%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20reformas%20similares",
  },
  {
    id: 5, title: "Comunidad Retiro", cat: "Fachada", year: "2023",
    location: "Retiro", m2: "950 m²", duracion: "10 semanas",
    desc: "Impermeabilización total y revestimiento de fachada. Eliminación definitiva de humedades y mejora estética del edificio.",
    imgs: [
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1400&q=90",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=90",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90",
    ],
    size: "medium",
    wa: "Hola%2C%20me%20interesa%20un%20proyecto%20de%20impermeabilizaci%C3%B3n%20como%20Comunidad%20Retiro",
  },
  {
    id: 6, title: "Parque Empresarial Getafe", cat: "Mantenimiento", year: "2022",
    location: "Getafe", m2: "12.000 m²", duracion: "Contrato anual",
    desc: "Mantenimiento preventivo y correctivo de complejo empresarial. Gestión integral de instalaciones, cubiertas, vallados y zonas exteriores.",
    imgs: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=90",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=90",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=90",
    ],
    size: "medium",
    wa: "Hola%2C%20me%20interesa%20un%20contrato%20de%20mantenimiento%20como%20Parque%20Empresarial%20Getafe",
  },
];

const CATEGORIAS = ["Todos", "Reforma Integral", "Fachada", "Mantenimiento"];

export default function ProyectosPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [selected, setSelected] = useState<typeof PROYECTOS[0] | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const filtrados = filtro === "Todos" ? PROYECTOS : PROYECTOS.filter(p => p.cat === filtro);

  const openModal = (p: typeof PROYECTOS[0]) => {
    setSelected(p);
    setImgIdx(0);
  };

  const closeModal = () => setSelected(null);

  const prevImg = () => {
    if (!selected) return;
    setImgIdx(i => (i - 1 + selected.imgs.length) % selected.imgs.length);
  };

  const nextImg = () => {
    if (!selected) return;
    setImgIdx(i => (i + 1) % selected.imgs.length);
  };

  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#FAFAF5] text-[#0E0E0C] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        .font-display { font-family: 'Cormorant', serif; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #8B1A2A; }
      `}</style>

      <Navbar transparent={false} />

      {/* HERO — fondo verde, pt-40 para no solapar */}
      <section className="pt-40 pb-20 bg-[#1C3D2E]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-16 items-end mb-12">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#C0192E] mb-6">Nuestro trabajo</p>
              <h1 className="font-display font-light text-[#FAFAF5] leading-tight"
                style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)" }}>
                Proyectos<br />
                <span className="italic text-[#C0192E]">que hablan.</span>
              </h1>
            </div>
            <div className="md:pb-3">
              <p className="text-[#FAFAF5]/70 font-light text-lg leading-relaxed mb-10">
                Más de 150 proyectos completados en Madrid. Reformas integrales, fachadas y mantenimiento de comunidades con resultados que hablan por sí solos.
              </p>
              <div className="flex gap-8 pt-8 border-t border-[#FAFAF5]/15">
                <div>
                  <p className="font-display text-4xl font-light text-[#FAFAF5]">150+</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#FAFAF5]/45 font-light mt-1">Proyectos</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-light text-[#FAFAF5]">12</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#FAFAF5]/45 font-light mt-1">Años</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-light text-[#FAFAF5]">4.9★</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#FAFAF5]/45 font-light mt-1">Google</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bandera al final del hero */}
          <div className="flex h-[3px] w-full">
            <div className="flex-1 bg-[#FAFAF5]/30" />
            <div className="flex-1 bg-[#FAFAF5]/10" />
            <div className="flex-1 bg-[#8B1A2A]" />
          </div>
        </div>
      </section>

      {/* FILTROS — elegantes, grandes */}
      <section className="py-8 bg-[#FAFAF5] border-b border-[#0E0E0C]/8 sticky top-[73px] z-40 bg-[#FAFAF5]/96 backdrop-blur-lg">
        <div className="max-w-[1360px] mx-auto px-8 flex gap-3 flex-wrap items-center">
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => setFiltro(cat)}
              className={`px-8 py-3.5 text-[12px] tracking-[0.22em] uppercase font-light transition-all duration-400 ${
                filtro === cat
                  ? "bg-[#1C3D2E] text-[#FAFAF5]"
                  : "border border-[#0E0E0C]/12 text-[#0E0E0C]/50 hover:border-[#1C3D2E] hover:text-[#1C3D2E] hover:bg-[#1C3D2E]/5"
              }`}>
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] tracking-[0.2em] uppercase text-[#0E0E0C]/25 font-light">
            {filtrados.length} {filtrados.length === 1 ? "proyecto" : "proyectos"}
          </span>
        </div>
      </section>

      {/* GRID EDITORIAL */}
      <section className="py-16 bg-[#FAFAF5]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div layout className="grid grid-cols-12 gap-4" style={{ gridAutoRows: "280px" }}>
            <AnimatePresence>
              {filtrados.map((p, i) => {
                const isLarge = p.size === "large";
                return (
                  <motion.div key={p.id} layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    onClick={() => openModal(p)}
                    className={`${isLarge ? "col-span-12 md:col-span-7 row-span-2" : "col-span-12 md:col-span-5 row-span-1"} group relative overflow-hidden cursor-pointer`}>

                    <img src={p.imgs[0]} alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0C]/90 via-[#0E0E0C]/15 to-transparent" />
                    <div className="absolute inset-0 bg-[#1C3D2E]/0 group-hover:bg-[#1C3D2E]/10 transition-all duration-700" />

                    {/* Tricolor top */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] flex opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex-1 bg-[#1C3D2E]" /><div className="flex-1 bg-[#FAFAF5]/30" /><div className="flex-1 bg-[#8B1A2A]" />
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-7">
                      <p className="text-[10px] tracking-[0.28em] uppercase text-[#C0192E] mb-2">{p.cat} · {p.year}</p>
                      <h3 className="font-display font-light text-[#FAFAF5] leading-tight mb-1"
                        style={{ fontSize: isLarge ? "clamp(1.8rem, 3vw, 2.8rem)" : "clamp(1.4rem, 2.5vw, 2rem)" }}>
                        {p.title}
                      </h3>
                      <p className="text-[#FAFAF5]/45 text-xs font-light">{p.location}</p>
                      <div className="mt-3 h-px w-0 group-hover:w-full bg-[#8B1A2A] transition-all duration-700" />
                    </div>

                    {/* Icono ver */}
                    <div className="absolute top-5 right-5 w-9 h-9 border border-[#FAFAF5]/25 bg-[#0E0E0C]/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <svg className="w-3.5 h-3.5 text-[#FAFAF5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MODAL CON CARRUSEL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0E0E0C]/92 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="bg-[#FAFAF5] max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">

              {/* CARRUSEL */}
              <div className="relative h-72 flex-shrink-0 overflow-hidden bg-[#0E0E0C]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIdx}
                    src={selected.imgs[imgIdx]}
                    alt={selected.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover" />
                </AnimatePresence>

                {/* Tricolor */}
                <div className="absolute top-0 left-0 right-0 h-[4px] flex">
                  <div className="flex-1 bg-[#1C3D2E]" /><div className="flex-1 bg-[#FAFAF5]/20" /><div className="flex-1 bg-[#8B1A2A]" />
                </div>

                {/* Botón cerrar — grande y muy visible */}
                <button onClick={closeModal}
                  className="absolute top-4 right-4 w-11 h-11 bg-[#FAFAF5] text-[#0E0E0C] flex items-center justify-center hover:bg-[#8B1A2A] hover:text-[#FAFAF5] transition-colors shadow-lg z-10 font-light text-lg">
                  ✕
                </button>

                {/* Flechas carrusel */}
                {selected.imgs.length > 1 && (
                  <>
                    <button onClick={prevImg}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0E0E0C]/50 text-[#FAFAF5] flex items-center justify-center hover:bg-[#8B1A2A] transition-colors backdrop-blur-sm">
                      ←
                    </button>
                    <button onClick={nextImg}
                      className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0E0E0C]/50 text-[#FAFAF5] flex items-center justify-center hover:bg-[#8B1A2A] transition-colors backdrop-blur-sm">
                      →
                    </button>
                  </>
                )}

                {/* Dots carrusel */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selected.imgs.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imgIdx ? "bg-[#8B1A2A] w-5" : "bg-[#FAFAF5]/50"}`} />
                  ))}
                </div>
              </div>

              {/* CONTENIDO SCROLLEABLE */}
              <div className="p-8 overflow-y-auto">
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#C0192E] mb-4">
                  {selected.cat} · {selected.year} · {selected.location}
                </p>
                <h2 className="font-display text-4xl font-light text-[#0E0E0C] mb-6">{selected.title}</h2>

                {/* Datos clave */}
                <div className="flex gap-8 mb-8 py-5 border-y border-[#0E0E0C]/8">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#0E0E0C]/35 mb-1">Superficie</p>
                    <p className="font-display text-2xl font-light text-[#0E0E0C]">{selected.m2}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#0E0E0C]/35 mb-1">Duración</p>
                    <p className="font-display text-2xl font-light text-[#0E0E0C]">{selected.duracion}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#0E0E0C]/35 mb-1">Tipo</p>
                    <p className="font-display text-2xl font-light text-[#0E0E0C]">{selected.cat}</p>
                  </div>
                </div>

                <p className="text-[#0E0E0C]/65 font-light leading-relaxed text-base mb-8">{selected.desc}</p>

                <a href={`https://wa.me/34653046233?text=${selected.wa}`} target="_blank"
                  className="inline-flex items-center gap-4 px-8 py-4 bg-[#8B1A2A] text-[#FAFAF5] text-[11px] tracking-[0.22em] uppercase font-light hover:bg-[#1C3D2E] transition-all duration-500">
                  Quiero un proyecto similar →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-28 bg-[#1C3D2E]">
        <div className="max-w-[1360px] mx-auto px-8 text-center">
          <h2 className="font-display font-light text-[#FAFAF5] mb-12"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
            ¿Tu proyecto, el próximo?
          </h2>
          <a href="https://wa.me/34653046233?text=Hola%2C%20he%20visto%20vuestros%20proyectos%20y%20me%20gustar%C3%ADa%20solicitar%20presupuesto"
            target="_blank"
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#8B1A2A] text-[#FAFAF5] text-[12px] tracking-[0.25em] uppercase font-light hover:bg-[#FAFAF5] hover:text-[#0E0E0C] transition-all duration-500">
            Solicitar presupuesto gratis →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}