import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, CheckCircle2, FileText } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";

const schema = z.object({
  email: z.string().trim().email("Correo no válido").max(255),
  phone: z.string().trim().min(7, "WhatsApp no válido").max(30).optional().or(z.literal("")),
});

const LeadMagnetCard = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const leadData = {
      name: "Lead magnet",
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      pain_point: "Auditoría IA gratuita",
      source: "lead_magnet_hero",
    };
    const { error } = await supabase.from("leads").insert([leadData]);
    setLoading(false);
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta nuevamente.");
      return;
    }
    supabase.functions.invoke("notify-lead", { body: leadData }).catch(() => {});
    trackEvent("lead_magnet_submit", { source: "hero" });
    setDone(true);
    toast.success("¡Listo! Te enviaremos la auditoría en breve.");
  };

  return (
    <motion.aside
      id="lead-magnet"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      aria-label="Descarga gratuita: Auditoría de Automatización IA"
      className="glass rounded-2xl p-6 md:p-7 text-left shadow-glow border border-white/15 max-w-md w-full mx-auto lg:mx-0"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-action shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] font-bold tracking-[0.18em] text-action uppercase">
            Gratis · PDF
          </span>
          <h3 className="font-display font-bold text-white text-base leading-tight">
            Auditoría de Automatización IA
          </h3>
        </div>
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-5">
        Detecta los <span className="text-white font-semibold">3 procesos clave</span> que puedes automatizar en tu negocio esta semana.
      </p>

      {done ? (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-action/10 border border-action/30">
          <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold">¡Solicitud recibida!</p>
            <p className="text-white/70 text-xs mt-0.5">
              Recibirás la auditoría en menos de 24h.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            aria-label="Correo electrónico"
            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="WhatsApp (opcional)"
            aria-label="WhatsApp"
            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold py-3 rounded-xl shadow-action transition-all hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Recibir auditoría gratis
              </>
            )}
          </button>
          <p className="text-[11px] text-white/50 text-center">
            Sin spam. Te contactamos solo si lo solicitas.
          </p>
        </form>
      )}
    </motion.aside>
  );
};

export default LeadMagnetCard;
