import React, { useEffect, useRef } from 'react';
import FloatingIdeas from './components/FloatingIdeas';
import Chatbox from './components/Chatbox';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code, Cpu, User, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const bgVideoRef = useRef(null);
  const aboutVideoRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Constructing mailto link
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailto = `mailto:pavishnarajkumar@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailto;
  };

  useEffect(() => {
    // Reveal animations on scroll
    gsap.utils.toArray('.reveal').forEach((elem) => {
      gsap.fromTo(elem,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Floating animation for hero title
    gsap.to('.hero-title', {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Force video autoplay (some browsers block autoPlay attribute)
    const playVideos = () => {
      if (bgVideoRef.current) bgVideoRef.current.play().catch(err => console.log("BG Video autoplay blocked:", err));
      if (aboutVideoRef.current) aboutVideoRef.current.play().catch(err => console.log("About Video autoplay blocked:", err));
    };

    playVideos();
    // Also try on first click/move just in case
    window.addEventListener('click', playVideos, { once: true });
    window.addEventListener('touchstart', playVideos, { once: true });

    return () => {
      window.removeEventListener('click', playVideos);
      window.removeEventListener('touchstart', playVideos);
    };
  }, []);

  return (
    <div className="app-container">
      <video ref={bgVideoRef} className="video-bg" autoPlay loop muted playsInline>
        <source src="/carchase.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <FloatingIdeas />

      {/* Hero Section */}
      <section className="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hero-title glow-text"
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: '10px' }}
        >
          {portfolioData.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: '1.6' }}
        >
          {portfolioData.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ marginTop: '40px', display: 'flex', gap: '20px' }}
        >
          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="glass"
            style={{ padding: '12px 30px', color: 'white', border: '1px solid var(--accent-primary)', cursor: 'pointer', fontWeight: '600' }}
          >
            {portfolioData.hero.ctaText}
          </button>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer"><Github className="social-icon" /></a>
            <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="social-icon" /></a>
            <a href={portfolioData.social.email}><Mail className="social-icon" /></a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about reveal" style={{ minHeight: '60vh', padding: '100px 20px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div className="glass" style={{ maxWidth: '900px', padding: '60px', position: 'relative' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }} className="glow-text">{portfolioData.about.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {portfolioData.about.description}
              </p>
            </div>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
                borderRadius: ["20px", "30px", "20px"]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-tertiary))',
                opacity: 0.8,
                boxShadow: '0 0 30px rgba(var(--accent-primary-rgb), 0.3)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <video
                ref={aboutVideoRef}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit'
                }}
              >
                <source src="/carchase.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="projects" style={{ padding: '100px 20px', position: 'relative', zIndex: 1 }}>
        <h2 className="reveal glow-text" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '60px' }}>{portfolioData.activitiesTitle || 'Activities'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {portfolioData.ventures.map((proj, i) => (
            <div key={i} className="glass reveal" style={{ padding: '40px', transition: 'transform 0.3s' }}>
              <div style={{ color: 'var(--accent-secondary)', marginBottom: '20px' }}><Code size={30} /></div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{proj.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>{proj.tech}</p>
              <p style={{ lineHeight: '1.6', marginBottom: '25px' }}>{proj.desc}</p>
              <a href={proj.document} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                View Document <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills reveal" style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '50px' }}>{portfolioData.skills.title}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {portfolioData.skills.items.map((skill, i) => (
            <div key={i} className="glass" style={{ padding: '10px 25px', borderRadius: '50px', fontSize: '1rem', fontWeight: '500' }}>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact reveal" style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '50px' }}>
          <h2 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{portfolioData.contact.title}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
            {portfolioData.contact.subtitle}
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input name="name" type="text" placeholder="Name" className="glass" style={{ padding: '15px', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', outline: 'none' }} required />
            <input name="email" type="email" placeholder="Email" className="glass" style={{ padding: '15px', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', outline: 'none' }} required />
            <textarea name="message" placeholder="Message" rows="4" className="glass" style={{ padding: '15px', color: 'white', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', outline: 'none', resize: 'vertical' }} required></textarea>
            <button type="submit" className="glass" style={{ padding: '15px', background: 'var(--accent-primary)', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>{portfolioData.contact.buttonText}</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--text-secondary)' }}>{portfolioData.footer.copyright}</p>
      </footer>

      <Chatbox />

      <style>{`
        .social-icon {
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.3s, transform 0.3s;
        }
        .social-icon:hover {
          color: var(--accent-secondary);
          transform: translateY(-3px);
        }
        .glass:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-primary);
          transform: translateY(-5px);
        }
        /* Improve input placeholder color relative to glass background */
        ::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;
