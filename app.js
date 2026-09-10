/* ============================================
   FAIZ HUSSAIN — SHARED SITE LOGIC
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- custom cursor ---------- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (cursor && follower && window.matchMedia('(hover:hover)').matches) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    const loop = () => { fx += (mx - fx) * 0.15; fy += (my - fy) * 0.15; follower.style.transform = `translate(${fx}px,${fy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
    loop();
    document.querySelectorAll('a, button, input, textarea, select, .skill-hover').forEach(el => {
      el.addEventListener('mouseenter', () => follower.style.transform += ' scale(1.6)');
      el.addEventListener('mouseleave', () => {});
    });
  }

  /* ---------- navbar scroll state ---------- */
  const nav = document.getElementById('navbar');
  const onScroll = () => { if (nav) nav.classList.toggle('scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }
  window.closeMobileMenu = () => {
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  /* ---------- active nav link by current page ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---------- particle canvas (hero) ---------- */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const colors = ['#00f5a0', '#7B61FF', '#f5c842'];
    const initParticles = () => {
      particles = Array.from({ length: 46 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        c: colors[Math.floor(Math.random() * colors.length)],
        a: Math.random() * 0.5 + 0.15
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };
    resize(); initParticles(); draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ---------- GSAP hero entrance (single orchestrated sequence) ---------- */
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    ['#hero-badge', '#hero-h1', '#hero-h2', '#hero-h3', '#hero-sub', '#hero-cta', '#hero-stats', '#scroll-ind']
      .forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.9 }, i * 0.12);
      });
    gsap.set(['#hero-badge', '#hero-h1', '#hero-h2', '#hero-h3', '#hero-sub', '#hero-cta', '#hero-stats', '#scroll-ind'], { y: 24 });

    /* stat counters */
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: () => { gsap.to({ v: 0 }, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(this.targets()[0].v); } }); }
      });
    });

    /* generic reveal-on-scroll for anything with .reveal (used sparingly, per-section not per-card) */
    document.querySelectorAll('.reveal').forEach(el => {
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => el.classList.add('is-visible')
      });
    });

    /* SVG divider draw-in */
    document.querySelectorAll('.svg-divider').forEach(el => {
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => el.classList.add('in-view') });
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.svg-divider').forEach(el => el.classList.add('in-view'));
  }

  /* ---------- 3D tilt cards ---------- */
  document.querySelectorAll('.tilt-card').forEach(card => {
    const strength = 10;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * strength}deg) rotateY(${(px - 0.5) * strength}deg)`;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- terminal (fun zone) ---------- */
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  if (terminalInput) {
    const commands = {
      help: 'available: whoami, skills, projects, contact, joke, clear',
      whoami: 'Faiz Hussain — Full-Stack Developer, Ranchi, Jharkhand',
      skills: 'React, Node.js, Express, JavaScript, SQL, Java, Git',
      projects: 'Student Innovation Center · Zaidonn · Canvixx · BlueBuds · AceStudy',
      contact: 'wa.me/918252410023 · faiz18513@gmail.com',
      joke: 'Why do programmers prefer dark mode? Because light attracts bugs.'
    };
    terminalInput.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const val = terminalInput.value.trim().toLowerCase();
      const line1 = document.createElement('div');
      line1.className = 'font-mono text-sm text-neon';
      line1.textContent = `$ ${terminalInput.value}`;
      const line2 = document.createElement('div');
      line2.className = 'font-mono text-sm text-gray-300 mb-3';
      if (val === 'clear') { terminalOutput.innerHTML = ''; terminalInput.value = ''; return; }
      line2.textContent = '→ ' + (commands[val] || `command not found: ${val} (try "help")`);
      terminalOutput.insertBefore(line1, terminalInput.parentElement);
      terminalOutput.insertBefore(line2, terminalInput.parentElement);
      terminalInput.value = '';
      terminalInput.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
  }

  /* ---------- skill spinner ---------- */
  const skillList = ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'SQL', 'Java', 'Git', 'REST APIs', 'GSAP', 'MongoDB', 'DSA', 'System Design'];
  window.spinSkill = function () {
    const display = document.getElementById('skill-display');
    if (!display) return;
    let count = 0;
    const spin = setInterval(() => {
      display.textContent = skillList[Math.floor(Math.random() * skillList.length)];
      count++;
      if (count > 14) { clearInterval(spin); display.textContent = skillList[Math.floor(Math.random() * skillList.length)]; }
    }, 80);
  };

  /* ---------- mood cycler ---------- */
  const moods = [
    { name: 'Focused', color: '#00f5a0', text: 'Deep work mode — shipping clean code.' },
    { name: 'Creative', color: '#7B61FF', text: 'Design brain on — chasing pixel perfection.' },
    { name: 'Ambitious', color: '#f5c842', text: 'Building something worth remembering.' }
  ];
  let moodIndex = 0;
  window.cycleMood = function () {
    moodIndex = (moodIndex + 1) % moods.length;
    const m = moods[moodIndex];
    const moodText = document.getElementById('mood-text');
    if (moodText) { moodText.textContent = `${m.name} — ${m.text}`; moodText.style.color = m.color; }
  };

  /* ---------- contact form -> WhatsApp ---------- */
  const form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('client-name').value;
      const email = document.getElementById('client-email').value;
      const phone = document.getElementById('client-phone').value;
      const service = document.getElementById('service-type').value;
      const budget = document.getElementById('budget') ? document.getElementById('budget').value : '';
      const details = document.getElementById('project-details').value;
      const submitBtn = document.getElementById('submit-btn');
      const submitText = document.getElementById('submit-text');
      const spinner = document.getElementById('submit-spinner');
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.classList.add('hidden');
      if (spinner) spinner.classList.remove('hidden');

      const msg = `Hi Faiz, I'd like to discuss a project.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone || '—'}%0AService: ${service}%0ABudget: ${budget || '—'}%0A%0ADetails: ${details}`;
      setTimeout(() => {
        window.open(`https://wa.me/918252410023?text=${msg}`, '_blank');
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (spinner) spinner.classList.add('hidden');
        form.reset();
      }, 700);
    });
  }

});
