import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
//import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

var loginUsername = document.getElementById("loginUsername");
var loginPass = document.getElementById("loginPass");
var loginButton = document.getElementById("loginButton");
//var regButton = document.getElementById("LRegButton");


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

var uid;

const loginEmailPassword = async () => {
  const loginEmail = loginUsername.value;
  const loginPassword = loginPass.value;

  try{
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

    uid = userCredential.user;

    location.href = "User Select.html";
    
  }catch(error) {
      console.log(error)
    }
/*
  try{
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  }
  catch(error) {
    console.log(error);
  }
  
  
  *///console.log(userCredential.user);
}


loginButton.addEventListener("click", loginEmailPassword);


const goToRegPage = async () => {

  location.href = "Register";

}



//regButton.addEventListener("click", goToRegPage);

