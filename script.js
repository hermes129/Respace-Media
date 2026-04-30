// ===== Lenis Smooth Scroll =====
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 2,
});

// ===== Preloader =====
lenis.stop(); // Stop scrolling while preloader is active

const counterObj = { val: 0 };
const counterEl = document.getElementById('preloader-counter');
const preloaderEl = document.getElementById('preloader');

if (counterEl && preloaderEl) {
  gsap.to(counterEl, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });

  gsap.to(counterObj, {
    val: 100,
    duration: 2.2,
    ease: "power3.inOut",
    onUpdate: () => {
      counterEl.innerText = Math.floor(counterObj.val) + "%";
    },
    onComplete: () => {
      gsap.to(counterEl, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      });
      gsap.to(preloaderEl, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.4,
        onComplete: () => {
          lenis.start(); // Re-enable scrolling
        }
      });
    }
  });
}


// Global scroll position for other modules
let lenisScroll = 0;
lenis.on('scroll', (e) => {
  lenisScroll = e.scroll;
  ScrollTrigger.update();
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ===== Hero Scroll Video-Like Effect =====
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=1200", // Total scroll distance to complete the animation
    pin: true,
    scrub: 1
  }
});

heroTl.to(".scroll-indicator", {
  opacity: 0,
  duration: 0.1, // Fade out quickly as soon as they start scrolling
  ease: "none"
}, 0)
.from(".hero-word", { 
  y: -30, 
  opacity: 0, 
  stagger: 0.15, 
  ease: "none" 
})
.from(".hero-subheading", { 
  y: 20, 
  opacity: 0, 
  ease: "none" 
}, "-=0.3");

gsap.from(".cred-bar", {
  scrollTrigger: {
    trigger: ".cred-bar",
    start: "top 95%",
    once: true
  },
  y: 15,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});

// ===== Header: scroll shrink =====
(function() {
  const header = document.getElementById('site-header');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('scrolled', lenisScroll > 10);
  }
  lenis.on('scroll', onScroll);
  onScroll(); // check on load
})();

// ===== Header: mobile menu =====
(function() {
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('mobile-overlay');
  const icon = toggle ? toggle.querySelector('.menu-icon') : null;
  if (!toggle || !overlay) return;

  let isOpen = false;
  function setMenu(open) {
    isOpen = open;
    toggle.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('open', open);
    icon && icon.classList.toggle('open', open);
    document.getElementById('site-header').classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setMenu(!isOpen));

  // Close on link click
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setMenu(false));
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780 && isOpen) setMenu(false);
  });
})();

// ===== Bsys 3-column expand =====
document.querySelectorAll('.bsys-col').forEach(col => {
  const top = col.querySelector('.bsys-col-top');
  const toggle = () => {
    const open = col.getAttribute('aria-expanded') === 'true';
    col.parentElement.querySelectorAll('.bsys-col').forEach(c => c.setAttribute('aria-expanded', 'false'));
    col.setAttribute('aria-expanded', open ? 'false' : 'true');
  };
  top.addEventListener('click', toggle);
  top.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});

// ===== Ops accordion =====
document.querySelectorAll('.ops-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.ops-item');
    const isOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.ops-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.ops-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Case study image accordion (click/hover) — scoped per .img-accordion =====
document.querySelectorAll('.img-accordion').forEach(group => {
  const items = group.querySelectorAll('.ia-item');
  items.forEach(item => {
    const activate = () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    };
    item.addEventListener('mouseenter', activate);
    item.addEventListener('click', activate);
    item.addEventListener('focus', activate);
    item.tabIndex = 0;
  });
});

// ===== GSAP Reveal on scroll =====
gsap.utils.toArray('section:not(.hero), .marquee-container, .bsys-col, .ops-item, .service-tile, .cs-card, .pf-cta-content').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});

gsap.from(".bento-card", {
  scrollTrigger: {
    trigger: ".bento-section",
    start: "top 80%",
    once: true
  },
  y: 30,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power2.out"
});

