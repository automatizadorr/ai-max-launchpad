import { motion } from "framer-motion";

const techs = [
  "OpenAI", "Claude", "Gemini", "Vapi", "n8n", "Supabase", "LangChain", "Pinecone",
  "Twilio", "WhatsApp API", "Make", "GoHighLevel", "ElevenLabs", "Retell", "Next.js", "React",
];

const PortfolioStackMarquee = () => {
  const loop = [...techs, ...techs];

  return (
    <section className="py-16 md:py-20 bg-secondary border-y border-border overflow-hidden" aria-label="Stack tecnológico">
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-3">
            Stack Tecnológico
          </span>
          <h2 className="font-display font-black text-2xl md:text-4xl text-foreground">
            Las herramientas detrás de cada proyecto
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex marquee gap-10 md:gap-16 w-max">
          {loop.map((t, i) => (
            <div
              key={`${t}-${i}`}
              className="font-display font-black text-2xl md:text-4xl text-foreground/30 hover:text-primary transition-colors duration-300 whitespace-nowrap"
            >
              {t}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default PortfolioStackMarquee;
