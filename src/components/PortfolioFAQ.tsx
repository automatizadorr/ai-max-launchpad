import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cuánto demora implementar un proyecto de IA?",
    a: "Depende del alcance. Un agente de voz o chatbot básico puede estar operando en 2 a 4 semanas. Automatizaciones con n8n entre 1 y 3 semanas. Plataformas a medida con dashboards y modelos predictivos suelen tomar entre 6 y 12 semanas. Siempre entregamos en sprints quincenales para que veas avances reales.",
  },
  {
    q: "¿Trabajan solo con empresas grandes o también con startups y PyMEs?",
    a: "Trabajamos con startups, PyMEs y empresas medianas/grandes en LATAM. Tenemos planes escalables: desde un agente de voz puntual hasta plataformas IA completas. Lo importante es que exista un proceso real que mejorar y voluntad de medir resultados.",
  },
  {
    q: "¿Qué necesito tener antes de empezar?",
    a: "Nada técnico. En la sesión de diagnóstico identificamos el proceso a automatizar, accesos necesarios (CRM, WhatsApp Business, calendario, etc.) y métricas actuales para poder demostrar el impacto. Si no tienes algo, te ayudamos a configurarlo.",
  },
  {
    q: "¿Qué pasa después de la entrega del proyecto?",
    a: "Ofrecemos planes de soporte y evolución mensual: monitoreo del agente/automatización, ajustes de prompts, nuevas integraciones, reportes de uso e iteraciones según feedback real. También puedes optar por una entrega cerrada con documentación y capacitación a tu equipo.",
  },
  {
    q: "¿Los datos de mi empresa están seguros?",
    a: "Sí. Trabajamos con proveedores enterprise (OpenAI, Anthropic, Google), aplicamos buenas prácticas de seguridad, cifrado en tránsito y en reposo, control de accesos por roles y firmamos NDA cuando se requiere. Nunca usamos tus datos para entrenar modelos públicos.",
  },
  {
    q: "¿Cuánto cuesta un proyecto de IA?",
    a: "Los proyectos puntuales parten desde USD 1.500–3.000 (chatbot/automatización simple) y los proyectos a medida con voz IA, dashboards o múltiples integraciones se cotizan según alcance. Después del diagnóstico inicial entregamos una propuesta detallada con fases, entregables y ROI estimado.",
  },
  {
    q: "¿Pueden integrarse con las herramientas que ya uso?",
    a: "Sí. Integramos con WhatsApp Business, HubSpot, Salesforce, Pipedrive, Google Workspace, Notion, Airtable, Shopify, ERPs, calendarios, telefonía VoIP y prácticamente cualquier API REST. Si tu sistema es legacy, evaluamos conectores o middleware.",
  },
  {
    q: "¿Puedo ver casos reales antes de contratar?",
    a: "Sí. En la primera reunión te mostramos demos en vivo, casos similares a tu industria y, cuando es posible, te conectamos con clientes actuales para que validen su experiencia trabajando con AI-MaX.",
  },
];

const PortfolioFAQ = () => {
  return (
    <section className="relative py-20 md:py-28 bg-muted/30 border-y border-border overflow-hidden" aria-labelledby="portfolio-faq-heading">
      <div className="absolute inset-0 blueprint-grid-soft opacity-40 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="mono-label inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            // Preguntas Frecuentes
          </span>
          <h2
            id="portfolio-faq-heading"
            className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight"
          >
            Resolvemos tus <span className="text-gradient-primary">dudas</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Lo que más nos preguntan antes de iniciar un proyecto de IA con nosotros.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="clip-terminal rounded-2xl bg-card border border-border shadow-card p-2 md:p-4 relative"
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-action/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary-glow/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
            <span className="mono-label ml-3 text-[10px] text-muted-foreground tracking-wider">faq.md</span>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border last:border-0 px-4"
              >
                <AccordionTrigger className="text-left font-display font-bold text-base md:text-lg text-foreground hover:text-primary hover:no-underline py-5">
                  <span className="flex items-baseline gap-3">
                    <span className="mono-label text-[10px] text-action/70 tabular-nums shrink-0 mt-1">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5 pl-10">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioFAQ;
