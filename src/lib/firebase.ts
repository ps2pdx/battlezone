import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, signInAnonymously, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAMNLbRC_TbVE6_e6f1azjW7Rvl5H4af68',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'battlezone-e5deb.firebaseapp.com',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://battlezone-e5deb-default-rtdb.firebaseio.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'battlezone-e5deb',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'battlezone-e5deb.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '219118222920',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:219118222920:web:8208fc75279c5ba02a627d',
};

let database: Database | null = null;
let auth: Auth | null = null;

try {
  const app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export const authReady: Promise<string | null> =
  typeof window === 'undefined' || !auth
    ? Promise.resolve(null)
    : signInAnonymously(auth)
        .then((credential) => credential.user.uid)
        .catch((error) => {
          console.error(
            'Firebase anonymous sign-in failed - multiplayer is disabled. ' +
              'Enable the Anonymous provider in Firebase Console > Authentication > Sign-in method.',
            error
          );
          return null;
        });

export async function getAuthToken(): Promise<string | null> {
  if (!auth?.currentUser) return null;
  try {
    return await auth.currentUser.getIdToken();
  } catch (error) {
    console.error('Failed to get Firebase ID token:', error);
    return null;
  }
}

export const databaseURL = firebaseConfig.databaseURL;

export { database };
