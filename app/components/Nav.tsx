"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PillNavProps {
  isVisible: boolean;
}

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'Our Team', id: 'teams' },
  { name: 'Services', id: 'services' },
  { name: 'Contact Us', id: 'contact' },
];

const PillNav: React.FC<PillNavProps> = ({ isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  // ScrollSpy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = navItems.find((nav) => nav.id === entry.target.id);
            if (item) setActiveSection(item.name);
          }
        });
      },
      { threshold: 0.2 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="nav-wrapper"
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={isVisible ? { opacity: 1, y: 0, x: "-50%" } : { opacity: 0, y: -20, x: "-50%" }}
      transition={{ duration: 0.8 }}
    >
      <style>{`
        .nav-wrapper {
        position: fixed; /* Changed from absolute to fixed */
        top: 30px;
        left: 50%;
        transform: translateX(-50%); /* Crucial for fixed centering */
        z-index: 99999 !important;
        pointer-events: auto;
        }

        /* MOBILE PILL (Default) */
        .mobile-pill {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 10px 24px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          min-width: 140px;
          justify-content: space-between;
        }

        .active-text-wrapper {
          height: 20px;
          overflow: hidden;
          position: relative;
        }

        .section-name {
          color: #fff;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
        }

        .chevron {
          width: 12px;
          height: 12px;
          stroke: #fff;
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          right: 0;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 8px;
        }

        .dropdown-item {
          padding: 12px 16px;
          color: #ccc;
          text-decoration: none;
          font-family: 'Oxanium', sans-serif;
          font-size: 0.8rem;
          display: block;
          border-radius: 12px;
        }

        /* DESKTOP VIEW */
        .desktop-nav {
          display: none;
        }

        @media (min-width: 769px) {
          .mobile-pill { display: none; }
          .dropdown-menu { display: none; }
          
          .desktop-nav {
            display: flex;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 12px 40px;
            border-radius: 100px;
            gap: 40px;
          }

          .nav-link {
            color: #ccc;
            text-decoration: none;
            font-family: 'Oxanium', sans-serif;
            font-size: 1.2rem;
            text-transform: uppercase;
            transition: 0.3s;
            position: relative;
          }

          .nav-link.active { color: #fff; text-shadow: 0 0 10px white; }
          
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            transform: translateX(-50%) scale(0);
            transition: 0.3s;
          }
          .nav-link.active::after { transform: translateX(-50%) scale(1); }
        }
      `}</style>

      {/* MOBILE UI */}
      <div className="mobile-pill" onClick={() => setIsOpen(!isOpen)}>
        <div className="active-text-wrapper">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeSection}
              className="section-name"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              {activeSection}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" animate={{ rotate: isOpen ? 180 : 0 }}>
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="dropdown-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="dropdown-item" onClick={() => setIsOpen(false)}>
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP UI */}
      <div className="desktop-nav">
        {navItems.map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            className={`nav-link ${activeSection === item.name ? 'active' : ''}`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default PillNav;