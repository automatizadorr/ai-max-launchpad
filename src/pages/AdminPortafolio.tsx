import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, Loader2, ExternalLink, ShieldAlert, Sparkles, ImageDown, Upload, Video, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  display_order: number;
  rank: number | null;
}

const projectSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  long_description: z.string().trim().max(3000).optional().or(z.literal("")),
  project_url: z.string().trim().url("URL inválida").max(500),
  image_url: z.string().trim().url("URL de imagen inválida").max(500),
  video_url: z.string().trim().url("URL de video inválida").max(500).optional().or(z.literal("")),
  category: z.string().trim().max(60).optional().or(z.literal("")),
  client_name: z.string().trim().max(120).optional().or(z.literal("")),
  result_metric: z.string().trim().max(120).optional().or(z.literal("")),
  tags: z.array(z.string().trim().max(40)).max(10).optional(),
  display_order: z.number().int().min(0).max(9999),
  rank: z.number().int().min(1).max(3).nullable(),
});

const emptyForm = {
  title: "",
  description: "",
  long_description: "",
  project_url: "",
  image_url: "",
  video_url: "",
  category: "",
  client_name: "",
  result_metric: "",
  tags: [] as string[],
  display_order: 0,
  rank: null as number | null,
};

// Generador de copy persuasivo estilo Alex Hormozi (100% código, sin IA externa).
// Combina hooks, problema, solución, mecanismo único, prueba, oferta y CTA
// usando la información que el admin ya rellenó en las demás casillas.
function generateHormoziCopy(form: {
  title: string;
  description: string;
  project_url: string;
  category: string;
  client_name: string;
  result_metric: string;
  tags: string[];
}): string {
  const title = form.title.trim() || "este proyecto";
  const category = form.category.trim().toLowerCase();
  const client = form.client_name.trim();
  const metric = form.result_metric.trim();
  const desc = form.description.trim();
  const tags = (form.tags || []).filter(Boolean);
  const techLine = tags.length ? tags.slice(0, 6).join(" · ") : "";

  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  // 1) HOOK — patrón Hormozi: contrarian / promesa / curiosidad
  const hooks = [
    `La mayoría intenta resolver ${category || "esto"} contratando más gente. Nosotros lo resolvimos con ${title} — y los números hablan solos.`,
    `${client ? `${client} estaba` : "El cliente estaba"} quemando dinero en procesos manuales. En semanas le entregamos ${title} y dejó de perder ventas mientras dormía.`,
    `Si crees que automatizar ${category || "tu negocio"} es caro, espera a calcular lo que te cuesta NO hacerlo. ${title} fue la prueba.`,
    `${title}: el sistema que convierte el caos operativo de ${category || "un negocio real"} en una máquina que produce resultados 24/7.`,
  ];

  // 2) PROBLEMA — dolor concreto
  const problems = [
    `Antes del proyecto, ${client || "el cliente"} vivía atrapado en tareas repetitivas, leads sin responder y reportes que nadie leía. Cada hora perdida era dinero que se iba a la competencia.`,
    `El reto era claro: demasiada operación manual, equipo saturado y procesos que no escalaban. Crecer significaba contratar más, no facturar más.`,
    `${category ? `En ${category}, ` : ""}los márgenes se evaporan cuando el equipo apaga incendios en vez de cerrar ventas. Ese era exactamente el cuello de botella.`,
  ];

  // 3) SOLUCIÓN + MECANISMO ÚNICO
  const solutionIntro = desc
    ? `Construimos ${title} con un enfoque distinto: ${desc}`
    : `Diseñamos ${title} como un sistema end-to-end pensado para eliminar fricción, no para sumar más herramientas.`;
  const mechanism = techLine
    ? `Bajo el capó combinamos ${techLine} para que cada pieza haga UNA cosa y la haga perfecta — automatización real, no parches.`
    : `Cada componente fue diseñado para hacer UNA cosa y hacerla perfecta — automatización real, no parches.`;

  // 4) RESULTADO — prueba dura
  const proof = metric
    ? `El resultado en números: ${metric}. Sin humo, sin "depende", sin meses de implementación interminable.`
    : `El resultado: menos horas humanas, más conversiones y un equipo que por fin puede enfocarse en lo que mueve la aguja.`;

  // 5) OFERTA / VALOR PARA EL LECTOR (cliente potencial mirando el portafolio)
  const offers = [
    `Si tu negocio se parece al de ${client || "este caso"}, podemos replicar el mismo sistema adaptado a tu operación — sin que tengas que entender una sola línea de código.`,
    `Si ${category || "tu sector"} te suena familiar, este mismo motor se puede adaptar a tu empresa en cuestión de semanas, no de trimestres.`,
    `Lo que hicimos aquí no es un experimento: es un playbook listo para replicarse en cualquier negocio con el mismo dolor.`,
  ];

  // 6) CTA suave
  const ctas = [
    `👉 Si quieres ver cómo se vería esto en TU negocio, agenda un diagnóstico gratuito${form.project_url ? ` o explora el caso en vivo: ${form.project_url}` : ""}.`,
    `👉 Hablemos. En 20 minutos te decimos si esto encaja en tu operación o no — sin rodeos.`,
    `👉 Reserva una llamada de diagnóstico. Si no vemos un ROI claro, te lo decimos de frente.`,
  ];

  const parts = [
    pick(hooks),
    "",
    pick(problems),
    "",
    solutionIntro,
    mechanism,
    "",
    proof,
    "",
    pick(offers),
    "",
    pick(ctas),
  ];

  return parts.join("\n").slice(0, 3000);
}

