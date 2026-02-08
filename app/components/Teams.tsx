"use client";

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { View, Lightformer, Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { useInView } from 'framer-motion';
// Ensure you export { Band } from your Band.tsx file!
import { Band } from './Band'; 

// --- Scene Logic ---
// We wrap each card in its own Physics world so they don't interfere with each other
const CardScene = () => {
  return (
    <>
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>

      <ambientLight intensity={Math.PI} />

      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </>
  )
}

// --- Single Section Component ---
const Section = ({ 
    align = 'left', 
    name, 
    role, 
    description,
}: { align?: 'left'|'right', name: string, role: string, description: string }) => {
    
    const containerRef = useRef(null);
    
    // 'once: true' is crucial here. If the View unmounts (scrolls away), 
    // the physics state resets. Keeping it mounted ensures the card stays dangling.
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <div 
            ref={containerRef} 
            className="w-full max-w-6xl mx-auto min-h-[400px] grid md:grid-cols-2 gap-8 items-center py-12 px-4"
        >
            {/* TEXT SIDE */}
            <div className={`space-y-4 ${align === 'right' ? 'md:order-2 md:text-right' : 'md:order-1 md:text-left'}`}>
                <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">{role}</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">{name}</h2>
                <p className="text-gray-400 max-w-md leading-relaxed">
                    {description}
                </p>
            </div>

            {/* 3D CARD SIDE */}
            <div className={`h-[400px] w-full relative ${align === 'right' ? 'md:order-1' : 'md:order-2'}`}>
                {/* We use the tracked div method for View. 
                    The View component will portal its content into the main Canvas 
                    but position it exactly over this div. */}
                {isInView && (
                    <View className="absolute inset-0 w-full h-full">
                        <CardScene />
                    </View>
                )}
            </div>
        </div>
    )
}

// --- Main Export ---
// ... imports

export default function Teams() {
    // FIX: Type the ref as HTMLDivElement
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative py-40 bg-neutral-950 overflow-x-hidden">
            
            {/* HEADLINE */}
            <div className="text-center mb-24 space-y-4 px-4">
                <h1 className="text-6xl font-black text-white tracking-tighter">THE SQUAD</h1>
                <p className="text-gray-400">Drag the cards to interact.</p>
            </div>

            {/* SECTIONS */}
            <Section 
                name="ALEX RIVERA" 
                role="Frontend Lead" 
                description="Specializes in React Three Fiber and micro-interactions. Loves pushing the boundaries of WebGL."
                align="left"
            />

            <Section 
                name="SARAH CHEN" 
                role="Product Designer" 
                description="Focuses on accessibility and clean aesthetics. Ensures the physics interactions feel natural."
                align="right"
            />

            <Section 
                name="MIKE ROSS" 
                role="Backend Architect" 
                description="Scales the infrastructure to handle real-time physics sync across thousands of clients."
                align="left"
            />

            {/* CRITICAL: The Shared Canvas */}
            <Canvas
                className="fixed inset-0 pointer-events-none"
                // The error is gone because containerRef is now compatible
                eventSource={containerRef as React.RefObject<HTMLElement>}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 0 
                }}
            />
        </div>
    )
}