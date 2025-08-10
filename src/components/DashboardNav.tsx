import { motion } from "framer-motion";
import { MessageSquare, Building2, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface DashboardNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

const navItems: NavItem[] = [
  {
    id: "questions",
    label: "Questions",
    icon: <MessageSquare className="w-5 h-5" />,
    count: 12
  },
  {
    id: "company-packs",
    label: "Company Packs",
    icon: <Building2 className="w-5 h-5" />,
    count: 5
  },
  {
    id: "hr-bank",
    label: "HR Bank",
    icon: <Users className="w-5 h-5" />,
    count: 25
  }
];

export const DashboardNav = ({ 
  activeSection, 
  onSectionChange, 
  className = "" 
}: DashboardNavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 right-4 z-50 dhraviq-card"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dhraviq-bg/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-80 dhraviq-card-elevated z-50 p-6 md:hidden"
        >
          <div className="pt-16">
            <MobileNavContent
              activeSection={activeSection}
              onSectionChange={(section) => {
                onSectionChange(section);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Desktop Navigation */}
      <motion.nav
        className={`hidden md:flex flex-col gap-2 ${className}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            onClick={() => onSectionChange(item.id)}
          />
        ))}
      </motion.nav>

      {/* Mobile Bottom Navigation (Alternative approach) */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 right-0 dhraviq-card-elevated border-t border-dhraviq-seam p-4 z-30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? "text-dhraviq-ion bg-dhraviq-ion/10"
                  : "text-dhraviq-muted hover:text-dhraviq-text hover:bg-dhraviq-elevated"
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
              {item.count && (
                <span className="text-xs bg-dhraviq-ion text-dhraviq-text px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

const NavButton = ({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: NavItem; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`
      flex items-center justify-between w-full p-4 rounded-xl text-left transition-all duration-200
      ${isActive 
        ? "dhraviq-card-elevated text-dhraviq-ion shadow-dhraviq-glow/50" 
        : "hover:bg-dhraviq-elevated text-dhraviq-muted hover:text-dhraviq-text"
      }
    `}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    variants={{
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    }}
  >
    <div className="flex items-center gap-3">
      {item.icon}
      <span className="font-medium">{item.label}</span>
    </div>
    {item.count && (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        isActive 
          ? "bg-dhraviq-ion text-dhraviq-text" 
          : "bg-dhraviq-surface text-dhraviq-muted"
      }`}>
        {item.count}
      </span>
    )}
  </motion.button>
);

const MobileNavContent = ({ 
  activeSection, 
  onSectionChange 
}: { 
  activeSection: string; 
  onSectionChange: (section: string) => void; 
}) => (
  <div className="flex flex-col gap-2">
    {navItems.map((item) => (
      <NavButton
        key={item.id}
        item={item}
        isActive={activeSection === item.id}
        onClick={() => onSectionChange(item.id)}
      />
    ))}
  </div>
);