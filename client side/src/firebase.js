import { initializeApp } from "firebase/app";

console.log(import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-d0f74.firebaseapp.com",
  projectId: "mern-d0f74",
  storageBucket: "mern-d0f74.firebasestorage.app",
  messagingSenderId: "659949888300",
  appId: "1:659949888300:web:a3125a7213fb0f7f84c289",
};

export const app = initializeApp(firebaseConfig);