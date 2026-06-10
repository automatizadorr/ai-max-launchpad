import { useState } from "react";
import { Flame, X } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const UrgencyBar = () => {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div
      role="region"
      aria-label="Disponibilidad limitada"
      className="relative z-[60] w-full bg-gradient-to-r from-action via-action-glow to-action text-action-foreground"
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-center">
        <Flame className="w-4 h-4 shrink-0 animate-pulse" aria-hidden="true" />
        <p className="text-[12px] sm:text-sm font-semibold tracking-tight">
          Solo aceptamos <span className="font-black">3 nuevos clientes este mes</span>
          <span className="hidden sm:inline"> · Quedan </span>
          <span className="sm:hidden"> · </span>
          <span className="font-black underline decoration-2 underline-offset-2">2 cupos</span>
        </p>
        <a
          href="#lead-magnet"
          onClick={() => trackEvent("urgency_bar_click")}
          className="hidden md:inline-flex text-xs font-bold bg-action-foreground/15 hover:bg-action-foreground/25 px-3 py-1 rounded-full transition-colors"
        >
          Reservar cupo →
        </a>
        <button
          type="button"
          aria-label="Cerrar barra"
          onClick={() => setHidden(true)}
          className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md hover:bg-action-foreground/15 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default UrgencyBar;
