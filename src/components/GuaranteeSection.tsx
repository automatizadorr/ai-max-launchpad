import { motion } from "framer-motion";
import { ShieldCheck, Clock, RefreshCw, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const pillars = [
  {
    icon: Clock,
    title: "Primer resultado en 14 días",
    desc: "Si en 2 semanas no ves un proceso funcionando y ahorrándote tiempo, lo sabrás de inmediato.",
  },
  {
    icon: RefreshCw,
    title: "Seguimos hasta lograrlo",
    desc: "Si en 30 días no te ahorramos al menos 10 horas semanales, trabajamos gratis hasta conseguirlo.",
  },
  {
    icon: ShieldCheck,
    title: "Sin permanencia ni letra chica",
    desc: "Sin contratos que te amarren. Te quedas porque funciona, no porque estás obligado.",
  },
];

const GuaranteeSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative py-20 md:py-28 bg-gradient-hero overflow-hidden"
      aria-labelledby="guarantee-heading"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-action/15 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-action uppercase mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Garantía de Resultados AI-MaX
          </span>
          <h2
            id="guarantee-heading"
            className="font-display font-black text-3xl md:text-5xl text-white leading-tight"
          >
            El riesgo lo asumimos{" "}
            <span className="text-gradient-primary">nosotros, no tú.</span>
          </h2>
          <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
            Si en <span className="font-semibold text-white">30 días</span> tu sistema no te
            ahorra al menos <span className="font-semibold text-white">10 horas semanales</span> o
            no mejora tu respuesta a leads, <span className="font-semibold text-white">seguimos
            trabajando gratis hasta lograrlo.</span> Así de simple.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/15 text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-action mb-4">
                <p.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-white leading-tight mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <button
            type="button"
            onClick={() => {
              trackEvent("inline_cta_click", { location: "guarantee" });
              scrollTo("qualifier");
            }}
            className="inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold px-8 py-4 rounded-xl shadow-action transition-all hover:scale-[1.02]"
          >
            Quiero empezar sin riesgo
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
