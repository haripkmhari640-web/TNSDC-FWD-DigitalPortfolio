// ===== Theme toggle with persistence =====
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme');
if (saved) {
  root.classList.toggle('light', saved === 'light');
  root.classList.toggle('dark', saved === 'dark');
}
themeBtn && themeBtn.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  root.classList.toggle('dark', !isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const href = a.getAttribute('href');
  if (!href || href === '#') return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}));

// ===== Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Skill meters animation when in view =====
const meters = [...document.querySelectorAll('.skill')];
const inView = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const level = +card.dataset.level || 0;
      const bar = card.querySelector('.meter > i');
      if (bar) {
        bar.style.transition = 'width 1.2s cubic-bezier(.2,.8,.2,1)';
        bar.style.width = level + '%';
      }
      inView.unobserve(card);
    }
  });
}, { threshold: .4 });
meters.forEach(m => inView.observe(m));

// ===== Reveal on scroll =====
const reveals = document.querySelectorAll('.reveal');
const ob = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('show');
      ob.unobserve(en.target);
    }
  });
}, { threshold: .14 });
reveals.forEach(r => ob.observe(r));

// ===== Contact form (client-side validation only) =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const issues = [];
    if (!data.name?.trim()) issues.push('Name is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) issues.push('Valid email required');
    if (!data.message?.trim()) issues.push('Message is required');
    if (issues.length) {
      alert('Please fix:\n\n' + issues.join('\n'));
      return;
    }
    alert('Thanks, ' + data.name + '! This demo does not send emails. Connect it to your backend or a form service.');
    form.reset();
  });
}