// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firestore
import { getFirestore } from "firebase/firestore";

// (Optional) Analytics - only works in production build
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCo3PHmaXNCO6UjROWcBDXFIggNj0QjOQU",
  authDomain: "donix-b546d.firebaseapp.com",
  projectId: "donix-b546d",
  storageBucket: "donix-b546d.firebasestorage.app",
  messagingSenderId: "1020228657562",
  appId: "1:1020228657562:web:8466e5b5d33e01520d9a23",
  measurementId: "G-3F2HY641ML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Optional analytics (can remove if errors happen)
export const analytics = getAnalytics(app);