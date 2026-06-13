/* GA4 with Consent Mode v2. Analytics cookies withheld until banner accept;
   decline keeps GA cookieless. No-ops if GA_ID is empty. */
(function () {
  var GA_ID = 'G-D61GTNSM3N';
  if (!GA_ID) return;

  var CONSENT_KEY = 'raasta_consent';
  var saved = null;
  try { saved = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // Consent Mode v2: must default all denied BEFORE gtag.js loads.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  // Restore prior consent before config so cookies resume immediately.
  if (saved === 'granted') gtag('consent', 'update', { analytics_storage: 'granted' });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID);

  // Choice already stored: skip banner.
  if (saved === 'granted' || saved === 'denied') return;

  function injectBanner() {
    var css =
      '.rc-banner{position:fixed;left:var(--pad,18px);right:var(--pad,18px);bottom:var(--pad,18px);z-index:1000;max-width:440px;margin-inline:auto;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding:15px 17px;background:#fff;border:1px solid var(--line,rgba(23,23,26,.09));border-radius:16px;box-shadow:0 1px 1px rgba(23,23,26,.03),0 4px 10px rgba(23,23,26,.05),0 16px 40px rgba(23,23,26,.1);font-family:var(--font,"Inter",system-ui,sans-serif);opacity:0;transform:translateY(12px);transition:opacity .4s ease,transform .4s ease}' +
      '.rc-banner.rc-in{opacity:1;transform:none}' +
      '.rc-text{margin:0;flex:1 1 200px;font-size:13px;line-height:1.55;color:var(--muted,#6E6E76)}' +
      '.rc-text a{color:var(--ink,#17171A);text-decoration:underline;text-underline-offset:2px}' +
      '.rc-actions{display:flex;gap:8px;margin-left:auto}' +
      '.rc-btn{font-family:inherit;font-size:13px;font-weight:600;line-height:1;border-radius:999px;padding:9px 15px;cursor:pointer;border:1px solid transparent;transition:background .2s,color .2s,border-color .2s}' +
      '.rc-accept{background:#15A35A;color:#fff}' +
      '.rc-accept:hover{background:#0F8A4A}' +
      '.rc-decline{background:transparent;color:var(--muted,#6E6E76);border-color:var(--line-2,rgba(23,23,26,.14))}' +
      '.rc-decline:hover{color:var(--ink,#17171A);border-color:var(--ink,#17171A)}' +
      '@media (max-width:560px){.rc-banner{left:0;right:0;bottom:0;max-width:none;border-radius:16px 16px 0 0;border-left:0;border-right:0;border-bottom:0;padding:16px 18px calc(16px + env(safe-area-inset-bottom))}.rc-actions{width:100%}.rc-btn{flex:1}}' +
      '@media (prefers-reduced-motion:reduce){.rc-banner{transition:none;transform:none;opacity:1}}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'rc-banner';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<p class="rc-text">We use cookies for analytics to see how Raasta is used. ' +
      '<a href="/cookies.html">Read our Cookie Policy</a>.</p>' +
      '<div class="rc-actions">' +
      '<button type="button" class="rc-btn rc-decline">Decline</button>' +
      '<button type="button" class="rc-btn rc-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add('rc-in'); });

    function choose(value) {
      try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
      if (value === 'granted') gtag('consent', 'update', { analytics_storage: 'granted' });
      bar.classList.remove('rc-in');
      setTimeout(function () { bar.remove(); }, 400);
    }
    bar.querySelector('.rc-accept').addEventListener('click', function () { choose('granted'); });
    bar.querySelector('.rc-decline').addEventListener('click', function () { choose('denied'); });
  }

  if (document.body) injectBanner();
  else document.addEventListener('DOMContentLoaded', injectBanner);
})();
