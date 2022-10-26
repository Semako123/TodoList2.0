// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDqBmPvwvzpVYFKhFBg5DSTw6IZxdN4xdw",

  authDomain: "oases-todo.firebaseapp.com",

  projectId: "oases-todo",

  storageBucket: "oases-todo.appspot.com",

  messagingSenderId: "895408764822",

  appId: "1:895408764822:web:497a3e96a39bbe9621cfb7",

  measurementId: "G-NS66F4RKYB",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
