// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPeLdWqpFmFpmI6Wn5rIWX0Ie2q1kcF30",
  authDomain: "social-login-5fb37.firebaseapp.com",
  projectId: "social-login-5fb37",
  storageBucket: "social-login-5fb37.appspot.com",
  messagingSenderId: "354769001767",
  appId: "1:354769001767:web:2884ed126ee50490b09d02",
  measurementId: "G-4SWE47DNXQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
