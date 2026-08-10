import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Award, Calendar } from "lucide-react";
import RoiCalculator from "./RoiCalculator";
import { trackEvent } from "@/lib/tracking";

// Fondo decorativo de respaldo: se carga aparte para no bloquear el primer render del hero.
// Se activa solo si el video no existe o el usuario prefiere movimiento reducido.
const ParticleNetwork = lazy(() => import("./ParticleNetwork"));

const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/hero-poster.jpg";
const HERO_MOBILE_POSTER = "/hero-mobile-poster.jpg";

const PortfolioConversionHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Mobile = imagen estática (mejor rendimiento en datos móvil). Desktop = video.
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  // Respect reduced motion: si el usuario lo pide, no autoplay del video.
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showVideo = !isMobile && !reduceMotion && !videoFailed;

  // Listener reactivo a cambios de viewport (portrait/landscape rotate en mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      className="relative pt-32 sm:pt-36 md:pt-44 pb-16 md:pb-24 bg-gradient-hero overflow-hidden"
      aria-label="Hero de conversión"
    >
      {/* ───── Capa 0 · Media fullbleed ───── */}
      {/*  · Desktop (>768px): video Veo 3.1 optimizado (muteado, 1080p, 3.6MB)
          · Mobile (≤768px):   imagen estática JPG (40KB) — sin video para ahorrar datos
          · Fallback final:    ParticleNetwork si video falla o reduced-motion */}
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <video
            ref={videoRef}
            className="hero-video-reveal absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
            preload="auto"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : isMobile ? (
          <img
            src={HERO_MOBILE_POSTER}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        ) : (
          <Suspense fallback={null}>
            <ParticleNetwork />
          </Suspense>
        )}
      </div>

      {/* Overlay de legibilidad: gradiente vertical + velado lateral */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-dark/60 via-dark/55 to-dark/85" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-dark/80 via-transparent to-dark/40 md:to-transparent" />

      {/* Blueprint grid sutil sobre el video (signature del rediseño) */}
      <div className="absolute inset-0 z-[2] pointer-events-none blueprint-grid opacity-40" />

      {/* Glows ambiente (preservados del hero original) */}
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-primary-glow/25 blur-[120px] pointer-events-none z-[2]" />
      <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-action/20 blur-[120px] pointer-events-none z-[2]" />

      {/* Frame técnico: hairlines en esquinas (terminal-style) */}
      <div className="absolute top-24 left-6 right-6 bottom-0 z-[3] pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-8 h-px bg-electric opacity-50" style={{ background: "hsl(215 100% 50%)" }} />
        <div className="absolute top-0 left-0 w-px h-8 bg-electric opacity-50" style={{ background: "hsl(215 100% 50%)" }} />
        <div className="absolute top-0 right-0 w-8 h-px bg-electric opacity-50" style={{ background: "hsl(215 100% 50%)" }} />
        <div className="absolute top-0 right-0 w-px h-8 bg-electric opacity-50" style={{ background: "hsl(215 100% 50%)" }} />
        <div className="absolute bottom-6 left-0 w-8 h-px bg-action opacity-60" />
        <div className="absolute bottom-6 left-0 w-px h-8 bg-action opacity-60" />
        <div className="absolute bottom-6 right-0 w-8 h-px bg-action opacity-60" />
        <div className="absolute bottom-6 right-0 w-px h-8 bg-action opacity-60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mono-label inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-5 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase"
            >
              <span className="relative inline-flex rounded-full h-2 w-2 bg-action" />
              Diagnóstico gratuito · 48h
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white text-4xl sm:text-5xl md:text-6xl leading-[1.04]"
            >
              Recupera +20 horas a la semana y no pierdas{" "}
              <span className="text-gradient-primary">un solo lead</span> — con IA, en 30 días.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-white/80 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
            >
              Instalamos los agentes de IA que atienden, califican y agendan por ti —{" "}
              <span className="font-semibold text-white">tú solo cierras.</span>{" "}
              <span className="font-semibold text-white">ROI promedio 340%</span>
              {" · "}Garantía de resultados o no pagas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={() => {
                  trackEvent("inline_cta_click", { location: "hero_primary" });
                  scrollTo("qualifier");
                }}
                className="inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold px-7 py-4 rounded-xl shadow-action transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                <Calendar className="w-5 h-5" />
                Diagnóstico gratuito
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("portafolio")}
                className="inline-flex items-center justify-center gap-2 glass border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-4 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Ver casos reales
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-7 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-xs sm:text-sm text-white/80"
            >
              {[
                { icon: ShieldCheck, label: "Sin permanencia" },
                { icon: Zap, label: "Primer resultado en 14 días" },
                { icon: Award, label: "Soporte 24/7" },
              ].map((b) => (
                <li key={b.label} className="inline-flex items-center gap-1.5">
                  <b.icon className="w-4 h-4 text-action" />
                  {b.label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ROI calculator · lead magnet interactivo */}
          <RoiCalculator />
        </div>
      </div>
    </section>
  );
};

export default PortfolioConversionHero;
