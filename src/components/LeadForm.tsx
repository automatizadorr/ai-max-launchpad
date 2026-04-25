import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, ShieldCheck, Users } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre completo").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().min(7, "Ingresa un teléfono válido").max(30),
  email: z.string().trim().email("Correo no válido").max(255),
  pain_point: z.string().min(1, "Selecciona una opción"),
});

const LeadForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    pain_point: "",
  });
  const [customPain, setCustomPain] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  

  // Listen for prefill events (e.g. from use-case modal CTA)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ pain_point: string }>).detail;
      if (!detail?.pain_point) return;
      setCustomPain(detail.pain_point);
      setForm((f) => ({ ...f, pain_point: detail.pain_point }));
      // smooth scroll & focus first empty field
      requestAnimationFrame(() => {
        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          const nameEl = document.getElementById("name") as HTMLInputElement | null;
          nameEl?.focus({ preventScroll: true });
        }, 600);
      });
    };
    window.addEventListener("leadform:prefill", handler as EventListener);
    return () => window.removeEventListener("leadform:prefill", handler as EventListener);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert([
      {
        name: parsed.data.name,
        company: parsed.data.company || null,
        phone: parsed.data.phone,
        email: parsed.data.email,
        pain_point: parsed.data.pain_point,
        source: "lead_form_main",
      },
    ]);
    setLoading(false);
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta nuevamente.");
      return;
    }
    trackEvent("lead_form_submit", { pain_point: parsed.data.pain_point });
    toast.success("¡Solicitud recibida! Te contactaremos en menos de 24h.");
    setForm({ name: "", company: "", phone: "", email: "", pain_point: "" });
    setCustomPain(null);
    setTimeout(() => navigate("/gracias"), 600);
  };

  const inputCls =
    "w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 rounded-xl px-4 py-3.5 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition-all";

  return (
    <section id="contacto" className="py-24 md:py-32 bg-gradient-hero relative overflow-hidden" aria-labelledby="form-heading">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary-glow/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-action/20 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
              Hablemos
            </span>
            <h2 id="form-heading" className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-6">
              ¿Listo para automatizar su empresa?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Déjenos sus datos y nuestro sistema agendará una sesión estratégica
              personalizada para identificar oportunidades de automatización en su negocio.
            </p>
            <ul className="space-y-3 text-white/80">
              {[
                "Diagnóstico gratuito de procesos",
                "Propuesta a medida en 48 horas",
                "Implementación con resultados medibles",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-action" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-7 inline-flex items-center gap-2 glass border border-white/15 rounded-full px-4 py-2 text-xs text-white/80">
              <Users className="w-3.5 h-3.5 text-action" />
              <span><span className="font-bold text-white">8 empresas</span> solicitaron diagnóstico esta semana</span>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass rounded-3xl p-6 md:p-8 space-y-4 shadow-glow"
            aria-label="Formulario de solicitud de presupuesto"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setExpanded(true)}
                  placeholder="contacto@empresa.cl"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                  WhatsApp
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onFocus={() => setExpanded(true)}
                  placeholder="+56 9 1234 5678"
                  className={inputCls}
                />
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: expanded || customPain ? "auto" : 0,
                opacity: expanded || customPain ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden space-y-4"
              aria-hidden={!(expanded || customPain)}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Juan Pérez"
                  className={inputCls}
                  tabIndex={expanded || customPain ? 0 : -1}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                  Empresa
                </label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Mi Empresa SpA"
                  className={inputCls}
                  tabIndex={expanded || customPain ? 0 : -1}
                />
              </div>
              <div>
                <label htmlFor="pain_point" className="block text-sm font-medium text-white/80 mb-2">
                  ¿Qué desea automatizar?
                </label>
                <select
                  id="pain_point"
                  required
                  value={form.pain_point}
                  onChange={(e) => setForm({ ...form, pain_point: e.target.value })}
                  className={`${inputCls} appearance-none cursor-pointer`}
                  tabIndex={expanded || customPain ? 0 : -1}
                >
                  <option value="" disabled className="text-foreground">Selecciona una opción</option>
                  {customPain && !["Ventas", "Operaciones", "Atención al Cliente"].includes(customPain) && (
                    <option value={customPain} className="text-foreground">{customPain}</option>
                  )}
                  <option value="Ventas" className="text-foreground">Ventas</option>
                  <option value="Operaciones" className="text-foreground">Operaciones</option>
                  <option value="Atención al Cliente" className="text-foreground">Atención al Cliente</option>
                </select>
              </div>
            </motion.div>

            <button
              type="submit"
              disabled={loading}
              aria-label="Enviar solicitud de presupuesto"
              className="w-full inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold py-4 rounded-xl shadow-action transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  Enviando…
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" aria-hidden="true" />
                  Solicitar Presupuesto
                </>
              )}
            </button>
            <p className="text-xs text-white/50 text-center pt-2">
              Tus datos están protegidos. Solo los usamos para contactarte.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
