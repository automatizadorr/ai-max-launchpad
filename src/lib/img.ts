/**
 * Optimización de imágenes remotas vía la API de imágenes de Vercel (`/_vercel/image`).
 *
 * Convierte PNG/JPG pesados (p.ej. las imágenes del portafolio, ~2.5MB) a WebP
 * redimensionado servido desde el edge de Vercel — sin depender de terceros ni del
 * plan Pro de Supabase.
 *
 * ROBUSTEZ: solo se optimizan hosts allowlisted (que además deben estar en
 * `images.remotePatterns` de vercel.json) y assets locales (`/assets/**` →
 * `images.localPatterns`). Cualquier otro host se sirve SIN optimizar para no romper
 * nunca la imagen (el admin puede cargar image_url desde hosts arbitrarios).
 *
 * En dev (`vite`) el endpoint no existe → se devuelve la URL original.
 */
const OPTIMIZABLE_HOSTS = [
  "vtkrpitsgwznmkqnanmq.supabase.co",
  "beahtwbiqtkudvzpvvhs.supabase.co",
  "storage.googleapis.com",
];

export function cdnImage(url: string | null | undefined, width: number, quality = 75): string {
  if (!url) return "";
  if (!import.meta.env.PROD) return url;

  const vercel = (u: string) => `/_vercel/image?url=${encodeURIComponent(u)}&w=${width}&q=${quality}`;

  // Assets locales servidos por Vercel (allowlisted en images.localPatterns).
  if (url.startsWith("/")) return vercel(url);

  // Remotas: solo hosts allowlisted; el resto pasa sin tocar (nunca romper).
  try {
    if (OPTIMIZABLE_HOSTS.includes(new URL(url).host)) return vercel(url);
  } catch {
    /* URL inválida → original */
  }
  return url;
}
