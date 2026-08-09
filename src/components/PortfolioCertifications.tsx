import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles, Cpu, Zap, Code2, Database, Cloud } from "lucide-react";

const credentials = [
  {
    icon: Sparkles,
    title: "OpenAI Builder",
    desc: "Implementaciones con GPT-4, GPT-5 y Assistants API en producción.",
  },
  {
    icon: Zap,
    title: "n8n Expert",
    desc: "Automatizaciones complejas con cientos de workflows desplegados.",
  },
  {
    icon: Cpu,
    title: "Anthropic Claude",
    desc: "Agentes con Claude 3.5/4 para razonamiento avanzado y RAG.",
  },
  {
    icon: Database,
    title: "Supabase Partner",
    desc: "Backends escalables con auth, storage, edge functions y vector DB.",
  },
  {
    icon: Cloud,
    title: "Google Cloud & Vertex AI",
    desc: "Modelos Gemini, despliegues serverless y pipelines de datos.",
  },
  {
    icon: Code2,
    title: "LangChain & LlamaIndex",
    desc: "Orquestación de agentes, herramientas y bases de conocimiento.",
  },
];

const PortfolioCertifications = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden" aria-labelledby="credentials-heading">
      <div className="absolute inset-0 blueprint-grid-fine opacity-25 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="mono-label inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            <Award className="w-3.5 h-3.5" />
            // Expertise & Partners
          </span>
          <h2
            id="credentials-heading"
            className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight"
          >
            Tecnologías que <span className="text-gradient-primary">dominamos</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Trabajamos con las plataformas líderes de IA del mundo y aplicamos las mejores prácticas
            de seguridad y arquitectura en cada proyecto.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="clip-terminal group relative rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-action mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badge strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="clip-terminal mt-14 max-w-4xl mx-auto rounded-2xl bg-gradient-hero p-6 md:p-8 border border-white/10 shadow-elegant relative overflow-hidden"
        >
          <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-7 text-center md:text-left">
            <div className="w-14 h-14 rounded-xl bg-action/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-action" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-black text-xl md:text-2xl text-white leading-tight">
                Compromiso con seguridad y privacidad
              </h3>
              <p className="text-white/70 text-sm md:text-base mt-1.5 leading-relaxed">
                Cifrado en tránsito y en reposo · NDA disponible · Sin uso de tus datos para entrenar
                modelos públicos · Cumplimiento con buenas prácticas LATAM.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioCertifications;