// ===== Bento Grid interaction =====
document.querySelectorAll('.bento-card').forEach(card => {
  const activate = () => {
    document.querySelectorAll('.bento-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  };
  card.addEventListener('mouseenter', activate);
  card.addEventListener('click', activate);
  card.addEventListener('focus', activate);
  card.tabIndex = 0;
});

// ===== Gooey Pixel Trail =====
(function() {
  const trail = document.getElementById('pixel-trail');
  if (!trail) return;

  const PIXEL_SIZE = window.innerWidth < 768 ? 24 : 32;
  const FADE_DURATION = 0;     // instant appear
  const FADE_DELAY    = 500;   // ms before fade-out starts

  let cols = 0;
  let rows = 0;
  let pixels = [];
  let heroRect = null;

  function buildGrid() {
    const hero = trail.closest('.hero');
    if (!hero) return;
    heroRect = hero.getBoundingClientRect();

    cols = Math.ceil(heroRect.width  / PIXEL_SIZE);
    rows = Math.ceil(heroRect.height / PIXEL_SIZE);

    // Clear existing pixels
    trail.innerHTML = '';
    pixels = [];

    // Set container to match the grid exactly
    trail.style.width  = cols * PIXEL_SIZE + 'px';
    trail.style.height = rows * PIXEL_SIZE + 'px';

    // Create pixel elements using a document fragment for performance
    const frag = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dot = document.createElement('div');
        dot.className = 'pixel-dot';
        dot.style.width  = PIXEL_SIZE + 'px';
        dot.style.height = PIXEL_SIZE + 'px';
        dot._fadeTimer = null;
        frag.appendChild(dot);
        pixels.push(dot);
      }
    }
    trail.appendChild(frag);
  }

  function activatePixel(x, y) {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    const idx = y * cols + x;
    const dot = pixels[idx];
    if (!dot) return;

    // Clear any pending fade
    if (dot._fadeTimer) {
      clearTimeout(dot._fadeTimer);
      dot._fadeTimer = null;
    }

    // Show pixel instantly
    dot.style.transition = 'none';
    dot.style.background = 'rgba(125,57,235,1)';

    // Schedule fade-out
    dot._fadeTimer = setTimeout(() => {
      dot.style.transition = 'background 0.6s ease';
      dot.style.background = 'rgba(125,57,235,0)';
      dot._fadeTimer = null;
    }, FADE_DELAY);
  }

  // Throttle mouse tracking with rAF
  let ticking = false;
  function handleMouseMove(e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (!heroRect) {
        ticking = false;
        return;
      }
      const x = Math.floor((e.clientX - heroRect.left) / PIXEL_SIZE);
      const y = Math.floor((e.clientY - heroRect.top)  / PIXEL_SIZE);
      activatePixel(x, y);
      ticking = false;
    });
  }

  // Touch support
  function handleTouchMove(e) {
    const touch = e.touches[0];
    if (!touch || !heroRect) return;
    const x = Math.floor((touch.clientX - heroRect.left) / PIXEL_SIZE);
    const y = Math.floor((touch.clientY - heroRect.top)  / PIXEL_SIZE);
    activatePixel(x, y);
  }

  // Rebuild on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGrid, 250);
  });

  // Update heroRect on scroll (for sticky header offset etc.)
  lenis.on('scroll', () => {
    const hero = trail.closest('.hero');
    if (hero) heroRect = hero.getBoundingClientRect();
  });

  // Attach events to the hero section
  const heroSection = trail.closest('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('touchmove', handleTouchMove, { passive: true });
  }

  // Initial build
  buildGrid();
})();

