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
    // Typewriter effect into the input
    const text = chip.dataset.text;
    heroInput.value = '';
    heroInput.focus();
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroInput.value += text[i++];
        setTimeout(type, 18);
      }
    };
    type();
  });
});

// ─── Chat send / demo response ──────────────────────────────────
const chatSend = document.getElementById('chatSend');
const chatResponse = document.getElementById('chatResponse');
const responseCards = document.getElementById('responseCards');

const mockResults = [
  {
    badge: 'Best Value',
    mode: 'Train · Vande Bharat Express',
    price: '₹1,345',
    meta: '2h 40m · Includes meals · Refundable',
    action: 'Book on IRCTC →',
    color: '#4ade80'
  },
  {
    badge: 'Fastest',
    mode: 'Flight · IndiGo 6E-203',
    price: '₹2,890',
    meta: '1h 10m · +45 min airport transit · Non-refundable',
    action: 'Book on MakeMyTrip →',
    color: '#60a5fa'
  },
  {
    badge: 'Budget Pick',
    mode: 'Bus · Volvo AC Sleeper',
    price: '₹680',
    meta: '7h 30m · Overnight · Fully Refundable',
    action: 'Book on RedBus →',
    color: '#fbbf24'
  }
];

function buildResultCard(r) {
  const card = document.createElement('div');
  card.style.cssText = `
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(0,194,224,0.12);
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateX(-10px);
    transition: opacity 0.35s ease, transform 0.35s ease;
  `;
  card.innerHTML = `
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
        <span style="padding:2px 9px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;background:rgba(255,255,255,0.08);color:${r.color};">${r.badge}</span>
        <span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.75);">${r.mode}</span>
      </div>
      <div>
        <span style="font-family:'Sora',sans-serif;font-size:22px;font-weight:800;color:#fff;">${r.price}</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.4);margin-left:8px;">${r.meta}</span>
      </div>
    </div>
    <button style="padding:8px 14px;border-radius:8px;background:linear-gradient(135deg,#00c2e0,#1189b3);color:#fff;font-size:12px;font-weight:600;border:none;cursor:pointer;white-space:nowrap;transition:transform 0.15s ease,box-shadow 0.15s ease;"
      onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(0,194,224,0.4)'"
      onmouseout="this.style.transform='';this.style.boxShadow=''"
    >${r.action}</button>
  `;
  return card;
}

chatSend.addEventListener('click', handleChat);
heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleChat(); });

function handleChat() {
  const query = heroInput.value.trim();
  if (!query) return;

  // Animate send button
  chatSend.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Searching...`;
  chatSend.disabled = true;

  // Animate agent dots
  chatResponse.hidden = false;
  responseCards.innerHTML = '';
  const agentSpans = document.querySelectorAll('.agent-item span');

  const agentMessages = [
    'Research Agent scanning 14 sources...',
    'Budget Agent calculating true costs...',
    'Compliance Agent verifying options...'
  ];
  agentSpans.forEach((s, i) => {
    setTimeout(() => { s.textContent = agentMessages[i] || s.textContent; }, i * 400);
  });

  setTimeout(() => {
    chatResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    mockResults.forEach((r, i) => {
      setTimeout(() => {
        const card = buildResultCard(r);
        responseCards.appendChild(card);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
          });
        });
      }, i * 280);
    });

    chatSend.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Plan My Trip`;
    chatSend.disabled = false;
  }, 1400);
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

// ─── Scroll reveal (staggered .reveal class) ────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll(
  '.feature-card, .problem-card, .tech-card, .step, .b2b-feature, .sub-agent'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ─── Animated stat counters ─────────────────────────────────────
function animateCounter(el, target, suffix, duration = 1400) {
  const isFloat = target % 1 !== 0;
  const start = performance.now();
  el.classList.add('counting');

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const value = isFloat
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.classList.remove('counting');
  };

  requestAnimationFrame(tick);
}

// Extract numeric value and suffix from text like "8+", "30%", "1"
const statEls = document.querySelectorAll('.stat-value');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.textContent.trim();
    const num = parseFloat(raw);
    const suffix = raw.replace(/[\d.]/g, '');
    if (!isNaN(num)) animateCounter(el, num, suffix);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.6 });

statEls.forEach(el => statsObserver.observe(el));

// ─── Spin keyframe (injected for the loading spinner) ────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
