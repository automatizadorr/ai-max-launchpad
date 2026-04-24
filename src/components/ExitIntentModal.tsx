import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Sparkles, MessageCircle, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";

const SESSION_KEY = "exit_intent_shown_v1";

const schema = z.object({
  email: z.string().trim().email("Correo no válido").max(255),
  phone: z.string().trim().min(7, "WhatsApp no válido").max(30),
});

const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 8000); // arm after 8s on page

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY > 0) return; // only top edge exit
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      trackEvent("exit_intent_shown");
    };

    const onVisibility = () => {
      if (!armed) return;
      if (document.visibilityState !== "hidden") return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      trackEvent("exit_intent_shown", { trigger: "visibility" });
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert([
      {
        name: "Exit intent lead",
        email: parsed.data.email,
        phone: parsed.data.phone,
        pain_point: "3 ideas de automatización",
        source: "exit_intent",
      },
    ]);
    setLoading(false);
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta nuevamente.");
      return;
    }
    setDone(true);
    toast.success("¡Te enviaremos las 3 ideas por WhatsApp en breve!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0 border-0">
        <div className="bg-gradient-hero p-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-action mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <DialogTitle className="font-display font-black text-2xl text-white leading-tight">
            Antes de irte…
          </DialogTitle>
          <DialogDescription className="text-white/75 mt-2 text-sm">
            ¿Te enviamos por WhatsApp <span className="text-white font-semibold">3 ideas de automatización</span> para tu negocio? Gratis, sin compromiso.
          </DialogDescription>
        </div>

        <div className="p-6 bg-card">
          {done ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-action mx-auto mb-3" />
              <p className="font-display font-bold text-lg text-foreground">¡Listo!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Te llegan en menos de 24h por WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Tu WhatsApp"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold py-3.5 rounded-xl shadow-action transition disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Quiero las 3 ideas
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition py-1"
              >
                No, gracias
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
