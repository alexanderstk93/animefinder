// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlqCj6vqcpq3td6OuPAUYecIBp2ul0iog", // TODO: use env key
  authDomain: "animefinder-17287.firebaseapp.com",
  projectId: "animefinder-17287",
  storageBucket: "animefinder-17287.appspot.com",
  messagingSenderId: "485395066268",
  appId: "1:485395066268:web:c556a0e92bd91627d12c59",
  measurementId: "G-H6HDJF6D34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app);
