/* ============================================================
   Omnibot Labs — Foundation Pure Vanilla JS
   Zero dependencies · Production-ready for GitHub Pages
   ============================================================ */

(function(){
  'use strict';

  var isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---- 1. Dark Mode Management ---- */
  function initTheme(){
    var saved = localStorage.getItem('omnibot-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(saved === 'dark' || (!saved && prefersDark)){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeButtons();
  }

  function updateThemeButtons(){
    var isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      btn.textContent = isDark ? '☀️' : '🌙';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function toggleTheme(){
    var isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('omnibot-theme', isDark ? 'dark' : 'light');
    updateThemeButtons();
  }

  /* ---- 2. Mobile Menu ---- */
  function initMobileMenu(){
    var btn = document.querySelector('.menu-btn');
    var menu = document.querySelector('.mobile-menu');
    if(!btn || !menu) return;

    btn.addEventListener('click', function(){
      var isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
    });

    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
      });
    });
  }

  /* ---- 3. Navbar Shrink on Scroll ---- */
  function initNavShrink(){
    var header = document.querySelector('.site-header');
    if(!header) return;

    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:90px;left:0;width:1px;height:1px;pointer-events:none';
    document.body.insertBefore(sentinel, document.body.firstChild);

    if('IntersectionObserver' in window){
      var observer = new IntersectionObserver(function(entries){
        header.classList.toggle('scrolled', !entries[0].isIntersecting);
      }, {threshold: 0});
      observer.observe(sentinel);
    }
  }

  /* ---- 4. Interactive Ladder Tabs (ladder.html) ---- */
  function initLadderTabs(){
    var tabs = document.querySelectorAll('.ladder-tab');
    var panels = document.querySelectorAll('.ladder-panel');
    if(!tabs.length || !panels.length) return;

    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        var grade = tab.getAttribute('data-grade');
        tabs.forEach(function(t){ t.setAttribute('aria-selected', 'false'); });
        tab.setAttribute('aria-selected', 'true');

        panels.forEach(function(p){
          if(p.getAttribute('data-grade') === grade){
            p.hidden = false;
            p.style.display = 'block';
            p.classList.remove('is-visible');
            void p.offsetWidth; // reflow to trigger buttery-smooth keyframe animation
            p.classList.add('is-visible');
          } else {
            p.hidden = true;
            p.style.display = 'none';
            p.classList.remove('is-visible');
          }
        });
      });
    });
  }

  /* ---- 5. Hero Gradient Canvas (index.html) ---- */
  function initHeroCanvas(){
    var host = document.querySelector('.hero-gradient-host');
    if(!host) return;

    var wrap = document.createElement('div');
    wrap.className = 'hero-gradient-bg';
    var canvas = document.createElement('canvas');
    wrap.appendChild(canvas);
    host.insertBefore(wrap, host.firstChild);

    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, t = 0;
    var isHostVisible = true;
    var animFrame = null;

    var lightBlobs = [
      {hex:'#6946F1',cx:.22,cy:.30,r:.42}, // Violet
      {hex:'#168F88',cx:.78,cy:.22,r:.36}, // Mint dark
      {hex:'#D9EF24',cx:.65,cy:.75,r:.38}, // Lime
      {hex:'#C84B4A',cx:.18,cy:.78,r:.34}, // Coral dark
      {hex:'#2C215F',cx:.50,cy:.50,r:.30}  // Nebula
    ];
    var darkBlobs = [
      {hex:'#6946F1',cx:.22,cy:.30,r:.42}, // Brand Violet
      {hex:'#71DCCC',cx:.78,cy:.22,r:.36}, // Neon Mint
      {hex:'#D9EF24',cx:.65,cy:.75,r:.38}, // High-energy Lime
      {hex:'#E56661',cx:.18,cy:.78,r:.34}, // Coral accent
      {hex:'#2C215F',cx:.50,cy:.50,r:.30}  // Nebula glow
    ];

    function resize(){
      var r = host.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.min(Math.round(r.width), 1280));
      h = canvas.height = Math.max(1, Math.min(Math.round(r.height), 800));
    }
    resize();
    window.addEventListener('resize', resize, {passive: true});

    function draw(){
      t += isReduced ? 0 : 0.0035;
      var isDark = document.documentElement.classList.contains('dark');
      var blobs = isDark ? darkBlobs : lightBlobs;
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = isDark ? '#0D0C1D' : '#F7F8FA';
      ctx.fillRect(0,0,w,h);

      blobs.forEach(function(b, i){
        var ang = t + i * 1.7;
        var x = (b.cx + Math.sin(ang) * 0.06) * w;
        var y = (b.cy + Math.cos(ang * 0.8) * 0.06) * h;
        var rad = b.r * Math.max(w, h);
        var g = ctx.createRadialGradient(x,y,0,x,y,rad);
        g.addColorStop(0, b.hex + (isDark ? '99' : '55'));
        g.addColorStop(1, b.hex + '00');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x,y,rad,0,Math.PI*2);
        ctx.fill();
      });

      if(!isReduced && isHostVisible){
        animFrame = requestAnimationFrame(draw);
      }
    }

    if('IntersectionObserver' in window){
      var heroObs = new IntersectionObserver(function(entries){
        isHostVisible = entries[0].isIntersecting;
        if(isHostVisible && !animFrame && !isReduced){
          draw();
        } else if(!isHostVisible && animFrame){
          cancelAnimationFrame(animFrame);
          animFrame = null;
        }
      }, {threshold: 0});
      heroObs.observe(host);
    } else {
      draw();
    }
  }

  /* ---- 6. Spotlight Card Glow (RAF-throttled) ---- */
  function initSpotlight(){
    if(isReduced || !canHover) return;
    document.querySelectorAll('.spotlight-card').forEach(function(card){
      var raf = null;
      card.addEventListener('pointermove', function(e){
        if(raf) return;
        raf = requestAnimationFrame(function(){
          var r = card.getBoundingClientRect();
          card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          card.style.setProperty('--my', (e.clientY - r.top) + 'px');
          raf = null;
        });
      }, {passive: true});
    });
  }

  /* ---- 7. Dark Surfaces Glow Box Effect (RAF-throttled) ---- */
  function initGlowBox(){
    if(isReduced || !canHover) return;
    document.querySelectorAll('.glow-box').forEach(function(box){
      var raf = null;
      box.addEventListener('pointermove', function(e){
        if(raf) return;
        raf = requestAnimationFrame(function(){
          var r = box.getBoundingClientRect();
          var cx = r.left + r.width/2, cy = r.top + r.height/2;
          var angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI) + 90;
          box.style.setProperty('--glow-angle', angle.toFixed(1));
          box.classList.add('glow-active');
          raf = null;
        });
      }, {passive: true});
      box.addEventListener('pointerleave', function(){
        box.classList.remove('glow-active');
      });
    });
  }

  /* ---- 8. Sticky Announcement Banner ---- */
  function initBanner(){
    if(sessionStorage.getItem('omnibot-banner-dismissed') === '1') return;
    if(document.getElementById('promo-banner')) return;

    var b = document.createElement('div');
    b.id = 'promo-banner';
    b.innerHTML = '<span>Have questions before enrolling? We\'re just a call away. <a href="mailto:hello@omnibotlabs.com">Get in touch</a></span><button type="button" class="banner-close" aria-label="Dismiss announcement"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>';
    document.body.insertBefore(b, document.body.firstChild);

    function updateOffsets(){
      var h = b.isConnected ? b.offsetHeight : 0;
      var header = document.querySelector('.site-header');
      if(header) header.style.top = h + 'px';
    }

    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        b.classList.add('is-shown');
        updateOffsets();
      });
    });

    b.querySelector('.banner-close').addEventListener('click', function(){
      b.classList.remove('is-shown');
      sessionStorage.setItem('omnibot-banner-dismissed', '1');
      var header = document.querySelector('.site-header');
      if(header) header.style.top = '0px';
      setTimeout(function(){ b.remove(); }, 350);
    });
    window.addEventListener('resize', updateOffsets, {passive: true});
  }

  /* ---- 9. Multi-Step Boot Loader ---- */
  function initBootLoader(){
    if(sessionStorage.getItem('omnibot-booted') === '1') return;
    var steps = ['Booting up the lab…','Calibrating sensors…','Loading builder profiles…','Ready.'];
    var wrap = document.createElement('div');
    wrap.id = 'boot-loader';
    var ol = document.createElement('ol');
    steps.forEach(function(text){
      var li = document.createElement('li');
      li.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg><span>' + text + '</span>';
      ol.appendChild(li);
    });
    wrap.appendChild(ol);
    document.body.appendChild(wrap);

    var items = ol.querySelectorAll('li');
    var i = 0;
    function step(){
      items.forEach(function(el, idx){ el.classList.toggle('is-active', idx === i); });
      i++;
      if(i < items.length){
        setTimeout(step, 140);
      } else {
        setTimeout(function(){
          wrap.classList.add('is-hidden');
          sessionStorage.setItem('omnibot-booted', '1');
          setTimeout(function(){ wrap.remove(); }, 350);
        }, 160);
      }
    }
    requestAnimationFrame(step);
  }



  /* ---- 11. Scroll Reveal ---- */
  function initReveal(){
    var els = document.querySelectorAll('.reveal, .reveal-stagger');
    if(!els.length) return;

    // Immediately reveal elements that are already within or close to the viewport
    function checkViewport(){
      var vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(function(e){
        var rect = e.getBoundingClientRect();
        if(rect.top < vh + 200){
          e.classList.add('is-visible');
        }
      });
    }
    checkViewport();

    if(!('IntersectionObserver' in window) || isReduced){
      els.forEach(function(e){ e.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0, rootMargin: '0px 0px 160px 0px'});

    els.forEach(function(el){
      if(!el.classList.contains('is-visible')){
        observer.observe(el);
      }
    });

    document.querySelectorAll('.reveal-stagger').forEach(function(grid){
      Array.prototype.forEach.call(grid.children, function(child, idx){
        child.style.transitionDelay = (idx * 50) + 'ms';
      });
    });

    // Safety fallback: guarantee all sections are made visible
    setTimeout(function(){
      els.forEach(function(e){ e.classList.add('is-visible'); });
    }, 600);
  }

  /* ---- 12. Slot Pill Selection (signup.html) ---- */
  function initSlotPills(){
    document.querySelectorAll('.slot-pill').forEach(function(pill){
      pill.addEventListener('click', function(){
        document.querySelectorAll('.slot-pill').forEach(function(p){ p.classList.remove('selected'); });
        pill.classList.add('selected');
      });
    });
  }

  /* ---- 13. Gallery Photos & Lightbox (gallery.html) ---- */
  function initGallery(){
    var grid = document.getElementById('lab-gallery');
    var lightbox = document.getElementById('lab-lightbox');
    if(!grid || !lightbox) return;

    var lightboxImg = document.getElementById('lab-lightbox-img');
    var lightboxCap = document.getElementById('lab-lightbox-caption');
    var closeBtn = document.getElementById('lab-close');

    function openLightbox(src, cap){
      if(lightboxImg) lightboxImg.src = src;
      if(lightboxCap) lightboxCap.textContent = cap;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox(){
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });

    var photos = [
      {seed:'omnibot-lab-soldering-01',w:900,h:900,cls:'span-2x2',caption:'Wiring the first circuit, Grade 4.'},
      {seed:'omnibot-lab-board-macro',w:500,h:500,cls:'',caption:'Close-up on a soldered board.'},
      {seed:'omnibot-lab-robot-arm',w:500,h:500,cls:'',caption:'A Grade 7 robotic arm mid-build.'},
      {seed:'omnibot-lab-pair-coding',w:500,h:500,cls:'',caption:'Pair programming during lab hours.'},
      {seed:'omnibot-lab-3d-printer',w:500,h:500,cls:'',caption:'Printing chassis parts overnight.'},
      {seed:'omnibot-lab-demo-day',w:1400,h:400,cls:'span-full',caption:'Demo day, families in the room.'}
    ];

    grid.innerHTML = '';
    photos.forEach(function(p){
      var src = 'https://picsum.photos/seed/' + p.seed + '/' + p.w + '/' + p.h;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-item' + (p.cls ? ' ' + p.cls : '');
      btn.setAttribute('aria-label', 'Open photo: ' + p.caption);

      var img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = p.caption;
      img.onload = function(){
        img.classList.add('loaded');
      };
      img.onerror = function(){
        img.style.display = 'none';
        var fallback = document.createElement('div');
        fallback.style.cssText = 'height:100%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-size:0.875rem;padding:1rem;text-align:center;font-family:var(--font-mono);';
        fallback.textContent = 'Omnibot Workshop';
        btn.insertBefore(fallback, cap);
      };
      img.src = src;

      var cap = document.createElement('figcaption');
      cap.textContent = p.caption;

      btn.appendChild(img);
      btn.appendChild(cap);
      btn.addEventListener('click', function(){ openLightbox(src, p.caption); });
      grid.appendChild(btn);
    });
  }

  /* ---- Initialize everything on DOMContentLoaded ---- */
  document.addEventListener('DOMContentLoaded', function(){
    initTheme();
    window.addEventListener('storage', function(e){
      if(e.key === 'omnibot-theme') initTheme();
    });

    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      btn.addEventListener('click', toggleTheme);
    });

    initMobileMenu();
    initNavShrink();
    initLadderTabs();
    initHeroCanvas();
    initSpotlight();
    initGlowBox();
    initBanner();
    initBootLoader();
    initReveal();
    initSlotPills();
    initGallery();
  });

})();
