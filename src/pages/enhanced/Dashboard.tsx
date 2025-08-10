// Enhanced Dashboard with Structured Architecture
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DhraviqLogo } from "@/components/DhraviqLogo";
import { DhraviqScore } from "@/components/DhraviqScore";
import { DashboardNav } from "@/components/DashboardNav";
import { QuestionCard } from "@/components/enhanced/QuestionCard";
import { CompanyCard } from "@/components/enhanced/CompanyCard";
import { GmailCapture } from "@/components/GmailCapture";
import { CommandPalette } from "@/components/CommandPalette";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Settings, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/hooks/useSession";
import { apiClient } from "@/lib/api";
import { storage } from "@/lib/storage";
import { gmailManager } from "@/lib/firebase";
import { companies, getCompanyQuestions, hrBankQuestions } from "@/data/companies";
import type { Question } from "@/lib/api";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("questions");
  const [visibleAnswers, setVisibleAnswers] = useState<Set<string>>(new Set());
  const [loadingHelp, setLoadingHelp] = useState<Set<string>>(new Set());
  const [helpAnswers, setHelpAnswers] = useState<Record<string, string>>({});
  const [showGmailCapture, setShowGmailCapture] = useState(false);
  const [pendingHelpRequest, setPendingHelpRequest] = useState<string | null>(null);
  
  const { session } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Cache HR Bank questions
  useEffect(() => {
    storage.preloadHRBank(hrBankQuestions);
  }, []);

  const handleHelpRequest = async (questionId: string) => {
    if (!session) {
      toast({
        title: "No session found",
        description: "Please upload your resume first.",
        variant: "destructive"
      });
      return;
    }

    // Check if we already have the answer cached
    const cachedAnswer = await storage.getAnswer(questionId, session.id);
    if (cachedAnswer) {
      setHelpAnswers(prev => ({ ...prev, [questionId]: cachedAnswer }));
      setVisibleAnswers(prev => new Set([...prev, questionId]));
      return;
    }

    // Check if user has Gmail saved
    const hasGmail = await gmailManager.hasGmail();
    if (!hasGmail) {
      setPendingHelpRequest(questionId);
      setShowGmailCapture(true);
      return;
    }

    await fetchHelpAnswer(questionId);
  };

  const fetchHelpAnswer = async (questionId: string) => {
    if (!session) return;

    const question = [...session.analysis.questions, ...hrBankQuestions]
      .find(q => q.id === questionId);
    
    if (!question) return;

    setLoadingHelp(prev => new Set([...prev, questionId]));

    try {
      const response = await apiClient.getQuestionHelp(
        question.question,
        session.resumeText
      );

      const answer = response.coach.model_answer_60s;
      setHelpAnswers(prev => ({ ...prev, [questionId]: answer }));
      setVisibleAnswers(prev => new Set([...prev, questionId]));
      
      // Cache the answer
      await storage.saveAnswer(questionId, session.id, answer);

      toast({
        title: "AI coaching ready",
        description: "Here's your personalized answer!"
      });
    } catch (error) {
      toast({
        title: "Failed to get help",
        description: "Please try again or check your connection.",
        variant: "destructive"
      });
    } finally {
      setLoadingHelp(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
  };

  const handleGmailSuccess = async () => {
    if (pendingHelpRequest) {
      await fetchHelpAnswer(pendingHelpRequest);
      setPendingHelpRequest(null);
    }
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

  const handleQuestionSelect = (question: Question) => {
    // Navigate to the question and show it
    if (question.category === "hr" || question.category === "behavioral") {
      setActiveSection("hr-bank");
    } else {
      setActiveSection("questions");
    }
  };

  const getSectionContent = () => {
    if (!session) {
      return (
        <div className="text-center py-12">
          <p className="text-dhraviq-muted">No session found. Please upload your resume.</p>
        </div>
      );
    }

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
              {session.analysis.questions.map((question, index) => (
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
                    helpAnswer={helpAnswers[question.id]}
                    isLoadingHelp={loadingHelp.has(question.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case "company-packs":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dhraviq-text">
                Company Interview Packs
              </h2>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company, index) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onSelect={(companyId) => {
                    toast({
                      title: `${company.name} Practice`,
                      description: "Loading company-specific questions..."
                    });
                  }}
                  index={index}
                />
              ))}
            </div>
          </div>
        );
      
      case "hr-bank":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dhraviq-text">
                HR Question Bank
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {hrBankQuestions.map((question, index) => (
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
                    helpAnswer={helpAnswers[question.id]}
                    isLoadingHelp={loadingHelp.has(question.id)}
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

  const allQuestions = session 
    ? [...session.analysis.questions, ...hrBankQuestions]
    : hrBankQuestions;

  return (
    <div className="min-h-screen bg-dhraviq-bg">
      {/* Command Palette */}
      <CommandPalette
        questions={allQuestions}
        onQuestionSelect={handleQuestionSelect}
        onSectionChange={setActiveSection}
      />

      {/* Gmail Capture Modal */}
      <GmailCapture
        open={showGmailCapture}
        onOpenChange={setShowGmailCapture}
        onSuccess={handleGmailSuccess}
      />

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
              {session && (
                <div className="hidden sm:block">
                  <DhraviqScore 
                    score={session.analysis.evaluation.dhraviq_score} 
                    size="sm" 
                    showDetails={false} 
                  />
                </div>
              )}
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
              {session && (
                <motion.div
                  className="sm:hidden dhraviq-card p-6 mb-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <DhraviqScore score={session.analysis.evaluation.dhraviq_score} size="sm" />
                </motion.div>
              )}

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
}