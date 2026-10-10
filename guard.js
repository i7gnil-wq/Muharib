/* guard.js — يمنع فتح الواجهة الداخلية بدون تسجيل دخول */
(function () {
  "use strict";
  if (!window.MuharibStore || !window.MuharibStore.getCurrent()) {
    window.location.replace("index.html");
  }
})();
