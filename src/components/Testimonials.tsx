import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Implementamos el agente de WhatsApp y en el primer mes calificamos 3x más leads sin sumar personal. La inversión se recuperó en semanas.",
    name: "Camila Rojas",
    role: "Gerente Comercial",
    company: "InmoNorte SpA",
    initials: "CR",
  },
  {
    quote:
      "AI-MaX automatizó la conexión entre nuestro CRM, correos y base de datos. Eliminamos horas de trabajo manual y los errores cayeron a casi cero.",
    name: "Felipe Aravena",
    role: "Director de Operaciones",
    company: "LegalPro Consultores",
    initials: "FA",
  },
  {
    quote:
      "El asistente de voz IA atiende llamadas 24/7 y agenda directo en el calendario. Nuestra tasa de respuesta a prospectos pasó de horas a segundos.",
    name: "Daniela Muñoz",
    role: "CEO",
    company: "PropTech Andes",
    initials: "DM",
  },
  {
    quote:
      "Profesionalismo, claridad y resultados medibles. Nos entregaron un ecosistema digital que escala con la empresa, no que la frena.",
    name: "Rodrigo Salinas",
    role: "Fundador",
    company: "LogiSmart Chile",
    initials: "RS",
  },
];

const logos = [
  "InmoNorte",
  "LegalPro",
  "PropTech Andes",
  "LogiSmart",
  "Andes Capital",
  "NovaRetail",
  "MediClínica",
  "EduTech LATAM",
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => clearInterval(id);
  }, [total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const current = testimonials[index];
  const loopLogos = [...logos, ...logos];

  return (
    <section
      id="testimonios"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Soft background accents */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-action/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            Testimonios
          </span>
          <h2
            id="testimonials-heading"
            className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight"
          >
            Empresas que ya escalan con{" "}
            <span className="text-gradient-primary">AI-MaX</span>.
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
          aria-roledescription="carousel"
          aria-label="Carrusel de testimonios de clientes"
        >
          <div className="relative rounded-3xl bg-gradient-mesh shadow-elegant border border-primary/15 overflow-hidden">
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-glow/20 blur-3xl pointer-events-none" />

            <div className="relative p-8 md:p-14">
              <Quote
                className="absolute top-6 right-6 md:top-10 md:right-10 w-16 h-16 md:w-24 md:h-24 text-white/[0.06]"
                aria-hidden="true"
              />

              <div className="flex items-center gap-1 mb-6" aria-label="Calificación: 5 de 5 estrellas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-action text-action" aria-hidden="true" />
                ))}
              </div>

              <div className="min-h-[180px] md:min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white text-xl md:text-2xl lg:text-3xl font-display font-medium leading-relaxed"
                  >
                    “{current.quote}”
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.figcaption
                  key={`meta-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="mt-8 flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-action flex items-center justify-center font-display font-black text-action-foreground shadow-action"
                    aria-hidden="true"
                  >
                    {current.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{current.name}</div>
                    <div className="text-white/60 text-sm">
                      {current.role} · {current.company}
                    </div>
                  </div>
                </motion.figcaption>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-6 md:px-10 pb-6 md:pb-8">
              <div className="flex items-center gap-2" role="tablist" aria-label="Seleccionar testimonio">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Ir al testimonio ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-8 bg-action" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Testimonio anterior"
                  className="w-10 h-10 rounded-full glass text-white hover:bg-white/15 transition-all duration-300 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  aria-label="Testimonio siguiente"
                  className="w-10 h-10 rounded-full glass text-white hover:bg-white/15 transition-all duration-300 flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logos strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-20 md:mt-24"
          aria-label="Logos de empresas que han trabajado con AI-MaX"
        >
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-8">
            Empresas que confían en nosotros
          </p>
          <div className="relative">
            <div className="flex marquee gap-12 md:gap-16 w-max items-center">
              {loopLogos.map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl text-foreground/40 hover:text-primary transition-colors duration-300 whitespace-nowrap"
                >
                  <span className="w-2 h-2 rounded-full bg-primary/40" aria-hidden="true" />
                  {logo}
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
