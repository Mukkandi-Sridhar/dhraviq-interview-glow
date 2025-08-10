// API Client for Dhraviq Platform
// Handles Phase 1 (AI Analysis) and Phase 2 (Help Coaching) endpoints

export interface DhraviqEvaluation {
  dhraviq_score: number;
  ats_score: number;
  content_score: number;
  impact_score: number;
}

export interface Question {
  id: string;
  category: "technical" | "behavioral" | "hr";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  tags: string[];
  answer?: string;
}

export interface Phase1Response {
  evaluation: DhraviqEvaluation;
  summary: string;
  questions: Question[];
}

export interface CoachResponse {
  model_answer_60s: string;
  key_points: string[];
  common_pitfalls: string[];
  good_phrases: string[];
  followups_to_expect: string[];
}

export interface Phase2Response {
  coach: CoachResponse;
}

class ApiClient {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
  }

  async analyzeResume(resumeText: string): Promise<Phase1Response> {
    const response = await fetch(`${this.baseUrl}/phase1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText })
    });

    if (!response.ok) {
      throw new Error(`Phase 1 API failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getQuestionHelp(question: string, profileText: string): Promise<Phase2Response> {
    const response = await fetch(`${this.baseUrl}/phase2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, profileText })
    });

    if (!response.ok) {
      throw new Error(`Phase 2 API failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();