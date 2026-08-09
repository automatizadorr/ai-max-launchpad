import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Clock, Users, TrendingUp } from "lucide-react";

interface Metric {
  icon: typeof Rocket;
  value: number;
  suffix: string;
  label: string;
  color: string;
  // clave del dato (mono label técnico)
  key: string;
}

const metrics: Metric[] = [
  { icon: Rocket, value: 4, suffix: "+", label: "Proyectos en producción", color: "text-action", key: "PROD" },
  { icon: Clock, value: 771, suffix: "+", label: "Horas automatizadas", color: "text-primary-glow", key: "HRS" },
  { icon: Users, value: 3, suffix: "+", label: "Empresas operando con IA", color: "text-action", key: "LIVE" },
  { icon: TrendingUp, value: 340, suffix: "%", label: "ROI promedio", color: "text-primary-glow", key: "ROI" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
};

const ImpactMetrics = () => {
  return (
    <section className="relative py-14 md:py-20 bg-dark overflow-hidden" aria-label="Métricas de impacto">
      {/* Blueprint grid sutil sobre el dark — signature del rediseño */}
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

      {/* Hairline horizontal superior: conecta los 4 nodos al "grid" */}
      <div className="absolute top-14 left-0 right-0 hairline pointer-events-none" />
      <div className="absolute bottom-14 left-0 right-0 hairline pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Eyebrow técnico */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="mono-label text-[11px] font-semibold tracking-[0.2em] text-primary-glow uppercase">
            // Métricas · operación en vivo
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center group"
            >
              {/* Nodos terminales sobre la hairline */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-glow shadow-glow opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className={`inline-flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center mb-3 ${m.color}`}>
                <m.icon className="w-6 h-6" />
              </div>
              <div className="mono-label text-[10px] tracking-[0.18em] text-primary-glow/70 uppercase mb-1">
                {m.key}
              </div>
              <div className="font-display font-black text-3xl md:text-5xl text-white leading-none tabular-nums">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <p className="mt-2 text-xs md:text-sm text-white/70 uppercase tracking-wider font-semibold">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
