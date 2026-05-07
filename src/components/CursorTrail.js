import { useEffect, useRef } from 'react';

const COLORS = ['#e11d48', '#0ea5e9', '#f59e0b', '#fb7185', '#38bdf8', '#a855f7'];

const CursorTrail = () => {
  const particles = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.9) * 1.8,
          size: Math.random() * 3.5 + 1.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.85,
          decay: Math.random() * 0.022 + 0.016,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.alpha > 0.02);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.alpha -= p.decay;
        p.size *= 0.975;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      canvas.remove();
    };
  }, []);

  return null;
};

export default CursorTrail;
