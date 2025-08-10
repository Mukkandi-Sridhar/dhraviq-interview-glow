import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface DhraviqScoreProps {
  score: number;
  maxScore?: number;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

export const DhraviqScore = ({ 
  score, 
  maxScore = 100, 
  animated = true,
  size = "md",
  showDetails = true 
}: DhraviqScoreProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  
  const sizes = {
    sm: { radius: 60, strokeWidth: 6, textSize: "text-2xl" },
    md: { radius: 80, strokeWidth: 8, textSize: "text-4xl" },
    lg: { radius: 100, strokeWidth: 10, textSize: "text-5xl" }
  };
  
  const { radius, strokeWidth, textSize } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        const increment = score / 50;
        const interval = setInterval(() => {
          setDisplayScore(prev => {
            if (prev >= score) {
              clearInterval(interval);
              return score;
            }
            return Math.min(prev + increment, score);
          });
        }, 30);
        
        return () => clearInterval(interval);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "var(--dhraviq-mint)";
    if (score >= 60) return "var(--dhraviq-aqua)";
    if (score >= 40) return "var(--dhraviq-ion)";
    return "var(--dhraviq-error)";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={radius * 2 + strokeWidth * 2}
          height={radius * 2 + strokeWidth * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="hsl(var(--dhraviq-elevated))"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: animated ? strokeDashoffset : circumference - (percentage / 100) * circumference 
            }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            filter="url(#glow)"
          />
          
          {/* Glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={`${textSize} font-bold dhraviq-text-gradient`}
            initial={animated ? { opacity: 0, scale: 0.5 } : {}}
            animate={animated ? { opacity: 1, scale: 1 } : {}}
            transition={animated ? { duration: 0.5, delay: 1 } : {}}
          >
            {Math.round(displayScore)}
          </motion.span>
          <motion.span 
            className="text-dhraviq-muted text-sm font-medium"
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={animated ? { duration: 0.5, delay: 1.2 } : {}}
          >
            Dhraviq Score
          </motion.span>
        </div>
      </div>
      
      {showDetails && (
        <motion.div 
          className="mt-4 text-center"
          initial={animated ? { opacity: 0, y: 20 } : {}}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={animated ? { duration: 0.5, delay: 1.5 } : {}}
        >
          <div className="text-dhraviq-text font-semibold text-lg">
            {getScoreLabel(score)}
          </div>
          <div className="text-dhraviq-muted text-sm">
            {score}/{maxScore} readiness points
          </div>
        </motion.div>
      )}
    </div>
  );
};