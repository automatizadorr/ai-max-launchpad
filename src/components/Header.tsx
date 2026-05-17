import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedLogo from "@/components/AnimatedLogo";

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
      <nav
        className="container mx-auto flex items-center justify-between h-24 md:h-36"
        aria-label="Navegación principal"
      >
        <Link
          to="/"
          aria-label="Ir al inicio AI-MaX"
          className="flex items-center"
        >
          <AnimatedLogo scrolled={scrolled} />
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
