"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ChatBot from "./ChatBot";

const NAV = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "#contacto" },
  { label: "Trabaja con nosotros", href: "/nosotros#trabaja" },
];

const STATS = [
  { num: "150+", label: "Proyectos completados" },
  { num: "12", label: "Años de experiencia" },
  { num: "80+", label: "Comunidades gestionadas" },
  { num: "4.9★", label: "Valoración Google" },
];

const SERVICIOS_PREVIEW = [
  { id: "01", title: "Reformas Integrales", desc: "Gestión completa del proyecto con plazos y presupuesto garantizados.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=90" },
  { id: "02", title: "Fachadas & Revestimientos", desc: "Rehabilitación técnica y estética de fachadas para comunidades y edificios.", img: "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1000&q=90" },
  { id: "03", title: "Mantenimiento de Edificios", desc: "Planes preventivos y correctivos. Tu edificio siempre en perfecto estado.", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=90" },
  { id: "04", title: "Limpieza Profesional", desc: "Servicios especializados para zonas comunes, fachadas y exteriores.", img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1000&q=90" },
];

const PROYECTOS_PREVIEW = [
  { title: "Comunidad Lavapiés", cat: "Reforma Integral", year: "2024", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=90", large: true },
  { title: "Edificio Salamanca", cat: "Fachada", year: "2024", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=90", large: false },
  { title: "Residencial Norte", cat: "Mantenimiento", year: "2023", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90", large: false },
  { title: "Torre Arganzuela", cat: "Reforma Integral", year: "2023", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90", large: true },
];

const PROCESO = [
  { num: "01", title: "Consulta inicial", desc: "Visita gratuita y análisis de tu proyecto sin compromiso." },
  { num: "02", title: "Presupuesto detallado", desc: "Propuesta clara, sin letras pequeñas ni costes ocultos." },
  { num: "03", title: "Ejecución controlada", desc: "Seguimiento diario con comunicación constante." },
  { num: "04", title: "Entrega de llaves", desc: "Revisión final y garantía sobre todos los trabajos." },
];

const TESTIMONIOS = [
  { name: "Yaima Iglesias", role: "Presidenta de comunidad", stars: 5, text: "Resultado excelente. Cumplieron plazos y presupuesto desde el primer día. Gestionaron los imprevistos con agilidad y profesionalidad total." },
  { name: "Ruth de Torres", role: "Propietaria", stars: 5, text: "Me los recomendó un arquitecto y no puedo estar más satisfecha. Ejecución limpia, rápida y con acabados excepcionales." },
  { name: "Emilio Valeriano", role: "Vecino de comunidad", stars: 5, text: "A pesar de mis temores previos todo salió muy bien. Se cumplieron plazos, se resolvieron problemas y el resultado fue óptimo." },
  { name: "Alejandra Álvarez", role: "Propietaria", stars: 5, text: "Presupuesto claro sin sorpresas, asesoramiento en materiales y gran calidad del equipo. Cuidaron cada detalle. Recomendables 100%." },
];

const RAZONES = [
  { icon: "⏱", title: "Cumplimos plazos", desc: "Entregamos en el tiempo acordado, sin excusas ni retrasos." },
  { icon: "📋", title: "Presupuesto cerrado", desc: "El precio que pactamos es exactamente el que pagas." },
  { icon: "🔧", title: "Equipo propio", desc: "No subcontratamos. Todo nuestro equipo es especialista." },
  { icon: "📞", title: "Comunicación total", desc: "Siempre disponibles. Seguimiento diario de tu obra." },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => <span key={i} className="text-[#8B1A2A] text-base">★</span>)}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.1]);

  const statsS = useInView();
  const nosotrosS = useInView();
  const serviciosS = useInView();
  const proyectosS = useInView();
  const procesoS = useInView();
  const testimoniosS = useInView();
  const razonesS = useInView();
  const contactoS = useInView();

  useEffect(() => {
    const unsub = scrollY.on("change", v => {
      setScrolled(v > 60);
      setPastHero(v > window.innerHeight * 0.85);
    });
    return unsub;
  }, [scrollY]);

  const fadeUp = (delay = 0, inView = true) => ({
    initial: { opacity: 0, y: 50 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#FAFAF5] text-[#0E0E0C] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        .font-display { font-family: 'Cormorant', serif; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #8B1A2A; }
        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 1s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform: scale(1.06); }
        .service-line { position: relative; }
        .service-line::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:#FAFAF5; transition:width 0.7s cubic-bezier(0.16,1,0.3,1); }
        .service-line:hover::after { width:100%; }
      `}</style>

      {/* NAVBAR */}
      <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#FAFAF5]/96 backdrop-blur-lg border-b border-[#0E0E0C]/6" : "bg-transparent"}`}>
        <div className="max-w-[1360px] mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5 h-6">
              <div className="flex-1 w-[3px] bg-[#1C3D2E]" />
              <div className="flex-1 w-[3px] bg-[#FAFAF5]/20" />
              <div className="flex-1 w-[3px] bg-[#8B1A2A]" />
            </div>
            <span className={`font-display text-2xl font-light tracking-[0.18em] transition-colors duration-500 ${scrolled ? "text-[#0E0E0C]" : "text-[#FAFAF5]"}`}>
              ITAL <span className="text-[#8B1A2A]">REFORMAS</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.filter(l => l.label !== "Trabaja con nosotros").map((l, i) => (
              <motion.div key={l.label} initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i + 0.6 }}>
                <Link href={l.href}
                  className={`relative text-[12px] tracking-[0.22em] uppercase font-light transition-colors duration-300 group ${scrolled ? "text-[#0E0E0C]/55 hover:text-[#0E0E0C]" : "text-[#FAFAF5]/85 hover:text-[#FAFAF5]"}`}>
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8B1A2A] group-hover:w-full transition-all duration-500" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.a href="https://wa.me/34653046233" target="_blank"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="hidden md:inline-flex items-center gap-3 px-7 py-3 bg-[#1C3D2E] text-[#FAFAF5] text-[11px] tracking-[0.22em] uppercase font-light hover:bg-[#8B1A2A] transition-all duration-500">
            Presupuesto gratis
          </motion.a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col gap-1.5">
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className={`block w-6 h-px ${scrolled ? "bg-[#0E0E0C]" : "bg-[#FAFAF5]"}`} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className={`block w-6 h-px ${scrolled ? "bg-[#0E0E0C]" : "bg-[#FAFAF5]"}`} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className={`block w-6 h-px ${scrolled ? "bg-[#0E0E0C]" : "bg-[#FAFAF5]"}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0E0E0C] flex flex-col justify-center px-10 gap-2">
            {NAV.map((l, i) => (
              <motion.div key={l.label} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 + 0.2 }}>
                <Link href={l.href} onClick={() => setMenuOpen(false)}
                  className="block font-display text-4xl font-light text-[#FAFAF5] py-4 border-b border-[#FAFAF5]/8 hover:text-[#8B1A2A] transition-colors">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.a href="https://wa.me/34653046233" target="_blank"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-3 px-7 py-4 bg-[#8B1A2A] text-[#FAFAF5] text-sm tracking-widest uppercase font-light self-start">
              WhatsApp →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 origin-center">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85">
            <source src="https://videos.pexels.com/video-files/3256542/3256542-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0E0E0C]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0C]/90 via-[#0E0E0C]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0C]/50 to-transparent" />
        </motion.div>

        <div className="absolute left-8 top-1/2 -translate-y-1/2 h-36 flex flex-col gap-0.5 z-10">
          <div className="flex-1 w-[3px] bg-[#1C3D2E]" />
          <div className="flex-1 w-[3px] bg-[#FAFAF5]/25" />
          <div className="flex-1 w-[3px] bg-[#8B1A2A]" />
        </div>

        <motion.div style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-end max-w-[1360px] mx-auto px-8 pb-28">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[11px] tracking-[0.38em] uppercase text-[#FAFAF5]/45 mb-7 font-light">
            Madrid · Reformas & Construcción · Desde 2012
          </motion.p>
          <div className="overflow-hidden mb-1">
            <motion.h1 initial={{ y: 120 }} animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light leading-[0.88] text-[#FAFAF5]"
              style={{ fontSize: "clamp(4rem, 11vw, 9.5rem)" }}>
              Construimos
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1 initial={{ y: 120 }} animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light italic leading-[0.88] text-[#8B1A2A]"
              style={{ fontSize: "clamp(4rem, 11vw, 9.5rem)" }}>
              excelencia.
            </motion.h1>
          </div>

          {/* CAMBIO 1 — Botones: los 3 del mismo tipo, mismo padding, mismo border */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }} className="flex flex-col sm:flex-row gap-0 w-fit">
            <Link href="/servicios"
              className="inline-flex items-center justify-center px-12 py-5 bg-[#1C3D2E] border border-[#1C3D2E] text-[#FAFAF5] text-[12px] tracking-[0.22em] uppercase font-light hover:brightness-125 transition-all duration-500">
              Nuestros servicios
            </Link>
            <Link href="/proyectos"
              className="inline-flex items-center justify-center px-12 py-5 bg-[#E8E8E5] border border-[#E8E8E5] text-[#0E0E0C] text-[12px] tracking-[0.22em] uppercase font-light hover:bg-[#D8D8D4] transition-all duration-500">
              Ver proyectos
            </Link>
            <a href="#contacto"
              className="inline-flex items-center justify-center px-12 py-5 bg-[#8B1A2A] border border-[#8B1A2A] text-[#FAFAF5] text-[12px] tracking-[0.22em] uppercase font-light hover:brightness-125 transition-all duration-500">
              Presupuesto gratis
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-9 right-9 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#FAFAF5]/30 [writing-mode:vertical-lr]">Scroll</span>
          <motion.div animate={{ scaleY: [0, 1, 0] }} style={{ transformOrigin: "top" }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-14 bg-gradient-to-b from-[#8B1A2A] to-transparent" />
        </motion.div>
      </section>

      {/* STATS */}
      <section ref={statsS.ref} className="py-20 bg-[#1C3D2E]">
        <div className="max-w-[1360px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#FAFAF5]/10">
          {STATS.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.1, statsS.inView)} className="px-8 py-8 text-center group">
              <div className="font-display text-5xl md:text-6xl font-light text-[#FAFAF5] mb-2 group-hover:text-[#8B1A2A] transition-colors duration-500">{s.num}</div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#FAFAF5]/55 font-light">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" ref={nosotrosS.ref} className="py-40 bg-[#FAFAF5]">
        <div className="max-w-[1360px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          <motion.div className="relative img-zoom"
            initial={{ opacity: 0, x: -60 }} animate={nosotrosS.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=90"
              alt="Equipo Ital Reformas" className="w-full h-[580px] object-cover" />
            <div className="absolute bottom-0 left-0 right-0 h-[5px] flex">
              <div className="flex-1 bg-[#1C3D2E]" /><div className="flex-1 bg-[#FAFAF5]" /><div className="flex-1 bg-[#8B1A2A]" />
            </div>
            <div className="absolute top-7 right-7 bg-[#FAFAF5]/95 backdrop-blur px-5 py-3 border-l-2 border-[#8B1A2A]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#0E0E0C]/45">Desde</p>
              <p className="font-display text-2xl font-light text-[#0E0E0C]">2012</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 60 }} animate={nosotrosS.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-7">Sobre nosotros</p>
            <h2 className="font-display leading-[1.02] mb-9 text-[#0E0E0C]" style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)" }}>
              Precisión italiana.<br /><span className="italic text-[#1C3D2E]">Compromiso total.</span>
            </h2>
            <p className="text-[#0E0E0C]/70 font-light leading-[1.95] text-lg mb-5">
              Somos Ital Reformas Cavallo, especialistas en reformas integrales y mantenimiento de comunidades de vecinos en Madrid. Más de una década transformando espacios con rigor técnico y atención al detalle.
            </p>
            <p className="text-[#0E0E0C]/50 font-light leading-[1.95]">
              Nuestro equipo garantiza resultados de primera calidad, respetando plazos y presupuestos. Sin sorpresas. Con transparencia total.
            </p>
            <div className="mt-10 flex gap-1">
              <div className="w-12 h-[3px] bg-[#1C3D2E]" /><div className="w-12 h-[3px] bg-[#0E0E0C]/10" /><div className="w-12 h-[3px] bg-[#8B1A2A]" />
            </div>
            <Link href="/nosotros" className="mt-10 inline-flex items-center gap-4 text-[12px] tracking-[0.22em] uppercase font-light text-[#0E0E0C] hover:text-[#8B1A2A] transition-colors group">
              Conocer el equipo <span className="w-10 h-px bg-current group-hover:w-16 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" ref={serviciosS.ref} className="py-36 bg-[#1A1A18]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div {...fadeUp(0, serviciosS.inView)} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-5">Lo que hacemos</p>
              <h2 className="font-display font-light text-[#FAFAF5] leading-tight" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
                Nuestros<br />
                <span className="italic" style={{ WebkitTextStroke: "1px #C0192E", color: "transparent" }}>servicios.</span>
              </h2>
            </div>
            <Link href="/servicios" className="text-[12px] tracking-[0.18em] uppercase font-light text-[#FAFAF5]/40 hover:text-[#8B1A2A] transition-colors self-end group inline-flex items-center gap-3">
              Ver todos los servicios <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
            </Link>
          </motion.div>
          <div className="divide-y divide-[#FAFAF5]/8">
            {SERVICIOS_PREVIEW.map((s, i) => (
              <motion.div key={s.id} {...fadeUp(i * 0.1, serviciosS.inView)}
                className="service-line group py-11 grid grid-cols-12 gap-6 items-center relative overflow-hidden cursor-pointer"
                onClick={() => window.location.href = '/servicios'}>
                <div className="absolute inset-0 bg-[#FAFAF5]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="col-span-1 hidden md:block">
                  <span className="font-display text-4xl font-light text-[#FAFAF5]/15 group-hover:text-[#8B1A2A]/70 transition-colors">{s.id}</span>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3 className="font-display font-light text-[#FAFAF5] group-hover:text-[#8B1A2A] transition-colors leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>{s.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-[#FAFAF5]/70 font-light text-lg leading-relaxed group-hover:text-[#FAFAF5]/90 transition-colors">{s.desc}</p>
                </div>
                <div className="col-span-2 hidden md:flex justify-end items-center gap-3">
                  <div className="relative w-28 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[#8B1A2A] text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.4, serviciosS.inView)} className="mt-12 text-center">
            <Link href="/servicios"
              className="inline-flex items-center gap-4 px-10 py-4 border border-[#FAFAF5]/20 text-[#FAFAF5] text-[12px] tracking-[0.22em] uppercase font-light hover:bg-[#8B1A2A] hover:border-[#8B1A2A] transition-all duration-500">
              Ver todos los servicios en detalle →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAMBIO 2 — POR QUÉ ELEGIRNOS: fondo blanco puro #FFFFFF */}
      <section ref={razonesS.ref} className="py-36 bg-[#FFFFFF]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div {...fadeUp(0, razonesS.inView)} className="mb-16 text-center">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-5">Por qué elegirnos</p>
            <h2 className="font-display font-light text-[#0E0E0C]" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
              La diferencia <span className="italic text-[#1C3D2E]">Ital.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-px bg-[#0E0E0C]/8">
            {RAZONES.map((r, i) => (
              <motion.div key={r.title} {...fadeUp(i * 0.1, razonesS.inView)}
                className="bg-[#FFFFFF] p-10 group hover:bg-[#1C3D2E] transition-all duration-500">
                <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ filter: "sepia(1) saturate(3) hue-rotate(310deg) brightness(0.6)" }}>
                  {r.icon}
                </div>
                <h3 className="font-display text-2xl font-light text-[#0E0E0C] group-hover:text-[#FAFAF5] transition-colors duration-400 mb-3">{r.title}</h3>
                <p className="text-[#0E0E0C]/60 font-light text-sm leading-relaxed group-hover:text-[#FAFAF5]/80 transition-colors duration-400">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMBIO 3 — PROYECTOS: fondo gris muy clarito #F2F2F0 */}
      <section id="proyectos" ref={proyectosS.ref} className="py-40 bg-[#F2F2F0]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div {...fadeUp(0, proyectosS.inView)} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-5">Nuestro trabajo</p>
              <h2 className="font-display font-light text-[#0E0E0C] leading-tight" style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}>
                Proyectos<br /><span className="italic text-[#1C3D2E]">que hablan.</span>
              </h2>
            </div>
            <Link href="/proyectos" className="text-[12px] tracking-[0.18em] uppercase font-light text-[#0E0E0C]/40 hover:text-[#8B1A2A] transition-colors self-end group inline-flex items-center gap-3">
              Ver todos <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-12 gap-4">
            {PROYECTOS_PREVIEW.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 70 }} animate={proyectosS.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.14, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${p.large ? "md:col-span-7" : "md:col-span-5"} group relative img-zoom cursor-pointer`}
                onClick={() => window.location.href = '/proyectos'}>
                <div className={`relative ${p.large ? "h-[520px]" : "h-[380px]"} overflow-hidden`}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0C]/85 via-[#0E0E0C]/10 to-transparent" />
                  <div className="absolute inset-0 bg-[#8B1A2A]/0 group-hover:bg-[#8B1A2A]/10 transition-all duration-700" />
                  <div className="absolute top-0 left-0 right-0 h-[3px] flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex-1 bg-[#1C3D2E]" /><div className="flex-1 bg-[#FAFAF5]/30" /><div className="flex-1 bg-[#8B1A2A]" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#8B1A2A] mb-2">{p.cat} · {p.year}</p>
                      <h3 className="font-display font-light text-[#FAFAF5] leading-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>{p.title}</h3>
                    </div>
                    <div className="w-10 h-10 border border-[#FAFAF5]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <svg className="w-4 h-4 text-[#FAFAF5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.4, proyectosS.inView)} className="mt-12 text-center">
            <Link href="/proyectos"
              className="inline-flex items-center gap-4 px-10 py-4 bg-[#1C3D2E] text-[#FAFAF5] text-[12px] tracking-[0.22em] uppercase font-light hover:bg-[#8B1A2A] transition-all duration-500">
              Ver todos los proyectos →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CAMBIO 4 — PROCESO: "Cómo trabajamos" negrita, números en rojo más fuerte #C0192E */}
      <section ref={procesoS.ref} className="py-36 bg-[#1C3D2E]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div {...fadeUp(0, procesoS.inView)} className="mb-20 text-center">
            <p className="text-[12px] tracking-[0.32em] uppercase text-[#C0192E] mb-5 font-semibold">Cómo trabajamos</p>
            <h2 className="font-display font-light text-[#FAFAF5]" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
              Proceso <span className="italic">transparente.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-0 relative">
            <div className="absolute top-7 left-[12%] right-[12%] h-px bg-[#FAFAF5]/15 hidden md:block" />
            {PROCESO.map((p, i) => (
              <motion.div key={p.num} {...fadeUp(i * 0.12, procesoS.inView)} className="relative px-8 py-6 text-center group">
                <div className="w-14 h-14 rounded-full border-2 border-[#C0192E]/70 flex items-center justify-center mx-auto mb-6 group-hover:border-[#C0192E] group-hover:bg-[#C0192E]/15 transition-all duration-400 relative z-10 bg-[#1C3D2E]">
                  <span className="font-display text-xl font-light text-[#C0192E] group-hover:text-[#FAFAF5] transition-colors">{p.num}</span>
                </div>
                <h3 className="font-display text-2xl font-light text-[#FAFAF5] mb-4 group-hover:text-[#C0192E] transition-colors duration-400">{p.title}</h3>
                <p className="text-[#FAFAF5]/80 font-light text-base leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#8B1A2A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FAFAF5 0, #FAFAF5 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-[1360px] mx-auto px-8 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#FAFAF5]/50 mb-6">¿Lista tu comunidad?</p>
          <h2 className="font-display font-light text-[#FAFAF5] mb-3" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>¿Tu comunidad necesita</h2>
          <h2 className="font-display font-light italic text-[#FAFAF5] mb-12" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>una reforma?</h2>
          <a href="https://wa.me/34653046233?text=Hola%2C%20quiero%20información%20sobre%20una%20reforma" target="_blank"
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#FAFAF5] text-[#8B1A2A] text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-[#0E0E0C] hover:text-[#FAFAF5] transition-all duration-500">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Hablar por WhatsApp ahora
          </a>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section ref={testimoniosS.ref} className="py-40 bg-[#FAFAF5]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div {...fadeUp(0, testimoniosS.inView)} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-5">Lo que dicen</p>
              <h2 className="font-display font-light text-[#0E0E0C]" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
                Opiniones <span className="italic text-[#1C3D2E]">reales.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 self-end">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <span key={i} className="text-[#8B1A2A] text-xl">★</span>)}</div>
              <span className="font-display text-2xl font-light text-[#0E0E0C]">4.9</span>
              <span className="text-[11px] tracking-widest uppercase text-[#0E0E0C]/35 font-light">Google</span>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIOS.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 40 }} animate={testimoniosS.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.9 }}
                className="group p-9 border border-[#0E0E0C]/8 hover:border-[#8B1A2A]/30 hover:bg-[#F0EDE4] transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <Stars count={t.stars} />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#0E0E0C]/30 font-light">Google</span>
                </div>
                <p className="font-display text-xl font-light text-[#0E0E0C]/75 leading-[1.65] mb-7 italic">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-5 border-t border-[#0E0E0C]/8">
                  <div className="w-9 h-9 rounded-full bg-[#1C3D2E] flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg font-light text-[#FAFAF5]">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-light text-sm text-[#0E0E0C] tracking-wide">{t.name}</p>
                    <p className="text-[11px] text-[#0E0E0C]/40 font-light">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" ref={contactoS.ref} className="py-40 bg-[#0E0E0C]">
        <div className="max-w-[1360px] mx-auto px-8">
          <motion.div {...fadeUp(0, contactoS.inView)} className="mb-20">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#8B1A2A] mb-6">Hablemos</p>
            <h2 className="font-display font-light text-[#FAFAF5] leading-tight" style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}>
              Tu proyecto,<br /><span className="italic text-[#8B1A2A]">nuestra misión.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-12 gap-20">
            <motion.form className="md:col-span-7 space-y-7" {...fadeUp(0, contactoS.inView)} onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                {[{ p: "Nombre", t: "text" }, { p: "Teléfono", t: "tel" }].map(f => (
                  <input key={f.p} type={f.t} placeholder={f.p}
                    className="w-full bg-transparent border-b-2 border-[#FAFAF5]/20 text-[#FAFAF5] placeholder-[#FAFAF5]/50 py-4 text-base font-light focus:outline-none focus:border-[#8B1A2A] transition-colors" />
                ))}
              </div>
              <input type="email" placeholder="Email" className="w-full bg-transparent border-b-2 border-[#FAFAF5]/20 text-[#FAFAF5] placeholder-[#FAFAF5]/50 py-4 text-base font-light focus:outline-none focus:border-[#8B1A2A] transition-colors" />
              <select className="w-full bg-transparent border-b-2 border-[#FAFAF5]/20 text-[#FAFAF5]/70 py-4 text-base font-light focus:outline-none focus:border-[#8B1A2A] transition-colors appearance-none">
                <option value="" className="bg-[#0E0E0C]">Tipo de servicio</option>
                {SERVICIOS_PREVIEW.map(s => <option key={s.id} className="bg-[#0E0E0C]">{s.title}</option>)}
              </select>
              <textarea placeholder="Describe tu proyecto..." rows={4}
                className="w-full bg-transparent border-b-2 border-[#FAFAF5]/20 text-[#FAFAF5] placeholder-[#FAFAF5]/50 py-4 text-base font-light focus:outline-none focus:border-[#8B1A2A] transition-colors resize-none" />
              <button type="submit" className="w-full py-5 bg-[#8B1A2A] text-[#FAFAF5] text-[11px] tracking-[0.28em] uppercase font-light hover:bg-[#FAFAF5] hover:text-[#0E0E0C] transition-all duration-500">
                Solicitar presupuesto gratuito →
              </button>
            </motion.form>
            <motion.div className="md:col-span-5 space-y-10 pt-3" {...fadeUp(0.18, contactoS.inView)}>
              {[
                { label: "Dirección", value: "Calle de la Encina 2\nLeganés, Madrid" },
                { label: "Teléfono", value: "+34 653 046 233" },
                { label: "Email", value: "gestion@italreformas.com" },
                { label: "Horario", value: "Lun – Vie\n08:00 – 18:00" },
              ].map(item => (
                <div key={item.label} className="group pb-8 border-b border-[#FAFAF5]/8">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-[#8B1A2A] mb-3">{item.label}</p>
                  <p className="font-display text-2xl font-light text-[#FAFAF5] whitespace-pre-line group-hover:text-[#8B1A2A] transition-colors duration-300">{item.value}</p>
                </div>
              ))}
              <div className="flex gap-7 pt-2">
                {[
                  { label: "Instagram", href: "https://www.instagram.com/italreformas/" },
                  { label: "LinkedIn", href: "http://linkedin.com/company/italreformas" },
                  { label: "Facebook", href: "http://www.facebook.com/italreformascavallosl" },
                ].map(r => (
                  <a key={r.label} href={r.href} target="_blank"
                    className="text-[11px] tracking-[0.15em] uppercase text-[#FAFAF5]/35 hover:text-[#8B1A2A] transition-colors font-light">{r.label}</a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0E0E0C] border-t border-[#FAFAF5]/5 py-10">
        <div className="max-w-[1360px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-5">
          <span className="font-display text-xl font-light tracking-[0.2em] text-[#FAFAF5]/30">ITAL <span className="text-[#8B1A2A]">REFORMAS</span></span>
          <p className="text-[10px] tracking-[0.1em] text-[#FAFAF5]/15 font-light text-center">© 2025 Ital Reformas Cavallo, S.L. · CIF: B42899625 · Todos los derechos reservados</p>
          <div className="flex gap-1">
            <div className="w-7 h-[3px] bg-[#1C3D2E]" /><div className="w-7 h-[3px] bg-[#FAFAF5]/12" /><div className="w-7 h-[3px] bg-[#8B1A2A]" />
          </div>
        </div>
      </footer>

      {/* WHATSAPP */}
      <motion.a href="https://wa.me/34653046233?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20presupuesto"
        target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 180, damping: 15 }}
        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 group flex items-center overflow-hidden">
        <div className="bg-[#25D366] max-w-0 group-hover:max-w-[150px] overflow-hidden whitespace-nowrap px-0 group-hover:px-4 py-3.5 text-white text-[10px] tracking-widest uppercase font-light transition-all duration-500">WhatsApp</div>
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/20 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </div>
      </motion.a>

      <ChatBot visible={pastHero} />
    </main>
  );
}