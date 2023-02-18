document.addEventListener('DOMContentLoaded', function () {
  if (sessionStorage.getItem('ActiveUser') != null) {
    document.querySelector("#User").style.display = ''
    document.querySelector("#LogOut").style.display = ''
    document.querySelector("#User").innerHTML = sessionStorage.getItem('ActiveUser')
  } else {
    document.querySelector("#register").style.display = ''
    document.querySelector("#login").style.display = ''
  }
}, false);

document.querySelector("#LogOut").onclick = function () {
  sessionStorage.removeItem("ActiveUser")
  location.reload();
  return false;
}
