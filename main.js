(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById('copyEmail');
  var status = document.getElementById('copyStatus');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      var done = function (ok) {
        if (status) status.textContent = ok ? 'Email copied.' : 'Could not copy. The address is ' + email + '.';
        setTimeout(function () { if (status) status.textContent = ''; }, 3000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
