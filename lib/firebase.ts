import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDwoPMT1AeemByzRwuXGE2qnPNYmW5Pmg",
  authDomain: "finalpoo-turinajorge.firebaseapp.com",
  projectId: "finalpoo-turinajorge",
  storageBucket: "finalpoo-turinajorge.appspot.com",
  messagingSenderId: "929827470228",
  appId: "1:929827470228:web:03a6a7a934d4e19caa2d81",
  measurementId: "G-B3M3SP1SKF"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };

