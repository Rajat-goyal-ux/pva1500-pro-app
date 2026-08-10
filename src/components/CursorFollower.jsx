import React, { useEffect, useState } from 'react';

export const CursorFollower = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(20px)'
      }}
    />
  );
};
