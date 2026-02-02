import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyAyF6qahTGFQQFpdx68nDycNbKl_-QEsjQ",
  authDomain: "ishan-be438.firebaseapp.com",
  databaseURL: "https://ishan-be438-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ishan-be438",
  storageBucket: "ishan-be438.firebasestorage.app",
  messagingSenderId: "55636164157",
  appId: "1:55636164157:web:20a7b36fd202a0e69a7454"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBox = document.getElementById("loginBox");
const goBox = document.getElementById("goBox");
const letsGoBtn = document.getElementById("letsGoBtn");
const storeBox = document.getElementById("storeBox");

document.getElementById("loginBtn").addEventListener("click", ()=>{
  signInWithEmailAndPassword(auth,email.value,password.value)
  .then(user=>{
    loginBox.style.display="none";
    goBox.style.display="block";
  }).catch(e=>alert(e.message));
});

document.getElementById("registerBtn").addEventListener("click", ()=>{
  createUserWithEmailAndPassword(auth,email.value,password.value)
  .then(user=>{
    // Save user email to Firebase users node
    set(ref(db,'users/'+user.user.uid),{email:email.value});
    loginBox.style.display="none";
    goBox.style.display="block";
  }).catch(e=>alert(e.message));
});

letsGoBtn.addEventListener("click", ()=>{
  goBox.style.display="none";
  storeBox.style.display="block";
});
