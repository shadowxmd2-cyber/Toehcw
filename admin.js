import { db } from "./firebase.js";
import { ref, set, push, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { auth } from "./firebase.js";

const adminBox = document.getElementById("adminBox");
const membersList = document.getElementById("membersList");
const visitorCount = document.getElementById("visitorCount");
const dailyIncome = document.getElementById("dailyIncome");

const addProductBtn = document.getElementById("addProductBtn");
const pname = document.getElementById("pname");
const pprice = document.getElementById("pprice");

// Show Admin Panel only for admin email
auth.onAuthStateChanged(user=>{
  if(user && user.email === "admin@primestore.com"){
    adminBox.style.display="block";
    loadMembers();
    loadAnalytics();
  }
});

// Add Product
addProductBtn.addEventListener("click", async ()=>{
  const name = pname.value;
  const price = parseInt(pprice.value);
  if(!name || !price) return alert("Enter name & price");
  products.push([name,price]);
  loadProducts();
  const prodRef = push(ref(db,'products'));
  await set(prodRef,{name:name,price:price});
  pname.value=""; pprice.value="";
});

// Load Members
async function loadMembers(){
  membersList.innerHTML="";
  const snapshot = await get(ref(db,'users'));
  if(snapshot.exists()){
    const data = snapshot.val();
    for(const uid in data){
      const email = data[uid].email || "Unknown";
      const li = document.createElement("li");
      li.innerText = email;
      membersList.appendChild(li);
    }
  }
}

// Analytics: Visitors & Daily Income
async function loadAnalytics(){
  const today = new Date().toLocaleDateString();
  let visitor = 0, income = 0;
  const ordersSnap = await get(ref(db,'orders'));
  if(ordersSnap.exists()){
    const orders = ordersSnap.val();
    for(const id in orders){
      if(orders[id].date === today){
        income += parseInt(orders[id].total || 0);
        visitor++;
      }
    }
  }
  visitorCount.innerText = visitor;
  dailyIncome.innerText = income;
                                   }
