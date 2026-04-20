import { motion } from "framer-motion";

const techs = [
  "n8n", "Supabase", "GoHighLevel", "ElevenLabs", "OpenAI", "React", "Vapi", "Meta API",
];

const TechMarquee = () => {
  const loop = [...techs, ...techs];

  return (
    <section
      id="tecnologia"
      className="py-20 md:py-24 bg-secondary border-y border-border overflow-hidden"
      aria-labelledby="tech-heading"
    >
      <div className="container mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            Stack Tecnológico
          </span>
          <h2 id="tech-heading" className="font-display font-black text-2xl md:text-4xl text-foreground">
            Construido sobre las mejores tecnologías del mercado
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex marquee gap-12 md:gap-20 w-max">
          {loop.map((t, i) => (
            <div
              key={`${t}-${i}`}
              className="font-display font-black text-3xl md:text-5xl text-foreground/30 hover:text-primary transition-colors duration-300 whitespace-nowrap"
            >
              {t}
            </div>
          ))}
        </div>
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default TechMarquee;
