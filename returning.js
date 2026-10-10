document.getElementById("returning").addEventListener("submit", function (e) {
  e.preventDefault();
  const code = document.getElementById("code").value.trim().toUpperCase();
  if (Muharib.all()[code]) {
    window.location.href = "empty.html";
  } else {
    document.getElementById("err").textContent = "الكود غير صحيح";
  }
});
