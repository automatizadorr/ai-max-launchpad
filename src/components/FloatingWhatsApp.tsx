import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/tracking";

const WHATSAPP_NUMBER = "56971806730";
const MESSAGE = encodeURIComponent("Hola AI-MaX, vi su portafolio y me gustaría conversar sobre un proyecto de IA.");
const BUBBLE_KEY = "wa_bubble_dismissed_v1";

const FloatingWhatsApp = () => {
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bubble appears once after delay or scroll progress.
  // Solo en desktop (>=768px): en móvil el globo tapa los precios/CTAs, así que ahí solo mostramos el botón.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;
    if (sessionStorage.getItem(BUBBLE_KEY)) return;

    const timer = window.setTimeout(() => {
      if (!sessionStorage.getItem(BUBBLE_KEY)) setBubble(true);
    }, 15000);

    const onScroll = () => {
      const pct = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (pct > 0.4 && !sessionStorage.getItem(BUBBLE_KEY)) {
        setBubble(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismissBubble = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem(BUBBLE_KEY, "1");
    setBubble(false);
  };

  // Ping halo solo en desktop (>=768px): reduce distractores y espacio visual en móvil.
  const [showPing, setShowPing] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowPing(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-[260px] bg-white rounded-2xl rounded-br-sm shadow-elegant p-4 pr-8"
              >
                <button
                  type="button"
                  onClick={dismissBubble}
                  aria-label="Cerrar mensaje"
                  className="absolute top-1.5 right-1.5 p-1 rounded-full text-muted-foreground hover:bg-muted transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <p className="text-sm text-foreground font-medium leading-snug">
                  Hola 👋 ¿En qué automatizamos tu empresa?
                </p>
                <p className="text-xs text-muted-foreground mt-1">Respondemos en minutos</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contáctanos por WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => trackEvent("whatsapp_click", { location: "floating" })}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto"
          >
            {showPing && (
              <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] animate-ping opacity-30" />
            )}
            <span className="relative flex items-center gap-2 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white shadow-elegant rounded-full sm:pl-4 sm:pr-5 sm:py-3.5 p-3 transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5 fill-white" />
              <span className="hidden sm:inline font-semibold text-sm">Hablemos</span>
            </span>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
