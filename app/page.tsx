"use client";

import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { View, Preload } from '@react-three/drei';
import ParticleHero from './components/ParticleHero';
import Teams from './components/Teams';
import Services from './components/Services';
import Footer from './components/Footer';
import PillNav from './components/Nav';
import Hero2D from './components/ParticleHero';
export default function Home() {
  // We use this ref to tell the R3F Canvas where the scroll events come from
  const containerRef = useRef<HTMLElement>(null);
  const [introFinished, setIntroFinished] = useState(false);

  return (
    // The Scroll Container
    <main 
      ref={containerRef} 
      className="relative w-full h-full min-h-screen bg-black overflow-y-auto overflow-x-hidden antialiased selection:bg-blue-500 selection:text-white"
    >
      <PillNav isVisible={introFinished} />
      
      {/* GLOBAL CANVAS (For Teams) 
        - pointerEvents: 'none' ensures clicks pass through to the Hero when not hitting a 3D object.
        - eventSource={containerRef} ensures the 3D cards stick to their HTML positions during scroll.
      */}
      <Canvas
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}
        eventSource={containerRef as React.RefObject<HTMLElement>}
        camera={{ position: [0, 0, 8], fov: 25 }}
      >
        <View.Port />
        <Preload all />
      </Canvas>

      {/* SECTION 1: Particle Hero (Vanilla Three.js) */}
      <section id="home" className="relative w-full h-screen z-0">
        <Hero2D onLoaded={() => setIntroFinished(true)} />
      </section>

      {/* SECTION 2: Work/Teams */}
      <section id="teams">
        <Teams />
      </section>

      {/* SECTION 3: Services */}
      <section id="services">
        <Services />
      </section>

      {/* SECTION 4: Contact/Footer */}
      <section id="contact">
        <Footer />
      </section>

    </main>
  );
}

