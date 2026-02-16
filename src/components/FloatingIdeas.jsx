import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingIdeas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const ideaCount = 15;
    const ideas = [];

    for (let i = 0; i < ideaCount; i++) {
      const idea = document.createElement('div');
      idea.className = 'idea-bubble';
      
      // Random properties
      const size = Math.random() * 60 + 20;
      const opacity = Math.random() * 0.5 + 0.1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      idea.style.width = `${size}px`;
      idea.style.height = `${size}px`;
      idea.style.left = `${x}%`;
      idea.style.top = `${y}%`;
      idea.style.opacity = opacity;
      
      // Color variety
      const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'];
      idea.style.background = `radial-gradient(circle at 30% 30%, white, ${colors[Math.floor(Math.random() * colors.length)]})`;
      idea.style.boxShadow = `0 0 20px ${colors[Math.floor(Math.random() * colors.length)]}33`;

      container.appendChild(idea);
      ideas.push(idea);

      // Animate
      gsap.to(idea, {
        x: '+=random(-100, 100)',
        y: '+=random(-100, 100)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 5
      });
      
      gsap.to(idea, {
        scale: 'random(0.8, 1.2)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    return () => {
      ideas.forEach(idea => idea.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="floating-ideas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      <style>{`
        .idea-bubble {
          position: absolute;
          border-radius: 50%;
          filter: blur(8px);
          mix-blend-mode: screen;
        }
      `}</style>
    </div>
  );
};

export default FloatingIdeas;
