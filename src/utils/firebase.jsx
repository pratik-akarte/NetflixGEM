// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTBRKTyIJFBGlWxz8oPNMIYXYpnOJrCD4",
  authDomain: "netflixgpt-49272.firebaseapp.com",
  projectId: "netflixgpt-49272",
  storageBucket: "netflixgpt-49272.appspot.com",
  messagingSenderId: "550895776285",
  appId: "1:550895776285:web:8ab1ed7690ceab5b924cf4",
  measurementId: "G-533PETT7LD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);



export const auth = getAuth();