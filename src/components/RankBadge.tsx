import { Trophy, Medal, Award } from "lucide-react";
import { motion } from "framer-motion";

const CONFIGS = [
  {
    label: "1° Lugar",
    Icon: Trophy,
    ring: "from-[#FFE27A] via-[#F5B301] to-[#9C6B00]",
    core: "from-[#FFF4B8] via-[#FFD24A] to-[#B8860B]",
    shadow: "shadow-[0_8px_28px_-6px_rgba(245,179,1,0.7)]",
    icon: "text-[#7A4F00]",
    text: "text-[#5C3A00]",
  },
  {
    label: "2° Lugar",
    Icon: Medal,
    ring: "from-[#F5F7FA] via-[#C0C5CC] to-[#6E7681]",
    core: "from-[#FAFBFC] via-[#D7DBE0] to-[#8A9099]",
    shadow: "shadow-[0_8px_28px_-6px_rgba(160,170,180,0.65)]",
    icon: "text-[#3F4A55]",
    text: "text-[#2E3640]",
  },
  {
    label: "3° Lugar",
    Icon: Award,
    ring: "from-[#F2B98A] via-[#C97B3B] to-[#7A3F12]",
    core: "from-[#F8D2AC] via-[#D88A4C] to-[#8A4717]",
    shadow: "shadow-[0_8px_28px_-6px_rgba(201,123,59,0.65)]",
    icon: "text-[#4A2308]",
    text: "text-[#3A1B05]",
  },
];

const RankBadge = ({ rank, size = "md" }: { rank: number; size?: "sm" | "md" }) => {
  const config = CONFIGS[rank - 1];
  if (!config) return null;
  const { label, Icon, ring, core, shadow, icon, text } = config;
  const dim = size === "sm" ? "w-12 h-12" : "w-14 h-14";
  const iconSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  const delay = 0.15 + (rank - 1) * 0.12;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.6, rotate: -12 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, rotate: 4, transition: { duration: 0.3 } }}
      className={`absolute top-3 right-3 z-20 ${shadow}`}
      aria-label={label}
    >
      <motion.div
        className={`relative ${dim} rounded-full bg-gradient-to-br ${ring} p-[2px]`}
        animate={{ y: [0, -3, 0] }}
        transition={{ delay: delay + 0.7, duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${core} flex items-center justify-center overflow-hidden`}>
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.9, 0] }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3, duration: 1.2, ease: "easeOut" }}
            style={{
              background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background: "repeating-conic-gradient(from 0deg, rgba(0,0,0,0.18) 0deg 6deg, transparent 6deg 18deg)",
              maskImage: "radial-gradient(circle, transparent 58%, black 60%, black 100%)",
              WebkitMaskImage: "radial-gradient(circle, transparent 58%, black 60%, black 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-70"
            style={{
              background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 45%)",
            }}
          />
          <Icon className={`${iconSize} ${icon} drop-shadow-sm relative z-10`} strokeWidth={2.4} />
          <span className={`absolute bottom-1 text-[10px] font-black ${text} tracking-wider z-10`}>
            #{rank}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RankBadge;
