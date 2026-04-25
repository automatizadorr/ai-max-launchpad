import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, MessageCircle, ArrowLeft, Sparkles, Share2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const WHATSAPP =
  "https://wa.me/56971806730?text=" +
  encodeURIComponent("Hola AI-MaX, acabo de enviar el formulario y quisiera agendar lo antes posible.");

const Gracias = () => {
  const handleShare = async () => {
    const url = "https://ai-max-intelligence.lovable.app";
    const text = "Estoy automatizando mi negocio con AI-MaX 🚀";
    try {
      if (navigator.share) {
        await navigator.share({ title: "AI-MaX", text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        toast.success("¡Link copiado al portapapeles!");
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
  <div className="min-h-screen bg-background flex flex-col">
    <SEO
      title="¡Gracias! Te contactamos pronto | AI-MaX"
      description="Recibimos tu solicitud. Te contactamos en menos de 24 horas para agendar tu diagnóstico gratuito."
      path="/gracias"
      ogImage="/og-casos.png"
    />
    <Header />
    <main className="flex-1 flex items-center justify-center py-24 md:py-32 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-glow/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-action/20 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto rounded-full bg-action/20 flex items-center justify-center mb-6 backdrop-blur-md border border-action/30"
          >
            <CheckCircle2 className="w-11 h-11 text-action" />
          </motion.div>

          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-action uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Solicitud recibida
          </span>

          <h1 className="font-display font-black text-white text-4xl md:text-5xl leading-tight">
            ¡Gracias! Te contactamos en{" "}
            <span className="text-gradient-primary">menos de 24h</span>
          </h1>

          <p className="mt-5 text-white/75 text-base md:text-lg">
            Nuestro equipo está revisando tu solicitud. Mientras tanto, puedes acelerar el proceso agendando directo por WhatsApp.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-semibold px-6 py-4 rounded-xl shadow-action transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              Agendar por WhatsApp
            </a>
            <Link
              to="/portafolio"
              className="inline-flex items-center justify-center gap-2 glass border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-4 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al portafolio
            </Link>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="mt-4 inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Compartir AI-MaX con un colega
          </button>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Calendar, t: "Agendamos sesión", d: "30 min sin costo" },
              { icon: Sparkles, t: "Diagnóstico", d: "Plan a medida" },
              { icon: CheckCircle2, t: "Implementación", d: "Resultados en 14 días" },
            ].map((s) => (
              <div
                key={s.t}
                className="glass border border-white/15 rounded-xl p-4 text-left"
              >
                <s.icon className="w-5 h-5 text-action mb-2" />
                <p className="text-white font-semibold text-sm">{s.t}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
  );
};

export default Gracias;
