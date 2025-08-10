// Gmail Capture Modal for Phase 2 Gate
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { gmailManager } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface GmailCaptureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function GmailCapture({ open, onOpenChange, onSuccess }: GmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await gmailManager.saveGmail(email);
      
      if (success) {
        toast({
          title: "Email saved",
          description: "You now have access to AI coaching answers!",
        });
        onSuccess();
        onOpenChange(false);
      } else {
        throw new Error("Failed to save email");
      }
    } catch (error) {
      toast({
        title: "Error saving email",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-10 h-10 rounded-lg bg-dhraviq-ion/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-dhraviq-ion" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Unlock AI Coaching
            </DialogTitle>
          </motion.div>
          
          <DialogDescription className="text-dhraviq-muted">
            Get personalized answers and coaching tips for each question. 
            Your email is stored securely and used only for this session.
          </DialogDescription>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-dhraviq-surface/50 border border-dhraviq-seam">
            <Shield className="w-4 h-4 text-dhraviq-mint mt-0.5 shrink-0" />
            <div className="text-xs text-dhraviq-muted">
              <strong className="text-dhraviq-mint">Privacy Protected:</strong> Your email is encrypted and never shared. 
              Used only to unlock coaching features for this session.
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !email}
              className="flex-1 group"
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  Unlock Coaching
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}