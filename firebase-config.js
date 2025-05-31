import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOZO1NNXuT-NlHkjEIse_TnMpfruZLm70",
  authDomain: "ayzplastik-f4f7d.firebaseapp.com",
  projectId: "ayzplastik-f4f7d",
  storageBucket: "ayzplastik-f4f7d.firebasestorage.app",
  messagingSenderId: "217687476327",
  appId: "1:217687476327:web:e12429475b04f2f7df2cc2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
