# Hero media — instrucciones

AI-MaX usa dos archivos para el hero con video Veo 3.1:

- `hero.mp4` — **requerido**. Video Veo 3.1 (10s, 1080p, ~3-6 MB ideal). Sustituye el placeholder.
- `hero-poster.jpg` — **requerido**. Frame inicial del video como poster (1920×1080). Un SVG de respaldo (`hero-poster.svg`) está referenciado si el JPG no existe aún; reemplázalo por el JPG lo antes posible.

## Generar el video (prompt Veo 3.1)

```
Cinematic 10-second brand loop, 16:9, 1920x1080, 24fps, dark premium tech aesthetic.

PALETTE: deep midnight navy #0A1128 base, electric blue #003DA5 headlines/glow,
crimson red #E11B22 accent sparks. High contrast, no gradients to white.

SHOT 1 (0-3s): Macro slow push-in on a holographic AI operator interface floating
in void navy. A phone-call waveform pulses in electric blue, subtle red status
dots lighting up like a call being answered. Ultra clean UI, Sans-serif mono
labels in Spanish: "Llamada entrante · 24/7". Particles of light drift upward.

CUT 2 (3-6s): Transition via a single horizontal red line sweep. Now a legal
contract sheet on a dark desk, scanner-light beam in electric blue passing over
text lines, key clauses highlight in red as the beam reaches them. Hands-off,
automated feel. Shallow depth of field, soft volumetric haze.

CUT 3 (6-9s): Match-cut to an n8n-style node graph glowing in the void, nodes
in electric blue connecting with animated dashed red lines, data packets
traveling left-to-right between CRM / WhatsApp / Calendar nodes. Camera slow
dolly right, parallax on foreground nodes.

CLOSING (9-10s): All nodes converge toward center; a single bold crimson pulse
expands outward into a clean dark frame. End on a held navy #0A1128 background
with a faint blue blueprint grid (64px squares, 6% opacity) fading in — ready
for white text overlay.

MOOD: confident, industrial, precise, premium B2B. No humans. No faces.
No on-screen text other than the small Spanish UI labels in shot 1.
Lighting: dramatic rim light in blue, single hard red accent.
Motion: smooth, slow, almost imperceptible at the edges. No shake, no whip pans.
Film stock emulation: ARRI Alexa, soft halation on the red sparks.
End frame must be clean navy with subtle grid — leave negative space top-left
for text overlay in post.
```

## Encoding recomendado (después de Veo)

```bash
ffmpeg -i veo-output.mp4 -c:v libx264 -crf 23 -preset slow -profile:v high \
  -pix_fmt yuv420p -movflags +faststart -an public/hero.mp4
```

Sin audio (la web lo reproduce muted + loop). `+faststart` para progressive streaming.
