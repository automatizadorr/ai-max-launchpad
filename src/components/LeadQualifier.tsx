import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2,
  CheckCircle2,
  Building2,
  Users,
  AlertCircle,
  Clock,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";

type Step = 0 | 1 | 2 | 3 | 4;

interface Answers {
  industry: string;
  company_size: string;
  pain_point: string;
  urgency: string;
}

const QUESTIONS = [
  {
    key: "industry" as const,
    icon: Building2,
    label: "¿En qué industria operas?",
    options: ["Inmobiliaria", "Salud", "E-commerce", "Otro"],
  },
  {
    key: "company_size" as const,
    icon: Users,
    label: "¿Cuántos empleados tienen?",
    options: ["1-10", "11-50", "50+"],
  },
  {
    key: "pain_point" as const,
    icon: AlertCircle,
    label: "¿Cuál es tu principal dolor hoy?",
    options: ["Leads sin atender", "Procesos manuales", "Soporte saturado", "Otro"],
  },
  {
    key: "urgency" as const,
    icon: Clock,
    label: "¿Cuándo necesitas resolverlo?",
    options: ["Esta semana", "Este mes", "Explorando"],
  },
];

const recommendation = (a: Answers): string => {
  if (a.pain_point === "Leads sin atender") return "Agente de Voz IA + WhatsApp 24/7";
  if (a.pain_point === "Procesos manuales") return "Automatización n8n + Integraciones";
  if (a.pain_point === "Soporte saturado") return "Chatbot RAG con tu base de conocimiento";
  return "Diagnóstico personalizado de IA";
};

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(100),
  email: z.string().trim().email("Correo no válido").max(255),
  phone: z.string().trim().min(7, "WhatsApp no válido").max(30),
});

const LeadQualifier = () => {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>({
    industry: "",
    company_size: "",
    pain_point: "",
    urgency: "",
  });
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const progress = useMemo(() => Math.min(100, (step / (total + 1)) * 100), [step, total]);
  const solution = useMemo(() => recommendation(answers), [answers]);

  useEffect(() => {
    if (step === 1) trackEvent("qualifier_started");
    if (step > 0 && step <= total) trackEvent("qualifier_step", { step });
  }, [step, total]);

  const select = (value: string) => {
    const q = QUESTIONS[step - 1];
    setAnswers((a) => ({ ...a, [q.key]: value }));
    setTimeout(() => setStep((s) => Math.min(total + 1, s + 1) as Step), 200);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert([
      {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company: null,
        pain_point: answers.pain_point || "Calificador",
        industry: answers.industry || null,
        company_size: answers.company_size || null,
        urgency: answers.urgency || null,
        source: "qualifier",
      },
    ]);
    setLoading(false);
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta nuevamente.");
      return;
    }
    trackEvent("qualifier_completed", { ...answers, solution });
    setDone(true);
    toast.success("¡Listo! Te contactamos en menos de 48h.");
  };

  return (
    <section
      id="qualifier"
      className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-secondary border-y border-border overflow-hidden"
      aria-label="Calificador de proyecto IA"
    >
      <div className="absolute inset-0 blueprint-grid-soft opacity-50 pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="mono-label inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-action uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Diagnóstico en 30 segundos
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight">
              Descubre qué solución IA es ideal para ti
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg">
              Responde 4 preguntas rápidas y te enviamos una propuesta personalizada gratuita.
            </p>
          </div>

          <div className="clip-terminal rounded-2xl bg-card border border-border shadow-elegant p-6 md:p-10 relative overflow-hidden">
            {/* Progress */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-muted">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-primary-glow to-action"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {/* Marca corner técnica */}
            <div className="absolute top-3 right-4 mono-label text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase pointer-events-none">
              #[qualifier]
            </div>

            <AnimatePresence mode="wait">
              {/* Step 0: intro */}
              {step === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center shadow-action mb-5">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3">
                    Hagámoslo simple.
                  </h3>
                  <p className="text-muted-foreground mb-7 max-w-md mx-auto">
                    4 preguntas. 30 segundos. Sin compromiso. Recibe tu plan de automatización a medida.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold px-7 py-4 rounded-xl shadow-action transition-all hover:scale-[1.02]"
                  >
                    Empezar diagnóstico
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Question steps */}
              {step >= 1 && step <= total && (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="py-4"
                >
                  {(() => {
                    const q = QUESTIONS[step - 1];
                    const Icon = q.icon;
                    const current = answers[q.key];
                    return (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Paso {step} de {total}
                          </span>
                          {step > 1 && (
                            <button
                              type="button"
                              onClick={() => setStep((s) => (s - 1) as Step)}
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              Atrás
                            </button>
                          )}
                        </div>
                        <div className="flex items-start gap-3 mb-6">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="font-display font-bold text-xl md:text-2xl text-foreground leading-tight">
                            {q.label}
                          </h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {q.options.map((opt) => {
                            const active = current === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => select(opt)}
                                className={`text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${
                                  active
                                    ? "border-primary bg-primary/10 text-primary shadow-elegant"
                                    : "border-border bg-background hover:border-primary/40 hover:bg-primary/5 text-foreground"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}

              {/* Final step: contact */}
              {step === total + 1 && !done && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="py-2"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-action/10 to-primary/5 border border-primary/20 p-5 mb-6">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-action shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-action mb-1">
                          Tu solución ideal
                        </p>
                        <p className="font-display font-bold text-lg text-foreground leading-tight">
                          {solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    Recibe tu propuesta personalizada
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Te contactamos en menos de 48h con un plan a medida (sin costo).
                  </p>

                  <form onSubmit={submit} className="space-y-3">
                    <input
                      type="text"
                      required
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="Correo"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                      <input
                        type="tel"
                        required
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        placeholder="WhatsApp"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold py-4 rounded-xl shadow-action transition-all hover:scale-[1.01] disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          Recibir propuesta gratis
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {done && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-action/15 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9 text-action" />
                  </div>
                  <h3 className="font-display font-black text-2xl md:text-3xl text-foreground mb-2">
                    ¡Diagnóstico recibido!
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Te contactamos en menos de 48h con tu plan personalizado para{" "}
                    <span className="font-semibold text-foreground">{solution}</span>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            🔒 Tus datos están protegidos. Solo los usamos para contactarte.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LeadQualifier;
