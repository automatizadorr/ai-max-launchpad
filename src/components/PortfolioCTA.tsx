import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "56971806730";
const WA_MESSAGE = encodeURIComponent(
  "Hola AI-MaX, vi su portafolio y quiero agendar una sesión de diagnóstico gratuita."
);

const PortfolioCTA = () => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-hero overflow-hidden" aria-labelledby="portfolio-cta-heading">
      {/* Blueprint grid (signature del rediseño) */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="mono-label inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-action uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            // Diagnóstico Gratuito
          </span>
          <h2
            id="portfolio-cta-heading"
            className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
          >
            ¿Listo para que la IA{" "}
            <span className="text-gradient-primary">trabaje por ti?</span>
          </h2>
          <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
            Agenda una sesión gratuita de 30 minutos. Identificamos qué procesos puedes
            automatizar con IA y te entregamos un plan de acción concreto.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-action hover:bg-action/90 text-action-foreground shadow-action h-14 px-8 text-base font-bold"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Hablar por WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white h-14 px-8 text-base font-semibold"
            >
              <a href="#contacto">
                Quiero mi diagnóstico gratis
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/60 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-action" />
              Sin compromiso
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-action" />
              Respuesta en menos de 24h
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-action" />
              Plan de acción incluido
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioCTA;
