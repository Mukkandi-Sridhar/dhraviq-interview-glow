import { useState } from "react";
import { motion } from "framer-motion";
import { DhraviqLogo } from "@/components/DhraviqLogo";
import { ResumeUpload } from "@/components/ResumeUpload";
import { Dashboard } from "@/pages/enhanced/Dashboard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleResumeUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload processing
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 3000);
  };

  if (isUploaded) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-dhraviq-bg relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroBackground} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dhraviq-ion/20 via-transparent to-dhraviq-aqua/20" />
      </div>

      {/* Navigation */}
      <motion.nav
        className="relative z-10 p-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <DhraviqLogo />
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <motion.div
            className="space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 bg-dhraviq-ion/10 border border-dhraviq-ion/20 rounded-full px-4 py-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-dhraviq-ion" />
                <span className="text-sm font-medium text-dhraviq-ion">
                  AI-Powered Interview Prep
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-dhraviq-text leading-tight">
                From Résumé to{" "}
                <span className="dhraviq-text-gradient">Ready™</span>
              </h1>

              <p className="text-xl text-dhraviq-muted leading-relaxed max-w-lg">
                Transform your resume into personalized interview questions with AI-powered scoring. 
                Get ready for any technical or HR interview.
              </p>
            </div>

            {/* Features */}
            <motion.div
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { icon: Target, text: "Personalized question generation" },
                { icon: Zap, text: "Real-time Dhraviq Score analysis" },
                { icon: Sparkles, text: "Company-specific interview packs" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-dhraviq-ion/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-dhraviq-ion" />
                  </div>
                  <span className="text-dhraviq-muted">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button 
                variant="premium" 
                size="xl"
                className="group"
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            id="upload-section"
            className="lg:pl-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ResumeUpload 
              onUpload={handleResumeUpload}
              isUploading={isUploading}
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { number: "50K+", label: "Questions Generated" },
            { number: "95%", label: "Success Rate" },
            { number: "500+", label: "Companies Covered" },
            { number: "4.9★", label: "User Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
            >
              <div className="text-2xl lg:text-3xl font-bold dhraviq-text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-dhraviq-muted text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-dhraviq-ion/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dhraviq-aqua/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Index;
