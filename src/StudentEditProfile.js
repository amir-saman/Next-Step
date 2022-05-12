import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getAuth, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
//import { doc, setDoc, getFirestore, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { doc,query, deleteDoc, updateDoc, where, setDoc, getDocs, getFirestore, connectFirestoreEmulator, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyChyIPAUQK69MI1SL78XFq-VTqzeKk_YDo",
    authDomain: "next-step-2022.firebaseapp.com",
    projectId: "next-step-2022",
    storageBucket: "next-step-2022.appspot.com",
    messagingSenderId: "87612216305",
    appId: "1:87612216305:web:6dde41935cb36bb4926a50"
    };
  
  const firebaseApp = initializeApp(firebaseConfig);
  
  var auth = getAuth(firebaseApp);
  const db = getFirestore();
  
  // var uid = "WJoyf2BVpuGO9R6bK4lV6XyltioV";
  var uid = null;
  auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("logged in", user.uid);
        uid = user.uid;
      
        run()
        
        
      } else {
          console.log("no user")
      }
    });
  

async function run() {

    var submitButton = document.getElementById("Psubmit");


    function saveProfile() {

        var fName = document.getElementById("fname").value;
        var lName = document.getElementById("lname").value;
        var eMail = document.getElementById("email").value;
        var uName = document.getElementById("uname").value;
        var pNum = document.getElementById("pnum").value;
        
        const ref = doc(db, "profile", uid);
        setDoc(ref, {
            first_name: fName,
            last_name: lName,
            email: eMail,
            username: uName,
            phone_number: pNum
        });
        console.log("success");
        }
        

        submitButton.addEventListener("click", saveProfile);

}