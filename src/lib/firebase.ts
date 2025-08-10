// Firebase Configuration for Gmail Storage
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dhraviq-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dhraviq-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dhraviq-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Gmail management for anonymous users
class GmailManager {
  private sessionId: string | null = null;

  async ensureAnonymousAuth(): Promise<string> {
    if (this.sessionId) return this.sessionId;

    try {
      const userCredential = await signInAnonymously(auth);
      this.sessionId = userCredential.user.uid;
      return this.sessionId;
    } catch (error) {
      console.error('Anonymous auth failed:', error);
      // Fallback to local session ID
      this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      return this.sessionId;
    }
  }

  async saveGmail(gmail: string): Promise<boolean> {
    try {
      const sessionId = await this.ensureAnonymousAuth();
      
      await setDoc(doc(db, 'users', sessionId), {
        gmail,
        createdAt: new Date(),
        sessionId
      });

      return true;
    } catch (error) {
      console.error('Failed to save Gmail:', error);
      return false;
    }
  }

  async hasGmail(): Promise<boolean> {
    try {
      const sessionId = await this.ensureAnonymousAuth();
      const docRef = doc(db, 'users', sessionId);
      const docSnap = await getDoc(docRef);
      
      return docSnap.exists() && !!docSnap.data()?.gmail;
    } catch (error) {
      console.error('Failed to check Gmail:', error);
      return false;
    }
  }

  async getGmail(): Promise<string | null> {
    try {
      const sessionId = await this.ensureAnonymousAuth();
      const docRef = doc(db, 'users', sessionId);
      const docSnap = await getDoc(docRef);
      
      return docSnap.exists() ? (docSnap.data()?.gmail || null) : null;
    } catch (error) {
      console.error('Failed to get Gmail:', error);
      return null;
    }
  }
}

export const gmailManager = new GmailManager();