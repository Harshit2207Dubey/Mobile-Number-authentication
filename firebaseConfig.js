
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAY8cMctG7FSNIkExbBTxZVWXNTb8tLrgE",
  authDomain: "phone-b49d4.firebaseapp.com",
  projectId: "phone-b49d4",
  storageBucket: "phone-b49d4.firebasestorage.app",
  messagingSenderId: "583203933934",
  appId: "1:583203933934:web:97aa2d8491e945a8916dff",
  measurementId: "G-QNTP6C517H"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };