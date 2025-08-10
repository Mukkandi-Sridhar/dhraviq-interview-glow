import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, CheckCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  text: string;
  type: "technical" | "hr" | "behavioral";
  difficulty: "easy" | "medium" | "hard";
  category?: string;
  answer?: string;
}

interface QuestionCardProps {
  question: Question;
  onHelpRequest: (questionId: string) => void;
  onAnswerToggle?: (questionId: string) => void;
  isAnswerVisible?: boolean;
  isCompact?: boolean;
}

export const QuestionCard = ({ 
  question, 
  onHelpRequest, 
  onAnswerToggle,
  isAnswerVisible = false,
  isCompact = false 
}: QuestionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(!isCompact);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-dhraviq-mint border-dhraviq-mint/20 bg-dhraviq-mint/5";
      case "medium": return "text-dhraviq-aqua border-dhraviq-aqua/20 bg-dhraviq-aqua/5";
      case "hard": return "text-dhraviq-ion border-dhraviq-ion/20 bg-dhraviq-ion/5";
      default: return "text-dhraviq-muted border-dhraviq-muted/20 bg-dhraviq-muted/5";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "technical": return "🔧";
      case "hr": return "👥";
      case "behavioral": return "🧠";
      default: return "❓";
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
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getTypeIcon(question.type)}</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-dhraviq-muted capitalize">
                {question.type}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
            </div>
            {question.category && (
              <span className="text-xs text-dhraviq-subtle mt-1">
                {question.category}
              </span>
            )}
          </div>
        </div>

        {isCompact && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Question Text */}
      <motion.div
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-dhraviq-text text-lg leading-relaxed mb-6">
          {question.text}
        </p>

        {/* Answer Section */}
        {question.answer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isAnswerVisible ? 1 : 0,
              height: isAnswerVisible ? "auto" : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="dhraviq-surface p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-dhraviq-mint" />
                <span className="text-sm font-medium text-dhraviq-mint">
                  Suggested Answer
                </span>
              </div>
              <p className="text-dhraviq-muted leading-relaxed">
                {question.answer}
              </p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="dhraviq"
            size="sm"
            onClick={() => onHelpRequest(question.id)}
            className="flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Get Help
          </Button>

          {question.answer && onAnswerToggle && (
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
    </motion.div>
  );
};