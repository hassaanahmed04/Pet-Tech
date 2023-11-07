// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGPFVQ_rD-4YUA4xNlY2KJetwC-RqoWR8",
  authDomain: "pet-tech-5bac8.firebaseapp.com",
  projectId: "pet-tech-5bac8",
  storageBucket: "pet-tech-5bac8.appspot.com",
  messagingSenderId: "1090798058568",
  appId: "1:1090798058568:web:c3a5962bec516d7e1e6c7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app); // Export Firebase Authentication
