import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCObmFxwsIwx7QkeC_a6KMbFBMspzw0__Q",
  authDomain: "todayidid-4fb27.firebaseapp.com",
  databaseURL: "https://todayidid-4fb27.firebaseio.com",
  projectId: "todayidid-4fb27",
  storageBucket: "todayidid-4fb27.appspot.com",
  messagingSenderId: "165092660441",
  appId: "1:165092660441:web:44665d24be9ce4df091ac8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();

async function getAllTasks() {
  const tasks = await firestore.collection("tasks").get();
  return tasks.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function addTask(task) {
  firestore
    .collection("tasks")
    .add({
      description: task.value,
      time: task.datetime,
      tags: task.tags,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

function signInUser() {
  firebase
    .auth()
    .signInWithPopup(googleAuth)
    .catch(function(error) {
      console.error(error.message);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .catch(function(error) {
      console.error(error.message);
    });
}

export { auth, getAllTasks, addTask, signInUser, signOut };
