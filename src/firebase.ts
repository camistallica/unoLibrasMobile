// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Importe o GoogleAuthProvider
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARXRaDcuss3y0m1M0G88Kg4G9hay_414M",
  authDomain: "test-ec25b.firebaseapp.com",
  projectId: "test-ec25b",
  storageBucket: "test-ec25b.firebasestorage.app",
  messagingSenderId: "61610426074",
  appId: "1:61610426074:web:cad9a4db848f9a7bf4efe3",
  measurementId: "G-2D7PQF46XF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); // Crie e exporte uma instância do provedor