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


    var submitButton = document.getElementById("SsubmitTask");

    var tUpdateSubmitButton = document.getElementById("STaskUpdateButton");

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


//write data

function storeData() {

var pTitle = document.getElementById("SPtitle").value;
var tMembers = document.getElementById("STmembers").value;
var tDesc = document.getElementById("STdescription").value;

const ref = doc(db, "tasks", uid, "allTasks", tDesc).withConverter(taskConverter);
setDoc(ref, new Task(pTitle, tMembers, tDesc, "incomplete"));
console.log("success");
run();
}

submitButton.addEventListener("click", storeData);



//move task to progress//

var progressTasks = [];

function moveToProgress(docId) {

    updateDoc(doc(db, "tasks", uid, "allTasks", docId), {
        status : "progress"
    })
}

//moveToProgressButton.addEventListener("click", moveToProgress);

//move task to complete//

var completeTasks = [];

function moveToComplete(docId) {

    updateDoc(doc(db, "tasks", uid, "allTasks", docId), {
        status : "complete"
    });
}

//delete task//

function deleteTask(docId) {
    
    deleteDoc(doc(db, "tasks", uid, "allTasks", docId));

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
//console.log(taskArray);

//incomplete tasks to a string to use in html
var listOfIncompleteTasks = incompleteTasks.join("<br><br>");
console.log("incomplete =>\n", listOfIncompleteTasks);


//retrieve progress tasks
 
var progressTasks = [];
const progressTasksQuery = query(allTasksRef, where("status", "==", "Progress"));
const progressTasksQuerySnapshot = await getDocs(progressTasksQuery);
progressTasksQuerySnapshot.forEach((doc) => {
    
    const task = toString(doc);
    progressTasks.push(task);

    });
 

//progress tasks to a string to use in html
var listOfProgressTasks = progressTasks.join("<br><br>");
console.log("progress =>\n", listOfProgressTasks);


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


//update task
function updateTaskStatus() {
    var tUpdateDesc = document.getElementById("STUpdateDesc").value;
    var tUpdateStatusDropdown = document.getElementById("SUpdateTaskStatus").value;

    updateDoc(doc(db, "tasks", uid, "allTasks", tUpdateDesc), {
        "status" : tUpdateStatusDropdown
    }  )
    console.log("success");
    run();


}

tUpdateSubmitButton.addEventListener("click", updateTaskStatus);




window.onload = function(){
    document.getElementById("SlistOfIncompleteTasks").innerHTML = listOfIncompleteTasks;
    document.getElementById("SlistOfProgressTasks").innerHTML = listOfProgressTasks;
    document.getElementById("SlistOfCompleteTasks").innerHTML = listOfCompleteTasks;
}

window.onload();


}


