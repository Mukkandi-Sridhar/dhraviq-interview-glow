// Command Palette for Power Users
import { useState, useEffect } from "react";
import { Search, MessageSquare, Building2, Users, HelpCircle } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { Question } from "@/lib/api";

interface CommandPaletteProps {
  questions: Question[];
  onQuestionSelect: (question: Question) => void;
  onSectionChange: (section: string) => void;
}

export function CommandPalette({ questions, onQuestionSelect, onSectionChange }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Search questions, tags, or navigate..." 
        className="text-dhraviq-text"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => {
              onSectionChange("questions");
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Questions</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onSectionChange("company-packs");
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            <Building2 className="mr-2 h-4 w-4" />
            <span>Company Packs</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onSectionChange("hr-bank");
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            <Users className="mr-2 h-4 w-4" />
            <span>HR Bank</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Technical Questions">
          {questions
            .filter(q => q.category === "technical")
            .slice(0, 5)
            .map((question) => (
              <CommandItem
                key={question.id}
                onSelect={() => {
                  onQuestionSelect(question);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <div className="flex-1">
                  <div className="text-sm">
                    {question.question.length > 60 
                      ? `${question.question.substring(0, 60)}...` 
                      : question.question
                    }
                  </div>
                  <div className="text-xs text-dhraviq-muted">
                    {question.difficulty} • {question.tags.slice(0, 2).join(", ")}
                  </div>
                </div>
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandGroup heading="HR & Behavioral">
          {questions
            .filter(q => q.category === "behavioral" || q.category === "hr")
            .slice(0, 3)
            .map((question) => (
              <CommandItem
                key={question.id}
                onSelect={() => {
                  onQuestionSelect(question);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <div className="flex-1">
                  <div className="text-sm">
                    {question.question.length > 60 
                      ? `${question.question.substring(0, 60)}...` 
                      : question.question
                    }
                  </div>
                  <div className="text-xs text-dhraviq-muted">
                    {question.difficulty} • {question.category}
                  </div>
                </div>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}