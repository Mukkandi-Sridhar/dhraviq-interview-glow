// Enhanced Company Card Component
import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/data/companies";

interface CompanyCardProps {
  company: Company;
  onSelect: (companyId: string) => void;
  index: number;
}

export function CompanyCard({ company, onSelect, index }: CompanyCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "mixed": return "text-dhraviq-mint border-dhraviq-mint/20 bg-dhraviq-mint/5";
      case "medium": return "text-dhraviq-aqua border-dhraviq-aqua/20 bg-dhraviq-aqua/5";
      case "hard": return "text-dhraviq-ion border-dhraviq-ion/20 bg-dhraviq-ion/5";
      default: return "text-dhraviq-muted border-dhraviq-muted/20 bg-dhraviq-muted/5";
    }
  };

  return (
    <motion.div
      className="dhraviq-card p-6 hover:shadow-dhraviq-md transition-all duration-300 group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Featured Badge */}
      {company.featured && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-dhraviq-ion/10 text-dhraviq-ion border-dhraviq-ion/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      {/* Company Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 text-2xl bg-dhraviq-surface rounded-xl flex items-center justify-center border border-dhraviq-seam">
          {company.logo}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dhraviq-text mb-1">
            {company.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(company.difficulty)}`}>
              {company.difficulty}
            </Badge>
            <span className="text-xs text-dhraviq-subtle">
              {company.questionCount} questions
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-dhraviq-muted text-sm leading-relaxed mb-4">
        {company.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 text-xs text-dhraviq-subtle">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Updated {new Date(company.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={() => onSelect(company.id)}
        variant="outline"
        className="w-full group-hover:bg-dhraviq-ion group-hover:text-white group-hover:border-dhraviq-ion transition-all duration-200"
      >
        Start Practice
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-dhraviq-ion/5 via-transparent to-dhraviq-aqua/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}