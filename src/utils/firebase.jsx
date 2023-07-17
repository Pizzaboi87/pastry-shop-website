import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSsqJaZjP8kHuHpXb4kLIeOjnBdi8BI3s",
  authDomain: "le-ciel-sucre.firebaseapp.com",
  databaseURL:
    "https://le-ciel-sucre-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "le-ciel-sucre",
  storageBucket: "le-ciel-sucre.appspot.com",
  messagingSenderId: "913143865836",
  appId: "1:913143865836:web:13b1ed7ad0d412473460c9",
};

const app = initializeApp(firebaseConfig);
const db = app.database();
const auth = app.auth();
const storage = app.storage();
const googleProvider = new app.auth.GoogleAuthProvider();
const emailProvider = new app.auth.EmailAuthProvider();
