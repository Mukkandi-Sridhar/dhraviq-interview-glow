import { useState } from "react";
import { motion } from "framer-motion";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { ProfessionalUpload } from "@/components/upload/ProfessionalUpload";
import { ProfessionalDashboard } from "@/pages/enhanced/ProfessionalDashboard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Zap, 
  CheckCircle,
  Clock,
  Users,
  Trophy,
  Star,
  Play,
  Globe,
  Code,
  Briefcase,
  X
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleResumeUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload processing
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 3000);
  };

  const handleDomainSelect = async (domain: string, role: string) => {
    setIsUploading(true);
    
    // Simulate domain processing
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 2000);
  };

  if (isUploaded) {
    return <ProfessionalDashboard onBack={() => setIsUploaded(false)} />;
  }

  return (
    <div className="min-h-screen bg-dhraviq-bg relative">
      {/* Sticky Header */}
      <StickyHeader 
        showMobileMenu={showMobileMenu}
        onMobileMenuToggle={() => setShowMobileMenu(!showMobileMenu)}
        onUploadClick={() => setShowUploadModal(true)}
        onDomainClick={() => setShowUploadModal(true)}
      />

      {/* Hero Background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroBackground} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dhraviq-ion/30 via-dhraviq-bg/50 to-dhraviq-aqua/20" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-dhraviq-ion/3 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dhraviq-aqua/3 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-dhraviq-mint/3 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 sm:pt-24">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 dhraviq-surface border border-dhraviq-seam rounded-full px-6 py-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-dhraviq-ion" />
              <span className="text-sm font-semibold text-dhraviq-ion">
                AI-Powered Interview Preparation Platform
              </span>
            </motion.div>

            {/* Hero Title */}
            <motion.div
              className="space-y-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-dhraviq-text leading-tight tracking-tight">
                From Résumé to{" "}
                <span className="dhraviq-text-gradient">Ready™</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-dhraviq-muted leading-relaxed max-w-2xl mx-auto">
                Transform your profile into personalized interview questions with AI-powered analysis. 
                Master technical interviews, behavioral questions, and company-specific preparation.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                variant="premium" 
                size="xl"
                className="group min-w-[200px]"
                onClick={() => setShowUploadModal(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Preparation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                className="min-w-[200px] text-dhraviq-muted border-dhraviq-seam hover:border-dhraviq-ion/30"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Target, 
                title: "Smart Question Generation",
                description: "AI analyzes your profile to create personalized technical and behavioral questions",
                color: "dhraviq-ion"
              },
              { 
                icon: Zap, 
                title: "Real-time Dhraviq Score",
                description: "Get instant feedback with ATS-style scoring for content, impact, and readability",
                color: "dhraviq-aqua"
              },
              { 
                icon: Globe, 
                title: "Company-Specific Prep",
                description: "Access curated question banks for top tech companies and startups",
                color: "dhraviq-mint"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="dhraviq-card p-8 text-center hover:shadow-dhraviq-md transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-${feature.color}/10 flex items-center justify-center`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-dhraviq-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-dhraviq-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="dhraviq-card-elevated p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dhraviq-text mb-4">
                Trusted by Interview Champions
              </h2>
              <p className="text-dhraviq-muted">
                Join thousands of professionals who've mastered their interviews
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Questions Generated", icon: Target },
                { number: "95%", label: "Success Rate", icon: CheckCircle },
                { number: "500+", label: "Companies Covered", icon: Briefcase },
                { number: "4.9★", label: "User Rating", icon: Star }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-3"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-dhraviq-ion/10 flex items-center justify-center mb-4">
                    <stat.icon className="w-6 h-6 text-dhraviq-ion" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold dhraviq-text-gradient">
                    {stat.number}
                  </div>
                  <div className="text-dhraviq-muted text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="dhraviq-card p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-dhraviq-text mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-dhraviq-muted mb-8 max-w-2xl mx-auto">
              Get started in seconds. Upload your resume or select your domain to receive 
              personalized interview questions powered by AI.
            </p>
            <Button 
              variant="premium" 
              size="xl"
              className="group"
              onClick={() => setShowUploadModal(true)}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Preparation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="absolute inset-0 bg-dhraviq-bg/80 backdrop-blur-sm"
            onClick={() => setShowUploadModal(false)}
          />
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="dhraviq-card-elevated p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-dhraviq-text">
                  Choose Your Preparation Method
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUploadModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <ProfessionalUpload
                onResumeUpload={handleResumeUpload}
                onDomainSelect={handleDomainSelect}
                isUploading={isUploading}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
