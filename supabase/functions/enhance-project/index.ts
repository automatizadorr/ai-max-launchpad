import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.103.3/cors";

interface Body {
  field: "description" | "category";
  title: string;
  project_url?: string;
  current?: string;
}

const PROMPTS = {
  description: (title: string, url: string, current: string) =>
    `Eres un copywriter experto en automatización con IA. Genera UNA descripción persuasiva en español (máximo 2 frases, 220 caracteres) para este proyecto del portafolio. Destaca el VALOR/BENEFICIO para el cliente, no solo qué hace.

Proyecto: ${title}
URL: ${url || "(sin URL)"}
${current ? `Texto actual a mejorar: "${current}"` : "No hay texto previo, genera desde cero."}

Devuelve SOLO la descripción final, sin comillas, sin explicaciones, sin etiquetas.`,

  category: (title: string, url: string, current: string) =>
    `Eres un experto en taxonomía de proyectos de IA y automatización. Sugiere UNA categoría corta (1-3 palabras en español) para este proyecto.

Proyecto: ${title}
URL: ${url || "(sin URL)"}
${current ? `Categoría actual: "${current}" (mejórala si puedes)` : ""}

Ejemplos válidos: "Voz IA", "Automatización", "Chatbot", "Agente IA", "Integración API", "Análisis de datos".
Devuelve SOLO la categoría, sin comillas ni explicaciones.`,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    if (!body.title || !body.field) {
      return new Response(JSON.stringify({ error: "title y field son obligatorios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (body.field !== "description" && body.field !== "category") {
      return new Response(JSON.stringify({ error: "field inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY no configurado");

    const prompt = PROMPTS[body.field](body.title, body.project_url || "", body.current || "");

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Eres un copywriter experto. Respondes únicamente con el texto solicitado, sin preámbulos." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (aiResp.status === 429) {
      return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Espera un momento." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiResp.status === 402) {
      return new Response(JSON.stringify({ error: "Sin créditos de IA. Recarga en Configuración." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      return new Response(JSON.stringify({ error: "Error al generar" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    let result: string = data.choices?.[0]?.message?.content?.trim() || "";
    // Limpia comillas envolventes
    result = result.replace(/^["'`]|["'`]$/g, "").trim();
    if (body.field === "category") {
      // primera línea, máx 60 chars
      result = result.split("\n")[0].slice(0, 60);
    } else {
      result = result.slice(0, 500);
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("enhance-project error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
