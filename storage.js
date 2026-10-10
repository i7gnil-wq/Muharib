(function () {
  "use strict";

  var WARRIORS_KEY = "muharib_warriors";
  var CURRENT_KEY = "muharib_current";

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function generateCode(existing) {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5000; i++) {
      var letter = letters.charAt(Math.floor(Math.random() * letters.length));
      var num = Math.floor(Math.random() * 100);
      var code = letter + (num < 10 ? "0" + num : "" + num);
      if (!existing[code]) return code;
    }
    return null;
  }

  window.MuharibStore = {
    createWarrior: function (name, why) {
      var all = read(WARRIORS_KEY, {});
      var code = generateCode(all);
      if (!code) return null;
      all[code] = { name: name, why: why, createdAt: Date.now() };
      if (!write(WARRIORS_KEY, all)) return null;
      return code;
    },

    findWarrior: function (code) {
      var all = read(WARRIORS_KEY, {});
      return all[code] ? { code: code, name: all[code].name, why: all[code].why } : null;
    },

    setCurrent: function (code) {
      return write(CURRENT_KEY, code);
    },

    getCurrent: function () {
      var code = read(CURRENT_KEY, null);
      return code ? this.findWarrior(code) : null;
    },

    logout: function () {
      try {
        localStorage.removeItem(CURRENT_KEY);
      } catch (e) {}
    }
  };
})();
