// Переключение русский / английский: ?lang=ru, затем сохранённый выбор, затем язык браузера.
(function () {
  var q = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('forge-lang'); } catch (e) {}
  var lang = q || saved || ((navigator.language || '').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en');
  if (lang !== 'ru') lang = 'en';
  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.set === l ? 'true' : 'false');
    });
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
  }
  apply(lang);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang button');
    if (!b) return;
    try { localStorage.setItem('forge-lang', b.dataset.set); } catch (e2) {}
    apply(b.dataset.set);
  });
})();
