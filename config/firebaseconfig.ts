// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "pet-adopt-ef706.firebaseapp.com",
    projectId: "pet-adopt-ef706",
    storageBucket: "pet-adopt-ef706.appspot.com",
    messagingSenderId: "659636459973",
    appId: "1:659636459973:web:c144086db8beab467613ac",
    measurementId: "G-YR1CGB9G24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)