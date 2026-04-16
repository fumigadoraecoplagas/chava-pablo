// ===== NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks?.classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
  });
});

// Nav scroll effect
const mainNav = document.getElementById('mainNav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  mainNav?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== CURSOR GLOW =====
const glow = document.getElementById('cursorGlow');
if (glow && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// ===== HERO CANVAS =====
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(102,126,234,0.4)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(102,126,234,${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ===== COUNTER ANIMATION =====
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 50);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.metric-num').forEach(el => counterIO.observe(el));

// ===== PORTFOLIO FILTERS =====
document.querySelectorAll('.pf-f').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-f').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.pf-card').forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

// ===== FORM =====
function handleContactSubmit(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const texto =
    `Hola LATAM Code Factory, soy ${data.nombre}.\n` +
    (data.empresa ? `Empresa: ${data.empresa}\n` : '') +
    (data.pais ? `País: ${data.pais}\n` : '') +
    `Correo: ${data.correo}\n` +
    (data.whatsapp ? `WhatsApp: ${data.whatsapp}\n` : '') +
    `Servicio: ${data.servicio}\n\n` +
    `Mensaje:\n${data.mensaje || '(sin mensaje)'}`;
  window.open(`https://wa.me/50683000000?text=${encodeURIComponent(texto)}`, '_blank');
  alert('¡Gracias! Te redirigimos a WhatsApp para completar.');
  return false;
}
window.handleContactSubmit = handleContactSubmit;

// ===== YEAR =====
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// ===== SCROLL REVEAL =====
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.srv, .pf-card, .founder-card, .tl-step, .val, .test-card, .tech-cat, .price-card, .addon, .maint-plan, .ia-item, .prob-card, .faq-item, .qs-card, .app-card').forEach(el => {
  el.classList.add('reveal');
  revealIO.observe(el);
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(s => {
    const top = s.offsetTop;
    const h = s.offsetHeight;
    const id = s.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + h) {
        link.style.color = '#a78bfa';
      } else {
        link.style.color = '';
      }
    }
  });
}, { passive: true });
