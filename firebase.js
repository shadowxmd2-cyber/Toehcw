<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

export const firebaseConfig = {
  apiKey: "AIzaSyAyF6qahTGFQQFpdx68nDycNbKl_-QEsjQ",
  authDomain: "ishan-be438.firebaseapp.com",
  databaseURL: "https://ishan-be438-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ishan-be438",
  storageBucket: "ishan-be438.firebasestorage.app",
  messagingSenderId: "55636164157",
  appId: "1:55636164157:web:20a7b36fd202a0e69a7454"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
</script>
