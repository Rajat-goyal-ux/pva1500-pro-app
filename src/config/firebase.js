import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace these credentials with your actual Firebase Project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKey_PVA1500_PRO_APP",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pva1500-pro.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pva1500-pro",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pva1500-pro.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

let app;
let auth;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn("Firebase Init Exception (Running in mock fallback mode):", error.message);
}

export { auth, googleProvider };
