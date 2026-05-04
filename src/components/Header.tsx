import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/ai-max-logo.png";

const WHATSAPP = "https://wa.me/56971806730";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const mq = window.matchMedia("(max-width: 767px)");
    const onMq = () => setIsMobile(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const calmMotion = reduceMotion || isMobile;

  const navLinks = [
    { href: "/servicios", label: "Servicios" },
    { href: "/portafolio", label: "Portafolio" },
    { href: "/casos-exito", label: "Casos de Éxito" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between h-24 md:h-36" aria-label="Navegación principal">
        <Link to="/" aria-label="Ir al inicio AI-MaX" className="flex items-center group relative">
          {/* Halo de luz animado (se desactiva en móvil o con reduced motion) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl opacity-50 group-hover:opacity-90 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(closest-side, hsl(var(--action) / 0.45), hsl(var(--primary) / 0.2), transparent 70%)",
              animation: calmMotion ? undefined : "logo-pulse 3.5s ease-in-out infinite",
            }}
          />
          <motion.img
            src={logo}
            alt="AI-MaX — Automatización Inteligente para Empresas"
            initial={calmMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            animate={
              calmMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, filter: "blur(0px)", y: [0, -2, 0] }
            }
            transition={
              calmMotion
                ? { duration: 0.4, ease: "easeOut" }
                : {
                    opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    filter: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            whileHover={calmMotion ? undefined : { scale: 1.06 }}
            className={`w-auto transition-all duration-500 will-change-transform ${
              scrolled ? "h-16 md:h-24" : "h-20 md:h-32"
            } drop-shadow-[0_6px_22px_rgba(0,0,0,0.5)] md:[filter:drop-shadow(0_0_18px_hsl(var(--action)/0.4))]`}
          />
          {/* Reflejo / shimmer (solo desktop, sin reduced motion) */}
          {!calmMotion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
            >
              <span
                className="absolute -inset-y-4 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ animation: "logo-shimmer 6s ease-in-out infinite" }}
              />
            </span>
          )}
        </Link>



        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={`text-sm font-medium transition-colors hover:text-action ${
                  scrolled ? "text-foreground" : "text-white/80"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hablar con un agente IA por WhatsApp"
          className="inline-flex items-center gap-2 bg-action hover:bg-action-glow text-action-foreground px-4 md:px-5 py-2.5 rounded-full text-sm font-semibold shadow-action transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Hablar con un Agente IA</span>
          <span className="sm:hidden">Agente IA</span>
        </a>
      </nav>
    </motion.header>
  );
};

export default Header;
