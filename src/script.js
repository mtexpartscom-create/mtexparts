// ============================================================
// MTEX PARTS – Landing Page JavaScript
// ============================================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close nav when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ---- Gallery filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    carCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ---- Contact form handler with loading animation ----
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = form.querySelector('button[type="submit"]');
  
  // Add loading state
  btn.classList.add('loading');
  btn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    btn.classList.remove('loading');
    form.style.display = 'none';
    success.style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(() => {
      form.style.display = 'block';
      success.style.display = 'none';
      form.reset();
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

// ---- Image loading animations ----
const images = document.querySelectorAll('img[loading="lazy"]');
images.forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('fade-in-content');
  });
  
  // Add loading skeleton while image loads
  if (!img.complete) {
    img.parentElement.classList.add('loading-image');
  }
});

// ---- Scroll animations ----
const fadeEls = document.querySelectorAll(
  '.service-card, .car-card, .review-card, .about-grid, .contact-grid, .section-header'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
