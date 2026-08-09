# Hero media — assets activos

AI-MaX usa tres variantes del video Veo 3.1 para optimizar carga por dispositivo:

| Archivo | Uso | Tamaño | Spec |
|---|---|---|---|
| `hero.mp4` | Desktop (>768px) | 3.6 MB | 1080p · 24fps · crf 26 · H.264 · sin audio |
| `hero-mobile.mp4` | Reservado (no usado en hero actual) | 0.7 MB | 720p · 12fps · crf 30 · H.264 · sin audio |
| `hero-poster.jpg` | Poster desktop (primer frame) | 120 KB | 1920×1080 · q:v 3 |
| `hero-mobile-poster.jpg` | Móvil (≤768px) — **solo imagen estática** | 40 KB | 1280×720 · q:v 4 |

> Estrategia mobile: el hero carga **solo el JPG estático** en móvil (sin `<video>`), ahorrando 0.7-3.6 MB en datos móviles. El video queda reservado para desktop. La detección es runtime vía `matchMedia("(max-width: 768px)")` + listener reactivo a rotación.

Si el video falla en desktop o el usuario activa `prefers-reduced-motion`, el hero cae a `ParticleNetwork` (lazy-loaded) como fallback final.

## Prompt Veo 3.1 (ya ejecutado, output integrado)

```
Cinematic 10-second brand loop, 16:9, 1920x1080, 24fps, dark premium tech aesthetic.

PALETTE: deep midnight navy #0A1128 as the void base, electric blue #003DA5 for
headlines and glowing elements, crimson red #E11B22 as single hard accent sparks.
High contrast, no gradients fading to white, no pastel tones.

SHOT 1 (0-3s): Macro slow push-in on a holographic AI operator interface floating
in the navy void. A phone-call waveform pulses in electric blue, subtle red status
dots light up in sequence like a call being answered. Ultra clean UI, monospace
sans-serif labels in Spanish read "Llamada entrante · 24/7". Particles of light
drift gently upward. Soft volumetric haze.

HARD CUT 2 (3-6s): Transition triggered by a single horizontal red line sweeping
across the frame. Now over a dark desk surface, a legal contract sheet is scanned
by an electric-blue light beam passing line by line; key clauses highlight in red
as the beam reaches them. Hands-off, automated feeling. Shallow depth of field,
document edges fade into the void.

MATCH CUT 3 (6-9s): Cut to an n8n-style node graph glowing in the navy void. Nodes
labeled in monospace "CRM · WhatsApp · Calendar" connect with animated dashed red
lines; small electric-blue data packets travel left-to-right between them. Camera
slow dolly right, parallax on foreground nodes, background nodes bokeh.

CLOSING (9-10s): All nodes converge toward center; a single bold crimson pulse
expands outward and dissolves into a clean navy #0A1128 frame. A faint blue
blueprint grid (64px squares at 6% opacity) fades in over the void. Hold this
frame — left third remains empty negative space for text overlay in post.

MOOD: confident, industrial, precise, premium B2B. No humans. No faces. No hands.
No on-screen text other than the small Spanish UI labels in shot 1.
LIGHTING: dramatic rim light in blue, one hard red accent per shot.
MOTION: smooth, slow, almost imperceptible at the edges. No camera shake, no whip
pans, no handheld feel. Locked-off with subtle dolly only.
FILM STOCK: ARRI Alexa emulation, soft halation blooming on the red sparks, fine
grain, clean shadows.
END FRAME: held clean navy with subtle blueprint grid — designed to leave negative
space top-left for a headline overlay in post-production.
```

## Comandos ffmpeg usados (re-encode futuros)

```bash
# Desktop (1080p, mute, comprimido)
ffmpeg -i veo-output.mp4 -an -c:v libx264 -crf 26 -preset slow \
  -profile:v high -pix_fmt yuv420p -movflags +faststart public/hero.mp4

# Mobile (720p, 12fps, mute)
ffmpeg -i veo-output.mp4 -an -vf "scale=-2:720" -r 12 -c:v libx264 -crf 30 \
  -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart public/hero-mobile.mp4

# Posters JPG (primer frame)
ffmpeg -i public/hero.mp4 -frames:v 1 -q:v 3 public/hero-poster.jpg
ffmpeg -i public/hero.mp4 -frames:v 1 -vf "scale=1280:720" -q:v 4 public/hero-mobile-poster.jpg
```
