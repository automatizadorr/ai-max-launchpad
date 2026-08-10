import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initial: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Camila Rojas",
    role: "Gerente Comercial",
    company: "Inmobiliaria Andes",
    quote: "El agente de voz IA contesta cada llamada en menos de 2 segundos y agenda visitas solo. Pasamos de perder 40% de leads fuera de horario a 0.",
    initial: "CR",
    rating: 5,
  },
  {
    name: "Felipe Navarro",
    role: "CEO",
    company: "ClinicaSmart",
    quote: "El chatbot resuelve el 70% de las consultas en WhatsApp sin intervención humana. Liberó al equipo de soporte para enfocarse en casos críticos.",
    initial: "FN",
    rating: 5,
  },
  {
    name: "María José Pérez",
    role: "Head of Operations",
    company: "RetailHub LATAM",
    quote: "Los workflows de n8n nos ahorran 30 horas semanales. Antes pasábamos datos manualmente entre 5 sistemas; hoy todo fluye solo y sin errores.",
    initial: "MP",
    rating: 5,
  },
  {
    name: "Diego Salinas",
    role: "Founder",
    company: "EduPlus",
    quote: "El dashboard con IA nos da insights en lenguaje natural. Tomamos decisiones 5x más rápido sin depender del equipo de datos.",
    initial: "DS",
    rating: 5,
  },
  {
    name: "Andrea Muñoz",
    role: "Directora de Marketing",
    company: "FinTech Pro",
    quote: "Implementaron un sistema de scoring predictivo que detectó churn antes de que ocurriera. Recuperamos el 28% de cuentas en riesgo.",
    initial: "AM",
    rating: 5,
  },
  {
    name: "Rodrigo Vega",
    role: "COO",
    company: "Logistics Express",
    quote: "El asistente interno responde todo lo del onboarding y políticas. Redujimos el tiempo de inducción de 2 semanas a 4 días.",
    initial: "RV",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonios" className="relative py-20 md:py-28 bg-background overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 blueprint-grid-fine opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="mono-label inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            // Lo que dicen
          </span>
          <h2 id="testimonials-heading" className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight">
            Clientes que confían en nosotros
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Resultados reales de empresas LATAM que ya operan con IA.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative p-7 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/15" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-action text-action" />
                ))}
              </div>
              <p className="text-foreground/90 text-sm md:text-base leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center font-display font-black text-white text-sm shrink-0">
                  {t.initial}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
