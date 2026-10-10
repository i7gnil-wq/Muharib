// تخزين المحاربين في المتصفح: { الكود: الاسم }
const Muharib = {
  KEY: "muharib_users",
  all() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; }
    catch (e) { return {}; }
  },
  save(users) { localStorage.setItem(this.KEY, JSON.stringify(users)); },
  newCode(users) {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code;
    do {
      code = letters[Math.floor(Math.random() * letters.length)] +
             String(Math.floor(Math.random() * 100)).padStart(2, "0");
    } while (users[code]);
    return code;
  }
};
