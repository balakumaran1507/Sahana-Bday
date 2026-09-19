import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 150;

export default function PetalsCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Desktop only
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      lastX: window.innerWidth / 2,
      lastY: window.innerHeight / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      isActive: false,
    };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    });
    window.addEventListener('mouseleave', () => { mouse.isActive = false; });

    const pinkPalettes = [
      { base: '#e63973', tip: '#ff9ebb', glow: 'rgba(230,57,115,0.4)' },
      { base: '#f43f8e', tip: '#fba5c8', glow: 'rgba(244,63,142,0.4)' },
      { base: '#ea5286', tip: '#ffb3cc', glow: 'rgba(234,82,134,0.4)' },
      { base: '#fb7185', tip: '#ffccd8', glow: 'rgba(251,113,133,0.4)' },
      { base: '#f472b6', tip: '#fbcfe8', glow: 'rgba(244,114,182,0.4)' },
      { base: '#ec4899', tip: '#f9a8d4', glow: 'rgba(236,72,153,0.4)' },
    ];

    class Petal {
      constructor(scattered = false) {
        this.reset(scattered);
      }

      reset(scattered = false) {
        // On init, scatter across the full viewport so petals are instantly visible
        this.x = scattered ? Math.random() * canvas.width : (mouse.isActive ? mouse.x : canvas.width / 2) + (Math.random() - 0.5) * 300;
        this.y = scattered ? Math.random() * canvas.height : (mouse.isActive ? mouse.y : canvas.height / 2) + (Math.random() - 0.5) * 300;

        // Tight followStrength range so all petals orbit at the same radius —
        // visual variety comes from drag/sway/speed, not distance from cursor
        this.followStrength = 0.008 + Math.random() * 0.006;
        this.maxSpeed = 28 + Math.random() * 24;
        this.drag = 0.91 + Math.random() * 0.05;
        this.rollSpeed = 0.005 + Math.random() * 0.025;
        this.pitchSpeed = 0.004 + Math.random() * 0.016;
        this.swayFreq = 0.0006 + Math.random() * 0.002;
        this.swayAmp = 0.06 + Math.random() * 0.12;
        this.wakeFactor = 0.02 + Math.random() * 0.06;

        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.sizeH = Math.random() * 11 + 15;
        this.sizeW = this.sizeH * (0.43 + Math.random() * 0.12);
        this.swayPhase = Math.random() * Math.PI * 2;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        this.freqX = 0.0006 + Math.random() * 0.0006;
        this.freqY = 0.0007 + Math.random() * 0.0007;
        this.roll = Math.random() * Math.PI * 2;
        this.pitch = Math.random() * Math.PI * 2;
        this.color = pinkPalettes[Math.floor(Math.random() * pinkPalettes.length)];
        this.opacity = Math.random() * 0.35 + 0.60;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(time) {
        const targetX = mouse.isActive ? mouse.x : canvas.width / 2;
        const targetY = mouse.isActive ? mouse.y : canvas.height / 2;
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;

        if (dist > 45) {
          const pull = Math.min((dist - 45) * this.followStrength, 2.0);
          this.vx += nx * pull;
          this.vy += ny * pull;
        }
        if (dist < 40) {
          const cushion = (1 - dist / 40);
          const push = cushion * cushion * 0.8;
          this.vx -= nx * push;
          this.vy -= ny * push;
        }

        const sway = Math.sin(time * this.swayFreq + this.swayPhase) * this.swayAmp;
        this.vx += -ny * sway;
        this.vy += nx * sway;

        this.vx += Math.sin(time * this.freqX + this.phaseX) * 0.06;
        this.vy += Math.cos(time * this.freqY + this.phaseY) * 0.06;

        if (mouse.speed > 0.5) {
          const wakeDist = Math.max(0, 1 - dist / 350);
          this.vx += mouse.vx * this.wakeFactor * wakeDist;
          this.vy += mouse.vy * this.wakeFactor * wakeDist;
        }

        this.vx *= this.drag;
        this.vy *= this.drag;
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > this.maxSpeed) {
          this.vx = (this.vx / speed) * this.maxSpeed;
          this.vy = (this.vy / speed) * this.maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.angle = Math.atan2(this.vy, this.vx) + Math.PI / 2 + Math.sin(time * 0.0015 + this.phaseX) * 0.12;
        this.roll += this.rollSpeed;
        this.pitch += this.pitchSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const scaleX = Math.cos(this.roll) * 0.75 + 0.25;
        const scaleY = Math.sin(this.pitch) * 0.25 + 0.75;
        ctx.scale(Math.max(0.12, Math.abs(scaleX)), scaleY);

        const w = this.sizeW;
        const h = this.sizeH;
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        ctx.bezierCurveTo(-w * 0.65, h * 0.2, -w * 0.7, -h * 0.32, -w * 0.28, -h * 0.48);
        ctx.quadraticCurveTo(-w * 0.1, -h * 0.42, 0, -h * 0.36);
        ctx.quadraticCurveTo(w * 0.1, -h * 0.42, w * 0.28, -h * 0.48);
        ctx.bezierCurveTo(w * 0.7, -h * 0.32, w * 0.65, h * 0.2, 0, h * 0.5);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, h * 0.5, 0, -h * 0.5);
        grad.addColorStop(0, this.color.base);
        grad.addColorStop(1, this.color.tip);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = grad;
        ctx.shadowColor = this.color.glow;
        ctx.shadowBlur = 4;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, h * 0.38);
        ctx.quadraticCurveTo(w * 0.05, 0, 0, -h * 0.32);
        ctx.strokeStyle = 'rgba(255,192,203,0.35)';
        ctx.lineWidth = 0.8;
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.restore();
      }
    }

    // Scatter petals across full viewport on init for instant visibility
    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Petal(true));

    window.addEventListener('pointerdown', (e) => {
      particles.forEach(p => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 180) {
          const power = (1 - dist / 180) * 4.5;
          p.vx += (dx / dist) * power;
          p.vy += (dy / dist) * power;
        }
      });
    });

    let rafId;
    function animate(now) {
      const instVx = mouse.x - mouse.lastX;
      const instVy = mouse.y - mouse.lastY;
      mouse.vx = mouse.vx * 0.65 + instVx * 0.35;
      mouse.vy = mouse.vy * 0.65 + instVy * 0.35;
      mouse.speed = Math.hypot(mouse.vx, mouse.vy);
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(now); p.draw(); });

      // Pointer dot — always visible
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.shadowColor = 'rgba(236,72,153,1)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ec4899';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();

      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
