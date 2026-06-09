import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviewiq-561aa.firebaseapp.com",
  projectId: "interviewiq-561aa",
  storageBucket: "interviewiq-561aa.firebasestorage.app",
  messagingSenderId: "590058577412",
  appId: "1:590058577412:web:bbd3852c6ffeeee0aadf51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export {auth, provider}
