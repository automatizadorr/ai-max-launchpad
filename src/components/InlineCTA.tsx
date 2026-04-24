import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface InlineCTAProps {
  variant?: "primary" | "whatsapp" | "soft";
  title: string;
  description?: string;
  ctaLabel: string;
  href?: string;
  targetId?: string; // smooth-scroll target
  location: string;
}

const WHATSAPP =
  "https://wa.me/56971806730?text=" +
  encodeURIComponent("Hola AI-MaX, vi su portafolio y me gustaría conversar sobre un proyecto.");

const InlineCTA = ({
  variant = "primary",
  title,
  description,
  ctaLabel,
  href,
  targetId,
  location,
}: InlineCTAProps) => {
  const isWa = variant === "whatsapp";
  const finalHref = isWa ? WHATSAPP : href;

  const onClick = (e: React.MouseEvent) => {
    trackEvent(isWa ? "whatsapp_click" : "inline_cta_click", { location });
    if (targetId) {
      e.preventDefault();
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const bgClass =
    variant === "soft"
      ? "bg-card border border-border"
      : isWa
        ? "bg-gradient-to-r from-[hsl(142,70%,40%)] via-[hsl(142,70%,45%)] to-[hsl(142,70%,40%)] text-white border border-white/10"
        : "bg-gradient-hero text-white border border-white/10";

  const btnClass = isWa
    ? "bg-white text-[hsl(142,70%,30%)] hover:bg-white/90"
    : variant === "soft"
      ? "bg-action text-action-foreground hover:bg-action-glow shadow-action"
      : "bg-action text-action-foreground hover:bg-action-glow shadow-action";

  return (
    <section className="py-12 md:py-16 bg-background" aria-label={title}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={`max-w-5xl mx-auto rounded-2xl px-6 md:px-10 py-7 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 ${bgClass}`}
        >
          <div className={`text-center md:text-left ${variant === "soft" ? "" : ""}`}>
            <h3
              className={`font-display font-bold text-xl md:text-2xl leading-tight ${
                variant === "soft" ? "text-foreground" : "text-white"
              }`}
            >
              {title}
            </h3>
            {description && (
              <p
                className={`mt-1.5 text-sm md:text-base ${
                  variant === "soft" ? "text-muted-foreground" : "text-white/75"
                }`}
              >
                {description}
              </p>
            )}
          </div>
          <a
            href={finalHref || "#"}
            target={isWa ? "_blank" : undefined}
            rel={isWa ? "noopener noreferrer" : undefined}
            onClick={onClick}
            className={`inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] whitespace-nowrap ${btnClass}`}
          >
            {isWa && <MessageCircle className="w-4 h-4" />}
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InlineCTA;
