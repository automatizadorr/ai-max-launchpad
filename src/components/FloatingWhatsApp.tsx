import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "573000000000"; // TODO: reemplazar por número real
const MESSAGE = encodeURIComponent("Hola AI-MaX, vi su portafolio y me gustaría conversar sobre un proyecto de IA.");

const FloatingWhatsApp = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contáctanos por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] animate-ping opacity-30" />
          <span className="relative flex items-center gap-2 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white shadow-elegant rounded-full pl-4 pr-5 py-3.5 transition-all hover:scale-105">
            <MessageCircle className="w-5 h-5 fill-white" />
            <span className="hidden sm:inline font-semibold text-sm">Hablemos</span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
