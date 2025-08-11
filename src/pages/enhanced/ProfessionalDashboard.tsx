import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText,
  Target,
  Building,
  Users,
  Search,
  Filter,
  ChevronDown,
  ArrowLeft,
  Share2,
  Download,
  Settings,
  HelpCircle,
  Star,
  Trophy,
  Zap,
  Clock,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Calendar,
  Bookmark,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { DhraviqScore } from "@/components/DhraviqScore";
import { QuestionCard } from "@/components/enhanced/QuestionCard";
import { CompanyCard } from "@/components/enhanced/CompanyCard";
import { GmailCapture } from "@/components/GmailCapture";
import { useSession } from "@/hooks/useSession";
import { companies } from "@/data/companies";
import type { Question } from "@/lib/api";

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "Explain the difference between var, let, and const in JavaScript.",
    category: "technical",
    difficulty: "medium",
    tags: ["javascript", "fundamentals", "variables"]
  },
  {
    id: "q2", 
    question: "Tell me about a time when you had to work with a difficult team member.",
    category: "hr",
    difficulty: "medium",
    tags: ["teamwork", "conflict-resolution", "communication"]
  },
  {
    id: "q3",
    question: "How would you implement a debounce function in React?",
    category: "technical", 
    difficulty: "hard",
    tags: ["react", "performance", "hooks"]
  }
];

const HR_QUESTIONS: Question[] = [
  {
    id: "hr1",
    question: "Why do you want to work for our company?",
    category: "hr",
    difficulty: "easy",
    tags: ["motivation", "research", "company-fit"]
  },
  {
    id: "hr2",
    question: "Describe a challenging project you've worked on.",
    category: "hr", 
    difficulty: "medium",
    tags: ["problem-solving", "projects", "achievements"]
  },
  {
    id: "hr3",
    question: "Where do you see yourself in 5 years?",
    category: "hr",
    difficulty: "easy", 
    tags: ["career-goals", "ambition", "planning"]
  }
];

interface ProfessionalDashboardProps {
  onBack?: () => void;
}

