/**
 * Optimización de imágenes remotas vía la API de imágenes de Vercel (`/_vercel/image`).
 *
 * Convierte PNG/JPG pesados (p.ej. las imágenes del portafolio en Supabase, ~2.5MB)
 * a WebP redimensionado servido desde el edge de Vercel — sin depender de terceros
 * ni del plan Pro de Supabase (su transformación está deshabilitada).
 *
 * En dev (`vite`) el endpoint no existe, así que devolvemos la URL original.
 * Los dominios permitidos se configuran en `vercel.json` → `images.remotePatterns`.
 */
export function cdnImage(url: string | null | undefined, width: number, quality = 75): string {
  if (!url) return "";
  // En dev el endpoint no existe → original. Optimizamos remotas https (Supabase)
  // y assets locales servidos por Vercel (`/assets/...`). data:/blob: se dejan igual.
  if (!import.meta.env.PROD) return url;
  const optimizable = /^https:\/\//.test(url) || url.startsWith("/");
  if (!optimizable) return url;
  return `/_vercel/image?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`;
}
