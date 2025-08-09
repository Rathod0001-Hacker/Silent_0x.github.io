// Basic interactions: mobile menu, smooth scroll, skill animation, back to top
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('nav');
  const toggle = document.getElementById('menuToggle');
  const back = document.getElementById('backToTop');
  const skillSpans = document.querySelectorAll('.skill-bar span');

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
        // close mobile menu
        if (menu.classList.contains('active')) menu.classList.remove('active');
      }
    });
  });

  // Back to top
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) back.style.display = 'block';
    else back.style.display = 'none';
  });
  back.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Animate skill bars when in viewport
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillSpans.forEach(span => {
          const w = span.getAttribute('data-width') || '80%';
          span.style.width = w;
        });
        obs.disconnect();
      }
    });
  }, {threshold:0.35});
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) obs.observe(skillsSection);

  // Simple form submit feedback (for Formspree)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      // Let Formspree or backend handle it. Optionally you can show a quick message:
      setTimeout(() => alert('Thanks — your message will be sent.'), 200);
    });
  }
});
