// IndexedDB Storage Layer for Offline Support
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Phase1Response, Question } from './api';

interface DhraviqDB extends DBSchema {
  sessions: {
    key: string;
    value: {
      id: string;
      resumeText: string;
      analysis: Phase1Response;
      createdAt: number;
      lastAccessed: number;
    };
    indexes: { 'lastAccessed': number };
  };
  answers: {
    key: string;
    value: {
      id: string;
      questionId: string;
      sessionId: string;
      answer: string;
      createdAt: number;
    };
    indexes: { 'questionId': string; 'sessionId': string };
  };
  companies: {
    key: string;
    value: {
      id: string;
      name: string;
      logo: string;
      questions: Question[];
      updatedAt: number;
    };
  };
  hrBank: {
    key: string;
    value: Question;
  };
}

class StorageManager {
  private db: IDBPDatabase<DhraviqDB> | null = null;

  async init(): Promise<void> {
    this.db = await openDB<DhraviqDB>('dhraviq', 1, {
      upgrade(db) {
        // Sessions store
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
          sessionStore.createIndex('lastAccessed', 'lastAccessed');
        }

        // Answers store
        if (!db.objectStoreNames.contains('answers')) {
          const answerStore = db.createObjectStore('answers', { keyPath: 'id' });
          answerStore.createIndex('questionId', 'questionId');
          answerStore.createIndex('sessionId', 'sessionId');
        }

        // Companies store
        if (!db.objectStoreNames.contains('companies')) {
          db.createObjectStore('companies', { keyPath: 'id' });
        }

        // HR Bank store
        if (!db.objectStoreNames.contains('hrBank')) {
          db.createObjectStore('hrBank', { keyPath: 'id' });
        }
      },
    });
  }

  async saveSession(id: string, resumeText: string, analysis: Phase1Response): Promise<void> {
    if (!this.db) await this.init();
    
    await this.db!.put('sessions', {
      id,
      resumeText,
      analysis,
      createdAt: Date.now(),
      lastAccessed: Date.now(),
    });
  }

  async getLastSession(): Promise<any | null> {
    if (!this.db) await this.init();
    
    const tx = this.db!.transaction('sessions', 'readonly');
    const index = tx.store.index('lastAccessed');
    const cursor = await index.openCursor(null, 'prev');
    
    return cursor?.value || null;
  }

  async saveAnswer(questionId: string, sessionId: string, answer: string): Promise<void> {
    if (!this.db) await this.init();
    
    await this.db!.put('answers', {
      id: `${questionId}-${sessionId}`,
      questionId,
      sessionId,
      answer,
      createdAt: Date.now(),
    });
  }

  async getAnswer(questionId: string, sessionId: string): Promise<string | null> {
    if (!this.db) await this.init();
    
    const answer = await this.db!.get('answers', `${questionId}-${sessionId}`);
    return answer?.answer || null;
  }

  async saveCompanyData(companyId: string, data: any): Promise<void> {
    if (!this.db) await this.init();
    
    await this.db!.put('companies', {
      id: companyId,
      ...data,
      updatedAt: Date.now(),
    });
  }

  async getCompanyData(companyId: string): Promise<any | null> {
    if (!this.db) await this.init();
    return await this.db!.get('companies', companyId);
  }

  async getAllCompanies(): Promise<any[]> {
    if (!this.db) await this.init();
    return await this.db!.getAll('companies');
  }

  async preloadHRBank(questions: Question[]): Promise<void> {
    if (!this.db) await this.init();
    
    const tx = this.db!.transaction('hrBank', 'readwrite');
    for (const question of questions) {
      await tx.store.put(question);
    }
    await tx.done;
  }

  async getHRBank(): Promise<Question[]> {
    if (!this.db) await this.init();
    return await this.db!.getAll('hrBank');
  }

  async clearOldSessions(maxAge: number = 30 * 24 * 60 * 60 * 1000): Promise<void> {
    if (!this.db) await this.init();
    
    const cutoff = Date.now() - maxAge;
    const tx = this.db!.transaction('sessions', 'readwrite');
    const index = tx.store.index('lastAccessed');
    
    for await (const cursor of index.iterate()) {
      if (cursor.value.lastAccessed < cutoff) {
        await cursor.delete();
      }
    }
  }
}

export const storage = new StorageManager();