export function ProfessionalDashboard({ onBack }: ProfessionalDashboardProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showGmailCapture, setShowGmailCapture] = useState(false);
  const [helpAnswers, setHelpAnswers] = useState<Record<string, string>>({});
  const [visibleAnswers, setVisibleAnswers] = useState<Set<string>>(new Set());
  const [loadingHelp, setLoadingHelp] = useState<Set<string>>(new Set());
  
  const { session, isLoading } = useSession();

  const mockUser = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/api/placeholder/32/32"
  };

  const mockAnalysis = {
    dhraviq_score: 87,
    ats_score: 92,
    content_score: 85,
    impact_score: 83,
    summary: "Strong full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Excellent track record of leading technical projects and mentoring junior developers."
  };

  const handleHelpRequest = async (questionId: string) => {
    if (!session?.email) {
      setShowGmailCapture(true);
      return;
    }

    setLoadingHelp(prev => new Set([...prev, questionId]));
    
    // Simulate API call
    setTimeout(() => {
      setHelpAnswers(prev => ({
        ...prev,
        [questionId]: "This is a comprehensive answer that covers the key points you should mention in your response. Focus on specific examples from your experience and demonstrate your problem-solving approach."
      }));
      setLoadingHelp(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
      setVisibleAnswers(prev => new Set([...prev, questionId]));
    }, 2000);
  };

  const toggleAnswerVisibility = (questionId: string) => {
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

  const filteredQuestions = SAMPLE_QUESTIONS.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const filteredHRQuestions = HR_QUESTIONS.filter(q => {
    return q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dhraviq-bg flex items-center justify-center">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-dhraviq-ion/10 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-dhraviq-ion" />
            </motion.div>
          </div>
          <p className="text-dhraviq-muted">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dhraviq-bg">
      {/* Sticky Header */}
      <StickyHeader 
        showMobileMenu={showMobileMenu}
        onMobileMenuToggle={() => setShowMobileMenu(!showMobileMenu)}
        user={mockUser}
      />

      {/* Main Content */}
      <div className="pt-20 sm:pt-24">
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {onBack && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="text-dhraviq-muted hover:text-dhraviq-text"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                )}
                <h1 className="text-3xl lg:text-4xl font-bold text-dhraviq-text">
                  Interview Dashboard
                </h1>
                <Badge variant="outline" className="text-dhraviq-ion border-dhraviq-ion/20">
                  Premium
                </Badge>
              </div>
              <p className="text-dhraviq-muted text-lg">
                {mockAnalysis.summary}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Dhraviq Score Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DhraviqScore 
              score={mockAnalysis.dhraviq_score}
              animated={true}
            />
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              {/* Tab Navigation */}
              <div className="dhraviq-card p-2">
                <TabsList className="grid w-full grid-cols-3 bg-transparent gap-2">
                  <TabsTrigger 
                    value="questions" 
                    className="dhraviq-surface data-[state=active]:bg-dhraviq-ion data-[state=active]:text-dhraviq-text flex items-center gap-2"
                  >
                    <Target className="w-4 h-4" />
                    <span className="hidden sm:inline">Technical Questions</span>
                    <span className="sm:hidden">Tech</span>
                    <Badge variant="secondary" className="ml-2">
                      {filteredQuestions.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="companies"
                    className="dhraviq-surface data-[state=active]:bg-dhraviq-aqua data-[state=active]:text-dhraviq-text flex items-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    <span className="hidden sm:inline">Companies</span>
                    <span className="sm:hidden">Comp</span>
                    <Badge variant="secondary" className="ml-2">
                      {companies.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="hr"
                    className="dhraviq-surface data-[state=active]:bg-dhraviq-mint data-[state=active]:text-dhraviq-text flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">HR Questions</span>
                    <span className="sm:hidden">HR</span>
                    <Badge variant="secondary" className="ml-2">
                      {filteredHRQuestions.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Search and Filters */}
              <div className="dhraviq-card p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-dhraviq-muted" />
                    <Input
                      placeholder="Search questions, tags, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 dhraviq-surface border-dhraviq-seam text-dhraviq-text placeholder:text-dhraviq-muted"
                    />
                  </div>
                  
                  {activeTab === "questions" && (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="dhraviq-surface border-dhraviq-seam">
                            <Filter className="w-4 h-4 mr-2" />
                            Difficulty
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dhraviq-card border-dhraviq-seam">
                          <DropdownMenuItem onClick={() => setSelectedDifficulty("all")}>
                            All Levels
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedDifficulty("easy")}>
                            Easy
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedDifficulty("medium")}>
                            Medium
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedDifficulty("hard")}>
                            Hard
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="dhraviq-surface border-dhraviq-seam">
                            <Tag className="w-4 h-4 mr-2" />
                            Category
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="dhraviq-card border-dhraviq-seam">
                          <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                            All Categories
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("technical")}>
                            Technical
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedCategory("behavioral")}>
                            Behavioral
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <TabsContent value="questions" className="space-y-6">
                <motion.div
                  className="grid gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredQuestions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <QuestionCard
                        question={question}
                        onHelpRequest={handleHelpRequest}
                        onAnswerToggle={toggleAnswerVisibility}
                        isAnswerVisible={visibleAnswers.has(question.id)}
                        helpAnswer={helpAnswers[question.id]}
                        isLoadingHelp={loadingHelp.has(question.id)}
                      />
                    </motion.div>
                  ))}
                  
                  {filteredQuestions.length === 0 && (
                    <div className="text-center py-12">
                      <Search className="w-16 h-16 mx-auto text-dhraviq-muted mb-4" />
                      <h3 className="text-xl font-semibold text-dhraviq-text mb-2">
                        No questions found
                      </h3>
                      <p className="text-dhraviq-muted">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="companies" className="space-y-6">
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {companies.map((company, index) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CompanyCard 
                        company={company}
                        index={index}
                        onSelect={() => console.log("Selected:", company.name)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="hr" className="space-y-6">
                <motion.div
                  className="grid gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredHRQuestions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <QuestionCard
                        question={question}
                        onHelpRequest={handleHelpRequest}
                        onAnswerToggle={toggleAnswerVisibility}
                        isAnswerVisible={visibleAnswers.has(question.id)}
                        helpAnswer={helpAnswers[question.id]}
                        isLoadingHelp={loadingHelp.has(question.id)}
                      />
                    </motion.div>
                  ))}
                  
                  {filteredHRQuestions.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 mx-auto text-dhraviq-muted mb-4" />
                      <h3 className="text-xl font-semibold text-dhraviq-text mb-2">
                        No HR questions found
                      </h3>
                      <p className="text-dhraviq-muted">
                        Try adjusting your search terms
                      </p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Gmail Capture Modal */}
      <GmailCapture 
        open={showGmailCapture}
        onOpenChange={setShowGmailCapture}
      />
    </div>
  );
}