import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDBAoPWbYeqBPEMDbu9i6shxmgI5Ag0P2g",
  authDomain: "fin-down.firebaseapp.com",
  projectId: "fin-down",
  storageBucket: "fin-down.firebasestorage.app",
  messagingSenderId: "73907183391",
  appId: "1:73907183391:web:4e168a8ded3796e9c9da2a",
  measurementId: "G-RCYKHHYVPB"
};

// Инициализация Firebase с проверкой
let firebaseApp: FirebaseApp;

try {
  firebaseApp = getApps().length === 0 
    ? initializeApp(firebaseConfig) 
    : getApps()[0];
} catch (error) {
  console.error('Firebase initialization error', error);
  throw new Error('Failed to initialize Firebase');
}

// Инициализация сервисов
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Настройка провайдера Google
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' // Показывать выбор аккаунта при каждом входе
});

export default firebaseApp;