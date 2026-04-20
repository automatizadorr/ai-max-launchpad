import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string | null;
  project_url: string;
  image_url: string;
  category: string | null;
}

const Portafolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("id, title, description, project_url, image_url, category")
        .order("display_order", { ascending: true });

      if (!error && data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

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
                  <motion.a
                    key={p.id}
                    href={p.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative block rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
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
                      <div className="absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
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
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-action">
                        Ver proyecto
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </section>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default Portafolio;
