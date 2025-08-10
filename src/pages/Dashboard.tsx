import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DhraviqLogo } from "@/components/DhraviqLogo";
import { DhraviqScore } from "@/components/DhraviqScore";
import { DashboardNav } from "@/components/DashboardNav";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - Replace with actual API calls
const mockQuestions = [
  {
    id: "1",
    text: "Explain the difference between var, let, and const in JavaScript.",
    type: "technical" as const,
    difficulty: "medium" as const,
    category: "JavaScript",
    answer: "var is function-scoped and can be redeclared. let is block-scoped and can be reassigned but not redeclared. const is block-scoped and cannot be reassigned or redeclared."
  },
  {
    id: "2", 
    text: "Tell me about a time when you had to work under pressure.",
    type: "behavioral" as const,
    difficulty: "easy" as const,
    category: "Problem Solving"
  },
  {
    id: "3",
    text: "Why do you want to work for our company?",
    type: "hr" as const,
    difficulty: "easy" as const,
    category: "Motivation"
  },
  {
    id: "4",
    text: "Implement a function to reverse a linked list.",
    type: "technical" as const,
    difficulty: "hard" as const,
    category: "Data Structures"
  }
];

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("questions");
  const [dhraviqScore] = useState(82);
  const [questions] = useState(mockQuestions);
  const [visibleAnswers, setVisibleAnswers] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleHelpRequest = (questionId: string) => {
    toast({
      title: "Help requested",
      description: "Our AI will provide personalized guidance for this question."
    });
  };

  const handleAnswerToggle = (questionId: string) => {
    setVisibleAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getSectionContent = () => {
    switch (activeSection) {
      case "questions":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dhraviq-text">
                Personalized Questions
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <QuestionCard
                    question={question}
                    onHelpRequest={handleHelpRequest}
                    onAnswerToggle={handleAnswerToggle}
                    isAnswerVisible={visibleAnswers.has(question.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case "company-packs":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-dhraviq-text">
              Company Interview Packs
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map((company) => (
                <motion.div
                  key={company}
                  className="dhraviq-card p-6 text-center hover:shadow-dhraviq-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold text-dhraviq-text mb-2">
                    {company}
                  </h3>
                  <p className="text-dhraviq-muted mb-4">
                    50+ interview questions
                  </p>
                  <Button variant="dhraviq" size="sm" className="w-full">
                    Start Practice
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case "hr-bank":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-dhraviq-text">
              HR Question Bank
            </h2>
            <div className="grid gap-4">
              {mockQuestions.filter(q => q.type === "hr" || q.type === "behavioral").map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <QuestionCard
                    question={question}
                    onHelpRequest={handleHelpRequest}
                    onAnswerToggle={handleAnswerToggle}
                    isAnswerVisible={visibleAnswers.has(question.id)}
                    isCompact
                  />
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dhraviq-bg">
      {/* Header */}
      <motion.header
        className="dhraviq-surface border-b border-dhraviq-seam sticky top-0 z-30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <DhraviqLogo animated={false} />
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <DhraviqScore score={dhraviqScore} size="sm" showDetails={false} />
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              {/* Score Card - Mobile */}
              <motion.div
                className="sm:hidden dhraviq-card p-6 mb-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DhraviqScore score={dhraviqScore} size="sm" />
              </motion.div>

              {/* Navigation */}
              <DashboardNav
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 pb-24 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {getSectionContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};