// Lets CSS hide scroll-reveal elements only when JS is running
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Fade sections in as they scroll into view
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  // Click-to-enlarge for cover + gallery images on project pages
  const zoomable = document.querySelectorAll('.cover img, .gallery img, .prose figure img');
  if (!zoomable.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt=""><p></p>';
  document.body.appendChild(box);
  const boxImg = box.querySelector('img');
  const boxCap = box.querySelector('p');

  const open = img => {
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt;
    const cap = img.closest('figure')?.querySelector('figcaption');
    boxCap.textContent = cap ? cap.textContent : img.alt;
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    box.classList.remove('open');
    document.body.style.overflow = '';
  };

  zoomable.forEach(img => {
    img.tabIndex = 0;
    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', e => { if (e.key === 'Enter') open(img); });
  });
  box.addEventListener('click', e => { if (e.target !== boxImg) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
