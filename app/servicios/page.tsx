"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICIOS = [
  {
    id: "01",
    title: "Reformas Integrales",
    subtitle: "Tu proyecto, de principio a fin",
    desc: "Gestionamos tu reforma integral al completo: desde el proyecto hasta la entrega de llaves. Coordinamos todos los gremios, cumplimos los plazos acordados y garantizamos el presupuesto cerrado sin sorpresas.",
    incluye: ["Proyecto y dirección de obra", "Demolición y estructura", "Instalaciones eléctricas y fontanería", "Solados y alicatados", "Carpintería y acabados", "Pintura y decoración"],
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90",
    wa: "Hola%2C%20me%20interesa%20una%20reforma%20integral.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%20y%20presupuesto%3F",
  },
  {
    id: "02",
    title: "Fachadas & Revestimientos",
    subtitle: "Rehabilitación técnica y estética",
    desc: "Especialistas en rehabilitación de fachadas para comunidades de propietarios y edificios en Madrid. Trabajamos con sistemas SATE, morteros, piedra natural y revestimientos técnicos con garantía.",
    incluye: ["Impermeabilización de fachadas", "Sistema SATE (aislamiento exterior)", "Morteros y revocos", "Pintura de fachadas", "Reparación de humedades y grietas", "Cornisas y elementos decorativos"],
    img: "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1200&q=90",
    wa: "Hola%2C%20me%20interesa%20un%20servicio%20de%20fachadas%20y%20revestimientos.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%20y%20presupuesto%3F",
  },
  {
    id: "03",
    title: "Mantenimiento de Comunidades",
    subtitle: "Tu edificio siempre en perfecto estado",
    desc: "Planes integrales de mantenimiento preventivo y correctivo para comunidades de vecinos. Cubrimos portales, rampas, muros, vallados, cubiertas, fontanería y zonas comunes.",
    incluye: ["Portales y zonas comunes", "Rampas, muros y vallados", "Cubiertas e impermeabilizaciones", "Fontanería y electricidad", "Pintura interior y exterior", "Revisiones periódicas e informes"],
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=90",
    wa: "Hola%2C%20me%20interesa%20un%20plan%20de%20mantenimiento%20para%20nuestra%20comunidad.%20%C2%BFPodr%C3%ADan%20informarme%3F",
  },
  {
    id: "04",
    title: "Limpieza Profesional",
    subtitle: "Limpieza especializada para edificios",
    desc: "Servicios de limpieza profesional para zonas comunes, fachadas y exteriores. Utilizamos maquinaria específica y productos de alta gama para garantizar resultados impecables.",
    incluye: ["Limpieza de portales y zonas comunes", "Hidrolavado de fachadas", "Cristales y ventanales", "Garajes y trasteros", "Jardines y exteriores", "Servicios puntuales o periódicos"],
    img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&q=90",
    wa: "Hola%2C%20me%20interesa%20el%20servicio%20de%20limpieza%20profesional.%20%C2%BFPodr%C3%ADan%20informarme%3F",
  },
];

