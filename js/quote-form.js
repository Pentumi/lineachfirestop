(function () {
  var MAX = 8 * 1024 * 1024;
  var params = new URLSearchParams(window.location.search);
  document.querySelectorAll('.js-quote-form').forEach(function (form) {
    var type = form.querySelector('.js-enquiry-type');
    if (type && params.get('type') === 'tender') {
      type.value = 'Add to tender list';
    }
    var file = form.querySelector('.js-drawings');
    var err = form.querySelector('.js-size-error');
    function tooBig() {
      return file && file.files && file.files[0] && file.files[0].size > MAX;
    }
    if (file) {
      file.addEventListener('change', function () {
        if (err) { err.hidden = !tooBig(); }
      });
    }
    form.addEventListener('submit', function (e) {
      if (tooBig()) {
        e.preventDefault();
        if (err) { err.hidden = false; }
        file.focus();
        return;
      }
      try { sessionStorage.setItem('lfs_lead', type ? type.value : 'quote'); } catch (x) {}
    });
  });
  if (window.location.pathname.indexOf('/thank-you') === 0) {
    var lead = null;
    try { lead = sessionStorage.getItem('lfs_lead'); sessionStorage.removeItem('lfs_lead'); } catch (x) {}
    if (lead && typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { form_name: 'quote', enquiry_type: lead });
    }
  }
})();
