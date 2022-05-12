import {
    button,
    buttonR,
} from './'


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
//import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCnHaoPEMDvXPcUu_mtgy3QwGFptwSF7sc",
    authDomain: "next-step-22.firebaseapp.com",
    projectId: "next-step-22",
    storageBucket: "next-step-22.appspot.com",
    messagingSenderId: "499514593030",
    appId: "1:499514593030:web:bcaddb4e3db9dee05f1887",
    measurementId: "G-PKJZS3GH3R"
  };

const firebaseApp = initializeApp(firebaseConfig);


//const analytics = getAnalytics(app); 
//const db = getFirestore(firebaseApp);

// Detect auth state (essentially checks if the user is logged in)
// onAuthStateChanged(auth, user => {
//     if(user != null) {
//         console.log('logged in');
//     } else {
//         console.log('No user');
//     }
// });

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {

}

--submit.addEventListener("click");