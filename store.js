import { db } from "./firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// ===== GLOBAL PRODUCTS ARRAY =====
window.products=[
["LEVEL UP PASS LOGIN",950],
["LEVEL UP PASS ID",1100],
["Gems 25",90],["Gems 50",140],["Gems 100",300],
["Gems 200",550],["Gems 310",900],["Gems 520",1460],
["Gems 830",2180],["Gems 1060",2895],["Gems 1580",4040],
["Gems 2180",5800],["Gems 3240",8090],["Gems 5600",14665],
["Gems 10060",24450],["Gems 11500",30200]
];

const productsDiv=document.getElementById("products");
const cartList=document.getElementById("cart");
const totalSpan=document.getElementById("total");
let cart=[], total=0;

// ===== LOAD PRODUCTS =====
export function loadProducts(){
  productsDiv.innerHTML="";
  window.products.forEach(p=>{
    const div=document.createElement("div");
    div.className="product slide";
    div.innerHTML=`${p[0]} - LKR ${p[1]}<br><button onclick="add('${p[0]}',${p[1]})">Add</button>`;
    productsDiv.appendChild(div);
  });
}
loadProducts();

// ===== ADD TO CART =====
window.add=(name,price)=>{
  cart.push(`${name} - ${price}`);
  total+=price;
  cartList.innerHTML=cart.map(i=>`<li>${i}</li>`).join("");
  totalSpan.innerText=total;
}

// ===== CHECKOUT BUTTON =====
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("checkoutBtn").addEventListener("click", async ()=>{
    if(cart.length===0){ alert("Cart is empty"); return; }
    const msg=`NEW ORDER\n${cart.join("\n")}\nTOTAL: LKR ${total}`;

    // Telegram
    await fetch("https://api.telegram.org/bot8106750141:AAGLbi-JZb0vhdMH3bMcbeX8L3IpdcJenxM/sendMessage",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({chat_id:"1720283336",text:msg})
    });

    // WhatsApp
    const wa=`https://wa.me/94771852401?text=${encodeURIComponent(msg)}`;
    window.open(wa,"_blank");

    // Firebase
    const orderRef=push(ref(db,'orders'));
    await set(orderRef,{items:cart,total:total,date:new Date().toLocaleDateString()});

    alert("Order sent ✅");
    cart=[]; total=0; cartList.innerHTML=""; totalSpan.innerText=0;
  });
});

// ===== BANNER AUTO-SWIPE =====
const banners=[
 "https://files.catbox.moe/ewhgr3.jpg",
 "https://files.catbox.moe/4a8z4b.jpg",
 "https://files.catbox.moe/mbqzv5.jpg"
];
const bannerImg=document.getElementById("banner");
let bannerIndex=0;

function changeBanner(nextIndex=null){
  if(nextIndex!==null) bannerIndex=nextIndex;
  else bannerIndex=(bannerIndex+1)%banners.length;
  bannerImg.classList.remove("show");
  setTimeout(()=>{bannerImg.src=banners[bannerIndex]; bannerImg.classList.add("show");},300);
}

let bannerInterval=setInterval(changeBanner,3000);

// ===== SWIPE SUPPORT =====
let startX=0;
bannerImg.addEventListener("touchstart",(e)=>{ startX=e.touches[0].clientX });
bannerImg.addEventListener("touchend",(e)=>{
  let diff=e.changedTouches[0].clientX-startX;
  if(Math.abs(diff)>50){
    clearInterval(bannerInterval);
    if(diff<0) changeBanner((bannerIndex+1)%banners.length);
    else changeBanner((bannerIndex-1+banners.length)%banners.length);
    bannerInterval=setInterval(changeBanner,3000);
  }
});
