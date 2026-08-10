import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Sparkles, MessageCircle, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";

const SESSION_KEY = "exit_intent_shown_v1";
const MOBILE_ARM_MS = 12000; // móvil solo se arma tras 12s en página

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
    let mobileArmed = false;
    let lastScrollY = window.scrollY || 0;

    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 8000); // arm after 8s on page (desktop)

    const mobileArmTimer = window.setTimeout(() => {
      mobileArmed = true;
    }, MOBILE_ARM_MS); // mobile necesita más tiempo en página antes de considerar "exit"

    const openOnce = (trigger: string) => {
      if (!armed || sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      trackEvent("exit_intent_shown", { trigger });
    };

    const isCoarsePointer = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    const onMouseLeave = (e: MouseEvent) => {
      if (isCoarsePointer()) return; // solo desktop
      if (e.clientY > 0) return; // only top edge exit
      openOnce("mouseleave");
    };

    const onVisibility = () => {
      if (document.visibilityState !== "hidden") return;
      openOnce("visibility");
    };

    // Móvil: scroll-up velocity pasando el 60% de profundidad de página
    const onScroll = () => {
      if (!mobileArmed) return;
      const y = window.scrollY || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? y / docHeight : 1;
      const scrollingUp = y < lastScrollY;
      lastScrollY = y;
      if (scrollingUp && depth >= 0.6) openOnce("mobile_scroll_up");
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(armTimer);
      window.clearTimeout(mobileArmTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
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
    const leadData = {
      name: "Exit intent lead",
      email: parsed.data.email,
      phone: parsed.data.phone,
      pain_point: "Reporte ROI",
      source: "exit_intent",
    };
    const { error } = await supabase.from("leads").insert([leadData]);
    setLoading(false);
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta nuevamente.");
      return;
    }
    supabase.functions.invoke("notify-lead", { body: leadData }).catch(() => {});
    setDone(true);
    toast.success("¡Te enviamos el reporte de ROI por WhatsApp!");
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
            ¿Te enviamos por WhatsApp el{" "}
            <span className="text-white font-semibold">reporte de ROI estimado de tu industria</span>{" "}
            — sin costo y en el instante?
          </DialogDescription>
        </div>

        <div className="p-6 bg-card">
          {done ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-action mx-auto mb-3" />
              <p className="font-display font-bold text-lg text-foreground">¡Listo!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Te llegan en menos de 48h por WhatsApp.
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
                className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Tu WhatsApp"
                className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
                    Quiero mi reporte
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
