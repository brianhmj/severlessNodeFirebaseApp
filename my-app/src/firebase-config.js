// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "[YOUR API]",
  authDomain: "[YOUR AUTH DOMAIN]",
  projectId: "[YOUR PROJECT ID]",
  storageBucket: "[YOUR STORAGE BUCKET]",
  messagingSenderId: "[YOUR MESSAGING SENDER ID]",
  appId: "[YOUR APP ID]"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Adding Storage and Database
export const storage = getStorage(app);
export const db = getFirestore(app);
// Adding Authentication
export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider();