import { useState } from "react";
import { Play, Youtube, Instagram } from "lucide-react";

interface Props {
  src: string; // URL de embed del iframe
  title: string;
  platform: "youtube" | "instagram";
}

/**
 * Facade liviano para embeds de video (YouTube / Instagram).
 *
 * En vez de cargar el iframe pesado de terceros al render (cientos de KB de JS +
 * decenas de requests que bloquean el hilo principal en móvil), muestra una
 * miniatura/placeholder con botón ▶ y solo inyecta el iframe real al hacer clic.
 * Ahorra ~2.9MB y +100 requests en la carga inicial de la landing.
 */
const ytId = (src: string): string | null => {
  const m = src.match(/embed\/([^?&/]+)/);
  return m ? m[1] : null;
};

const LiteVideoEmbed = ({ src, title, platform }: Props) => {
  const [active, setActive] = useState(false);
  const id = platform === "youtube" ? ytId(src) : null;
  const poster = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;

  if (active) {
    const iframeSrc =
      platform === "youtube" ? `${src}${src.includes("?") ? "&" : "?"}autoplay=1` : src;
    return (
      <iframe
        src={iframeSrc}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        scrolling="no"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Reproducir: ${title}`}
      className="group/vid absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-action"
    >
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Instagram no permite hotlink de la miniatura → placeholder con gradiente de marca
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#F77737]"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-dark/45 group-hover/vid:bg-dark/25 transition-colors duration-300" />
      <span className="relative z-10 flex flex-col items-center gap-2 text-white">
        <span className="w-14 h-14 rounded-full bg-action flex items-center justify-center shadow-action group-hover/vid:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 fill-current translate-x-0.5" />
        </span>
        <span className="mono-label inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase">
          {platform === "youtube" ? (
            <Youtube className="w-3.5 h-3.5" />
          ) : (
            <Instagram className="w-3.5 h-3.5" />
          )}
          Reproducir
        </span>
      </span>
    </button>
  );
};

export default LiteVideoEmbed;
