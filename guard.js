(function () {
  "use strict";
  if (!window.MuharibStore || !window.MuharibStore.getCurrent()) {
    window.location.replace("index.html");
  }
})();
