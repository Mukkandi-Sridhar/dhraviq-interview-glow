// Enhanced Question Card with Help Integration
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Tag,
  Brain,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/api";

interface QuestionCardProps {
  question: Question;
  onHelpRequest: (questionId: string) => void;
  onAnswerToggle?: (questionId: string) => void;
  isAnswerVisible?: boolean;
  isCompact?: boolean;
  helpAnswer?: string;
  isLoadingHelp?: boolean;
}

export function QuestionCard({ 
  question, 
  onHelpRequest, 
  onAnswerToggle,
  isAnswerVisible = false,
  isCompact = false,
  helpAnswer,
  isLoadingHelp = false
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(!isCompact);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-dhraviq-mint border-dhraviq-mint/20 bg-dhraviq-mint/5";
      case "medium": return "text-dhraviq-aqua border-dhraviq-aqua/20 bg-dhraviq-aqua/5";
      case "hard": return "text-dhraviq-ion border-dhraviq-ion/20 bg-dhraviq-ion/5";
      default: return "text-dhraviq-muted border-dhraviq-muted/20 bg-dhraviq-muted/5";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technical": return <Brain className="w-4 h-4" />;
      case "hr": return <Target className="w-4 h-4" />;
      case "behavioral": return <Sparkles className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical": return "text-dhraviq-ion bg-dhraviq-ion/10";
      case "hr": return "text-dhraviq-aqua bg-dhraviq-aqua/10";  
      case "behavioral": return "text-dhraviq-mint bg-dhraviq-mint/10";
      default: return "text-dhraviq-muted bg-dhraviq-muted/10";
    }
  };

  return (
    <motion.div
      className="dhraviq-card p-6 hover:shadow-dhraviq-md transition-all duration-300"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${getCategoryColor(question.category)}`}>
            {getCategoryIcon(question.category)}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-dhraviq-text capitalize">
                {question.category}
              </span>
              <Badge 
                variant="outline" 
                className={`text-xs ${getDifficultyColor(question.difficulty)}`}
              >
                {question.difficulty}
              </Badge>
            </div>
            
            {question.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <Tag className="w-3 h-3 text-dhraviq-subtle" />
                {question.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {question.tags.length > 3 && (
                  <span className="text-xs text-dhraviq-subtle">
                    +{question.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {isCompact && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0 shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Question Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-dhraviq-text text-lg leading-relaxed mb-6 font-medium">
              {question.question}
            </p>

            {/* AI Coaching Answer */}
            <AnimatePresence>
              {isAnswerVisible && helpAnswer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="dhraviq-surface p-5 rounded-xl border border-dhraviq-seam">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-dhraviq-ion/10 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-dhraviq-ion" />
                      </div>
                      <span className="text-sm font-semibold text-dhraviq-ion">
                        AI Coaching Answer
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-dhraviq-muted leading-relaxed whitespace-pre-wrap">
                        {helpAnswer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="default"
                size="sm"
                onClick={() => onHelpRequest(question.id)}
                disabled={isLoadingHelp}
                className="flex items-center gap-2"
              >
                {isLoadingHelp ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <HelpCircle className="w-4 h-4" />
                )}
                {isLoadingHelp ? "Getting Help..." : "Get AI Help"}
              </Button>

              {helpAnswer && onAnswerToggle && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAnswerToggle(question.id)}
                  className="flex items-center gap-2"
                >
                  {isAnswerVisible ? "Hide Answer" : "Show Answer"}
                </Button>
              )}

              <div className="flex items-center gap-1 text-dhraviq-subtle text-sm ml-auto">
                <Clock className="w-4 h-4" />
                <span>3-5 min</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}