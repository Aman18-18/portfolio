/* ========================================
   THEME MANAGEMENT
   ======================================== */

function initializeTheme() {
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
}

/* ========================================
   THEME TOGGLE BUTTON
   ======================================== */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.remove();
}

/* ========================================
   NAVIGATION SCROLL EFFECT
   ======================================== */
const navbar = document.getElementById('navbar');

function updateNavBar() {
  if (!navbar) {
    return;
  }

  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavBar);

/* ========================================
   MOBILE MENU
   ======================================== */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });
}

if (closeMenu && mobileMenu) {
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
}

const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
if (mobileMenuLinks) {
  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

/* ========================================
   SCROLL REVEAL
   ======================================== */
const reveals = document.querySelectorAll('.reveal');
const revealOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
      const delay = siblings.indexOf(entry.target) * 80;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

reveals.forEach((el) => observer.observe(el));

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function handleAnchorClick(event) {
    const href = this.getAttribute('href');

    if (href !== '#' && document.querySelector(href)) {
      event.preventDefault();

      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    updateNavBar();
  });
} else {
  initializeTheme();
  updateNavBar();
}

function closeMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.remove('open');
  }
}

/* ========================================
   CLICK RIPPLE ANIMATION
   ======================================== */
document.addEventListener('click', function(e) {
  const target = e.target.closest('button, a[class*="btn"], .project-card, .profile-card, .social-item');
  
  if (!target) return;
  
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  target.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
});

/* ========================================
   SCROLL ANIMATION TRIGGER
   ======================================== */
const scrollElements = document.querySelectorAll('.reveal');
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      el.classList.add('scroll-reveal');
    } else if (elementOutofView(el)) {
      el.classList.remove('scroll-reveal');
    }
  });
};

window.addEventListener('scroll', displayScrollElement);
displayScrollElement();
