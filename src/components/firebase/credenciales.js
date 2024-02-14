
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA76t-PE2Ke3o-ci9OQgJGeAqqDY9bPRY4",
    authDomain: "base-marvin.firebaseapp.com",
    projectId: "base-marvin",
    storageBucket: "base-marvin.appspot.com",
    messagingSenderId: "940753198072",
    appId: "1:940753198072:web:001695fd1d12120188940d",
    measurementId: "G-0YZN22K9CZ"
  };


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;