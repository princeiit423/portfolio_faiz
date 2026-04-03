/* ============================================
   FAIZ HUSSAIN PORTFOLIO - app.js
   All animations, interactions & logic
============================================ */

// === PAGE LOADER ===
window.addEventListener('load', () => {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = '<div class="loader-text">Faiz<span style="color:#7B61FF">.</span></div>';
  document.body.prepend(loader);
  setTimeout(() => {
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 700);
    initHeroAnimations();
  }, 600);
});

// === GSAP SETUP ===
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  gsap.set(follower, { x: followerX, y: followerY });
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .skill-card, .service-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 2.5, duration: 0.3 });
    gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, duration: 0.3 });
    gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
  });
});

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === MOBILE MENU ===
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = menuToggle.querySelector('.hamburger-icon');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// === PARTICLE CANVAS ===
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? '#00f5a0' : Math.random() > 0.5 ? '#7B61FF' : '#f5c842';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Create 100 particles
for (let i = 0; i < 100; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  // Draw connections
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (dist < 80) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 80) * 0.08;
        ctx.strokeStyle = '#00f5a0';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }
    });
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === HERO ANIMATIONS ===
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.to('#hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', from: { y: 20 } })
    .to('#hero-h1', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', from: { y: 60 } }, '-=0.3')
    .to('#hero-h2', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', from: { y: 60 } }, '-=0.5')
    .to('#hero-h3', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', from: { y: 60 } }, '-=0.5')
    .to('#hero-sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', from: { y: 30 } }, '-=0.3')
    .to('#hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', from: { y: 20 } }, '-=0.2')
    .to('#hero-stats', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', from: { y: 20 } }, '-=0.2')
    .to('#scroll-ind', { opacity: 1, duration: 0.5 }, '-=0.1');

  // Counter animation
  setTimeout(() => {
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target);
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          el.textContent = Math.round(this.targets()[0].val) + (target === 100 ? '%' : '+');
        }
      });
    });
  }, 1500);
}

// === SCROLL REVEAL ===
const revealElements = document.querySelectorAll(
  '.skill-card, .service-card, .project-card, #about-visual, #about-text, .why-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});

// === SKILL BARS ANIMATION ===
const skillBarsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = targetWidth; }, 200);
      });
      skillBarsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillBarsObserver.observe(skillsSection);

// === SECTION GSAP SCROLL ANIMATIONS ===
gsap.utils.toArray('h2').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});

gsap.utils.toArray('.section-label').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    }
  );
});

// === ABOUT SECTION PARALLAX ===
gsap.to('.avatar-glow-ring', {
  rotation: 360,
  duration: 8,
  ease: 'none',
  repeat: -1
});

// === PROJECT CARDS STAGGER ===
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});

