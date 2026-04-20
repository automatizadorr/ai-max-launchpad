import { motion } from "framer-motion";
import { Clock, Database, UserX, LucideIcon } from "lucide-react";

interface Problem {
  icon: LucideIcon;
  title: string;
  desc: string;
  alt: string;
}

const problems: Problem[] = [
  {
    icon: Clock,
    title: "Pérdida de Tiempo",
    desc: "Tareas manuales repetitivas que agotan a su equipo y consumen horas productivas cada día.",
    alt: "Icono de reloj",
  },
  {
    icon: Database,
    title: "Sistemas Desconectados",
    desc: "Plataformas que no se comunican entre sí, generando silos de información y errores costosos.",
    alt: "Icono de base de datos",
  },
  {
    icon: UserX,
    title: "Atención Limitada",
    desc: "Pérdida de prospectos fuera del horario comercial por falta de respuesta inmediata.",
    alt: "Icono de cliente sin atender",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const ProblemSection = () => {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-secondary relative" aria-labelledby="problem-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            El Problema
          </span>
          <h2 id="problem-heading" className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            Los cuellos de botella que{" "}
            <span className="text-action">frenan su crecimiento</span>.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="glass-light rounded-2xl p-8 shadow-card hover:shadow-elegant transition-shadow duration-500 group"
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant mb-6 group-hover:scale-110 transition-transform duration-500"
                  aria-label={p.alt}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
