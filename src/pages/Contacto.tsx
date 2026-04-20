import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const WHATSAPP = "https://wa.me/56971806730";

const Contacto = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contacto · Asesoría IA Gratuita | AI-MaX"
        description="Hablemos de tu próxima automatización. Asesoría estratégica gratuita y respuesta en menos de 2 horas. La Serena, Chile."
        path="/contacto"
        ogImage="/og-contacto.png"
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
              Contacto
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white text-4xl md:text-6xl leading-tight max-w-4xl mx-auto"
            >
              Hablemos de tu <span className="text-gradient-primary">Próxima Automatización</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-white/70 text-base md:text-lg"
            >
              Asesoría estratégica gratuita · Respuesta en menos de 2 horas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar asesoría gratuita por WhatsApp"
                className="inline-flex items-center gap-2 bg-action hover:bg-action-glow text-action-foreground px-7 py-4 rounded-full text-base font-semibold shadow-action transition-all duration-300 hover:scale-[1.03]"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Agendar Asesoría Gratuita
              </a>
            </motion.div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              {[
                { icon: Phone, label: "WhatsApp", value: "+56 9 7180 6730", href: WHATSAPP },
                { icon: Mail, label: "Email", value: "automatizador.ex@gmail.com", href: "mailto:automatizador.ex@gmail.com" },
                { icon: MapPin, label: "Ubicación", value: "La Serena, Chile" },
              ].map((c) => (
                <div key={c.label} className="glass rounded-2xl p-6 border border-white/10">
                  <c.icon className="w-5 h-5 text-action mb-3" aria-hidden="true" />
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-white font-medium hover:text-action transition-colors text-sm break-all">
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-white font-medium text-sm">{c.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contacto;
