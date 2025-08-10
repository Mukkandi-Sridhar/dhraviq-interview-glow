import { motion } from "framer-motion";
import dhraviqLogo from "@/assets/dhraviq-logo.png";

interface DhraviqLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export const DhraviqLogo = ({ 
  size = "md", 
  animated = true,
  className = "" 
}: DhraviqLogoProps) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {animated ? (
        <motion.img
          src={dhraviqLogo}
          alt="Dhraviq"
          className={`${sizes[size]} animate-dhraviq-float`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ) : (
        <img
          src={dhraviqLogo}
          alt="Dhraviq"
          className={`${sizes[size]} animate-dhraviq-float`}
        />
      )}
      <div className="flex flex-col">
        <motion.h1 
          className="text-dhraviq-text font-bold text-xl dhraviq-text-gradient"
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={animated ? { duration: 0.6, delay: 0.2 } : {}}
        >
          Dhraviq
        </motion.h1>
        <motion.p 
          className="text-dhraviq-muted text-xs font-medium"
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={animated ? { duration: 0.6, delay: 0.4 } : {}}
        >
          From Résumé to Ready™
        </motion.p>
      </div>
    </div>
  );
};