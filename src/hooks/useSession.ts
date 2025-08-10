// Session Management Hook
import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import type { Phase1Response } from '@/lib/api';

interface SessionData {
  id: string;
  resumeText: string;
  analysis: Phase1Response;
}

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLastSession();
  }, []);

  const loadLastSession = async () => {
    try {
      setIsLoading(true);
      const lastSession = await storage.getLastSession();
      setSession(lastSession);
    } catch (error) {
      console.error('Failed to load last session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async (resumeText: string, analysis: Phase1Response) => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      await storage.saveSession(sessionId, resumeText, analysis);
      const newSession = { id: sessionId, resumeText, analysis };
      setSession(newSession);
      return newSession;
    } catch (error) {
      console.error('Failed to create session:', error);
      throw error;
    }
  };

  const clearSession = () => {
    setSession(null);
  };

  return {
    session,
    isLoading,
    createSession,
    clearSession,
    reload: loadLastSession
  };
}