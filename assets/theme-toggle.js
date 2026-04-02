(function () {
  var STORAGE_KEY = 'my-learning-theme';

  function stored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }

  function syncButtons(theme) {
    var dark = theme !== 'light';
    var iconChar = dark ? '\u2600' : '\u263d';
    var nextLabel = dark ? 'Switch to light mode' : 'Switch to dark mode';
    var nextText = dark ? 'Light' : 'Dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', nextLabel);
      btn.setAttribute('aria-pressed', dark ? 'false' : 'true');
      var icon = btn.querySelector('.theme-toggle__icon');
      var text = btn.querySelector('.theme-toggle__text');
      if (icon) icon.textContent = iconChar;
      if (text) text.textContent = nextText;
    });
  }

  function apply(theme) {
    if (theme !== 'light' && theme !== 'dark') theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    save(theme);
    syncButtons(theme);
  }

  function toggle() {
    var cur = document.documentElement.getAttribute('data-theme') || 'light';
    apply(cur === 'dark' ? 'light' : 'dark');
  }

  function init() {
    var t = stored();
    if (t !== 'light' && t !== 'dark') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
    syncButtons(t);
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
    window.addEventListener('storage', function (e) {
      if (e.key !== STORAGE_KEY) return;
      var v = e.newValue;
      if (v === 'light' || v === 'dark') {
        document.documentElement.setAttribute('data-theme', v);
        syncButtons(v);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
