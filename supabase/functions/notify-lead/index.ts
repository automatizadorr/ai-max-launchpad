// Reenvía un lead al webhook de n8n. La URL se lee desde el secret N8N_WEBHOOK_URL
// para poder cambiarla en dev y producción sin tocar el código.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const webhookUrl = Deno.env.get("N8N_WEBHOOK_URL");
  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL no configurado");
    return new Response(
      JSON.stringify({ ok: false, error: "N8N_WEBHOOK_URL no configurado" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  let payload: unknown = {};
  try {
    payload = await req.json();
  } catch (_) {
    payload = {};
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    console.log("n8n respondió", res.status, text.slice(0, 200));
    return new Response(
      JSON.stringify({ ok: res.ok, status: res.status }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error enviando a n8n", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
