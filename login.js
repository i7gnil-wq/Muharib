(function () {
  "use strict";

  var $ = function (id) {
    return document.getElementById(id);
  };

  var newForm = $("new-form");
  var oldForm = $("old-form");
  var toggleOld = $("toggle-old");
  var modal = $("code-modal");

  function showError(el, msg) {
    el.textContent = msg;
    el.hidden = false;
  }

  function hideError(el) {
    el.hidden = true;
  }

  function goToWarriorPage() {
    window.location.href = "warrior.html";
  }

  function normalizeDigits(str) {
    return str
      .replace(/[٠-٩]/g, function (d) {
        return d.charCodeAt(0) - 0x0660;
      })
      .replace(/[۰-۹]/g, function (d) {
        return d.charCodeAt(0) - 0x06f0;
      });
  }

  newForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("new-error");
    hideError(err);

    var name = $("warrior-name").value.trim();
    var why = $("warrior-why").value.trim();

    if (!name) return showError(err, "اكتب اسم المحارب أولاً.");
    if (!why) return showError(err, "اكتب سبب محاربتك، فهو سلاحك الأقوى.");

    var code = window.MuharibStore.createWarrior(name, why);
    if (!code) {
      return showError(err, "تعذّر حفظ البيانات. تأكد أن المتصفح يسمح بالتخزين ثم حاول مجدداً.");
    }

    window.MuharibStore.setCurrent(code);
    $("modal-name").textContent = name;
    $("modal-code").textContent = code;
    modal.hidden = false;
    $("enter-btn").focus();
  });

  $("enter-btn").addEventListener("click", goToWarriorPage);

  function showReturnView(show) {
    newForm.hidden = show;
    toggleOld.hidden = show;
    oldForm.hidden = !show;
    $("title").textContent = show ? "أهلاً بعودتك أيها المحارب!" : "أهلاً بالمحارب الجديد!";
    hideError($("new-error"));
    hideError($("old-error"));
    if (show) $("old-code").focus();
  }

  toggleOld.addEventListener("click", function (e) {
    e.preventDefault();
    showReturnView(true);
  });

  $("back-new").addEventListener("click", function (e) {
    e.preventDefault();
    showReturnView(false);
  });

  oldForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("old-error");
    hideError(err);

    var code = normalizeDigits($("old-code").value.trim()).toUpperCase();

    if (!/^[A-Z][0-9]{2}$/.test(code)) {
      return showError(err, "الكود يتكوّن من حرف ورقمين، مثل: A12");
    }

    if (!window.MuharibStore.findWarrior(code)) {
      return showError(err, "لا يوجد محارب بهذا الكود على هذا المتصفح.");
    }

    window.MuharibStore.setCurrent(code);
    goToWarriorPage();
  });
})();