// === TERMINAL INTERACTION ===
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const commands = {
  help: () => `Available commands:\n• whoami — About Faiz\n• skills — Tech stack\n• projects — My work\n• contact — Get in touch\n• location — Where I am\n• hire — Let's work together\n• clear — Clear terminal`,
  whoami: () => `Faiz Hussain\nFreelance Web Developer\nRanchi, Jharkhand, India\nFull-stack engineer who builds magic.`,
  skills: () => `⚛️  React.js    ████████░░  88%\n🟢 Node.js    ████████░░  85%\n🌐 HTML/CSS   █████████░  95%\n🟡 JavaScript ████████░░  90%\n🗄️  SQL / DB   ███████░░░  78%`,
  projects: () => `📦 Student Innovation Center → student-innovation-center.vercel.app\n📦 Tax Consultant Site → zaidonn.netlify.app\n📦 Marketing Agency → canvixx.netlify.app\n📦 Mobile Tax App → Available on request`,
  contact: () => `📱 WhatsApp: +91-8252410023\n📧 Email: faiz18513@gmail.com\n💼 LinkedIn: /in/faiz-hussain-257001250\n🐙 GitHub: @princeiit423`,
  location: () => `📍 Ranchi, Jharkhand, India\nTimezone: IST (UTC+5:30)\nAvailable: Mon-Sat, 9AM-9PM IST\nRemote work: ✅ Worldwide`,
  hire: () => `🚀 Ready to work together!\n\nFill the form below or WhatsApp me:\n+91-8252410023\n\nTypical response time: < 2 hours`,
  clear: () => 'CLEAR',
  ls: () => `about.txt  skills/  projects/  contact.md  resume.pdf`,
  pwd: () => `/home/faiz/portfolio`,
  date: () => new Date().toLocaleString(),
};

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';
    if (!cmd) return;

    const cmdLine = document.createElement('div');
    cmdLine.className = 'font-mono text-sm text-neon mt-2';
    cmdLine.textContent = `$ ${cmd}`;

    const outputLine = document.createElement('div');
    outputLine.className = 'font-mono text-sm text-gray-300 mb-2 whitespace-pre-line';

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result === 'CLEAR') {
        terminalOutput.innerHTML = `<div class="flex items-center gap-2"><span class="font-mono text-sm text-neon">$</span><input id="terminal-input" type="text" class="terminal-input font-mono text-sm text-white flex-1 outline-none bg-transparent" placeholder='type a command... (try: help)' /></div>`;
        const newInput = document.getElementById('terminal-input');
        newInput.addEventListener('keydown', arguments.callee);
        newInput.focus();
        return;
      }
      outputLine.textContent = `→ ${result}`;
    } else {
      outputLine.textContent = `→ Command not found: "${cmd}". Type "help" for commands.`;
      outputLine.style.color = '#ff4757';
    }

    // Insert before input line
    const inputLine = terminalOutput.lastElementChild;
    terminalOutput.insertBefore(cmdLine, inputLine);
    terminalOutput.insertBefore(outputLine, inputLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

// === SKILL SPINNER ===
const skills = ['React.js', 'Node.js', 'JavaScript', 'HTML/CSS', 'Express.js', 'SQL', 'Git', 'Java', 'Problem Solving'];
let isSpinning = false;

function spinSkill() {
  if (isSpinning) return;
  isSpinning = true;
  const display = document.getElementById('skill-display');
  const btn = document.getElementById('spin-btn');
  btn.textContent = '🎰 Spinning...';
  btn.disabled = true;

  let count = 0;
  const total = 20;
  const interval = setInterval(() => {
    display.textContent = skills[Math.floor(Math.random() * skills.length)];
    display.style.transform = `scale(${0.8 + Math.random() * 0.4}) rotate(${(Math.random()-0.5)*10}deg)`;
    count++;
    if (count >= total) {
      clearInterval(interval);
      const final = skills[Math.floor(Math.random() * skills.length)];
      display.textContent = final;
      display.style.transform = 'scale(1.1) rotate(0deg)';
      setTimeout(() => { display.style.transform = 'scale(1) rotate(0deg)'; }, 300);
      btn.textContent = '🎰 Spin Again!';
      btn.disabled = false;
      isSpinning = false;
    }
  }, 80);
}

// === MOOD CYCLE ===
const moods = [
  { label: '🌿 Forest Vibe', neon: '#00f5a0', plasma: '#7B61FF', gold: '#f5c842' },
  { label: '🔥 Crimson Heat', neon: '#ff4757', plasma: '#ff6b35', gold: '#ffd32a' },
  { label: '💙 Ocean Depth', neon: '#00d2ff', plasma: '#0062ff', gold: '#7ef9ff' },
  { label: '🌸 Sakura Mode', neon: '#ff6eb4', plasma: '#d63af9', gold: '#ffd6e0' },
  { label: '☀️ Solar Flare', neon: '#f5c842', plasma: '#ff9500', gold: '#ffe066' },
];
let moodIndex = 0;

function cycleMood() {
  moodIndex = (moodIndex + 1) % moods.length;
  const mood = moods[moodIndex];
  document.documentElement.style.setProperty('--neon', mood.neon);
  document.documentElement.style.setProperty('--plasma', mood.plasma);
  document.documentElement.style.setProperty('--gold', mood.gold);
  document.getElementById('mood-text').textContent = `Current mood: ${mood.label}`;

  // Flash effect
  document.body.style.transition = 'background 0.5s';
  setTimeout(() => { document.body.style.transition = ''; }, 500);
}

// === FORM SUBMISSION → WHATSAPP ===
const form = document.getElementById('inquiry-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('client-name').value;
  const email = document.getElementById('client-email').value;
  const phone = document.getElementById('client-phone').value;
  const service = document.getElementById('service-type').value;
  const budget = document.getElementById('budget').value;
  const details = document.getElementById('project-details').value;

  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');

  // Animate button
  submitText.textContent = 'Opening WhatsApp...';
  submitSpinner.classList.remove('hidden');
  submitBtn.disabled = true;

  const message = `🚀 *New Project Inquiry*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone || 'Not provided'}
🛠️ *Service:* ${service}
💰 *Budget:* ${budget || 'Not specified'}

📋 *Project Details:*
${details}

---
_Sent from faiz-hussain.dev portfolio_`;

  const waUrl = `https://wa.me/918252410023?text=${encodeURIComponent(message)}`;

  setTimeout(() => {
    window.open(waUrl, '_blank');
    submitText.textContent = '✅ WhatsApp Opened! Check your app.';
    submitSpinner.classList.add('hidden');

    setTimeout(() => {
      submitText.textContent = 'Send Inquiry via WhatsApp 🚀';
      submitBtn.disabled = false;
      form.reset();
    }, 4000);
  }, 1000);
});

