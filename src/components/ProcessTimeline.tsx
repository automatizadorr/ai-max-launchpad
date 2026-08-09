import { motion } from "framer-motion";
import { Search, PencilRuler, Code2, TestTube2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Diagnóstico",
    desc: "Auditoría gratuita de tus procesos. Identificamos cuellos de botella y oportunidades reales de IA.",
    duration: "1 semana",
  },
  {
    icon: PencilRuler,
    title: "Diseño de solución",
    desc: "Propuesta técnica con stack, arquitectura, métricas de éxito y timeline. Validamos antes de construir.",
    duration: "1 semana",
  },
  {
    icon: Code2,
    title: "Implementación",
    desc: "Desarrollo iterativo con demos semanales. Construimos en sprints cortos para mantenerte en control.",
    duration: "2-6 semanas",
  },
  {
    icon: TestTube2,
    title: "Pruebas y ajustes",
    desc: "Testing con usuarios reales, fine-tuning de modelos y optimización de prompts hasta alcanzar las KPIs.",
    duration: "1-2 semanas",
  },
  {
    icon: Rocket,
    title: "Entrega y soporte",
    desc: "Puesta en producción, capacitación a tu equipo y soporte continuo con monitoreo y mejoras mensuales.",
    duration: "Continuo",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden" aria-labelledby="process-heading">
      <div className="absolute inset-0 blueprint-grid-soft opacity-40 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="mono-label inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            // Cómo trabajamos
          </span>
          <h2 id="process-heading" className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            Nuestro proceso en <span className="text-gradient-primary">5 pasos</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Metodología clara, entregables definidos y demos semanales. Sin sorpresas.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Línea vertical (desktop) con hairline técnica */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px hairline -translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((s, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
                    isEven ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Card */}
                  <div className={`clip-terminal p-7 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition-all ${
                    isEven ? "md:text-right" : ""
                  }`}>
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                      <span className="mono-label text-[10px] font-bold tracking-[0.18em] uppercase bg-action/10 text-action px-2.5 py-1 rounded-full">
                        STEP_{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mono-label text-xs text-muted-foreground font-semibold">// {s.duration}</span>
                    </div>
                    <h3 className="font-display font-black text-xl md:text-2xl text-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Icono central */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-primary shadow-elegant items-center justify-center z-10 ring-4 ring-background pointer-events-none">
                    <s.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Spacer (desktop) */}
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
