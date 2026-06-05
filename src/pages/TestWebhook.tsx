import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, CheckCircle2, XCircle, AlertTriangle, Activity } from "lucide-react";
import { toast } from "sonner";

interface TestResult {
  ok: boolean;
  status?: number;
  statusText?: string;
  responseBody?: string;
  error?: string;
  timestamp: string;
  durationMs: number;
  leadData: Record<string, unknown>;
}

const TestWebhook = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const sendTestLead = async () => {
    setLoading(true);
    const start = performance.now();

    const leadData = {
      name: "Prueba Webhook",
      email: "test@example.com",
      phone: "+56 9 1234 5678",
      company: "Empresa Test SpA",
      pain_point: "Automatización de ventas",
      source: "test_webhook_page",
    };

    let edgeResult: TestResult;
    try {
      const { data, error } = await supabase.functions.invoke("notify-lead", {
        body: leadData,
      });
      const duration = Math.round(performance.now() - start);

      if (error) {
        edgeResult = {
          ok: false,
          error: error.message || String(error),
          timestamp: new Date().toLocaleTimeString(),
          durationMs: duration,
          leadData,
        };
      } else {
        edgeResult = {
          ok: true,
          status: data?.status ?? 200,
          statusText: data?.ok ? "Webhook recibido por n8n" : "Falló el envío a n8n",
          responseBody: JSON.stringify(data),
          timestamp: new Date().toLocaleTimeString(),
          durationMs: duration,
          leadData,
        };
      }
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      edgeResult = {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toLocaleTimeString(),
        durationMs: duration,
        leadData,
      };
    }

    setResults((prev) => [edgeResult, ...prev].slice(0, 10));
    setLoading(false);

    if (edgeResult.ok) {
      toast.success(`Prueba OK — ${edgeResult.statusText}`);
    } else {
      toast.error(`Prueba fallida — ${edgeResult.error || edgeResult.statusText}`);
    }
  };

  const sendDbInsertTest = async () => {
    setLoading(true);
    const start = performance.now();

    const leadData = {
      name: "Prueba DB + Webhook",
      email: "test-db@example.com",
      phone: "+56 9 9999 8888",
      company: "Empresa DB Test",
      pain_point: "Prueba de integración completa",
      source: "test_webhook_page_db",
    };

    let result: TestResult;
    try {
      const { error: dbError } = await supabase.from("leads").insert([leadData]);
      if (dbError) throw dbError;

      const { data: edgeData, error: edgeError } = await supabase.functions.invoke("notify-lead", {
        body: leadData,
      });
      const duration = Math.round(performance.now() - start);

      if (edgeError) {
        result = {
          ok: false,
          error: `DB OK, Edge Error: ${edgeError.message}`,
          timestamp: new Date().toLocaleTimeString(),
          durationMs: duration,
          leadData,
        };
      } else {
        result = {
          ok: true,
          status: edgeData?.status ?? 200,
          statusText: edgeData?.ok ? "DB + Webhook OK" : "DB OK, Webhook falló",
          responseBody: JSON.stringify(edgeData),
          timestamp: new Date().toLocaleTimeString(),
          durationMs: duration,
          leadData,
        };
      }
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      result = {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toLocaleTimeString(),
        durationMs: duration,
        leadData,
      };
    }

    setResults((prev) => [result, ...prev].slice(0, 10));
    setLoading(false);

    if (result.ok) {
      toast.success("Prueba completa OK — DB + Webhook");
    } else {
      toast.error(`Prueba fallida — ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="font-display font-black text-3xl md:text-4xl">
              🧪 Prueba de Webhook n8n
            </h1>
            <p className="text-muted-foreground text-lg">
              Envía leads de prueba y verifica que la edge function <code>notify-lead</code> los reenvíe correctamente al webhook de n8n.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={sendTestLead}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl shadow transition hover:scale-[1.01] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Solo Edge Function
            </button>

            <button
              onClick={sendDbInsertTest}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-action hover:bg-action/90 text-action-foreground font-semibold py-4 px-6 rounded-xl shadow transition hover:scale-[1.01] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Activity className="w-5 h-5" />
              )}
              DB + Edge Function
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Resultados ({results.length})
            </h2>

            {results.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aún no hay pruebas. Presiona un botón para comenzar.
              </p>
            ) : (
              <div className="space-y-4">
                {results.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-xl border p-4 ${
                      r.ok
                        ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30"
                        : "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {r.ok ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold text-sm">
                            {r.ok ? (r.statusText || "Éxito") : (r.error || "Error")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {r.timestamp} · {r.durationMs}ms
                            {r.status ? ` · HTTP ${r.status}` : ""}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          r.ok
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {r.ok ? "200 OK" : "FALLÓ"}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <details className="text-xs">
                        <summary className="cursor-pointer font-medium text-foreground/80 hover:text-foreground">
                          Ver payload enviado
                        </summary>
                        <pre className="mt-2 p-3 rounded-lg bg-black/5 dark:bg-white/5 overflow-x-auto font-mono text-[11px]">
                          {JSON.stringify(r.leadData, null, 2)}
                        </pre>
                      </details>
                      {r.responseBody && (
                        <details className="text-xs">
                          <summary className="cursor-pointer font-medium text-foreground/80 hover:text-foreground">
                            Ver respuesta de edge function
                          </summary>
                          <pre className="mt-2 p-3 rounded-lg bg-black/5 dark:bg-white/5 overflow-x-auto font-mono text-[11px]">
                            {r.responseBody}
                          </pre>
                        </details>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/30 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-semibold mb-1">Nota importante</p>
              <p>
                Esta página es solo para pruebas internas. Los leads de prueba se envían con datos ficticios. En producción, el webhook recibe leads reales desde los formularios del sitio.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestWebhook;
