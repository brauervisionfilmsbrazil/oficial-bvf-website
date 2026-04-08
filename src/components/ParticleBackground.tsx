import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseColor: string;
      color: string;
      depth: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
        this.baseColor = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe';
        this.color = this.baseColor;
        this.depth = Math.random() * 0.5 + 0.1;
      }

      update(scrollY: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        let visualY = (this.y - scrollY * this.depth) % height;
        if (visualY < 0) visualY += height;

        const dx = mouseX - this.x;
        const dy = mouseY - visualY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
          ctx!.shadowBlur = 10;
          ctx!.shadowColor = this.baseColor;
        } else {
          ctx!.shadowBlur = 0;
        }
        return { x: this.x, y: visualY };
      }

      draw(pos: { x: number; y: number }) {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(pos.x, pos.y, this.size, this.size);
        ctx.fill();
      }
    }

    const particleCount = Math.floor((width * height) / 15000);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const scrollY = window.scrollY;
      ctx.lineWidth = 0.2;
      particles.forEach((particle) => {
        const pos = particle.update(scrollY);
        particle.draw(pos);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
