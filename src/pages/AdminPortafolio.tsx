import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, Loader2, ExternalLink, ShieldAlert, Sparkles, ImageDown, Upload } from "lucide-react";
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
  project_url: string;
  image_url: string;
  category: string | null;
  display_order: number;
}

const projectSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(120),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  project_url: z.string().trim().url("URL inválida").max(500),
  image_url: z.string().trim().url("URL de imagen inválida").max(500),
  category: z.string().trim().max(60).optional().or(z.literal("")),
  display_order: z.number().int().min(0).max(9999),
});

const emptyForm = { title: "", description: "", project_url: "", image_url: "", category: "", display_order: 0 };

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
      project_url: p.project_url,
      image_url: p.image_url,
      category: p.category || "",
      display_order: p.display_order,
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
      project_url: parsed.data.project_url,
      image_url: parsed.data.image_url,
      category: parsed.data.category || null,
      display_order: parsed.data.display_order,
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar proyecto" : "Nuevo proyecto"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="category">Categoría</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-primary hover:text-primary"
                  onClick={() => handleEnhance("category")}
                  disabled={enhancing === "category"}
                >
                  {enhancing === "category" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  Sugerir con IA
                </Button>
              </div>
              <Input
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Ej: Voz IA, Automatización..."
              />
            </div>
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
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="image_url">URL de imagen *</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-primary hover:text-primary"
                  onClick={handleFetchImage}
                  disabled={fetchingImage || !form.project_url.trim()}
                  title="Obtiene la imagen de previsualización (Open Graph) del link del proyecto. Si no existe, usa una captura del sitio."
                >
                  {fetchingImage ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <ImageDown className="w-3 h-3" />
                  )}
                  Obtener del link
                </Button>
              </div>
              <Input
                id="image_url"
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://... o usa 'Obtener del link'"
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
                <Label htmlFor="description">Descripción</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-primary hover:text-primary"
                  onClick={() => handleEnhance("description")}
                  disabled={enhancing === "description"}
                >
                  {enhancing === "description" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  Mejorar con IA
                </Button>
              </div>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Describe el valor y beneficios del proyecto..."
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving} className="bg-action hover:bg-action-glow text-action-foreground">
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
