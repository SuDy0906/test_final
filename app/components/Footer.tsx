"use client";
import React, { useState } from "react";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#" },
    { name: "Projects", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="relative w-full bg-neutral-950 text-white overflow-hidden pt-24 pb-12">
      
      {/* 1. TOP SECTION */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-white/5 pb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-[Oxanium] font-bold leading-[1.1] tracking-tight">
              Ready to build the <span className="text-neutral-500">future?</span>
            </h2>
            <p className="mt-4 text-neutral-400 font-[Roboto] max-w-md">
              Connect with us to turn your complex problem statements into engineered solutions.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-[oxanium] font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-full tracking-widest uppercase text-sm"
          >
            Start a Project
          </button>
        </div>

        {/* 2. MIDDLE FILLER SECTION: Expertise & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-16 pb-12">
          {/* Navigation Links with Glow */}
          <div className="flex flex-col gap-4">
            <h4 className="font-[oxanium] text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Navigation</h4>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-[oxanium] text-neutral-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Service Column 1 */}
          <div className="flex flex-col gap-2">
            <h4 className="font-[oxanium] text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Geospatial</h4>
            <p className="text-sm text-neutral-400 font-[Roboto]">SAR Flood Frequency Analysis</p>
            <p className="text-sm text-neutral-400 font-[Roboto]">Rainfall-Elevation Simulation</p>
            <p className="text-sm text-neutral-400 font-[Roboto]">Google Earth Engine Integrations</p>
          </div>

          {/* Service Column 2 */}
          <div className="flex flex-col gap-2">
            <h4 className="font-[oxanium] text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Intelligence</h4>
            <p className="text-sm text-neutral-400 font-[Roboto]">Reinforcement Learning</p>
            <p className="text-sm text-neutral-400 font-[Roboto]">Large Language Models</p>
            <p className="text-sm text-neutral-400 font-[Roboto]">Data Scraping & Structuring</p>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-2">
            <h4 className="font-[oxanium] text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Connect</h4>
            <p className="text-sm text-neutral-400 font-[Roboto]">Bhopal, India</p>
            <p className="text-sm text-neutral-400 font-[Roboto]">buildifytechservices@gmail.com</p>
            <div className="flex gap-4 mt-2">
                {/* Social Placeholder Icons */}
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-xs">LN</div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-xs">GH</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BACKGROUND WATERMARK */}
      <div className="relative w-full mt-8 select-none flex justify-center items-end pointer-events-none">
        <h1 className="text-[22vw] leading-[0.7] -mb-6 font-[Orbitron] font-black text-center bg-gradient-to-t from-white/10 to-transparent bg-clip-text text-transparent tracking-tighter opacity-50">
          BUILDIFY
        </h1>
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/5 text-[10px] font-[oxanium] tracking-widest text-neutral-600 uppercase">
        <p>© 2026 Buildify Systems. All Rights Reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* MODAL (Kept same logic as before) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-neutral-900/80 border border-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white">✕</button>
            <h3 className="text-2xl font-[oxanium] font-bold mb-6">Project Brief</h3>
            <form className="space-y-4 font-[Roboto]">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/40" />
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white/40" />
              </div>
              <input type="tel" placeholder="Contact Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none" />
              <select className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none text-white/60">
                <option>Select Service Category</option>
                <option>Geospatial Analysis</option>
                <option>AI/ML Engineering</option>
              </select>
              <textarea placeholder="Briefly describe your problem..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none resize-none" />
              <button className="w-full py-4 bg-white text-black font-[oxanium] font-bold rounded-xl hover:bg-neutral-200 uppercase tracking-widest">Send Inquiry</button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;