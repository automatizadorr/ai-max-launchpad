import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Bot } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "+300%", label: "Leads calificados" },
  { icon: Clock, value: "−70%", label: "Tiempo manual" },
  { icon: Bot, value: "24/7", label: "Atención IA" },
];

const CasosExito = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Casos de Éxito Reales | AI-MaX"
        description="Resultados medibles en empresas LATAM: +300% leads calificados, −70% tiempo manual y atención IA 24/7."
        path="/casos-exito"
        ogImage="/og-casos.png"
      />
      <Header />
      <main>
        <section className="relative pt-36 md:pt-44 pb-20 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4"
            >
              Casos · 2024–2025
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white text-4xl md:text-6xl leading-tight max-w-4xl mx-auto"
            >
              Casos de Éxito <span className="text-gradient-primary">Reales</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-white/70 text-base md:text-lg"
            >
              Resultados medibles en empresas LATAM que ya escalan con AI-MaX.
            </motion.p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl p-8 border border-white/10"
                >
                  <s.icon className="w-7 h-7 text-action mx-auto mb-3" aria-hidden="true" />
                  <div className="font-display font-black text-4xl md:text-5xl text-white">{s.value}</div>
                  <div className="text-white/60 text-sm mt-2">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default CasosExito;