// === SMOOTH ANCHOR SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// === MAGNETIC BUTTON EFFECT ===
document.querySelectorAll('.cta-btn-primary, .cta-btn-ghost, .submit-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// === TILT EFFECT ON CARDS ===
document.querySelectorAll('.project-card, .service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 6;
    const tiltY = (x - 0.5) * -6;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === COUNTER ANIMATION ON SCROLL ===
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        gsap.fromTo({ val: 0 }, { val: target },
          {
            duration: 2, ease: 'power2.out',
            onUpdate: function() {
              el.textContent = Math.round(this.targets()[0].val) + (target === 100 ? '%' : '+');
            }
          }
        );
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.getElementById('hero-stats');
if (statsSection) statsObserver.observe(statsSection);

// === TYPING EFFECT FOR HERO ===
// Handled by GSAP

// === GLITCH TEXT EFFECT ===
function addGlitchEffect(el) {
  const original = el.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let interval;

  el.addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      el.textContent = original.split('').map((letter, i) => {
        if (i < iteration) return original[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iteration >= original.length) {
        clearInterval(interval);
        el.textContent = original;
      }
      iteration += 1 / 3;
    }, 30);
  });
}

// Apply glitch to nav links
document.querySelectorAll('.nav-link').forEach(addGlitchEffect);

// === SCROLL PROGRESS INDICATOR ===
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px; width: 0%;
  background: linear-gradient(90deg, #00f5a0, #7B61FF, #f5c842);
  z-index: 99999; transition: width 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '#00f5a0' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// === EASTER EGG — KONAMI CODE ===
let konamiIndex = 0;
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
document.addEventListener('keydown', (e) => {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      triggerEasterEgg();
    }
  } else {
    konamiIndex = 0;
  }
});

function triggerEasterEgg() {
  const egg = document.createElement('div');
  egg.style.cssText = `
    position: fixed; inset: 0; z-index: 999999;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.9); backdrop-filter: blur(20px);
    flex-direction: column; gap: 20px;
  `;
  egg.innerHTML = `
    <div style="font-family:'Clash Display',sans-serif;font-size:4rem;font-weight:800;background:linear-gradient(135deg,#00f5a0,#7B61FF,#f5c842);-webkit-background-clip:text;-webkit-text-fill-color:transparent">🎮 Konami Code!</div>
    <div style="font-family:'Space Mono',monospace;font-size:1rem;color:#00f5a0">You found the secret! Faiz appreciates curious minds.</div>
    <div style="font-family:'Syne',sans-serif;color:rgba(255,255,255,0.5);font-size:0.875rem">Hire this developer. He hides easter eggs in his code.</div>
    <button onclick="this.parentElement.remove()" style="margin-top:20px;padding:12px 30px;background:#00f5a0;color:#0a0a0f;border:none;border-radius:100px;font-family:'Clash Display',sans-serif;font-weight:700;cursor:pointer;font-size:1rem">Close ✕</button>
  `;
  document.body.appendChild(egg);
  // Rain effect
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.textContent = ['⭐','🚀','💎','⚡','🔥'][Math.floor(Math.random()*5)];
    star.style.cssText = `
      position: absolute; font-size: ${Math.random()*20+10}px;
      left: ${Math.random()*100}%; top: -50px;
      animation: fall ${Math.random()*2+1}s linear forwards;
      pointer-events: none;
    `;
    egg.appendChild(star);
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }`;
  document.head.appendChild(style);
}

// === CONSOLE MESSAGE ===
console.log(`%c
 _____ _    _     _____  _     _____  _____ ___  _ 
|  ___| |  | |   |__  / | |   |  ___||_   _/ _ \\| |
| |_  | |  | |     / /  | |   | |_     | || | | | |  
|  _| | |__| |___ / /_  | |___| |_     | || |_| |_|
|_|   |_____|___//____|  |_____|___|    |_| \\___/ (_)

Hi there, developer! 👋
I'm Faiz Hussain — Web Developer in Ranchi, Jharkhand.
Looking to hire me? Visit: faiz18513@gmail.com
Or WhatsApp: +91-8252410023

PS: Try the Konami Code → ↑↑↓↓←→←→BA
`, 'color: #00f5a0; font-family: monospace; font-size: 12px;');

// === INIT ===
console.log('%cPortfolio loaded! 🚀', 'color: #7B61FF; font-size: 14px; font-weight: bold;');
