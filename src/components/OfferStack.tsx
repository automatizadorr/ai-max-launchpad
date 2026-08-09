import { motion } from "framer-motion";
import {
  Gift,
  Phone,
  MessageSquare,
  Workflow,
  BarChart3,
  Search,
  Wrench,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface StackItem {
  icon: typeof Phone;
  label: string;
  value: string;
  highlight?: "bonus" | "guarantee";
}

const items: StackItem[] = [
  { icon: Phone, label: "Agente de Voz IA 24/7 — atiende, califica y agenda por ti", value: "$890.000" },
  { icon: MessageSquare, label: "Chatbot WhatsApp con IA + RAG entrenado con tu negocio", value: "$690.000" },
  { icon: Workflow, label: "Automatizaciones n8n (CRM, correos, datos y reportes)", value: "$540.000" },
  { icon: BarChart3, label: "Dashboard de métricas en tiempo real", value: "$390.000" },
  { icon: Search, label: "Diagnóstico + plan de automatización a medida", value: "$190.000" },
  { icon: Wrench, label: "Implementación completa, hecha por nosotros", value: "$480.000" },
  { icon: Gift, label: "BONO: Soporte y optimización los primeros 30 días", value: "$240.000", highlight: "bonus" },
  { icon: ShieldCheck, label: "Garantía de resultados — o seguimos trabajando gratis", value: "No tiene precio", highlight: "guarantee" },
];

const OfferStack = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="oferta"
      className="relative py-20 md:py-28 bg-background overflow-hidden"
      aria-labelledby="offer-heading"
    >
      <div className="absolute inset-0 blueprint-grid-soft opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <span className="mono-label inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            // Todo en un solo sistema
          </span>
          <h2
            id="offer-heading"
            className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight"
          >
            El Sistema AI-MaX de Captación 24/7
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            No contratas "servicios sueltos". Recibes un sistema completo que atiende,
            califica y agenda por ti — instalado y garantizado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="clip-terminal max-w-2xl mx-auto rounded-2xl border border-border bg-card shadow-elegant overflow-hidden relative"
        >
          {/* Stack header (terminal bar) */}
          <div className="flex items-center gap-2 px-5 md:px-7 py-3 border-b border-border bg-muted/50">
            <span className="w-3 h-3 rounded-full bg-action/80" />
            <span className="w-3 h-3 rounded-full bg-primary-glow/70" />
            <span className="w-3 h-3 rounded-full bg-foreground/20" />
            <span className="mono-label ml-3 text-[11px] text-muted-foreground tracking-wider">ai-max-stack.md</span>
          </div>

          {/* Stack list */}
          <ul className="divide-y divide-border">
            {items.map((item, i) => (
              <li
                key={item.label}
              className={`flex items-center gap-4 px-5 md:px-7 py-4 ${
                item.highlight === "bonus"
                  ? "bg-action/5"
                  : item.highlight === "guarantee"
                  ? "bg-primary/5"
                  : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  item.highlight ? "bg-gradient-primary shadow-action" : "bg-muted"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${item.highlight ? "text-white" : "text-foreground/70"}`}
                />
              </div>
                <span className="flex-1 text-sm md:text-base text-foreground/90 leading-snug">
                  {item.highlight === "bonus" && (
                    <span className="font-bold text-action">BONO · </span>
                  )}
                  {item.label.replace(/^BONO: /, "")}
                </span>
                <span
                  className={`mono-label shrink-0 text-sm md:text-base font-bold tabular-nums ${
                    item.highlight === "guarantee" ? "text-primary" : "text-foreground/60 line-through"
                  }`}
                >
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          {/* Price anchor */}
          <div className="bg-gradient-hero px-6 md:px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
            <div className="relative">
              <p className="text-white/60 text-sm">
                Valor total:{" "}
                <span className="line-through decoration-action decoration-2">$3.910.000</span>
              </p>
              <p className="mt-2 text-white/80 text-sm font-medium">Tu inversión:</p>
              <p className="font-display font-black text-white text-4xl md:text-5xl mt-1 tabular-nums">
                desde $490.000
                <span className="text-lg md:text-xl text-white/60 font-bold"> CLP</span>
              </p>

              <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/70">
                {["Sin permanencia", "Implementación incluida", "Garantía de resultados"].map((b) => (
                  <li key={b} className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-action" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  trackEvent("inline_cta_click", { location: "offer_stack" });
                  scrollTo("qualifier");
                }}
                className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-bold px-8 py-4 rounded-xl shadow-action transition-all hover:scale-[1.02]"
              >
                Quiero mi Sistema AI-MaX
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferStack;
