import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { signOut, getAuth, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
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


var signOutButton = document.getElementById("SSignOut");


async function run() {


    const logout = async () => {
        await signOut(auth);
        console.log("success");
    }

    signOutButton.addEventListener("click", logout);


//object definition
class Task {
    constructor (pTitle, tMembers, tDesc, tStatus) {
        this.pTitle = pTitle;
        this.tMembers = tMembers;
        this.tDesc = tDesc;
        this.tStatus = tStatus;
    }
    toString() {
        return this.pTitle + '\nTo do: ' + this.tDesc + '\nAssigned to: ' + this.tMembers + "\nthisworks\n"; 
    }
}
const taskConverter = {
    toFirestore: (task) => {
        return {
            project_title: task.pTitle,
            task_members: task.tMembers,
            task_desc: task.tDesc,
            status : task.tStatus
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Task(data.pTitle, data.tMembers, data.tDesc, data.tStatus);
        
    }
}


function toString(doc) {
    let data = doc.data();
    return `${data.project_title}<br>To do: ${data.task_desc}<br>Assigned to: ${data.task_members}`;
  }




    //get data
    const allTasksRef = collection(db, "tasks", uid, "allTasks");


    //retrieve incomplete tasks
var incompleteTasks = [];
const incompleteTasksQuery = query(allTasksRef, where("status", "==", "incomplete"));
const incompleteTasksQuerySnapshot = await getDocs(incompleteTasksQuery);
incompleteTasksQuerySnapshot.forEach((doc) => {
    
    const task = toString(doc);
    incompleteTasks.push(task);

    });

//incomplete tasks to a string to use in html
var listOfIncompleteTasks = incompleteTasks.join("<br><br>");
console.log("incomplete =>\n", listOfIncompleteTasks);


    //retrieve complete tasks
 
var completeTasks = [];
const completeTasksQuery = query(allTasksRef, where("status", "==", "Complete"));
const completeTasksQuerySnapshot = await getDocs(completeTasksQuery);
completeTasksQuerySnapshot.forEach((doc) => {
    
    const task = toString(doc);
    completeTasks.push(task);

    });

//complete tasks to a string to use in html
var listOfCompleteTasks = completeTasks.join("<br><br>");
console.log("complete =>\n", listOfCompleteTasks);

window.onload = function(){
    document.getElementById("SHlistOfIncompleteTasks").innerHTML = listOfIncompleteTasks;
    document.getElementById("SHlistOfCompleteTasks").innerHTML = listOfCompleteTasks;
}

window.onload();


}