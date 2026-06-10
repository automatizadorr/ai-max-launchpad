import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Award, Calendar } from "lucide-react";
import LeadMagnetCard from "./LeadMagnetCard";
import { trackEvent } from "@/lib/tracking";

// Fondo decorativo: se carga aparte para no bloquear el primer render del hero.
const ParticleNetwork = lazy(() => import("./ParticleNetwork"));

const PortfolioConversionHero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-gradient-hero overflow-hidden"
      aria-label="Hero de conversión"
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ParticleNetwork />
        </Suspense>
      </div>
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-primary-glow/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-action/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full mb-5 text-[11px] font-semibold tracking-[0.18em] text-white/80 uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-action opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-action" />
              </span>
              Diagnóstico gratuito · 24h
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white text-4xl sm:text-5xl md:text-6xl leading-[1.05]"
            >
              Recupera +20 horas a la semana y no pierdas{" "}
              <span className="text-gradient-primary">un solo lead</span> — con IA, en 30 días.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-white/75 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
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
                className="inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold px-7 py-4 rounded-xl shadow-action transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-5 h-5" />
                Diagnóstico gratuito
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("portafolio")}
                className="inline-flex items-center justify-center gap-2 glass border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-4 rounded-xl transition-all"
              >
                Ver casos reales
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-7 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-xs sm:text-sm text-white/70"
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

          {/* Lead magnet card */}
          <LeadMagnetCard />
        </div>
      </div>
    </section>
  );
};

export default PortfolioConversionHero;
