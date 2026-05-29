// ========================================
// CONFETTI — Celebration animations
// ========================================

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.color = [
      '#ff6b6b', '#ffd93d', '#6bcb77', '#a855f7',
      '#60a5fa', '#f472b6', '#22d3ee', '#fb923c'
    ][Math.floor(Math.random() * 8)];
    this.opacity = 1;
    this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    this.speedY += 0.05; // gravity
    this.opacity -= 0.005;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.fillStyle = this.color;

    if (this.shape === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.y > canvas.height + 20 || p.opacity <= 0) {
      particles.splice(i, 1);
    }
  });

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(animationId);
    animationId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function fireConfetti(count = 80) {
  for (let i = 0; i < count; i++) {
    const p = new Particle();
    p.y = -Math.random() * 100;
    particles.push(p);
  }
  if (!animationId) animate();
}

export function fireStarBurst(x, y, count = 20) {
  for (let i = 0; i < count; i++) {
    const p = new Particle();
    p.x = x;
    p.y = y;
    p.speedX = (Math.random() - 0.5) * 8;
    p.speedY = (Math.random() - 0.5) * 8;
    p.size = Math.random() * 5 + 2;
    p.color = '#ffd93d';
    p.shape = 'circle';
    particles.push(p);
  }
  if (!animationId) animate();
}

// Mini burst for correct answers
export function miniCelebration() {
  for (let i = 0; i < 15; i++) {
    const p = new Particle();
    p.x = canvas.width / 2 + (Math.random() - 0.5) * 200;
    p.y = canvas.height * 0.3;
    p.speedY = (Math.random() - 0.5) * 6;
    p.speedX = (Math.random() - 0.5) * 6;
    p.size = Math.random() * 6 + 2;
    particles.push(p);
  }
  if (!animationId) animate();
}
