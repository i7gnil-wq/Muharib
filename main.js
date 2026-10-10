const form = document.getElementById("signup");
const done = document.getElementById("done");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const why = document.getElementById("why").value.trim();
  if (!name || !why) return;

  const users = Muharib.all();
  const code = Muharib.newCode(users);
  users[code] = { name: name, why: why };
  Muharib.save(users);

  document.getElementById("code").textContent = code;
  form.classList.add("hidden");
  document.getElementById("intro").classList.add("hidden");
  done.classList.remove("hidden");
});
