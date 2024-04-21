import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDi3SQYmRAyoRLyWXrDazrdWUf5DNmplAo",
    authDomain: "chit-chat-c417c.firebaseapp.com",
    projectId: "chit-chat-c417c",
    storageBucket: "chit-chat-c417c.appspot.com",
    messagingSenderId: "1008569978530",
    appId: "1:1008569978530:web:01f481516ff39e8f3211fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();