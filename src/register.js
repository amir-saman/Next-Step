import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
//import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

var regUsername = document.getElementById("regUsername");
var regPass = document.getElementById("regPass");
var regButton = document.getElementById("regButton");

const firebaseConfig = {
  apiKey: "AIzaSyChyIPAUQK69MI1SL78XFq-VTqzeKk_YDo",
  authDomain: "next-step-2022.firebaseapp.com",
  projectId: "next-step-2022",
  storageBucket: "next-step-2022.appspot.com",
  messagingSenderId: "87612216305",
  appId: "1:87612216305:web:6dde41935cb36bb4926a50"
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
//connectAuthEmulator(auth, "http://localhost:9099");


const createAccount = async () => {
    const regEmail = regUsername.value;
    const regPassword = regPass.value;
  try{
    
        const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
        location.href = "User Select.html";
  }catch(error){
        console.log(error);
  }

}

regButton.addEventListener("click", createAccount);