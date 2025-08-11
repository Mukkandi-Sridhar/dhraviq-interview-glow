import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Loader2, 
  AlertCircle,
  Globe,
  Code,
  Briefcase,
  Zap,
  Target,
  ArrowRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ProfessionalUploadProps {
  onResumeUpload: (file: File) => Promise<void>;
  onDomainSelect: (domain: string, role: string) => Promise<void>;
  isUploading: boolean;
  className?: string;
}

const TECH_DOMAINS = [
  { value: "frontend", label: "Frontend Development", icon: Code },
  { value: "backend", label: "Backend Development", icon: Code },
  { value: "fullstack", label: "Full Stack Development", icon: Code },
  { value: "mobile", label: "Mobile Development", icon: Code },
  { value: "devops", label: "DevOps Engineering", icon: Target },
  { value: "data", label: "Data Science", icon: Zap },
  { value: "ml", label: "Machine Learning", icon: Zap },
  { value: "security", label: "Cybersecurity", icon: Target },
  { value: "product", label: "Product Management", icon: Briefcase },
  { value: "design", label: "UI/UX Design", icon: Briefcase },
];

const ROLE_LEVELS = [
  { value: "junior", label: "Junior (0-2 years)" },
  { value: "mid", label: "Mid-level (2-5 years)" },
  { value: "senior", label: "Senior (5-8 years)" },
  { value: "lead", label: "Lead/Principal (8+ years)" },
  { value: "manager", label: "Engineering Manager" },
];

export function ProfessionalUpload({ 
  onResumeUpload, 
  onDomainSelect, 
  isUploading, 
  className = "" 
}: ProfessionalUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [uploadMode, setUploadMode] = useState<"resume" | "domain" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files[0]);
  }, []);

  const handleFileSelection = useCallback((file: File) => {
    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setUploadMode("resume");
    onResumeUpload(file);
  }, [onResumeUpload, toast]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  }, [handleFileSelection]);

  const handleDomainSubmit = useCallback(() => {
    if (!selectedDomain || !selectedRole) {
      toast({
        title: "Missing information",
        description: "Please select both domain and role level.",
        variant: "destructive",
      });
      return;
    }

    setUploadMode("domain");
    onDomainSelect(selectedDomain, selectedRole);
  }, [selectedDomain, selectedRole, onDomainSelect, toast]);

  if (isUploading) {
    return (
      <motion.div
        className={`dhraviq-card p-12 text-center ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-dhraviq-ion/10 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-dhraviq-ion" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-dhraviq-text mb-2">
          Analyzing Your Profile
        </h3>
        <p className="text-dhraviq-muted">
          Our AI is creating personalized interview questions...
        </p>
        
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-dhraviq-ion rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Mode Selection */}
      {!uploadMode && (
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-dhraviq-text">
              Start Your Interview Prep
            </h2>
            <p className="text-dhraviq-muted text-lg">
              Choose how you'd like to begin your personalized preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Resume Upload Option */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="dhraviq-card p-8 cursor-pointer hover:shadow-dhraviq-md transition-all duration-300 border-2 border-transparent hover:border-dhraviq-ion/30"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-dhraviq-ion/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-dhraviq-ion" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dhraviq-text mb-2">
                      Upload Resume
                    </h3>
                    <p className="text-dhraviq-muted">
                      Get personalized questions based on your actual experience and skills
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="text-dhraviq-ion border-dhraviq-ion/20">
                      PDF
                    </Badge>
                    <Badge variant="outline" className="text-dhraviq-ion border-dhraviq-ion/20">
                      DOC
                    </Badge>
                    <Badge variant="outline" className="text-dhraviq-ion border-dhraviq-ion/20">
                      DOCX
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Domain Selection Option */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="dhraviq-card p-8 cursor-pointer hover:shadow-dhraviq-md transition-all duration-300 border-2 border-transparent hover:border-dhraviq-aqua/30"
                onClick={() => setUploadMode("domain")}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-dhraviq-aqua/10 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-dhraviq-aqua" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dhraviq-text mb-2">
                      Select Domain
                    </h3>
                    <p className="text-dhraviq-muted">
                      Choose your field and role level for curated interview questions
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="text-dhraviq-aqua border-dhraviq-aqua/20">
                      Frontend
                    </Badge>
                    <Badge variant="outline" className="text-dhraviq-aqua border-dhraviq-aqua/20">
                      Backend
                    </Badge>
                    <Badge variant="outline" className="text-dhraviq-aqua border-dhraviq-aqua/20">
                      Data Science
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Resume Upload Interface */}
      {uploadMode === "resume" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-dhraviq-text">
              Upload Your Resume
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setUploadMode(null)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <motion.div
            className={`dhraviq-card p-12 border-2 border-dashed transition-all duration-300 ${
              isDragOver 
                ? 'border-dhraviq-ion bg-dhraviq-ion/5' 
                : 'border-dhraviq-seam hover:border-dhraviq-ion/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center space-y-6">
              <AnimatePresence mode="wait">
                {uploadedFile ? (
                  <motion.div
                    key="uploaded"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="w-16 h-16 mx-auto text-dhraviq-mint" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isDragOver ? 'bg-dhraviq-ion text-dhraviq-text' : 'bg-dhraviq-ion/10 text-dhraviq-ion'
                    }`}
                  >
                    <Upload className="w-8 h-8" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <h4 className="text-xl font-semibold text-dhraviq-text mb-2">
                  {uploadedFile ? 'Resume Uploaded Successfully!' : 'Drop your resume here'}
                </h4>
                <p className="text-dhraviq-muted">
                  {uploadedFile 
                    ? `${uploadedFile.name} (${(uploadedFile.size / 1024 / 1024).toFixed(1)}MB)` 
                    : 'Or click to browse files (PDF, DOC, DOCX up to 10MB)'
                  }
                </p>
              </div>

              {!uploadedFile && (
                <Button variant="outline" size="lg">
                  Choose File
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Domain Selection Interface */}
      {uploadMode === "domain" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-dhraviq-text">
              Select Your Domain
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setUploadMode(null)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="dhraviq-card p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-medium text-dhraviq-text">
                Technology Domain
              </label>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="dhraviq-surface border-dhraviq-seam">
                  <SelectValue placeholder="Choose your specialization" />
                </SelectTrigger>
                <SelectContent className="dhraviq-card border-dhraviq-seam">
                  {TECH_DOMAINS.map((domain) => (
                    <SelectItem key={domain.value} value={domain.value}>
                      <div className="flex items-center space-x-2">
                        <domain.icon className="w-4 h-4" />
                        <span>{domain.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-dhraviq-seam" />

            <div className="space-y-4">
              <label className="text-sm font-medium text-dhraviq-text">
                Experience Level
              </label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="dhraviq-surface border-dhraviq-seam">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="dhraviq-card border-dhraviq-seam">
                  {ROLE_LEVELS.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="dhraviq"
              size="lg"
              className="w-full"
              onClick={handleDomainSubmit}
              disabled={!selectedDomain || !selectedRole}
            >
              Generate Questions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}