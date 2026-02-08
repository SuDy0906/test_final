"use client";

import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { View, Preload, Environment, Lightformer } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Band from './components/Band'; 

// --- Reusable Scene Wrapper ---
const CardScene = ({ texture }: { texture?: string }) => {
  return (
    <>
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band textureUrl={texture} />
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

// --- Layout Components ---
const Section = ({ 
    align = 'left', 
    name, 
    role, 
    description,
    texture 
}: { align?: 'left'|'right', name: string, role: string, description: string, texture?: string }) => {
    
    return (
        <div className="w-full max-w-6xl mx-auto min-h-[400px] grid md:grid-cols-2 gap-8 items-center py-12 px-4">
            
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
                <View className="absolute inset-0 w-full h-full">
                    <CardScene texture={texture} />
                </View>
            </div>
        </div>
    )
}

export default function Page() {
    const container = useRef<HTMLElement>(null)

    return (
        <main ref={container} className="relative w-full h-full min-h-screen bg-neutral-950 overflow-y-auto antialiased selection:bg-blue-500 selection:text-white">
            
            {/* 1. THE GLOBAL CANVAS */}
            <Canvas
                // Exact camera settings from your snippet:
                camera={{ position: [0, 0, 8], fov: 25 }}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}
                eventSource={container as React.MutableRefObject<HTMLElement>}
            >
                <View.Port />
                <Preload all />
            </Canvas>


            {/* 2. THE HTML CONTENT */}
            <div className="relative z-10 pt-20 pb-40">
                <div className="text-center mb-24 space-y-4">
                    <h1 className="text-6xl font-black text-white tracking-tighter">THE SQUAD</h1>
                    <p className="text-gray-400">Drag the cards to interact.</p>
                </div>

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

            </div>
        </main>
    )
}