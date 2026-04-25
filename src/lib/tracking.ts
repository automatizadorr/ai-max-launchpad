// Lightweight conversion event tracking.
// Hooks into window.dataLayer (GA4 / GTM ready) and logs in dev for visibility.
// Add real GA4 / Meta Pixel later without changing call sites.

export type EventName =
  | "lead_magnet_submit"
  | "qualifier_started"
  | "qualifier_step"
  | "qualifier_completed"
  | "lead_form_submit"
  | "whatsapp_click"
  | "exit_intent_shown"
  | "inline_cta_click"
  | "urgency_bar_click"
  | "local_whatsapp_click"
  | "local_booking_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const trackEvent = (event: EventName | (string & {}), payload: Record<string, unknown> = {}) => {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload, ts: Date.now() });
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info(`[track] ${event}`, payload);
    }
  } catch {
    /* no-op */
  }
};
