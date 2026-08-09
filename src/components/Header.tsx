import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedLogo from "@/components/AnimatedLogo";

const Header = () => (
  <motion.header
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="absolute top-0 inset-x-0 z-50 bg-transparent pointer-events-none"
  >
    <div className="container mx-auto flex justify-center pt-12 sm:pt-14 md:pt-20 pointer-events-auto">
      <Link to="/" aria-label="Ir al inicio AI-MaX" className="flex items-center">
        <AnimatedLogo scrolled={false} />
      </Link>
    </div>
  </motion.header>
);

export default Header;
