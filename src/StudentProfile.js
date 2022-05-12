import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getAuth, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
//import { doc, setDoc, getFirestore, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { doc,query, getDoc, deleteDoc, updateDoc, where, setDoc, getDocs, getFirestore, connectFirestoreEmulator, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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

    var fName = "";
    var lName = "";
    var eMail = "";
    var uName = "";
    var pNum = "";




const docRef = doc(db, "profile", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  var data = docSnap.data();

  fName = data.first_name;
  lName = data.last_name;
  eMail = data.email;
  uName = data.username;
  pNum = data.phone_number;
  console.log("Profile =>", data);
} else {
  console.log("No such document!");

}



window.onload = function(){
    document.getElementById("fName").innerHTML = fName;
    document.getElementById("lName").innerHTML = lName;
    document.getElementById("eMail").innerHTML = eMail;
    document.getElementById("uName").innerHTML = uName;
    document.getElementById("pNum").innerHTML = pNum;
}

window.onload();
}