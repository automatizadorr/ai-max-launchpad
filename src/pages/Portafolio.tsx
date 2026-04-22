import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, Play, User, TrendingUp, X, Bot, Phone, Workflow, MessageSquare, BarChart3, Brain, Sparkles, AlertCircle, Lightbulb, Layers, Target, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
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

// Convierte URLs de YouTube/Vimeo a formato embed
const getEmbedUrl = (url: string): { type: "iframe" | "video"; src: string } | null => {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?\s]+)/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return { type: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { type: "video", src: url };
  return { type: "iframe", src: url };
};

const Portafolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);

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
        {/* Hero */}
        <section className="relative pt-36 md:pt-44 pb-16 bg-gradient-hero overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4"
            >
              Portafolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white text-4xl md:text-6xl leading-tight max-w-4xl mx-auto"
            >
              Proyectos que <span className="text-gradient-primary">Transforman Negocios</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-white/70 text-base md:text-lg"
            >
              Una selección de soluciones IA implementadas en empresas reales.
            </motion.p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Aún no hay proyectos publicados. Agrega el primero desde tu backend.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {projects.map((p, i) => (
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Agente de Voz IA atendiendo llamadas",
                  desc: "Mira cómo un agente de voz responde, califica leads y agenda citas sin intervención humana.",
                  url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  tag: "Voice AI",
                },
                {
                  title: "Automatización n8n end-to-end",
                  desc: "Workflow que conecta WhatsApp, CRM y email para nutrir leads automáticamente.",
                  url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  tag: "Automatización",
                },
                {
                  title: "Chatbot multicanal con RAG",
                  desc: "Bot conversacional con base de conocimiento personalizada para atención 24/7.",
                  url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  tag: "Chatbot",
                },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-500"
                >
                  <div className="relative aspect-video bg-dark overflow-hidden">
                    <iframe
                      src={v.url}
                      title={v.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
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
              ))}
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
              {[
                {
                  icon: Phone,
                  title: "Agentes de Voz IA",
                  desc: "Atienden llamadas entrantes y salientes, califican leads, agendan citas y resuelven dudas con voz natural 24/7.",
                  industries: ["Salud", "Inmobiliarias", "Servicios"],
                },
                {
                  icon: MessageSquare,
                  title: "Chatbots Conversacionales",
                  desc: "Bots con IA generativa y RAG que responden con información de tu empresa en WhatsApp, web y redes sociales.",
                  industries: ["E-commerce", "SaaS", "Educación"],
                },
                {
                  icon: Workflow,
                  title: "Automatización con n8n",
                  desc: "Conecta CRM, email, WhatsApp, hojas de cálculo y APIs para automatizar procesos sin código.",
                  industries: ["Marketing", "Ventas", "Operaciones"],
                },
                {
                  icon: Brain,
                  title: "Análisis Predictivo",
                  desc: "Modelos que predicen demanda, churn de clientes, fraudes y oportunidades de venta con tus propios datos.",
                  industries: ["Finanzas", "Retail", "Logística"],
                },
                {
                  icon: BarChart3,
                  title: "Dashboards Inteligentes",
                  desc: "Plataformas a medida con métricas en tiempo real, alertas automáticas e insights generados por IA.",
                  industries: ["Gerencia", "Marketing", "Finanzas"],
                },
                {
                  icon: Bot,
                  title: "Asistentes Internos",
                  desc: "Copilotos para tu equipo que responden con tu base de conocimiento, generan reportes y automatizan tareas repetitivas.",
                  industries: ["RRHH", "Soporte", "Legal"],
                },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-action group-hover:scale-110 transition-transform duration-500">
                    <c.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground leading-tight mb-3">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                    {c.industries.map((ind) => (
                      <span
                        key={ind}
                        className="text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-md"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </motion.div>
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

        {/* Project Detail Modal */}
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

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Portafolio;
