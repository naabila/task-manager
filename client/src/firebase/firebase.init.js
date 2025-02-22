// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-gVMnysEQss4i1bnK-xCtR7o1gpbpmzM",
  authDomain: "jobtask-b4e37.firebaseapp.com",
  projectId: "jobtask-b4e37",
  storageBucket: "jobtask-b4e37.firebasestorage.app",
  messagingSenderId: "613620844490",
  appId: "1:613620844490:web:82865037334bbdcd6df133"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;