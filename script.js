// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const setActiveLink = () => {
  let current = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(anchor => {
    anchor.classList.toggle('active', anchor.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Header border on scroll =====
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.borderBottomColor =
    window.scrollY > 20
      ? 'rgba(159, 202, 230, 0.38)'
      : 'rgba(159, 202, 230, 0.18)';
});

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Stat count-up animation =====
const statEls = document.querySelectorAll('.stat-num');

const animateCount = (el) => {
  const raw = el.textContent.trim();

  // Only animate pure numeric values
  if (isNaN(Number(raw))) return;

  const target = Number(raw);
  const isDecimal = raw.includes('.');
  const duration = 1100;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = isDecimal ? current.toFixed(2) : Math.round(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = raw;
      el.classList.add('counted');
      setTimeout(() => el.classList.remove('counted'), 600);
    }
  };

  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));

// ===== PDF modal viewer =====
const pdfModal = document.getElementById('pdfModal');
const pdfBackdrop = document.getElementById('pdfBackdrop');
const pdfCloseBtn = document.getElementById('pdfCloseBtn');
const pdfFrame = document.getElementById('pdfFrame');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfOpenNewTab = document.getElementById('pdfOpenNewTab');
const viewWritingBtns = document.querySelectorAll('.view-writing-btn');

const openPdfModal = (title, pdfUrl) => {
  if (!pdfModal || !pdfFrame || !pdfModalTitle || !pdfOpenNewTab) return;

  if (!pdfUrl || pdfUrl.includes('YOUR_PUBLIC_') || pdfUrl.includes('YOUR-REPO-NAME')) {
    alert('Please add a valid public PDF URL in index.html before using the View button.');
    return;
  }

  pdfModalTitle.textContent = title;

  // For direct PDF URLs
  const previewUrl = pdfUrl.includes('#')
    ? pdfUrl
    : `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`;

  pdfFrame.src = previewUrl;
  pdfOpenNewTab.href = pdfUrl;

  pdfModal.classList.add('open');
  pdfModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closePdfModal = () => {
  if (!pdfModal || !pdfFrame) return;

  pdfModal.classList.remove('open');
  pdfModal.setAttribute('aria-hidden', 'true');
  pdfFrame.src = '';
  document.body.classList.remove('modal-open');
};

viewWritingBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.dataset.title || 'Document Preview';
    const pdfUrl = btn.dataset.pdf || '';
    openPdfModal(title, pdfUrl);
  });
});

if (pdfCloseBtn) {
  pdfCloseBtn.addEventListener('click', closePdfModal);
}

if (pdfBackdrop) {
  pdfBackdrop.addEventListener('click', closePdfModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('open')) {
    closePdfModal();
  }
});
