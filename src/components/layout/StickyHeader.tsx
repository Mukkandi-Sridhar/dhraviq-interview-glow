import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  Bell, 
  Search,
  Command,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DhraviqLogo } from "@/components/DhraviqLogo";
import { CommandPalette } from "@/components/CommandPalette";

interface StickyHeaderProps {
  showMobileMenu: boolean;
  onMobileMenuToggle: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onUploadClick?: () => void;
  onDomainClick?: () => void;
}

export function StickyHeader({ 
  showMobileMenu, 
  onMobileMenuToggle, 
  user,
  onUploadClick,
  onDomainClick
}: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'dhraviq-card-elevated backdrop-blur-xl border-b border-dhraviq-seam' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <DhraviqLogo size="sm" className="cursor-pointer" />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCommandPalette(true)}
                  className="text-dhraviq-muted hover:text-dhraviq-text"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Quick Search
                  <Badge variant="outline" className="ml-2 text-xs">
                    ⌘K
                  </Badge>
                </Button>
                
                {onUploadClick && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onUploadClick}
                    className="text-dhraviq-ion border-dhraviq-ion/20 hover:bg-dhraviq-ion/10"
                  >
                    Upload Resume
                  </Button>
                )}
                
                {onDomainClick && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDomainClick}
                    className="text-dhraviq-aqua border-dhraviq-aqua/20 hover:bg-dhraviq-aqua/10"
                  >
                    Select Domain
                  </Button>
                )}
              </motion.div>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.div
                className="hidden sm:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-dhraviq-muted" />
                  <Badge 
                    className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-dhraviq-error border-none"
                    variant="destructive"
                  />
                </Button>
              </motion.div>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-2 text-dhraviq-muted hover:text-dhraviq-text"
                    >
                      <div className="w-8 h-8 rounded-full bg-dhraviq-ion/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-dhraviq-ion" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium">
                        {user.name}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 dhraviq-card border-dhraviq-seam"
                  >
                    <DropdownMenuLabel className="text-dhraviq-text">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-dhraviq-seam" />
                    <DropdownMenuItem className="text-dhraviq-muted hover:text-dhraviq-text hover:bg-dhraviq-elevated">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-dhraviq-muted hover:text-dhraviq-text hover:bg-dhraviq-elevated">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-dhraviq-muted hover:text-dhraviq-text hover:bg-dhraviq-elevated">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help & Support
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="dhraviq" size="sm">
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onMobileMenuToggle}
              >
                <AnimatePresence mode="wait">
                  {showMobileMenu ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="lg:hidden border-t border-dhraviq-seam dhraviq-surface"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-dhraviq-muted"
                  onClick={() => setShowCommandPalette(true)}
                >
                  <Search className="w-4 h-4 mr-3" />
                  Quick Search
                </Button>
                
                {onUploadClick && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-dhraviq-ion border-dhraviq-ion/20"
                    onClick={onUploadClick}
                  >
                    Upload Resume
                  </Button>
                )}
                
                {onDomainClick && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-dhraviq-aqua border-dhraviq-aqua/20"
                    onClick={onDomainClick}
                  >
                    Select Domain
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Command Palette */}
      <CommandPalette 
        open={showCommandPalette}
        onOpenChange={setShowCommandPalette}
      />
    </>
  );
}