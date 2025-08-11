import { motion } from "framer-motion";
import { Zap, Target, Sparkles } from "lucide-react";

interface DhraviqLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  showText?: boolean;
}

export const DhraviqLogo = ({ 
  size = "md", 
  animated = true,
  className = "",
  showText = true
}: DhraviqLogoProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Professional Logo Icon */}
      {animated ? (
        <motion.div
          className={`${sizes[size]} rounded-xl bg-gradient-to-br from-dhraviq-ion via-dhraviq-aqua to-dhraviq-mint p-0.5 shadow-dhraviq-glow`}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <div className="w-full h-full rounded-lg bg-dhraviq-bg flex items-center justify-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-dhraviq-ion/20 to-dhraviq-aqua/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="relative z-10 text-dhraviq-text font-bold text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              D
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className={`${sizes[size]} rounded-xl bg-gradient-to-br from-dhraviq-ion via-dhraviq-aqua to-dhraviq-mint p-0.5`}>
          <div className="w-full h-full rounded-lg bg-dhraviq-bg flex items-center justify-center">
            <div className="text-dhraviq-text font-bold text-sm">D</div>
          </div>
        </div>
      )}
      
      {showText && (
        <div className="flex flex-col">
          <motion.h1 
            className={`text-dhraviq-text font-bold ${textSizes[size]} dhraviq-text-gradient leading-tight`}
            initial={animated ? { opacity: 0, x: -20 } : {}}
            animate={animated ? { opacity: 1, x: 0 } : {}}
            transition={animated ? { duration: 0.6, delay: 0.2 } : {}}
          >
            Dhraviq
          </motion.h1>
          <motion.p 
            className="text-dhraviq-muted text-xs font-medium tracking-wide"
            initial={animated ? { opacity: 0, x: -20 } : {}}
            animate={animated ? { opacity: 1, x: 0 } : {}}
            transition={animated ? { duration: 0.6, delay: 0.4 } : {}}
          >
            From Résumé to Ready™
          </motion.p>
        </div>
      )}
    </div>
  );
};