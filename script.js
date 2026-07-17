const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
);

revealElements.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 55, 360)}ms`;
  observer.observe(el);
});

const heroImage = document.querySelector('.hero-image');

function animateParallax() {
  if (!heroImage) return;
  const y = window.scrollY * 0.08;
  heroImage.style.transform = `translateY(${y}px) scale(1.08)`;
}

window.addEventListener('scroll', animateParallax, { passive: true });
animateParallax();

const galleryImages = document.querySelectorAll('.gallery-image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.removeAttribute('src');
}

galleryImages.forEach((img) => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    const fullSrc = img.dataset.full || img.src;
    lightboxImage.src = fullSrc;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
