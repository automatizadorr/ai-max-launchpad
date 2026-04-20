import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";
import TechMarquee from "@/components/TechMarquee";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const Servicios = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Servicios de IA y Automatización | AI-MaX"
        description="Agentes conversacionales, asistentes de voz IA y automatización de flujos de trabajo (n8n) para empresas en Chile y Latinoamérica."
        path="/servicios"
        ogImage="/og-servicios.png"
      />
      <Header />
      <main>
        <section className="relative pt-36 md:pt-44 pb-16 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4"
            >
              Servicios
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white text-4xl md:text-6xl leading-tight max-w-4xl mx-auto"
            >
              Servicios de IA para <span className="text-gradient-primary">Escalar tu Negocio</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-white/70 text-base md:text-lg"
            >
              Soluciones medibles, integradas y operando 24/7 desde el primer mes.
            </motion.p>
          </div>
        </section>
        <PortfolioSection />
        <TechMarquee />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Servicios;
