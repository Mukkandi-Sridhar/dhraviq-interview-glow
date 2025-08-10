// Company Interview Packs Data
import type { Question } from "@/lib/api";

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  questionCount: number;
  difficulty: "mixed" | "medium" | "hard";
  lastUpdated: string;
  featured?: boolean;
}

export const companies: Company[] = [
  {
    id: "google",
    name: "Google",
    logo: "🇬",
    description: "System design, algorithms, and Google-specific culture questions",
    questionCount: 75,
    difficulty: "hard",
    lastUpdated: "2024-01-15",
    featured: true
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "🇲",
    description: "Technical depth, Azure, and collaborative problem-solving",
    questionCount: 68,
    difficulty: "hard",
    lastUpdated: "2024-01-12",
    featured: true
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "🇦",
    description: "Leadership principles, scalability, and customer obsession",
    questionCount: 82,
    difficulty: "hard",
    lastUpdated: "2024-01-18",
    featured: true
  },
  {
    id: "meta",
    name: "Meta",
    logo: "🇫",
    description: "Product thinking, React/JS expertise, and social impact",
    questionCount: 61,
    difficulty: "medium",
    lastUpdated: "2024-01-10",
    featured: true
  },
  {
    id: "apple",
    name: "Apple",
    logo: "🍎",
    description: "iOS development, design principles, and attention to detail",
    questionCount: 54,
    difficulty: "medium",
    lastUpdated: "2024-01-08"
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "🇳",
    description: "Microservices, streaming tech, and data-driven decisions",
    questionCount: 43,
    difficulty: "hard",
    lastUpdated: "2024-01-05"
  },
  {
    id: "uber",
    name: "Uber",
    logo: "🚗",
    description: "Real-time systems, geolocation, and marketplace dynamics",
    questionCount: 47,
    difficulty: "medium",
    lastUpdated: "2024-01-14"
  },
  {
    id: "airbnb",
    name: "Airbnb",
    logo: "🏠",
    description: "Trust & safety, community building, and travel tech",
    questionCount: 39,
    difficulty: "medium",
    lastUpdated: "2024-01-11"
  }
];

// Sample questions for each company (in a real app, these would be loaded from separate files)
export const getCompanyQuestions = (companyId: string): Question[] => {
  const baseQuestions: Record<string, Question[]> = {
    google: [
      {
        id: "google-1",
        category: "technical",
        difficulty: "hard",
        question: "Design a URL shortener like bit.ly that can handle 100M URLs per day.",
        tags: ["system-design", "scalability", "distributed-systems"]
      },
      {
        id: "google-2", 
        category: "technical",
        difficulty: "medium",
        question: "Implement a function to find all anagrams in a list of strings.",
        tags: ["algorithms", "hash-tables", "strings"]
      },
      {
        id: "google-3",
        category: "behavioral",
        difficulty: "medium", 
        question: "Tell me about a time you had to make a decision with incomplete information.",
        tags: ["decision-making", "ambiguity", "leadership"]
      }
    ],
    microsoft: [
      {
        id: "microsoft-1",
        category: "technical",
        difficulty: "hard",
        question: "How would you design a distributed cache system like Redis?",
        tags: ["system-design", "caching", "azure"]
      },
      {
        id: "microsoft-2",
        category: "technical", 
        difficulty: "medium",
        question: "Reverse words in a string while preserving whitespace.",
        tags: ["strings", "algorithms", "parsing"]
      }
    ],
    amazon: [
      {
        id: "amazon-1",
        category: "behavioral",
        difficulty: "medium",
        question: "Describe a time when you had to work with a difficult customer. How did you handle it?",
        tags: ["customer-obsession", "leadership-principles", "conflict-resolution"]
      },
      {
        id: "amazon-2",
        category: "technical",
        difficulty: "hard", 
        question: "Design Amazon's recommendation system.",
        tags: ["machine-learning", "system-design", "personalization"]
      }
    ]
  };

  return baseQuestions[companyId] || [];
};

// HR Bank Questions
export const hrBankQuestions: Question[] = [
  {
    id: "hr-1",
    category: "behavioral",
    difficulty: "easy",
    question: "Tell me about yourself.",
    tags: ["introduction", "communication", "storytelling"]
  },
  {
    id: "hr-2", 
    category: "behavioral",
    difficulty: "medium",
    question: "Describe a time when you failed and how you recovered from it.",
    tags: ["failure", "resilience", "learning"]
  },
  {
    id: "hr-3",
    category: "hr",
    difficulty: "easy", 
    question: "Why do you want to work for our company?",
    tags: ["motivation", "research", "culture-fit"]
  },
  {
    id: "hr-4",
    category: "behavioral",
    difficulty: "medium",
    question: "Give an example of when you had to work under pressure.",
    tags: ["pressure", "time-management", "performance"]
  },
  {
    id: "hr-5",
    category: "behavioral", 
    difficulty: "hard",
    question: "Describe a situation where you had to influence someone without authority.",
    tags: ["influence", "persuasion", "leadership"]
  },
  {
    id: "hr-6",
    category: "hr",
    difficulty: "medium",
    question: "What are your salary expectations?",
    tags: ["compensation", "negotiation", "value"]
  },
  {
    id: "hr-7",
    category: "behavioral",
    difficulty: "medium", 
    question: "Tell me about a time you had to learn something completely new quickly.",
    tags: ["learning", "adaptability", "growth"]
  },
  {
    id: "hr-8",
    category: "hr",
    difficulty: "easy",
    question: "Where do you see yourself in 5 years?", 
    tags: ["career-planning", "ambition", "growth"]
  }
];