import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
  className?: string;
}

export const ResumeUpload = ({ onUpload, isUploading = false, className = "" }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files: File[]) => {
    const file = files[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    setUploadedFile(file);
    onUpload(file);
    
    toast({
      title: "Resume uploaded successfully",
      description: `Processing ${file.name}...`
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFileSelection(files);
  };

  return (
    <motion.div
      className={`dhraviq-card p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dhraviq-text mb-2">
          Upload Your Resume
        </h2>
        <p className="text-dhraviq-muted">
          Upload your resume to generate personalized interview questions
        </p>
      </div>

      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center
          transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-dhraviq-ion bg-dhraviq-ion/5' 
            : uploadedFile 
              ? 'border-dhraviq-mint bg-dhraviq-mint/5'
              : 'border-dhraviq-muted/30 hover:border-dhraviq-ion/50 hover:bg-dhraviq-elevated/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragOver ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {uploadedFile ? (
            <CheckCircle className="w-16 h-16 text-dhraviq-mint mx-auto mb-4" />
          ) : isUploading ? (
            <div className="w-16 h-16 mx-auto mb-4 animate-spin">
              <div className="w-full h-full border-4 border-dhraviq-ion/20 border-t-dhraviq-ion rounded-full"></div>
            </div>
          ) : (
            <Upload className="w-16 h-16 text-dhraviq-muted mx-auto mb-4" />
          )}
        </motion.div>

        {uploadedFile ? (
          <div>
            <h3 className="text-lg font-semibold text-dhraviq-text mb-2">
              Resume Uploaded Successfully
            </h3>
            <div className="flex items-center justify-center gap-2 text-dhraviq-muted">
              <FileText className="w-4 h-4" />
              <span>{uploadedFile.name}</span>
            </div>
          </div>
        ) : isUploading ? (
          <div>
            <h3 className="text-lg font-semibold text-dhraviq-text mb-2">
              Processing Resume...
            </h3>
            <p className="text-dhraviq-muted">
              Analyzing your resume with AI
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-dhraviq-text mb-2">
              {isDragOver ? "Drop your resume here" : "Drag & drop your resume"}
            </h3>
            <p className="text-dhraviq-muted mb-4">
              Or click to browse files
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-dhraviq-subtle">
              <AlertCircle className="w-4 h-4" />
              <span>PDF, DOC, DOCX up to 10MB</span>
            </div>
          </div>
        )}
      </motion.div>

      {!uploadedFile && !isUploading && (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            variant="dhraviq" 
            size="lg" 
            className="w-full"
            onClick={handleButtonClick}
          >
            Choose File
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};