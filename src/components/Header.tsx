import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/ai-max-logo.png";

const WHATSAPP = "https://wa.me/56971806730";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#tecnologia", label: "Tecnología" },
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
      <nav className="container mx-auto flex items-center justify-between h-16 md:h-20" aria-label="Navegación principal">
        <a href="#" aria-label="Ir al inicio AI-MaX" className="flex items-center">
          <img
            src={logo}
            alt="AI-MaX — Automatización Inteligente para Empresas"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-9 md:h-10" : "h-11 md:h-12"} ${scrolled ? "" : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"}`}
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-action ${
                  scrolled ? "text-foreground" : "text-white/80"
                }`}
              >
                {l.label}
              </a>
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
