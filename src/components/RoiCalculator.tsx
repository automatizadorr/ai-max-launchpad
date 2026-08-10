import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Calculator,
  TrendingDown,
  FileDown,
  Building2,
  ShoppingCart,
  Stethoscope,
  Briefcase,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/tracking";
import {
  calculateRoi,
  formatCLP,
  formatHours,
  BENCHMARK_SOURCES,
  FACTOR_AHORRO,
  DEFAULT_HOURLY_CLP,
  type Industry,
  type CompanySize,
} from "@/lib/roi";

const INDUSTRIES: { key: Industry; icon: typeof Building2; label: string }[] = [
  { key: "Inmobiliaria", icon: Building2, label: "Inmobiliaria" },
  { key: "Salud", icon: Stethoscope, label: "Salud" },
  { key: "E-commerce", icon: ShoppingCart, label: "E-commerce" },
  { key: "Otro", icon: Briefcase, label: "Otro" },
];

const SIZES: CompanySize[] = ["1-10", "11-50", "50+"];

const DONE_KEY = "roi_calc_done_v1";

const contactSchema = z.object({
  email: z.string().trim().email("Correo no válido").max(255),
  phone: z.string().trim().min(7, "WhatsApp no válido").max(30),
});

const RoiCalculator = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState<Industry>("E-commerce");
  const [companySize, setCompanySize] = useState<CompanySize>("11-50");
  const [manualHours, setManualHours] = useState(20);
  const [hourlyCost, setHourlyCost] = useState(DEFAULT_HOURLY_CLP);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const result = useMemo(
    () => calculateRoi({ industry, companySize, manualHoursPerWeek: manualHours, hourlyCostCLP: hourlyCost }),
    [industry, companySize, manualHours, hourlyCost]
  );

  const source = BENCHMARK_SOURCES[industry];
  const factor = FACTOR_AHORRO[industry];

  const onFieldChange = (field: string, value: number | string) => {
    if (!interacted) {
      setInteracted(true);
      trackEvent("roi_calculator_interaction", { field });
    }
    void value;
  };

  const generateReportHtml = (): string => {
    const now = new Date().toLocaleString("es-CL");
    return `<!doctype html><html lang="es"><head><meta charset="utf-8"/>
<title>Reporte ROI · AI-MaX</title>
<style>
  body{font-family:Inter,system-ui,sans-serif;background:#0A1128;color:#fff;margin:0;padding:48px;line-height:1.55}
  .wrap{max-width:720px;margin:0 auto}
  h1{font-size:32px;margin:0 0 8px;font-weight:800}
  .meta{color:#9BA8C7;font-size:12px;margin-bottom:32px}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0 32px}
  .card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px}
  .card .v{font-size:24px;font-weight:800;color:#E11B22}
  .card .l{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#9BA8C7;margin-top:4px}
  .row{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08)}
  .row span:last-child{font-weight:700}
  .quote{font-style:italic;color:#9BA8C7;border-left:3px solid #E11B22;padding-left:14px;margin:24px 0}
  .disc{font-size:11px;color:#6B7898;margin-top:40px}
  a{color:#E11B22}
</style></head>
<body><div class="wrap">
  <h1>Reporte de ROI estimado</h1>
  <div class="meta">Generado ${now} · AI-MaX · Estimación basada en testimonials de clientes reales</div>

  <h3>Tus inputs</h3>
  <div class="row"><span>Industria</span><span>${industry}</span></div>
  <div class="row"><span>Tamaño de empresa</span><span>${companySize}</span></div>
  <div class="row"><span>Horas manuales/semana</span><span>${manualHours}h</span></div>
  <div class="row"><span>Costo hora (CLP)</span><span>${formatCLP(hourlyCost)}</span></div>

  <h3 style="margin-top:28px">Estimación de ahorro</h3>
  <div class="grid">
    <div class="card"><div class="v">${formatHours(result.horasRecuperadasSemana)}</div><div class="l">Recuperadas / semana</div></div>
    <div class="card"><div class="v">${formatCLP(result.ahorroMensualCLP)}</div><div class="l">Ahorro / mes</div></div>
    <div class="card"><div class="v">${formatCLP(result.ahorroAnualCLP)}</div><div class="l">Ahorro / año</div></div>
  </div>

  <h3>Benchmark utilizado</h3>
  <p>Factor de ahorro aplicado: <strong>${(factor * 100).toFixed(0)}%</strong> de las horas manuales recuperables.</p>
  <div class="quote">${source.quote}</div>

  <h3>Siguiente paso</h3>
  <p>Agenda una sesión estratégica gratuita de 30 minutos y validemos estos números contra tus procesos reales.</p>
  <p><a href="https://ai-max-five.vercel.app/#contacto">Agendar ahora →</a></p>

  <div class="disc">
    Estimación basada en métricas declaradas por 6 clientes AI-MaX (PortfolioTestimonials.tsx).
    No constituye una oferta comercial ni garantía de resultados. El ahorro real depende del
    alcance, adopción y procesos específicos de cada cliente.
  </div>
</div></body></html>`;
  };

  const downloadReport = () => {
    const html = generateReportHtml();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte-roi-aimax-${industry.toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackEvent("roi_calculator_complete");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ email, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const leadData = {
      name: "ROI Calculator lead",
      email: parsed.data.email,
      phone: parsed.data.phone,
      pain_point: "Reporte ROI",
      industry,
      company_size: companySize,
      source: "roi_calculator",
    };
    const { error } = await supabase.from("leads").insert([leadData]);
    setLoading(false);
    if (error) {
      toast.error("No pudimos registrar tu solicitud. Intenta nuevamente.");
      return;
    }
    supabase.functions.invoke("notify-lead", { body: leadData }).catch(() => {});
    trackEvent("roi_calculator_submit", { industry, company_size, manualHours, hourlyCost });
    sessionStorage.setItem(DONE_KEY, "1");
    setDone(true);
    toast.success("¡Listo! Descarga tu reporte abajo.");
  };

  return (
    <motion.aside
      id="lead-magnet"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      aria-label="Calculadora de ROI: cuánto pierdes por procesos manuales"
      className="clip-terminal glass rounded-2xl p-5 md:p-6 text-left shadow-glow border border-white/15 max-w-md w-full mx-auto lg:mx-0 relative"
    >
      {/* Terminal bar */}
      <div className="flex items-center gap-1.5 mb-4 opacity-60">
        <span className="w-2 h-2 rounded-full bg-action/80" />
        <span className="w-2 h-2 rounded-full bg-primary-glow/70" />
        <span className="w-2 h-2 rounded-full bg-white/30" />
        <span className="mono-label ml-2 text-[9px] text-white/60 tracking-wider">roi.sh</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-action shrink-0">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <span className="mono-label block text-[11px] font-bold tracking-[0.18em] text-action uppercase">
            En vivo · Gratis
          </span>
          <h3 className="font-display font-bold text-white text-base leading-tight">
            Calcula cuánto pierdes por tareas manuales
          </h3>
        </div>
      </div>

      {done ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-action/10 border border-action/30">
            <CheckCircle2 className="w-5 h-5 text-action shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-semibold">¡Solicitud recibida!</p>
              <p className="text-white/70 text-xs mt-0.5">
                Descarga tu reporte personalizado ahora y agenda la sesión de validación.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={downloadReport}
            className="w-full inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold py-3 rounded-xl shadow-action transition-all hover:scale-[1.01]"
          >
            <FileDown className="w-4 h-4" />
            Descargar reporte
          </button>
          <button
            type="button"
            onClick={() => {
              trackEvent("inline_cta_click", { location: "roi_post_submit" });
              navigate("/gracias");
            }}
            className="w-full inline-flex items-center justify-center gap-2 glass border border-white/20 hover:border-white/40 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Agendar sesión de validación
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {/* Industry selector */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-white/70 mb-2">
              Tu industria
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {INDUSTRIES.map(({ key, icon: Icon, label }) => {
                const active = industry === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setIndustry(key);
                      onFieldChange("industry", key);
                    }}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border transition ${
                      active
                        ? "border-action bg-action/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-medium leading-none">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Company size */}
          <div>
            <label className="block text-[11px] font-semibold tracking-wider uppercase text-white/70 mb-2">
              <Users className="w-3 h-3 inline mr-1 align-text-bottom" />
              Tamaño de equipo
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {SIZES.map((s) => {
                const active = companySize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setCompanySize(s);
                      onFieldChange("company_size", s);
                    }}
                    className={`py-2.5 rounded-lg border text-xs font-semibold transition ${
                      active
                        ? "border-action bg-action/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                    aria-pressed={active}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manual hours slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-white/70">
                <Clock className="w-3 h-3 inline mr-1 align-text-bottom" />
                Horas manuales / semana
              </label>
              <span className="font-display font-bold text-white text-sm tabular-nums">
                {manualHours}h
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={80}
              step={5}
              value={manualHours}
              onChange={(e) => {
                setManualHours(Number(e.target.value));
                onFieldChange("manualHours", Number(e.target.value));
              }}
              className="w-full accent-action cursor-pointer"
              aria-label="Horas manuales por semana"
            />
          </div>

          {/* Result */}
          <div className="rounded-xl bg-action/10 border border-action/25 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-action" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-action">
                Estimación en vivo
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="font-display font-black text-white text-base md:text-lg leading-tight tabular-nums">
                  {formatHours(result.horasRecuperadasSemana)}
                </p>
                <p className="text-[10px] text-white/60 uppercase tracking-wider">/semana</p>
              </div>
              <div>
                <p className="font-display font-black text-action text-base md:text-lg leading-tight tabular-nums">
                  {formatCLP(result.ahorroMensualCLP)}
                </p>
                <p className="text-[10px] text-white/60 uppercase tracking-wider">/mes</p>
              </div>
              <div>
                <p className="font-display font-black text-action text-base md:text-lg leading-tight tabular-nums">
                  {formatCLP(result.ahorroAnualCLP)}
                </p>
                <p className="text-[10px] text-white/60 uppercase tracking-wider">/año</p>
              </div>
            </div>
            <p className="text-[10px] text-white/50 mt-2 leading-snug">
              Basado en testimonio de <span className="text-white/70 font-medium">{source.client}</span>.
              Factor aplicado: {(factor * 100).toFixed(0)}%.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              aria-label="Correo electrónico"
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition"
            />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp"
              aria-label="WhatsApp"
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-action hover:bg-action-glow text-action-foreground font-semibold py-3 rounded-xl shadow-action transition-all hover:scale-[1.01] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generando…
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  Recibir reporte gratis
                </>
              )}
            </button>
          </form>

          {/* Mini social proof */}
          <a
            href="#testimonios"
            className="block text-center text-[11px] text-white/60 hover:text-white/85 transition pt-1"
          >
            Usado por equipos en{" "}
            <span className="text-white/80 font-medium">
              Inmobiliaria Andes · RetailHub LATAM · ClinicaSmart
            </span>
          </a>
        </div>
      )}
    </motion.aside>
  );
};

export default RoiCalculator;
