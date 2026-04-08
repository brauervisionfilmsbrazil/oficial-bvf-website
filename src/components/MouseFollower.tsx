import { useEffect, useRef } from 'react';

const MouseFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animateRing = () => {
      const lerp = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      requestRef.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Central Dot */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-brauer-cyan rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:block"
        style={{ 
          willChange: 'transform',
          boxShadow: '0 0 10px hsl(187 100% 50%)'
        }}
      />
      
      {/* Trailing Ring */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-brauer-cyan/50 rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default MouseFollower;
