// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKSNEv107SSMt2BemiVTN2fvqdJoAKy5Y",
  authDomain: "rti-express.firebaseapp.com",
  projectId: "rti-express",
  storageBucket: "rti-express.firebasestorage.app",
  messagingSenderId: "932745465598",
  appId: "1:932745465598:android:29f2b0a632ab050fed5faf",
  measurementId: "G-PPFRPF9C5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence for React Native
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // If auth is already initialized, get the existing instance
  auth = getAuth(app);
}

// Configure for development - this is crucial for phone auth in development
//if (__DEV__) {
//  // Disable app verification for testing (only in development!)
//  // This allows phone auth to work without reCAPTCHA
//  if (auth.settings) {
//    auth.settings.appVerificationDisabledForTesting = true;
//  }
//
//  console.log('🔧 Firebase Auth configured for development with app verification disabled');
//}

export { app, auth };