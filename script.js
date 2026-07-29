// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const setActiveLink = () => {
  let current = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Header shadow on scroll (subtle) =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.borderBottomColor = window.scrollY > 20
    ? 'rgba(159, 202, 230, 0.38)'
    : 'rgba(159, 202, 230, 0.18)';
});

// ===== Auto-update copyright year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Stat count-up animation =====
const statEls = document.querySelectorAll('.stat-num');

const animateCount = (el) => {
  const raw = el.textContent.trim();
  const match = raw.match(/^([^\d]*)(\d+(\.\d+)?)(.*)$/); // prefix, number, decimals, suffix
  if (!match) { el.classList.add('counted'); return; } // e.g. "AIR 823" won't match cleanly, skip animation for it

  const prefix = match[1];
  const target = parseFloat(match[2]);
  const isDecimal = raw.includes('.');
  const suffix = match[4];
  const duration = 1000;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isDecimal ? current.toFixed(2) : Math.round(current)) + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.classList.add('counted');
      setTimeout(() => el.classList.remove('counted'), 500);
    }
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));