// ===== Particle Star Background (with scroll parallax) =====
(function() {
  const canvas = document.getElementById('hero-stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  const STAR_COUNT = 120;
  const PARALLAX_STRENGTH = 0.35; // how strongly scroll affects star movement
  let w = 0, h = 0;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        baseY: Math.random() * h,               // original Y (before parallax)
        r: Math.random() * 1.4 + 0.3,           // radius 0.3–1.7
        baseAlpha: Math.random() * 0.5 + 0.15,  // base opacity 0.15–0.65
        twinkleSpeed: Math.random() * 0.8 + 0.3,// twinkle rate
        twinkleOffset: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.08,   // very slow horizontal drift
        driftY: -(Math.random() * 0.06 + 0.01), // gentle upward drift
        depth: Math.random() * 0.7 + 0.3,       // parallax depth 0.3–1.0 (deeper = moves more)
        hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 265 : 80) : 0
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const time = gsap.ticker.time;
    const scrollY = lenisScroll; // read from global Lenis scroll position

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      // Gentle ambient drift
      s.x += s.driftX;
      s.baseY += s.driftY;

      // Wrap around edges (based on baseY)
      if (s.baseY < -h * 0.5) s.baseY = h + h * 0.5;
      if (s.baseY > h + h * 0.5) s.baseY = -h * 0.5;
      if (s.x < -2) s.x = w + 2;
      if (s.x > w + 2) s.x = -2;

      // Scroll parallax: stars shift upward when scrolling down
      // Each star moves at its own rate based on its depth
      const parallaxOffset = scrollY * s.depth * PARALLAX_STRENGTH;
      let drawY = s.baseY - parallaxOffset;

      // Wrap the parallax-shifted Y so stars cycle back in
      drawY = ((drawY % h) + h) % h;

      // Twinkle opacity via sine wave
      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
      const alpha = s.baseAlpha + twinkle * 0.25;
      if (alpha <= 0) continue;

      ctx.beginPath();
      ctx.arc(s.x, drawY, s.r, 0, Math.PI * 2);

      if (s.hue === 0) {
        ctx.fillStyle = 'rgba(255,255,255,' + Math.min(alpha, 0.85) + ')';
      } else if (s.hue === 265) {
        ctx.fillStyle = 'rgba(160,120,235,' + Math.min(alpha, 0.6) + ')';
      } else {
        ctx.fillStyle = 'rgba(198,255,51,' + Math.min(alpha, 0.45) + ')';
      }
      ctx.fill();

      // Subtle glow on larger stars
      if (s.r > 1) {
        ctx.beginPath();
        ctx.arc(s.x, drawY, s.r * 2.5, 0, Math.PI * 2);
        if (s.hue === 0) {
          ctx.fillStyle = 'rgba(255,255,255,' + Math.min(alpha * 0.12, 0.1) + ')';
        } else if (s.hue === 265) {
          ctx.fillStyle = 'rgba(125,57,235,' + Math.min(alpha * 0.15, 0.12) + ')';
        } else {
          ctx.fillStyle = 'rgba(198,255,51,' + Math.min(alpha * 0.1, 0.08) + ')';
        }
        ctx.fill();
      }
    }
  }

  // Resize handler
  let resizeTimer2;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer2);
    resizeTimer2 = setTimeout(() => {
      resize();
      createStars();
    }, 250);
  });

  // Init
  resize();
  createStars();
  gsap.ticker.add(draw);
})();

// ===== Back to Top Button =====
(function() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  // Show/hide based on scroll position
  lenis.on('scroll', (e) => {
    btn.classList.toggle('visible', e.scroll > 400);
  });

  // Smooth scroll to top via Lenis
  btn.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.5 });
  });
})();

// ==========================================
// MODAL LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal');
  const modalTriggers = document.querySelectorAll('[data-modal="true"]');

  if (modal && closeBtn) {
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Form submission
    const form = document.getElementById('book-call-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        
        try {
          const formData = new FormData(form);
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            submitBtn.innerHTML = 'Message Sent! ✓';
            submitBtn.style.background = 'var(--accent)';
            
            setTimeout(() => {
              modal.classList.remove('open');
              document.body.style.overflow = '';
              form.reset();
              submitBtn.innerHTML = originalText;
              submitBtn.style.background = '';
            }, 2000);
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          submitBtn.innerHTML = 'Error. Try again.';
          submitBtn.style.background = '#ff3333';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
          }, 3000);
        }
      });
    }
  }
});
