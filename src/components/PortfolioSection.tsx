import { motion } from "framer-motion";
import { AudioWaveform, Building2, Workflow, LucideIcon, CheckCircle2 } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
}

const features: Feature[] = [
  {
    icon: AudioWaveform,
    tag: "Voz & Conversacional",
    title: "Agentes Conversacionales y Voz IA",
    desc: "Configuración de asistentes para WhatsApp y llamadas telefónicas (Inbound/Outbound) que califican leads en tiempo real.",
    bullets: ["Llamadas inbound y outbound", "Calificación automática 24/7", "Integración con CRM"],
  },
  {
    icon: Building2,
    tag: "PropTech & LegalTech",
    title: "Plataformas Sectoriales a Medida",
    desc: "Desarrollo de portales inteligentes con análisis de contratos, búsqueda semántica y procesamiento documental.",
    bullets: ["Análisis de contratos con IA", "Búsqueda semántica avanzada", "Dashboards corporativos"],
  },
  {
    icon: Workflow,
    tag: "Automatización n8n",
    title: "Automatización de Flujos de Trabajo",
    desc: "Conexión de CRMs, bases de datos, correos y sistemas internos en piloto automático.",
    bullets: ["Integraciones n8n robustas", "Workflows multicanal", "Reportes automáticos"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portafolio" className="py-24 md:py-32 bg-background" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            Nuestras Soluciones
          </span>
          <h2 id="portfolio-heading" className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            Ecosistemas Digitales que{" "}
            <span className="text-gradient-primary">Trabajan por Usted 24/7</span>.
          </h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {features.map((f, i) => {
            const Icon = f.icon;
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Visual */}
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-primary rounded-[2rem] rotate-3 opacity-20 blur-2xl" />
                    <div className="relative w-full h-full bg-gradient-mesh rounded-[2rem] overflow-hidden shadow-elegant border border-primary/20 flex items-center justify-center">
                      {/* Decorative grid */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
                          backgroundSize: "40px 40px",
                        }}
                      />
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary-glow/30 blur-2xl" />
                      <div className="relative z-10 animate-float-slow">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl glass flex items-center justify-center shadow-glow">
                          <Icon className="w-16 h-16 md:w-20 md:h-20 text-white" aria-label={`Icono de ${f.title}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
                    {f.tag}
                  </span>
                  <h3 className="font-display font-black text-2xl md:text-4xl text-foreground leading-tight mb-5">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{f.desc}</p>
                  <ul className="space-y-3">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
