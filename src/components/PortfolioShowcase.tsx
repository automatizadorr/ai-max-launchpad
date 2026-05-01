import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, Play, User, TrendingUp, X, ArrowRight } from "lucide-react";
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

const getEmbedUrl = (url: string): { type: "iframe" | "video"; src: string } | null => {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?\s]+)/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return { type: "iframe", src: `https://player.vimeo.com/video/${vm[1]}` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { type: "video", src: url };
  return { type: "iframe", src: url };
};

const PortfolioShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("id, title, description, long_description, project_url, image_url, video_url, category, client_name, result_metric, tags")
        .order("display_order", { ascending: true })
        .limit(6);

      if (!error && data) setProjects(data as Project[]);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const embed = selected?.video_url ? getEmbedUrl(selected.video_url) : null;

  return (
    <section id="portafolio" className="py-24 md:py-32 bg-background" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            Portafolio
          </span>
          <h2 id="portfolio-heading" className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            Proyectos Reales que{" "}
            <span className="text-gradient-primary">Transforman Negocios</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Una selección de implementaciones IA que están operando hoy en empresas reales.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Aún no hay proyectos publicados.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
              {projects.map((p, i) => (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative block text-left rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Ver detalles de ${p.title}`}
                >
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
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-black text-lg md:text-xl text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    {p.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    )}
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-action">
                      Ver detalles
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Button asChild size="lg" variant="outline">
                <Link to="/portafolio">
                  Ver todo el portafolio
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] p-0 overflow-hidden gap-0">
          {selected && (
            <div className="flex flex-col max-h-[92vh]">
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
                    <img src={selected.image_url} alt={selected.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                  </div>
                )}
                {selected.category && (
                  <span className="absolute top-4 left-4 inline-block text-[10px] font-bold tracking-[0.18em] uppercase bg-action text-action-foreground px-3 py-1.5 rounded-full shadow-action z-10">
                    {selected.category}
                  </span>
                )}
              </div>

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

                {(selected.client_name || selected.result_metric) && (
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {selected.client_name && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cliente</p>
                          <p className="font-semibold text-foreground truncate">{selected.client_name}</p>
                        </div>
                      </div>
                    )}
                    {selected.result_metric && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-action/5 border border-action/20">
                        <div className="w-10 h-10 rounded-lg bg-action/15 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-5 h-5 text-action" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resultado</p>
                          <p className="font-semibold text-foreground truncate">{selected.result_metric}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selected.long_description && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-action mb-3">Sobre el proyecto</h4>
                    <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed whitespace-pre-line">
                      {selected.long_description}
                    </div>
                  </div>
                )}

                {selected.tags && selected.tags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-action mb-3">Tecnologías y áreas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

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
    </section>
  );
};

export default PortfolioShowcase;
