import { motion } from "framer-motion";
import {
  Heart, Home, ShoppingCart, Banknote, GraduationCap, Truck,
  Scale, Stethoscope, Building2, Plane,
} from "lucide-react";

const industries = [
  { icon: Stethoscope, name: "Salud" },
  { icon: Home, name: "Inmobiliaria" },
  { icon: ShoppingCart, name: "E-commerce" },
  { icon: Banknote, name: "Finanzas" },
  { icon: GraduationCap, name: "Educación" },
  { icon: Truck, name: "Logística" },
  { icon: Scale, name: "Legal" },
  { icon: Heart, name: "Servicios" },
  { icon: Building2, name: "Corporativo" },
  { icon: Plane, name: "Turismo" },
];

const Industries = () => {
  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="industries-heading">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            Industrias
          </span>
          <h2 id="industries-heading" className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            Sectores donde <span className="text-gradient-primary">ya operamos</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Adaptamos cada solución de IA al lenguaje, procesos y normativas de tu industria.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-gradient-primary flex items-center justify-center transition-all duration-500">
                <ind.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <span className="text-sm font-semibold text-foreground text-center">{ind.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
