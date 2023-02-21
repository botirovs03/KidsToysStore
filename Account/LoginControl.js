document.addEventListener('DOMContentLoaded', function () {
  if (sessionStorage.getItem('ActiveUser') != null) {
    document.querySelector("#User").style.display = ''
    document.querySelector("#LogOut").style.display = ''
    document.querySelector("#User").innerHTML = sessionStorage.getItem('ActiveUser')
    if (sessionStorage.getItem("ActiveUser") == "Admin") {
      document.querySelector("#AddProduct").style.display = ''
    }
  } else {
    document.querySelector("#register").style.display = ''
    document.querySelector("#login").style.display = ''
  }
}, false);



document.querySelector("#LogOut").onclick = function () {
  sessionStorage.removeItem("ActiveUser")
  window.location.href = window.location.origin;
  return false;
  
}
