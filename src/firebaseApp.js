// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGX6guk-FO2xKYJoJv18_7BttIwTPkPmc",
  authDomain: "chatapp-d2ddf.firebaseapp.com",
  projectId: "chatapp-d2ddf",
  storageBucket: "chatapp-d2ddf.appspot.com",
  messagingSenderId: "458520544459",
  appId: "1:458520544459:web:5f0d1a06ca7019afbb074e",
  measurementId: "G-EFHN9ZGHDH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("lol");
