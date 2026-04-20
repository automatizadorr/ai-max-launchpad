import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/ai-max-logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-dark-foreground" aria-label="Pie de página">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4 inline-flex bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <img
                src={logo}
                alt="AI-MaX — Automatización Inteligente para Empresas"
                className="h-14 w-auto"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Mario Antonio Valdés Quijada — Desarrollador de automatización de procesos con IA.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              La Serena, Chile
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-white">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:automatizador.ex@gmail.com"
                  aria-label="Enviar correo a automatizador.ex@gmail.com"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-action transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  automatizador.ex@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/56971806730"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp al +56 9 7180 6730"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-action transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  +56 9 7180 6730
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" aria-label="Política de privacidad" className="text-white/70 hover:text-action transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" aria-label="Términos y condiciones" className="text-white/70 hover:text-action transition-colors">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} AI-MaX. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-xs">
            Construido con Inteligencia Artificial · Chile · Latinoamérica
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
