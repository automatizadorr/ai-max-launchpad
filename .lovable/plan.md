

# Plan: Transformar el Portafolio en una Máquina de Conversión

Tu portafolio hoy muestra muy bien lo que haces, pero está optimizado para **informar**, no para **convertir**. Voy a reorganizarlo con principios de CRO (Conversion Rate Optimization) para que un visitante frío se convierta en lead calificado en menos de 60 segundos.

## Diagnóstico actual

- El CTA principal está al final (después de scrollear todo).
- No hay "captura rápida" para visitantes con prisa.
- Falta urgencia, escasez y prueba social inmediata sobre el fold.
- No se califica al lead (no sabes si es PYME, enterprise, presupuesto, urgencia).
- No hay lead magnet (algo gratis a cambio del email).

## Estrategia: Funnel de 3 capas

```text
   [Capa 1: HOOK]      → Captar atención en 5s + CTA visible siempre
   [Capa 2: PRUEBA]    → Resultados, testimonios, casos (ya existe ✅)
   [Capa 3: CAPTURA]   → Múltiples puntos de conversión calificados
```

## Cambios concretos

### 1. Nuevo Hero del Portafolio (orientado a conversión)
Reemplazar el hero actual por uno con:
- **Headline de beneficio** (no "Portafolio", sino "Automatizamos tu negocio con IA en 30 días o menos").
- **Sub-headline con prueba**: "+50 procesos automatizados · ROI promedio 340% · Garantía de resultados".
- **2 CTAs sobre el fold**: "Diagnóstico Gratuito" (primario) + "Ver casos reales" (secundario, scroll suave).
- **Trust badges**: "Sin permanencia · Primer resultado en 14 días · Soporte 24/7".

### 2. Barra de urgencia superior (sticky)
Banda fina arriba del header con:
> "🔥 Solo aceptamos 3 nuevos clientes este mes · Quedan 2 cupos"
Crea escasez real y empuja a la acción inmediata.

### 3. Mini-form rápido en el Hero (lead magnet)
Tarjeta lateral en el hero con captura de 2 campos:
- Email + WhatsApp → "Recibe gratis: Auditoría de Automatización IA (PDF)"
- Lead frío entra al funnel sin fricción. Se guarda en `leads` con `pain_point = "lead_magnet_auditoria"`.

### 4. Calificador de Lead inteligente (multi-step)
Nuevo componente `LeadQualifier` tipo wizard de 4 pasos cortos (10 segundos):
1. **Industria** (Inmobiliaria / Salud / E-commerce / Otro)
2. **Tamaño de empresa** (1-10 / 11-50 / 50+ empleados)
3. **Principal dolor** (Leads sin atender / Procesos manuales / Soporte saturado / Otro)
4. **Urgencia** (Esta semana / Este mes / Explorando)
→ Al final muestra: "Tienes un caso ideal para [Solución X]" + form de contacto pre-rellenado.
Esto califica al lead automáticamente y aumenta la conversión 2-3x vs. un form genérico.

### 5. CTAs intermedios (cada 2-3 secciones)
Inyectar mini-banners de conversión entre secciones existentes:
- Después de `BeforeAfter`: "¿Quieres resultados así? → Agenda diagnóstico"
- Después de `PortfolioTestimonials`: "Únete a +30 empresas que ya automatizan → WhatsApp"
- Después de `Industries`: "¿Tu industria está aquí? → Cuéntanos tu caso"

### 6. Exit-Intent Popup
Al detectar que el cursor sale por la parte superior (intent de cerrar pestaña), mostrar modal con:
> "Antes de irte… ¿Te enviamos por WhatsApp 3 ideas de automatización para tu negocio?"
Solo email + WhatsApp. Captura ~10-15% de visitantes que se iban.

### 7. Refuerzo del FloatingWhatsApp
El botón flotante actual está bien, pero le añadimos:
- Bubble de mensaje precargado tipo chat ("Hola 👋 ¿En qué automatizamos tu empresa?").
- Aparece a los 15 segundos en mobile o al scrollear 40%.

### 8. Mejora del LeadForm existente
- Reducir campos visibles inicialmente (progressive disclosure): solo email + WhatsApp visibles, el resto aparece al hacer foco.
- Añadir contador de prueba social: "📝 8 empresas solicitaron diagnóstico esta semana".
- Después del envío: redirigir a `/gracias` (página de agradecimiento) con próximos pasos + link a calendario.

### 9. Página `/gracias` nueva
Tras enviar el form: 
- Mensaje claro: "Te contactaremos en menos de 24h".
- CTA secundario: "Mientras tanto, agenda directo en mi calendario → [link]".
- Compartir en redes / volver al portafolio.

### 10. Tracking de conversión
Añadir eventos básicos (sin librería externa, solo `console` + `dataLayer` ready) para poder medir después con GA4/Meta Pixel:
- `lead_magnet_submit`, `qualifier_started`, `qualifier_completed`, `lead_form_submit`, `whatsapp_click`, `exit_intent_shown`.

## Detalles técnicos

- **Nuevos componentes**: `PortfolioConversionHero.tsx`, `UrgencyBar.tsx`, `LeadMagnetCard.tsx`, `LeadQualifier.tsx`, `InlineCTA.tsx`, `ExitIntentModal.tsx`, `WhatsAppBubble.tsx` (mejora de `FloatingWhatsApp`).
- **Nueva página**: `src/pages/Gracias.tsx` + ruta en `App.tsx`.
- **Esquema DB**: añadir columnas opcionales a `leads`: `industry`, `company_size`, `urgency`, `source` (string nullable, sin breaking changes). Migración simple.
- **Validación**: zod en todos los forms (ya patrón establecido en `LeadForm`).
- **Animaciones**: `framer-motion` ya disponible.
- **Sin nuevas dependencias**.
- **Accesibilidad**: focus trap en modales, aria-labels, escape key.

## Orden de implementación sugerido (1 sola pasada)

1. Migración DB (añadir columnas a `leads`).
2. `UrgencyBar` + nuevo `PortfolioConversionHero` con `LeadMagnetCard`.
3. `LeadQualifier` wizard insertado tras `ImpactMetrics`.
4. `InlineCTA` × 3 entre secciones.
5. `ExitIntentModal` global.
6. Mejora `FloatingWhatsApp` con bubble.
7. Página `/gracias` + redirección.
8. Tracking de eventos.

## Pregunta antes de arrancar

¿Quieres que aplique **TODO el paquete completo** (mayor impacto, ~8 componentes nuevos) o prefieres empezar por los **3 cambios de mayor ROI** (Hero conversión + Lead Qualifier + Exit Intent)? Yo recomiendo el paquete completo porque cada pieza refuerza a la siguiente y el efecto compuesto es lo que hace que la conversión salte de ~1% a ~5-8%.