const AdminPortafolio = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading: authLoading } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState<"description" | "category" | null>(null);
  const [fetchingImage, setFetchingImage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten imágenes");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe pesar menos de 5MB");
      return;
    }
    setUploadingImage(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("portfolio-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("portfolio-images").getPublicUrl(fileName);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Imagen subida correctamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al subir imagen");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFetchImage = async () => {
    const url = form.project_url.trim();
    if (!url) {
      toast.error("Pega primero el link del proyecto");
      return;
    }
    try {
      new URL(url);
    } catch {
      toast.error("URL inválida");
      return;
    }
    setFetchingImage(true);
    try {
      // 1) Intentar Open Graph vía microlink (gratis, sin API key)
      const mlResp = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const mlData = await mlResp.json();
      const ogImage = mlData?.data?.image?.url || mlData?.data?.logo?.url;

      if (ogImage) {
        setForm((f) => ({ ...f, image_url: ogImage }));
        toast.success("Imagen obtenida del sitio (Open Graph)");
        return;
      }

      // 2) Fallback: screenshot vía thum.io
      const screenshot = `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}`;
      setForm((f) => ({ ...f, image_url: screenshot }));
      toast.success("No hay Open Graph, usando captura del sitio");
    } catch (e) {
      // Fallback final si microlink falla
      const screenshot = `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}`;
      setForm((f) => ({ ...f, image_url: screenshot }));
      toast.success("Usando captura del sitio");
    } finally {
      setFetchingImage(false);
    }
  };

  const handleEnhance = async (field: "description" | "category") => {
    if (!form.title.trim()) {
      toast.error("Escribe primero el título del proyecto");
      return;
    }
    setEnhancing(field);
    try {
      const { data, error } = await supabase.functions.invoke("enhance-project", {
        body: {
          field,
          title: form.title,
          project_url: form.project_url,
          current: field === "description" ? form.description : form.category,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.result) {
        setForm((f) => ({ ...f, [field]: data.result }));
        toast.success("Texto mejorado con IA");
      }
    } catch (e: any) {
      toast.error(e?.message || "Error al generar con IA");
    } finally {
      setEnhancing(null);
    }
  };

  useEffect(() => {
    if (!authLoading && !session) navigate("/auth", { replace: true });
  }, [authLoading, session, navigate]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error("Error cargando proyectos");
    else setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchProjects();
  }, [isAdmin]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm, display_order: projects.length });
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description || "",
      long_description: p.long_description || "",
      project_url: p.project_url,
      image_url: p.image_url,
      video_url: p.video_url || "",
      category: p.category || "",
      client_name: p.client_name || "",
      result_metric: p.result_metric || "",
      tags: p.tags || [],
      display_order: p.display_order,
      rank: p.rank,
    });
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = projectSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSaving(true);
    const payload = {
      title: parsed.data.title,
      description: parsed.data.description || null,
      long_description: parsed.data.long_description || null,
      project_url: parsed.data.project_url,
      image_url: parsed.data.image_url,
      video_url: parsed.data.video_url || null,
      category: parsed.data.category || null,
      client_name: parsed.data.client_name || null,
      result_metric: parsed.data.result_metric || null,
      tags: parsed.data.tags || [],
      display_order: parsed.data.display_order,
      rank: parsed.data.rank,
    };

    const { error } = editing
      ? await supabase.from("portfolio_projects").update(payload).eq("id", editing.id)
      : await supabase.from("portfolio_projects").insert(payload);

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing ? "Proyecto actualizado" : "Proyecto creado");
    setDialogOpen(false);
    fetchProjects();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", deleteId);
    if (error) toast.error(error.message);
    else {
      toast.success("Proyecto eliminado");
      fetchProjects();
    }
    setDeleteId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
          <div className="max-w-md text-center bg-card border border-border rounded-2xl p-10 shadow-elegant">
            <ShieldAlert className="w-12 h-12 text-action mx-auto mb-4" />
            <h1 className="font-display font-black text-2xl text-foreground mb-2">Acceso denegado</h1>
            <p className="text-muted-foreground mb-6">
              Tu cuenta no tiene permisos de administrador. Contacta al propietario del sitio.
            </p>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO title="Admin Portafolio | AI-MaX" description="Panel de administración" path="/admin/portafolio" ogImage="/og-image.png" />
      <Header />
      <main className="flex-1 pt-32 md:pt-36 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
          >
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-2">
                Panel Admin
              </span>
              <h1 className="font-display font-black text-3xl md:text-4xl text-foreground">Gestionar Portafolio</h1>
              <p className="text-muted-foreground mt-2 text-sm">{projects.length} proyecto(s) publicado(s)</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={openNew} className="bg-action hover:bg-action-glow text-action-foreground">
                <Plus className="w-4 h-4" /> Nuevo proyecto
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4" /> Salir
              </Button>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-card border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground mb-4">Aún no tienes proyectos.</p>
              <Button onClick={openNew} className="bg-action hover:bg-action-glow text-action-foreground">
                <Plus className="w-4 h-4" /> Crear el primero
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row gap-4 bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-elegant transition-shadow"
                >
                  <div className="w-full md:w-40 h-32 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      {p.category && (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                      )}
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        Orden {p.display_order}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground truncate">{p.title}</h3>
                    {p.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
                    )}
                    <a
                      href={p.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                    >
                      {p.project_url} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(p)}>
                      <Pencil className="w-4 h-4" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteId(p.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" /> Eliminar
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl w-[calc(100vw-1rem)] sm:w-full p-0 gap-0 max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 py-4 border-b border-border bg-card sticky top-0 z-10">
            <DialogTitle className="text-lg sm:text-xl">
              {editing ? "Editar proyecto" : "Nuevo proyecto"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs text-primary hover:text-primary"
                    onClick={() => handleEnhance("category")}
                    disabled={enhancing === "category"}
                  >
                    {enhancing === "category" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    IA
                  </Button>
                </div>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Voz IA, Automatización..."
                />
              </div>

              <div>
                <Label htmlFor="client_name">Cliente</Label>
                <Input
                  id="client_name"
                  value={form.client_name}
                  onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  placeholder="Nombre del cliente o marca"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="result_metric">Resultado destacado</Label>
                <Input
                  id="result_metric"
                  value={form.result_metric}
                  onChange={(e) => setForm({ ...form, result_metric: e.target.value })}
                  placeholder="Ej: +320% leads en 30 días"
                />
              </div>
            </div>

            <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border">
              <div>
                <Label htmlFor="project_url">Link del proyecto *</Label>
                <Input
                  id="project_url"
                  type="url"
                  value={form.project_url}
                  onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="video_url" className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" /> Video del proyecto (opcional)
                </Label>
                <Input
                  id="video_url"
                  type="url"
                  value={form.video_url}
                  onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                  placeholder="YouTube, Vimeo, Loom o MP4..."
                />
                {form.video_url && (
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Se mostrará como demo embebido en el portafolio.
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <Label htmlFor="image_url">Imagen de portada *</Label>
                <div className="flex flex-wrap gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadImage}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs text-primary hover:text-primary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                    Subir
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs text-primary hover:text-primary"
                    onClick={handleFetchImage}
                    disabled={fetchingImage || !form.project_url.trim()}
                  >
                    {fetchingImage ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImageDown className="w-3 h-3" />}
                    Del link
                  </Button>
                </div>
              </div>
              <Input
                id="image_url"
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://..."
                required
              />
              {form.image_url && (
                <div className="mt-2 aspect-[16/10] w-full rounded-lg overflow-hidden bg-muted border border-border">
                  <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="description">Descripción corta</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-primary hover:text-primary"
                  onClick={() => handleEnhance("description")}
                  disabled={enhancing === "description"}
                >
                  {enhancing === "description" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Mejorar con IA
                </Button>
              </div>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Resumen breve que aparece en la tarjeta del portafolio..."
              />
              <p className="text-[11px] text-muted-foreground mt-1 text-right">
                {form.description.length}/500
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="long_description">Explicación detallada</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-primary hover:text-primary"
                  onClick={() => {
                    const generated = generateHormoziCopy(form);
                    setForm((f) => ({ ...f, long_description: generated }));
                    toast.success("Copy generado al estilo Hormozi");
                  }}
                  disabled={!form.title.trim()}
                  title={!form.title.trim() ? "Añade primero un título" : "Generar copy persuasivo"}
                >
                  <Sparkles className="w-3 h-3" />
                  Redactar estilo Hormozi
                </Button>
              </div>
              <Textarea
                id="long_description"
                value={form.long_description}
                onChange={(e) => setForm({ ...form, long_description: e.target.value })}
                rows={8}
                placeholder="Cuenta el desafío, la solución, tecnologías usadas y resultados. Soporta saltos de línea."
              />
              <p className="text-[11px] text-muted-foreground mt-1 text-right">
                {form.long_description.length}/3000
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="tags-input">Etiquetas / Tecnologías</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-primary hover:text-primary"
                  onClick={() => {
                    const suggested = generateHormoziTags(form);
                    const merged = [...form.tags];
                    for (const t of suggested) {
                      if (merged.length >= 10) break;
                      if (!merged.some((m) => m.toLowerCase() === t.toLowerCase())) merged.push(t);
                    }
                    setForm({ ...form, tags: merged });
                    toast.success("Etiquetas generadas estilo Hormozi");
                  }}
                  disabled={!form.title.trim()}
                  title={!form.title.trim() ? "Añade primero un título" : "Generar etiquetas persuasivas"}
                >
                  <Sparkles className="w-3 h-3" />
                  Sugerir estilo Hormozi
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
                {form.tags.map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) })}
                      className="hover:text-destructive"
                      aria-label={`Quitar ${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                id="tags-input"
                placeholder="Escribe y pulsa Enter (ej: n8n, OpenAI, WhatsApp)"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim().replace(/,$/, "");
                    if (val && form.tags.length < 10 && !form.tags.includes(val)) {
                      setForm({ ...form, tags: [...form.tags, val] });
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="display_order">Orden de visualización</Label>
              <Input
                id="display_order"
                type="number"
                min={0}
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div>
              <Label htmlFor="rank">Ranking destacado (insignia dorada)</Label>
              <select
                id="rank"
                value={form.rank ?? ""}
                onChange={(e) => setForm({ ...form, rank: e.target.value ? parseInt(e.target.value) : null })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Sin ranking</option>
                <option value="1">🥇 1° Lugar (Oro)</option>
                <option value="2">🥈 2° Lugar (Plata)</option>
                <option value="3">🥉 3° Lugar (Bronce)</option>
              </select>
              <p className="text-[11px] text-muted-foreground mt-1">
                Solo un proyecto puede ocupar cada posición. Los rankings se muestran en las tarjetas del portafolio.
              </p>
            </div>

            <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0 pt-4 border-t border-border -mx-5 sm:-mx-6 px-5 sm:px-6 sticky bottom-0 bg-background">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
                Cancelar
              </Button>
              <Button type="submit" disabled={saving} className="w-full sm:w-auto bg-action hover:bg-action-glow text-action-foreground">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editing ? "Guardar cambios" : "Crear proyecto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este proyecto?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPortafolio;
