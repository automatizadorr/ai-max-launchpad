import { useEffect, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleNetwork = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="ai-max-particles"
      className="absolute inset-0"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 180, links: { opacity: 0.6 } },
          },
        },
        particles: {
          color: { value: ["#3D8BFF", "#6FB1FF", "#FFFFFF"] },
          links: {
            color: "#3D8BFF",
            distance: 150,
            enable: true,
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            direction: "none",
            outModes: { default: "bounce" },
            random: true,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: { enable: true, width: 1200, height: 800 },
            value: 70,
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: { enable: true, speed: 0.6, sync: false },
          },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2.5 } },
        },
      }}
    />
  );
};

export default memo(ParticleNetwork);
