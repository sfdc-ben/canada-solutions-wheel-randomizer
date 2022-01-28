// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYHL36OhIMsUlwuWQL-AZO79RHxSwq9OE",
  authDomain: "canada-solutions-team.firebaseapp.com",
  projectId: "canada-solutions-team",
  storageBucket: "canada-solutions-team.appspot.com",
  messagingSenderId: "874598850392",
  appId: "1:874598850392:web:d7e319eac66236bd9ccf2d",
  measurementId: "G-JBDT00YZ8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);

export { db, app }