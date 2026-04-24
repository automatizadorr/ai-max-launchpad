import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, Play, User, TrendingUp, X, Bot, Phone, Workflow, MessageSquare, BarChart3, Brain, Sparkles, AlertCircle, Lightbulb, Layers, Target, ArrowRight, LayoutGrid } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import ParticleNetwork from "@/components/ParticleNetwork";
import ImpactMetrics from "@/components/ImpactMetrics";
import PortfolioStackMarquee from "@/components/PortfolioStackMarquee";

import BeforeAfter from "@/components/BeforeAfter";
import Industries from "@/components/Industries";
import ProcessTimeline from "@/components/ProcessTimeline";
import PortfolioTestimonials from "@/components/PortfolioTestimonials";
import PortfolioCertifications from "@/components/PortfolioCertifications";
import PortfolioFAQ from "@/components/PortfolioFAQ";
import PortfolioCTA from "@/components/PortfolioCTA";
import PortfolioConversionHero from "@/components/PortfolioConversionHero";
import LeadQualifier from "@/components/LeadQualifier";
import InlineCTA from "@/components/InlineCTA";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string | null;
  long_description: string | null;
  project_url: string;
  image_url: string;
  video_url: string | null;
  category: string | null;
  client_name: string | null;
  result_metric: string | null;
  tags: string[] | null;
}

// Convierte URLs de YouTube/Vimeo/Instagram a formato embed
const getEmbedUrl = (url: string): { type: "iframe" | "video"; src: string } | null => {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?\s]+)/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return { type: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };
  const ig = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?\s]+)/);
  if (ig) return { type: "iframe", src: `https://www.instagram.com/p/${ig[1]}/embed` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { type: "video", src: url };
  return { type: "iframe", src: url };
};

interface UseCase {
  icon: typeof Phone;
  title: string;
  desc: string;
  industries: string[];
  problem: string;
  solution: string;
  stack: string[];
  results: string[];
}

const Portafolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.category && set.add(p.category));
    return ["Todos", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("id, title, description, long_description, project_url, image_url, video_url, category, client_name, result_metric, tags")
        .order("display_order", { ascending: true });

      if (!error && data) setProjects(data as Project[]);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const embed = selected?.video_url ? getEmbedUrl(selected.video_url) : null;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Portafolio de Proyectos IA | AI-MaX"
        description="Explora nuestros proyectos de IA, agentes de voz, automatización n8n y plataformas a medida implementados en empresas reales."
        path="/portafolio"
        ogImage="/og-casos.png"
      />
      <Header />
      <main>
        {/* Conversion Hero */}
        <PortfolioConversionHero />

        {/* Métricas de impacto */}
        <ImpactMetrics />

        {/* Calificador inteligente de leads */}
        <LeadQualifier />

        {/* Stack tecnológico */}
        <PortfolioStackMarquee />

        {/* Grid */}
        <section id="casos" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            {!loading && categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-2 mb-12"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Filtrar
                </span>
                {categories.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                        active
                          ? "bg-primary text-primary-foreground border-primary shadow-elegant"
                          : "bg-card text-foreground border-border hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No hay proyectos en esta categoría todavía.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {filteredProjects.map((p, i) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(p)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative block text-left rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`Ver detalles de ${p.title}`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={p.image_url}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      {p.category && (
                        <span className="absolute top-4 left-4 inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-action text-action-foreground px-3 py-1.5 rounded-full shadow-action">
                          {p.category}
                        </span>
                      )}
                      {p.video_url && (
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-dark/70 text-white px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                          <Play className="w-3 h-3 fill-current" />
                          Video
                        </div>
                      )}
                      <div className="absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <h3 className="font-display font-black text-xl md:text-2xl text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                          {p.description}
                        </p>
                      )}
                      {p.result_metric && (
                        <div className="mt-5 flex items-center gap-3 p-3 rounded-xl bg-action/5 border border-action/20">
                          <div className="w-9 h-9 rounded-lg bg-action/15 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4 h-4 text-action" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Resultado
                            </p>
                            <p className="font-bold text-foreground text-sm leading-tight truncate">
                              {p.result_metric}
                            </p>
                          </div>
                        </div>
                      )}
                      {p.tags && p.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-action">
                        Ver detalles
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Videos educativos */}
        <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
                Aprende sobre IA
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
                Videos & <span className="text-gradient-primary">Demos en Acción</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-base md:text-lg">
                Mira cómo nuestras soluciones de IA funcionan en escenarios reales y descubre el potencial para tu negocio.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Demo IA en acción #1",
                  desc: "Mira cómo nuestras soluciones de inteligencia artificial operan en escenarios reales.",
                  url: "https://www.youtube.com/watch?v=hrafP5PW-jk",
                  tag: "YouTube",
                  platform: "youtube" as const,
                },
                {
                  title: "Demo IA en acción #2",
                  desc: "Otro caso práctico de automatización e IA aplicada al negocio.",
                  url: "https://www.youtube.com/watch?v=eTrYjvS-e8A",
                  tag: "YouTube",
                  platform: "youtube" as const,
                },
                {
                  title: "Reel · Caso de uso IA",
                  desc: "Resumen visual de una implementación de IA real en Instagram.",
                  url: "https://www.instagram.com/p/DWFza86jQHI/",
                  tag: "Instagram",
                  platform: "instagram" as const,
                },
                {
                  title: "Reel · Automatización",
                  desc: "Mira un workflow automatizado funcionando paso a paso.",
                  url: "https://www.instagram.com/p/DWVxJYzkVlf/",
                  tag: "Instagram",
                  platform: "instagram" as const,
                },
              ].map((v, i) => {
                const e = getEmbedUrl(v.url);
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-500"
                  >
                    <div className={`relative ${v.platform === "instagram" ? "aspect-[9/12]" : "aspect-video"} bg-dark overflow-hidden`}>
                      {e && (
                        <iframe
                          src={e.src}
                          title={v.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          scrolling="no"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-action/10 text-action px-2.5 py-1 rounded-full mb-3">
                        {v.tag}
                      </span>
                      <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-2">
                        {v.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Casos de uso de IA */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
                Casos de Uso
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
                ¿Cómo puede la IA <span className="text-gradient-primary">transformar tu empresa?</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-base md:text-lg">
                Aplicaciones reales de Inteligencia Artificial que ya están generando resultados medibles en empresas LATAM.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {([
                {
                  icon: Phone,
                  title: "Agentes de Voz IA",
                  desc: "Atienden llamadas entrantes y salientes, califican leads, agendan citas y resuelven dudas con voz natural 24/7.",
                  industries: ["Salud", "Inmobiliarias", "Servicios"],
                  problem: "Equipos de ventas o recepción saturados que pierden llamadas fuera de horario, no hacen seguimiento a leads y dedican horas a tareas repetitivas como agendar citas o calificar prospectos.",
                  solution: "Implementamos un agente de voz con IA que atiende llamadas entrantes y salientes con voz natural en español, califica leads según tus criterios, agenda citas en tu calendario y deriva a humanos solo cuando es necesario.",
                  stack: ["Vapi / Retell", "OpenAI GPT-4o", "Twilio", "Google Calendar API", "n8n", "Supabase"],
                  results: ["+80% de llamadas atendidas", "Disponibilidad 24/7 sin costo adicional", "Reducción del 60% en tiempo de calificación", "Citas agendadas automáticamente en CRM"],
                },
                {
                  icon: MessageSquare,
                  title: "Chatbots Conversacionales",
                  desc: "Bots con IA generativa y RAG que responden con información de tu empresa en WhatsApp, web y redes sociales.",
                  industries: ["E-commerce", "SaaS", "Educación"],
                  problem: "Soporte colapsado por preguntas repetitivas, tiempos de respuesta largos y leads que se enfrían porque nadie responde en WhatsApp o web fuera de horario laboral.",
                  solution: "Bot conversacional con RAG (Retrieval Augmented Generation) entrenado con tu base de conocimiento, manuales y FAQs. Responde en WhatsApp, web e Instagram con tono de marca y deriva a humanos cuando detecta intención de compra o casos complejos.",
                  stack: ["OpenAI / Claude", "LangChain", "Pinecone / Supabase Vector", "WhatsApp Business API", "n8n", "Next.js"],
                  results: ["70% de consultas resueltas sin humano", "Respuesta en menos de 3 segundos", "+45% conversión de leads en WhatsApp", "Ahorro estimado: 1 FTE de soporte"],
                },
                {
                  icon: Workflow,
                  title: "Automatización con n8n",
                  desc: "Conecta CRM, email, WhatsApp, hojas de cálculo y APIs para automatizar procesos sin código.",
                  industries: ["Marketing", "Ventas", "Operaciones"],
                  problem: "Procesos manuales que pasan datos entre herramientas (CRM, email, hojas de cálculo, WhatsApp) consumen horas semanales, generan errores y bloquean el escalamiento del negocio.",
                  solution: "Workflows en n8n que conectan todas tus herramientas, automatizan flujos de leads, facturación, notificaciones, sincronización de datos y reportes. Incluye nodos con IA para enriquecer datos, clasificar leads y generar respuestas.",
                  stack: ["n8n self-hosted", "OpenAI", "HubSpot / Pipedrive", "WhatsApp API", "Google Workspace", "Webhooks"],
                  results: ["+20 horas/semana ahorradas por equipo", "Cero errores de transcripción manual", "Leads nuevos en CRM en menos de 30 segundos", "ROI promedio en 60 días"],
                },
                {
                  icon: Brain,
                  title: "Análisis Predictivo",
                  desc: "Modelos que predicen demanda, churn de clientes, fraudes y oportunidades de venta con tus propios datos.",
                  industries: ["Finanzas", "Retail", "Logística"],
                  problem: "Decisiones tomadas con intuición o reportes históricos, sin capacidad de anticipar churn de clientes, picos de demanda, riesgo crediticio o fraude antes de que ocurran.",
                  solution: "Modelos de machine learning entrenados con tus datos históricos para predecir demanda, identificar clientes en riesgo de fuga, scoring crediticio o detectar transacciones sospechosas. Incluye dashboard con alertas automáticas.",
                  stack: ["Python", "scikit-learn / XGBoost", "BigQuery / Postgres", "Airflow", "Streamlit / Metabase", "Vercel"],
                  results: ["Precisión de predicción 85-92%", "Reducción del 30% en churn detectado a tiempo", "Detección de fraude en tiempo real", "Optimización de inventario en -25%"],
                },
                {
                  icon: BarChart3,
                  title: "Dashboards Inteligentes",
                  desc: "Plataformas a medida con métricas en tiempo real, alertas automáticas e insights generados por IA.",
                  industries: ["Gerencia", "Marketing", "Finanzas"],
                  problem: "Datos dispersos en múltiples plataformas (Meta Ads, Google, CRM, ventas), reportes manuales en Excel y nula visibilidad en tiempo real para tomar decisiones rápidas.",
                  solution: "Dashboard a medida que centraliza todas tus fuentes de datos, con visualizaciones interactivas, alertas automáticas cuando una métrica se sale de rango y un asistente IA que responde preguntas en lenguaje natural sobre tus números.",
                  stack: ["Next.js", "Supabase", "Recharts / Tremor", "OpenAI", "Meta / Google Ads APIs", "Vercel"],
                  results: ["Reportes en tiempo real (no semanales)", "Decisiones 5x más rápidas", "Alertas automáticas en Slack/Email", "Insights conversacionales con IA"],
                },
                {
                  icon: Bot,
                  title: "Asistentes Internos",
                  desc: "Copilotos para tu equipo que responden con tu base de conocimiento, generan reportes y automatizan tareas repetitivas.",
                  industries: ["RRHH", "Soporte", "Legal"],
                  problem: "Equipos que pierden tiempo buscando información en Drive, manuales o políticas internas. Onboarding lento, conocimiento atrapado en personas clave y tareas administrativas repetitivas.",
                  solution: "Copiloto IA conectado a tu Google Drive, Notion, SharePoint o base de datos, que responde preguntas internas, genera contratos, resúmenes de reuniones, reportes y automatiza tareas administrativas con permisos por rol.",
                  stack: ["OpenAI / Claude", "LangChain", "Supabase Vector", "Google Drive API", "Slack / Teams", "Next.js"],
                  results: ["Onboarding 50% más rápido", "Conocimiento accesible 24/7", "Generación automática de documentos", "Adopción superior al 80% del equipo"],
                },
              ] as UseCase[]).map((c, i) => (
                <motion.button
                  key={c.title}
                  type="button"
                  onClick={() => setSelectedCase(c)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative text-left p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Ver detalles de ${c.title}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-action group-hover:scale-110 transition-transform duration-500">
                    <c.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground leading-tight mb-3">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border mb-4">
                    {c.industries.map((ind) => (
                      <span
                        key={ind}
                        className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-md"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-action">
                    Ver caso completo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-14 text-center"
            >
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-action" />
                ¿Tu caso no está aquí? Lo construimos a medida.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Antes vs Después */}
        <BeforeAfter />

        {/* Inline CTA tras BeforeAfter */}
        <InlineCTA
          variant="primary"
          location="after_before_after"
          title="¿Quieres resultados así en tu negocio?"
          description="Agenda un diagnóstico gratuito y diseñamos tu plan en 24h."
          ctaLabel="Agendar diagnóstico"
          targetId="qualifier"
        />

        {/* Industrias */}
        <Industries />

        {/* Inline CTA tras Industries */}
        <InlineCTA
          variant="soft"
          location="after_industries"
          title="¿Tu industria está aquí? Cuéntanos tu caso."
          description="Adaptamos cualquier solución a tu sector específico."
          ctaLabel="Hablemos de tu caso"
          targetId="contacto"
        />

        {/* Proceso de trabajo */}
        <ProcessTimeline />

        {/* Testimonios */}
        <PortfolioTestimonials />

        {/* Inline CTA WhatsApp tras testimonios */}
        <InlineCTA
          variant="whatsapp"
          location="after_testimonials"
          title="Únete a +30 empresas que ya automatizan con IA"
          description="Conversa directo con nuestro equipo por WhatsApp."
          ctaLabel="Escribir por WhatsApp"
        />

        {/* Certificaciones / Partners */}
        <PortfolioCertifications />

        {/* FAQ */}
        <PortfolioFAQ />

        {/* CTA Final */}
        <PortfolioCTA />

        <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] p-0 overflow-hidden gap-0">
            {selected && (
              <div className="flex flex-col max-h-[92vh]">
                {/* Media */}
                <div className="relative bg-dark shrink-0">
                  {embed ? (
                    <div className="relative aspect-video w-full bg-black">
                      {embed.type === "iframe" ? (
                        <iframe
                          src={embed.src}
                          title={selected.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={embed.src}
                          controls
                          poster={selected.image_url}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={selected.image_url}
                        alt={selected.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                    </div>
                  )}
                  {selected.category && (
                    <span className="absolute top-4 left-4 inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-action text-action-foreground px-3 py-1.5 rounded-full shadow-action z-10">
                      {selected.category}
                    </span>
                  )}
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto p-6 md:p-8">
                  <DialogHeader className="text-left space-y-2 mb-5">
                    <DialogTitle className="font-display font-black text-2xl md:text-3xl text-foreground leading-tight">
                      {selected.title}
                    </DialogTitle>
                    {selected.description && (
                      <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                        {selected.description}
                      </DialogDescription>
                    )}
                  </DialogHeader>

                  {/* Meta cards */}
                  {(selected.client_name || selected.result_metric) && (
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {selected.client_name && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Cliente
                            </p>
                            <p className="font-semibold text-foreground truncate">
                              {selected.client_name}
                            </p>
                          </div>
                        </div>
                      )}
                      {selected.result_metric && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-action/5 border border-action/20">
                          <div className="w-10 h-10 rounded-lg bg-action/15 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 text-action" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Resultado
                            </p>
                            <p className="font-semibold text-foreground truncate">
                              {selected.result_metric}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Long description */}
                  {selected.long_description && (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-action mb-3">
                        Sobre el proyecto
                      </h4>
                      <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed whitespace-pre-line">
                        {selected.long_description}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {selected.tags && selected.tags.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-action mb-3">
                        Tecnologías y áreas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selected.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button asChild size="lg" className="flex-1">
                      <a href={selected.project_url} target="_blank" rel="noopener noreferrer">
                        Visitar proyecto
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setSelected(null)}>
                      <X className="w-4 h-4 mr-2" />
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Use Case Detail Modal */}
        <Dialog open={!!selectedCase} onOpenChange={(o) => !o && setSelectedCase(null)}>
          <DialogContent className="max-w-3xl w-[95vw] max-h-[92vh] p-0 overflow-hidden gap-0">
            {selectedCase && (
              <div className="flex flex-col max-h-[92vh]">
                {/* Header */}
                <div className="relative bg-gradient-hero p-6 md:p-8 shrink-0">
                  <div
                    className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-action shrink-0">
                      <selectedCase.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="min-w-0 pr-8">
                      <span className="inline-block text-[10px] font-bold tracking-[0.18em] text-action uppercase mb-2">
                        Caso de Uso IA
                      </span>
                      <DialogTitle className="font-display font-black text-2xl md:text-3xl text-white leading-tight">
                        {selectedCase.title}
                      </DialogTitle>
                      <DialogDescription className="text-white/70 text-sm md:text-base mt-2 leading-relaxed">
                        {selectedCase.desc}
                      </DialogDescription>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-6 md:p-8 space-y-7">
                  {/* Industries */}
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.industries.map((ind) => (
                      <Badge key={ind} variant="secondary" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                  </div>

                  {/* Problem */}
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center shrink-0">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </div>
                      <h4 className="font-display font-bold text-base text-foreground">El problema</h4>
                    </div>
                    <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
                      {selectedCase.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-display font-bold text-base text-foreground">Nuestra solución</h4>
                    </div>
                    <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
                      {selectedCase.solution}
                    </p>
                  </div>

                  {/* Stack */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="w-4 h-4 text-action" />
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                        Stack sugerido
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-semibold bg-muted text-foreground px-3 py-1.5 rounded-md border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-action" />
                      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-action">
                        Resultados esperados
                      </h4>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {selectedCase.results.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 p-3 rounded-lg bg-action/5 border border-action/15"
                        >
                          <TrendingUp className="w-4 h-4 text-action shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/90 leading-snug">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={() => {
                        const painPoint = selectedCase.title;
                        setSelectedCase(null);
                        // Wait for modal close animation, then dispatch prefill event
                        setTimeout(() => {
                          window.dispatchEvent(
                            new CustomEvent("leadform:prefill", {
                              detail: { pain_point: painPoint },
                            })
                          );
                        }, 200);
                      }}
                    >
                      Quiero implementar esto
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setSelectedCase(null)}>
                      <X className="w-4 h-4 mr-2" />
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Portafolio;
