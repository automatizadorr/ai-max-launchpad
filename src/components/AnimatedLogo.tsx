import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import logo from "@/assets/ai-max-logo.png";

gsap.registerPlugin(useGSAP);

interface AnimatedLogoProps {
  scrolled: boolean;
}

const AnimatedLogo = ({ scrolled }: AnimatedLogoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);

  // Detect environment: reduced motion vs mobile (fine-pointer absent)
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile =
    typeof window !== "undefined" &&
    (window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches);

  useGSAP(
    () => {
      if (!imgRef.current) return;

      // Cinematic intro timeline (always plays, lighter when reduced)
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(imgRef.current, {
          opacity: 0,
          scale: reduceMotion ? 0.95 : 0.7,
          rotateY: reduceMotion ? 0 : -45,
          filter: reduceMotion
            ? "blur(4px) brightness(1.1)"
            : "blur(14px) brightness(1.6)",
          duration: reduceMotion ? 0.6 : 1.1,
        })
        .from(
          haloRef.current,
          { opacity: 0, scale: 0.6, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .from(
          ringRef.current,
          { opacity: 0, scale: 0.7, duration: 0.7 },
          "-=0.5"
        );

      // Hard stop only if user explicitly requested reduced motion
      if (reduceMotion) return;

      // Intensity factor: mobile gets lighter ambient motion
      const k = isMobile ? 0.45 : 1;

      // Continuous breathing on the halo (depth pulsing)
      gsap.to(haloRef.current, {
        scale: 1 + 0.18 * k,
        opacity: 0.6 + 0.35 * k,
        duration: isMobile ? 3.4 : 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Slow rotation of the conic ring
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: isMobile ? 32 : 22,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Subtle floating (works on mobile too — no pointer needed)
      gsap.to(imgRef.current, {
        y: -4 * k - 1,
        duration: isMobile ? 4.2 : 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Periodic sheen sweep across the logo
      const sheenTl = gsap.timeline({
        repeat: -1,
        repeatDelay: isMobile ? 6 : 3.5,
      });
      sheenTl
        .set(sheenRef.current, { xPercent: -160, opacity: 0 })
        .to(sheenRef.current, { opacity: isMobile ? 0.6 : 1, duration: 0.2 })
        .to(sheenRef.current, {
          xPercent: 260,
          duration: isMobile ? 1.8 : 1.4,
          ease: "power2.inOut",
        })
        .to(sheenRef.current, { opacity: 0, duration: 0.25 }, "-=0.3");

      // Mobile: gentle auto-tilt instead of pointer tilt (no dizziness)
      if (isMobile) {
        gsap.to(imgRef.current, {
          rotationY: 6,
          rotationX: -3,
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        return;
      }

      // Desktop: 3D magnetic tilt on pointer move
      const el = containerRef.current!;
      const qX = gsap.quickTo(imgRef.current, "rotationY", {
        duration: 0.6,
        ease: "power3.out",
      });
      const qY = gsap.quickTo(imgRef.current, "rotationX", {
        duration: 0.6,
        ease: "power3.out",
      });
      const qS = gsap.quickTo(imgRef.current, "scale", {
        duration: 0.5,
        ease: "power3.out",
      });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        qX(px * 18);
        qY(-py * 14);
      };
      const onEnter = () => qS(1.07);
      const onLeave = () => {
        qS(1);
        qX(0);
        qY(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
      style={{ perspective: 800 }}
    >
      {/* Halo de luz radial */}
      <span
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--action) / 0.55), hsl(var(--primary) / 0.25), transparent 72%)",
        }}
      />
      {/* Anillo cónico que rota */}
      <span
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-18%] -z-10 rounded-full opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, hsl(var(--action) / 0.6) 60deg, transparent 140deg, hsl(var(--primary) / 0.55) 220deg, transparent 320deg)",
          mask: "radial-gradient(closest-side, transparent 60%, #000 62%, #000 70%, transparent 72%)",
          WebkitMask:
            "radial-gradient(closest-side, transparent 60%, #000 62%, #000 70%, transparent 72%)",
          filter: "blur(2px)",
        }}
      />
      <img
        ref={imgRef}
        src={logo}
        alt="AI-MaX — Automatización Inteligente para Empresas"
        className={`w-auto will-change-transform transition-[height] duration-500 ${
          scrolled ? "h-16 md:h-24" : "h-20 md:h-32"
        } drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)] md:[filter:drop-shadow(0_0_22px_hsl(var(--action)/0.45))]`}
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      />
      {/* Sheen sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(#000, #000)",
        }}
      >
        <span
          ref={sheenRef}
          className="absolute top-0 bottom-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          style={{ left: 0 }}
        />
      </span>
    </div>
  );
};

export default AnimatedLogo;