export default function ServiciosPage() {
  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#FAFAF5] text-[#0E0E0C] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        .font-display { font-family: 'Cormorant', serif; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #C0192E; }
      `}</style>

      <Navbar transparent={false} />

      {/* HERO — pt-40 para no solapar con menú */}
      <section className="pt-32 pb-16 bg-[#1A1A18]">
        <div className="max-w-[1360px] mx-auto px-8">

          {/* Título izquierda + texto derecha */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-16 items-end mb-12">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#C0192E] mb-6">Lo que hacemos</p>
              <h1 className="font-display font-light text-[#FAFAF5] leading-tight"
                style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)" }}>
                Nuestros<br />
                <span className="italic" style={{ WebkitTextStroke: "1px #C0192E", color: "transparent" }}>
                  servicios.
                </span>
              </h1>
            </div>
            <div className="md:pb-3">
              <p className="text-[#FAFAF5]/70 font-light text-lg leading-relaxed mb-8">
                Soluciones integrales para comunidades de propietarios, empresas y particulares en Madrid. Calidad, transparencia y compromiso en cada proyecto.
              </p>
              {/* Botón centrado bajo el texto */}
              <a href="https://wa.me/34653046233?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#C0192E] text-[#FAFAF5] text-[11px] tracking-[0.22em] uppercase font-light hover:bg-[#1C3D2E] transition-all duration-500">
                Presupuesto gratis →
              </a>
            </div>
          </motion.div>

          {/* Bandera italiana al final de la caja header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex h-[3px] w-full">
            <div className="flex-1 bg-[#1C3D2E]" />
            <div className="flex-1 bg-[#FAFAF5]/15" />
            <div className="flex-1 bg-[#C0192E]" />
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS — layout compacto, foto + texto mismo alto */}
      {SERVICIOS.map((s, i) => (
        <section key={s.id} className={`py-24 ${i % 2 === 0 ? "bg-[#FAFAF5]" : "bg-[#F0EDE4]"}`}>
          <div className="max-w-[1360px] mx-auto px-8">
            <div className={`grid md:grid-cols-2 gap-16 items-start ${i % 2 === 1 ? "direction-rtl" : ""}`}>

              {/* Imagen */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <img src={s.img} alt={s.title} className="w-full h-[400px] object-cover" />
                {/* Tricolor top */}
                <div className="absolute top-0 left-0 right-0 h-[3px] flex">
                  <div className="flex-1 bg-[#1C3D2E]" />
                  <div className="flex-1 bg-[#FAFAF5]/40" />
                  <div className="flex-1 bg-[#C0192E]" />
                </div>
                {/* Número esquina */}
                <div className="absolute bottom-5 left-5 bg-[#FAFAF5]/90 px-3 py-1.5 border-l-2 border-[#C0192E]">
                  <p className="font-display text-3xl font-light text-[#0E0E0C]/20">{s.id}</p>
                </div>
              </motion.div>

              {/* Contenido */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${i % 2 === 1 ? "md:order-1" : ""}`}>

                {/* Subtítulo + título */}
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#C0192E] mb-3">{s.subtitle}</p>
                <h2 className="font-display font-light text-[#0E0E0C] leading-tight mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                  {s.title}
                </h2>

                {/* Descripción */}
                <p className="text-[#0E0E0C]/65 font-light leading-[1.9] text-base mb-8">{s.desc}</p>

                {/* Incluye — centrado */}
                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#0E0E0C]/35 mb-4 font-light text-center">Incluye</p>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                    {s.incluye.map(item => (
                      <div key={item} className="flex items-start gap-2 text-sm text-[#0E0E0C]/60 font-light">
                        <div className="w-1 h-1 rounded-full bg-[#C0192E] flex-shrink-0 mt-1.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón centrado */}
                <div className="flex justify-center mt-2">
                  <a href={`https://wa.me/34653046233?text=${s.wa}`} target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C3D2E] text-[#FAFAF5] text-[11px] tracking-[0.22em] uppercase font-light hover:bg-[#C0192E] transition-all duration-500">
                    Solicitar presupuesto →
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA FINAL */}
      <section className="py-28 bg-[#C0192E]">
        <div className="max-w-[1360px] mx-auto px-8 text-center">
          <h2 className="font-display font-light text-[#FAFAF5] mb-12"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
            ¿Tienes un proyecto en mente?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/34653046233?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20para%20mi%20proyecto"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FAFAF5] text-[#C0192E] text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-[#0E0E0C] hover:text-[#FAFAF5] transition-all duration-500">
              Hablar por WhatsApp
            </a>
            <Link href="/#contacto"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-[#FAFAF5]/40 text-[#FAFAF5] text-[12px] tracking-[0.25em] uppercase font-light hover:bg-[#FAFAF5]/10 transition-all duration-500">
              Formulario de contacto
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}