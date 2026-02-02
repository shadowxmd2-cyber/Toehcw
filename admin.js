import { db } from "./firebase.js";
import { ref, push, set, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { auth } from "./firebase.js";

const adminBox=document.getElementById("adminBox");
const membersList=document.getElementById("membersList");
const visitorCount=document.getElementById("visitorCount");
const dailyIncome=document.getElementById("dailyIncome");

const addProductBtn=document.getElementById("addProductBtn");
const pname=document.getElementById("pname");
const pprice=document.getElementById("pprice");

auth.onAuthStateChanged(user=>{
  if(user && user.email==="admin@primestore.com"){
    adminBox.style.display="block";
    loadMembers();
    loadAnalytics();
  }
});

// Add Product
addProductBtn.addEventListener("click", async ()=>{
  const name=pname.value;
  const price=parseInt(pprice.value);
  if(!name || !price){ alert("Enter name & price"); return; }
  window.products.push([name,price]);
  loadProducts();
  const prodRef=push(ref(db,'products'));
  await set(prodRef,{name:name,price:price});
  pname.value=""; pprice.value="";
});

// Members
async function loadMembers(){
  membersList.innerHTML="";
  const snapshot=await get(ref(db,'users'));
  if(snapshot.exists()){
    const data=snapshot.val();
    for(const uid in data){
      const li=document.createElement("li");
      li.innerText=data[uid].email||"Unknown";
      membersList.appendChild(li);
    }
  }
}

// Analytics
async function loadAnalytics(){
  const today=new Date().toLocaleDateString();
  let visitor=0, income=0;
  const ordersSnap=await get(ref(db,'orders'));
  if(ordersSnap.exists()){
    const orders=ordersSnap.val();
    for(const id in orders){
      if(orders[id].date===today){
        visitor++;
        income+=parseInt(orders[id].total||0);
      }
    }
  }
  visitorCount.innerText=visitor;
  dailyIncome.innerText=income;
    }
