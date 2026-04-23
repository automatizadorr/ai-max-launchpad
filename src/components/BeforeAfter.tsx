import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";

interface Case {
  title: string;
  industry: string;
  before: { metric: string; description: string }[];
  after: { metric: string; description: string }[];
}

const cases: Case[] = [
  {
    title: "Inmobiliaria que perdía leads fuera de horario",
    industry: "Real Estate",
    before: [
      { metric: "120 leads/sem", description: "sin atender después de las 18:00" },
      { metric: "48 hrs", description: "tiempo promedio de primer contacto" },
      { metric: "8%", description: "tasa de conversión a visita" },
    ],
    after: [
      { metric: "0 leads", description: "perdidos · agente IA 24/7" },
      { metric: "< 30 seg", description: "primer contacto automático" },
      { metric: "31%", description: "tasa de conversión a visita" },
    ],
  },
  {
    title: "E-commerce con soporte WhatsApp colapsado",
    industry: "Retail",
    before: [
      { metric: "1.200 msj/día", description: "saturando 3 agentes humanos" },
      { metric: "4 horas", description: "tiempo promedio de respuesta" },
      { metric: "12%", description: "leads convertidos en venta" },
    ],
    after: [
      { metric: "70%", description: "resuelto por bot con RAG" },
      { metric: "< 3 seg", description: "respuesta automática 24/7" },
      { metric: "27%", description: "leads convertidos en venta" },
    ],
  },
];

const BeforeAfter = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary border-y border-border" aria-labelledby="before-after-heading">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            Impacto medible
          </span>
          <h2 id="before-after-heading" className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            Antes vs <span className="text-gradient-primary">Después con IA</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Casos reales con métricas concretas. Esto es lo que cambia cuando la IA entra en operación.
          </p>
        </div>

        <div className="space-y-10">
          {cases.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-3xl bg-card border border-border shadow-card overflow-hidden"
            >
              <div className="p-6 md:p-8 border-b border-border">
                <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full mb-3">
                  {c.industry}
                </span>
                <h3 className="font-display font-black text-xl md:text-2xl text-foreground leading-tight">
                  {c.title}
                </h3>
              </div>

              <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch">
                {/* Antes */}
                <div className="p-6 md:p-8 bg-destructive/5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <h4 className="font-display font-bold text-base text-foreground">Antes</h4>
                  </div>
                  <ul className="space-y-4">
                    {c.before.map((b) => (
                      <li key={b.metric}>
                        <p className="font-display font-black text-2xl md:text-3xl text-destructive leading-none">
                          {b.metric}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{b.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center bg-gradient-primary px-6">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <div className="md:hidden flex items-center justify-center py-3 bg-gradient-primary">
                  <ArrowRight className="w-6 h-6 text-white rotate-90" />
                </div>

                {/* Después */}
                <div className="p-6 md:p-8 bg-action/5">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-action/15 flex items-center justify-center">
                      <Check className="w-4 h-4 text-action" />
                    </div>
                    <h4 className="font-display font-bold text-base text-foreground">Después con IA</h4>
                  </div>
                  <ul className="space-y-4">
                    {c.after.map((a) => (
                      <li key={a.metric}>
                        <p className="font-display font-black text-2xl md:text-3xl text-action leading-none">
                          {a.metric}
                        </p>
                        <p className="text-sm text-foreground/80 mt-1">{a.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
