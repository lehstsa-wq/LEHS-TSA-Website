import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDikSySIsYYx7kuf8HW4xjsjx2QUrNqH_c",
  authDomain: "tsa-lehs-a4ce3.firebaseapp.com",
  projectId: "tsa-lehs-a4ce3",
  storageBucket: "tsa-lehs-a4ce3.firebasestorage.app",
  messagingSenderId: "360046012159",
  appId: "1:360046012159:web:8cc59c205e75645ae9ceca",
  measurementId: "G-5Q0SZQWJN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);

// Initialize Authentication and export it
export const auth = getAuth(app);