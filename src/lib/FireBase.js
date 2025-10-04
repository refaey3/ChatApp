// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhiUgmC3S3xcClW7N4O906E7JgkBAXsv8",
  authDomain: "chatapp-378a0.firebaseapp.com",
  projectId: "chatapp-378a0",
  storageBucket: "chatapp-378a0.firebasestorage.app",
  messagingSenderId: "46288198457",
  appId: "1:46288198457:web:749cd6ee005d2f0e67a6e8",
  measurementId: "G-0TDC7B2NKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
