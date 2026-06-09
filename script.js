// ─── Navbar scroll effect ───────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

// ─── Mobile nav toggle ──────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('menu-open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('menu-open'));
});

// ─── Chat chips ─────────────────────────────────────────────────
const chips = document.querySelectorAll('.chat-chip');
const heroInput = document.getElementById('heroInput');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    heroInput.value = chip.dataset.text;
    heroInput.focus();
  });
});

// ─── Chat send / demo response ──────────────────────────────────
const chatSend = document.getElementById('chatSend');
const chatResponse = document.getElementById('chatResponse');
const responseCards = document.getElementById('responseCards');

const mockResults = [
  {
    badge: 'Best Value',
    badgeClass: 'best',
    mode: 'Train · Vande Bharat Express',
    price: '₹1,345',
    meta: '2h 40m · Includes meals · Refundable',
    action: 'Book on IRCTC →'
  },
  {
    badge: 'Fastest',
    badgeClass: '',
    mode: 'Flight · IndiGo 6E-203',
    price: '₹2,890',
    meta: '1h 10m · +45 min airport transit · Non-refundable',
    action: 'Book on MakeMyTrip →'
  },
  {
    badge: 'Budget Pick',
    badgeClass: '',
    mode: 'Bus · Volvo AC Sleeper',
    price: '₹680',
    meta: '7h 30m · Overnight · Fully Refundable',
    action: 'Book on RedBus →'
  }
];

function buildResultCard(r) {
  const card = document.createElement('div');
  card.style.cssText = 'background:rgba(255,255,255,0.04);border:1px solid rgba(0,194,224,0.12);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;';
  card.innerHTML = `
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
        <span style="padding:2px 9px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;background:rgba(22,163,74,0.12);color:#4ade80;">${r.badge}</span>
        <span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.75);">${r.mode}</span>
      </div>
      <div>
        <span style="font-family:'Sora',sans-serif;font-size:22px;font-weight:800;color:#fff;">${r.price}</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.4);margin-left:8px;">${r.meta}</span>
      </div>
    </div>
    <button style="padding:8px 14px;border-radius:8px;background:linear-gradient(135deg,#00c2e0,#1189b3);color:#fff;font-size:12px;font-weight:600;border:none;cursor:pointer;white-space:nowrap;">${r.action}</button>
  `;
  return card;
}

chatSend.addEventListener('click', handleChat);
heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleChat(); });

function handleChat() {
  const query = heroInput.value.trim();
  if (!query) return;

  chatSend.textContent = 'Searching...';
  chatSend.disabled = true;

  setTimeout(() => {
    chatResponse.hidden = false;
    chatResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    responseCards.innerHTML = '';

    mockResults.forEach((r, i) => {
      setTimeout(() => {
        responseCards.appendChild(buildResultCard(r));
      }, i * 300);
    });

    chatSend.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Plan My Trip`;
    chatSend.disabled = false;
  }, 1200);
}

// ─── CTA Form ───────────────────────────────────────────────────
const ctaForm = document.getElementById('ctaForm');
ctaForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = ctaForm.querySelector('button[type="submit"]');
  btn.textContent = '✓ You\'re on the waitlist!';
  btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
  btn.style.boxShadow = '0 4px 14px rgba(22,163,74,0.38)';
  btn.disabled = true;
  ctaForm.querySelectorAll('input, select').forEach(el => el.disabled = true);
});

// ─── Scroll-triggered fade-in ───────────────────────────────────
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .problem-card, .tech-card, .moscow-card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
