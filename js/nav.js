/* Shared nav behaviour for sub-pages (body.subpage); home page uses script.js. */
(function () {
  'use strict';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- sub-pages only ---------- */
  if (!document.body.classList.contains('subpage')) return;

  var nav = $('#nav');
  var bar = $('#progress');

  /* mobile menu */
  var burger = $('#burger'), menu = $('#mobileMenu');
  if (burger && menu) {
    var setMenu = function (isOpen) {
      menu.classList.toggle('open', isOpen);
      burger.classList.toggle('is-open', isOpen);
      if (nav) nav.classList.toggle('menu-open', isOpen);
      document.body.classList.toggle('menu-lock', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    $$('#mobileMenu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* statement bands: split into words for scroll highlight */
  var stEls = $$('.statement-text');
  stEls.forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
  });
  function highlightStatements(vh) {
    if (reduceMotion) return;
    stEls.forEach(function (el) {
      var ws = el.querySelectorAll('.w');
      if (!ws.length) return;
      var r = el.getBoundingClientRect();
      var t = (vh * 0.82 - r.top) / (vh * 0.82 - vh * 0.30);
      t = Math.max(0, Math.min(1, t));
      var active = Math.round(t * ws.length);
      for (var i = 0; i < ws.length; i++) ws[i].classList.toggle('on', i < active);
    });
  }

  /* image-break parallax */
  var breaks = reduceMotion ? [] : $$('.break-img');
  function runBreakParallax(vh) {
    for (var i = 0; i < breaks.length; i++) {
      var sec = breaks[i], bg = sec.querySelector('.break-bg');
      if (!bg) continue;
      var r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      var H = r.height;
      var prog = (r.top + H / 2 - vh / 2) / (vh / 2 + H / 2);
      prog = prog < -1 ? -1 : prog > 1 ? 1 : prog;
      bg.style.transform = 'translate3d(0,' + (-prog * H * 0.4).toFixed(1) + 'px,0)';
    }
  }

  /* scroll handler: nav state, progress bar, highlight, parallax */
  if (nav || stEls.length || breaks.length) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset || 0;
        var vh = window.innerHeight;
        if (nav) nav.classList.toggle('scrolled', y > 8);
        if (bar) {
          var doc = document.documentElement;
          var max = doc.scrollHeight - doc.clientHeight;
          bar.style.transform = 'scaleX(' + (max > 0 ? (y / max) : 0) + ')';
        }
        highlightStatements(vh);
        runBreakParallax(vh);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* Vision thesis index scroll-spy (guarded on #vIndex) */
  var vIndex = $('#vIndex');
  if (vIndex && 'IntersectionObserver' in window) {
    var vLinks = $$('a', vIndex);
    var vMap = {};
    var vSecs = [];
    vLinks.forEach(function (a) {
      var id = (a.getAttribute('href') || '').slice(1);
      var sec = id && document.getElementById(id);
      if (sec) { vMap[id] = a; vSecs.push(sec); }
    });
    if (vSecs.length) {
      var vSpy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          vLinks.forEach(function (l) { l.classList.remove('on'); l.removeAttribute('aria-current'); });
          var a = vMap[en.target.id];
          if (a) { a.classList.add('on'); a.setAttribute('aria-current', 'true'); }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      vSecs.forEach(function (s) { vSpy.observe(s); });
    }
  }

  /* Touch: collapse the index on outside tap/scroll - blur focus and briefly
     kill pointer events to clear lingering :hover (no pointer-leave exists). */
  if (vIndex && window.matchMedia('(hover: none)').matches) {
    var indexEngaged = function () {
      if (vIndex.contains(document.activeElement)) return true;
      try { return vIndex.matches(':hover'); } catch (e) { return false; }
    };
    var collapseIndex = function () {
      if (vIndex.contains(document.activeElement)) document.activeElement.blur();
      vIndex.style.pointerEvents = 'none';
      requestAnimationFrame(function () { vIndex.style.pointerEvents = ''; });
    };
    document.addEventListener('click', function (e) {
      if (!vIndex.contains(e.target) && indexEngaged()) collapseIndex();
    });
    window.addEventListener('scroll', function () {
      if (indexEngaged()) collapseIndex();
    }, { passive: true });
  }

  /* Careers: copy application template (guarded on #copyTemplate) */
  var copyBtn = $('#copyTemplate'), tplText = $('#templateText');
  if (copyBtn && tplText) {
    var copyLabel = $('.tpl-copy-text', copyBtn);
    var copyTimer;
    var markCopied = function () {
      copyBtn.classList.add('is-copied');
      if (copyLabel) copyLabel.textContent = 'Copied';
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () {
        copyBtn.classList.remove('is-copied');
        if (copyLabel) copyLabel.textContent = 'Copy';
      }, 2000);
    };
    var legacyCopy = function (text) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        markCopied();
      } catch (e) { /* no-op */ }
    };
    copyBtn.addEventListener('click', function () {
      var text = tplText.textContent.replace(/\n{3,}/g, '\n\n').trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(markCopied, function () { legacyCopy(text); });
      } else {
        legacyCopy(text);
      }
    });
  }

  /* reveal-on-scroll */
  var reveals = $$('.reveal');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (r) { r.classList.add('in'); });
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (r) { obs.observe(r); });
    }
  }
})();
