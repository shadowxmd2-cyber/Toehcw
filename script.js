// ===== BANNER =====
const banners=[
 "https://files.catbox.moe/ewhgr3.jpg",
 "https://files.catbox.moe/4a8z4b.jpg",
 "https://files.catbox.moe/mbqzv5.jpg"
];
let i=0;
setInterval(()=>{
 i=(i+1)%banners.length;
 banner.classList.remove("show");
 setTimeout(()=>{
  banner.src=banners[i];
  banner.classList.add("show");
 },300);
},8000);

// ===== STORE =====
let cart=[], total=0;

const products=[
["LEVEL UP PASS LOGIN",950],
["LEVEL UP PASS ID",1100],
["Gems 25",90],["Gems 50",140],["Gems 100",300],
["Gems 200",550],["Gems 310",900],["Gems 520",1460],
["Gems 830",2180],["Gems 1060",2895],["Gems 1580",4040],
["Gems 2180",5800],["Gems 3240",8090],["Gems 5600",14665],
["Gems 10060",24450],["Gems 11500",30200]
];

products.forEach(p=>{
 productsDiv.innerHTML+=`
 <div class="product slide">
 ${p[0]} - LKR ${p[1]}<br>
 <button onclick="add('${p[0]}',${p[1]})">Add</button>
 </div>`;
});

function add(n,p){
 cart.push(`${n} - ${p}`);
 total+=p;
 cartList.innerHTML=cart.map(i=>`<li>${i}</li>`).join("");
 totalSpan.innerText=total;
}

function checkout(){
 const msg=`NEW ORDER\n${cart.join("\n")}\nTOTAL: LKR ${total}`;

 // Telegram
 fetch("https://api.telegram.org/bot8106750141:AAGLbi-JZb0vhdMH3bMcbeX8L3IpdcJenxM/sendMessage",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({chat_id:"1720283336",text:msg})
 });

 // WhatsApp
 const wa=`https://wa.me/94771852401?text=${encodeURIComponent(msg)}`;
 window.open(wa,"_blank");

 alert("Order Sent to Telegram & WhatsApp ✅");
                 }
