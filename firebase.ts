import * as firebaseApp from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following config with your actual Firebase project keys
// Get these from: console.firebase.google.com -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyCXlN28syxsk0fA7JMQ68XEGz35xLTmFI4",
  authDomain: "lehs-tsa-website.firebaseapp.com",
  projectId: "lehs-tsa-website",
  storageBucket: "lehs-tsa-website.firebasestorage.app",
  messagingSenderId: "837295410874",
  appId: "1:837295410874:web:b2159b9295810ee45e3c83",
  measurementId: "G-T691ZXEXKH"
};

// Initialize Firebase
const app = firebaseApp.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);

// Initialize Authentication and export it
export const auth = getAuth(app);