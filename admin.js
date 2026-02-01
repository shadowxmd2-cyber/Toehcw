// SIMPLE ADMIN CONTROL

const ADMIN_PASSWORD = "2dh3ymejek2kn";

function adminLogin(){
  const pass = document.getElementById("adminPass").value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("adminPanel").style.display="block";
  }else{
    alert("Wrong Admin Password");
  }
}

// Suspend user (Demo)
function suspendUser(){
  const uid = document.getElementById("uid").value;
  if(uid===""){
    alert("Enter User ID");
    return;
  }
  alert("User "+uid+" Suspended (Demo)");
}

// Add product (Demo)
function addProduct(){
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  if(name==="" || price===""){
    alert("Fill all fields");
    return;
  }
  alert("Product Added: "+name+" - LKR "+price);
}
