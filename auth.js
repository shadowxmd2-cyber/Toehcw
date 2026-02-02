import { auth } from "./firebase.js";
import {
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* ELEMENTS */
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBox = document.getElementById("loginBox");
const goBox = document.getElementById("goBox");

document.getElementById("loginBtn").addEventListener("click", () => {
 signInWithEmailAndPassword(auth, email.value, password.value)
  .then(() => {
   loginBox.style.display = "none";
   goBox.style.display = "block";
  })
  .catch(e => alert(e.message));
});

document.getElementById("registerBtn").addEventListener("click", () => {
 createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(() => {
   loginBox.style.display = "none";
   goBox.style.display = "block";
  })
  .catch(e => alert(e.message));
});
