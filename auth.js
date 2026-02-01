import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

window.login=()=>{
 signInWithEmailAndPassword(auth,email.value,password.value)
 .then(()=>location.href="index.html")
 .catch(e=>alert(e.message));
};

window.register=()=>{
 createUserWithEmailAndPassword(auth,email.value,password.value)
 .then(()=>alert("Registered"))
 .catch(e=>alert(e.message));
};
