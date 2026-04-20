import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";

const WHATSAPP = "https://wa.me/56971806730";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
      aria-label="Sección principal AI-MaX"
    >
      {/* Particle network background */}
      <div className="absolute inset-0 z-0">
        <ParticleNetwork />
      </div>

      {/* Glow accents */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-glow/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-action/15 blur-[120px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-action opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-action" />
          </span>
          <span className="text-xs md:text-sm text-white/80 font-medium">
            Agencia AI · La Serena · Latinoamérica
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-5xl mx-auto"
        >
          Transformamos tu Empresa con{" "}
          <span className="text-gradient-primary">Inteligencia Artificial</span>{" "}
          y Automatización.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-white/70 leading-relaxed"
        >
          Desarrollo de software a medida, asistentes de voz y optimización de procesos
          operativos para escalar tu negocio sin aumentar costos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contacto"
            aria-label="Agendar asesoría gratuita"
            className="group inline-flex items-center gap-2 bg-action hover:bg-action-glow text-action-foreground px-7 py-4 rounded-full text-base font-semibold shadow-action transition-all duration-300 hover:scale-[1.03]"
          >
            Agendar Asesoría Gratuita
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Probar Asistente de WhatsApp"
            className="group inline-flex items-center gap-2 glass text-white hover:bg-white/10 px-7 py-4 rounded-full text-base font-semibold transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Probar Asistente de WhatsApp
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="mt-20 grid grid-cols-3 max-w-2xl mx-auto gap-6 md:gap-12"
        >
          {[
            { v: "24/7", l: "Operación continua" },
            { v: "+80%", l: "Tareas automatizables" },
            { v: "<2min", l: "Respuesta a leads" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display font-black text-2xl md:text-3xl text-white">{s.v}</div>
              <div className="text-xs md:text-sm text-white/50 mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
