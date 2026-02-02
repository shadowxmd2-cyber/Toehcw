import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

window.login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("goBox").style.display = "block";
    })
    .catch(e => alert(e.message));
};

window.register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      // ✅ SAME FLOW AS LOGIN
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("goBox").style.display = "block";
    })
    .catch(e => alert(e.message));
};
