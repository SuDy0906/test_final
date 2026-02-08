// "use client";

// import React, { useState, useRef, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useGLTF, Center, Environment, Float, Html } from '@react-three/drei';
// import * as THREE from 'three';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- DATA CONFIGURATION ---
// // Replace 'modelPath' with your actual .glb files inside the /public folder
// const servicesData = [
//   {
//     id: 0,
//     title: "WEB DEVELOPMENT",
//     short: "Web Dev",
//     desc: "Building immersive, high-performance web experiences using Next.js, WebGL, and modern frameworks. We turn designs into interactive realities.",
//     modelPath: "/models/web.glb", 
//     color: "#4f46e5", // Indigo
//     shape: "box" // Fallback shape
//   },
//   {
//     id: 1,
//     title: "DATA SCIENCE",
//     short: "Data Science",
//     desc: "Unlocking insights from complex datasets. Our predictive models and analytics pipelines help you make data-driven decisions with precision.",
//     modelPath: "/models/data.glb",
//     color: "#ec4899", // Pink
//     shape: "sphere"
//   },
//   {
//     id: 2,
//     title: "AI AGENTS",
//     short: "AI Agents",
//     desc: "Deploying autonomous AI agents that handle workflows, customer support, and complex reasoning tasks to automate your business intelligence.",
//     modelPath: "/models/ai.glb",
//     color: "#10b981", // Emerald
//     shape: "octahedron"
//   }
// ];

// // --- 3D COMPONENT ---
// const SpinningModel = ({ activeService }: { activeService: number }) => {
//   const meshRef = useRef<THREE.Group>(null);
//   const data = servicesData[activeService];
  
//   // Load the GLB (Uncomment this line when you have real files)
//   // const { scene } = useGLTF(data.modelPath);

//   // Animation State
//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       // 1. Continuous Spin
//       meshRef.current.rotation.y += delta * 1.5;
      
//       // 2. Entrance Animation (Scale up from 0 to 1)
//       meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
//     }
//   });

//   // Reset scale to 0 whenever the active service changes (triggering the pop-in effect)
//   useEffect(() => {
//     if (meshRef.current) {
//       meshRef.current.scale.set(0, 0, 0);
//     }
//   }, [activeService]);

//   return (
//     <group ref={meshRef}>
//       <Center>
//         {/* --- REAL MODEL LOADER (Uncomment below to use .glb) --- */}
//         {/* <primitive object={scene} /> */}

//         {/* --- FALLBACK SHAPES (Delete this block when using real models) --- */}
//         <mesh>
//           {data.shape === 'box' && <boxGeometry args={[2.5, 2.5, 2.5]} />}
//           {data.shape === 'sphere' && <sphereGeometry args={[1.8, 32, 32]} />}
//           {data.shape === 'octahedron' && <octahedronGeometry args={[2, 0]} />}
//           <meshStandardMaterial 
//             color={data.color} 
//             wireframe={true} 
//             emissive={data.color}
//             emissiveIntensity={0.5}
//           />
//         </mesh>
//         {/* ----------------------------------------------------------- */}
//       </Center>
//     </group>
//   );
// };

// // --- MAIN REACT COMPONENT ---
// const Services = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <section id="services" className="relative w-full min-h-screen bg-neutral-950 text-white py-20 overflow-hidden">
      
//       {/* 1. HEADER SECTION */}
//       <div className="container mx-auto px-4 text-center mb-12">
//         <h2 className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 font-[Orbitron] uppercase mb-10">
//           Our Services
//         </h2>

//         {/* 2. TABS (Top Center) */}
//         <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 relative z-10">
//           {servicesData.map((service, index) => (
//             <button
//               key={service.id}
//               onClick={() => setActiveTab(index)}
//               className={`
//                 px-6 py-3 rounded-full font-[Orbitron] text-sm md:text-base tracking-wider transition-all duration-300 border
//                 ${activeTab === index 
//                   ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110' 
//                   : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'
//                 }
//               `}
//             >
//               {service.short}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 3. SPLIT LAYOUT (3D Left / Text Right) */}
//       <div className="container mx-auto px-4 h-[60vh] flex flex-col md:flex-row items-center justify-center relative">
        
//         {/* LEFT COLUMN: 3D Object */}
//         <div className="w-full md:w-1/2 h-[400px] md:h-full relative order-2 md:order-1">
//           <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
//             <ambientLight intensity={0.5} />
//             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//             <pointLight position={[-10, -10, -10]} />
            
//             {/* Float makes it hover gently */}
//             <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//               <SpinningModel activeService={activeTab} />
//             </Float>
            
//             <Environment preset="city" />
//           </Canvas>
//         </div>

//         {/* RIGHT COLUMN: Description Text */}
//         <div className="w-full md:w-1/2 h-auto md:h-full flex items-center justify-center md:justify-start order-1 md:order-2 p-6">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.5 }}
//               className="relative"
//             >
//               {/* Glassmorphism Card */}
//               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-lg shadow-2xl relative overflow-hidden group">
                
//                 {/* Decorative glow behind text */}
//                 <div 
//                   className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-40 transition-colors duration-500"
//                   style={{ backgroundColor: servicesData[activeTab].color }}
//                 />

//                 <h3 className="text-3xl md:text-5xl font-[Orbitron] font-bold mb-6 leading-tight text-white">
//                   {servicesData[activeTab].title}
//                 </h3>
                
//                 <p className="text-gray-300 text-lg leading-relaxed font-[Roboto]">
//                   {servicesData[activeTab].desc}
//                 </p>

//                 <div className="mt-8">
//                   <button className="text-sm font-[Orbitron] tracking-widest uppercase text-white/70 border-b border-white/30 pb-1 hover:text-white hover:border-white transition-all">
//                     Learn More &rarr;
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Services;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User} from "lucide-react";

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  color: string;
}

// --- Mock Data ---
const services: Service[] = [
  {
    id: "01",
    title: "Branding",
    description:
      "We build strong brand identities that resonate with your target audience and stand the test of time.",
    color: "bg-purple-500",
  },
  {
    id: "02",
    title: "Development",
    description:
      "Robust and scalable web solutions tailored to your specific business needs using modern technologies.",
    color: "bg-blue-500",
  },
  {
    id: "03",
    title: "UI/UX Design",
    description:
      "UI/UX design is designing digital interfaces for a great user experience.",
    color: "bg-emerald-400",
  },
  {
    id: "04",
    title: "Graphic Design",
    description:
      "Visual storytelling that captivates your audience through stunning graphics and layouts.",
    color: "bg-orange-400",
  },
  {
    id: "05",
    title: "SEO",
    description:
      "Optimizing your online presence to rank higher and attract organic traffic to your business.",
    color: "bg-pink-500",
  },
];

// --- Mock Image Component (The "Pop Up") ---
// Replacing actual images with a CSS-styled mock card to match the aesthetic without external assets
const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="relative w-[300px] md:w-[400px] h-[220px] bg-neutral-100 rounded-xl shadow-2xl p-4 flex flex-col justify-between select-none overflow-hidden border border-neutral-200">
      {/* Decorative UI Elements mimicking the screenshot */}
      <div className="flex justify-between items-start">
         {/* Floating Badge */}
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center text-white shadow-lg`}
        >
            <User size={20} />
        </motion.div>
        
        {/* Mock Window Controls */}
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-300" />
            <div className="w-2 h-2 rounded-full bg-neutral-300" />
        </div>
      </div>

      {/* Main Content Area Mockup */}
      <div className="flex gap-4 items-center relative z-10">
        <div className={`w-24 h-32 rounded-lg ${service.color} opacity-80 shadow-inner flex items-center justify-center`}>
            <div className="w-12 h-12 rounded-full bg-white/20" />
        </div>
        <div className="space-y-2 flex-1">
            <div className="h-2 w-3/4 bg-neutral-200 rounded" />
            <div className="h-2 w-1/2 bg-neutral-200 rounded" />
            <div className="h-8 w-16 bg-white rounded shadow-sm mt-2 flex items-center justify-center text-xs font-bold text-neutral-400">
                UI
            </div>
        </div>
      </div>

       {/* Floating Tag */}
       <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-1/2 -right-4 px-6 py-3 rounded-l-xl ${service.color} text-white font-bold shadow-lg`}
        >
            UX
        </motion.div>

        {/* Toggle Switch Mock */}
        <div className="absolute bottom-4 right-4 bg-white p-1 rounded-full w-12 h-6 flex items-center shadow border border-neutral-100">
            <motion.div 
                layoutId="toggle"
                className={`w-4 h-4 rounded-full ${service.color}`} 
            />
        </div>
    </div>
  );
};

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>("03"); // Default to UI/UX as per image

  return (
    <section className="min-h-screen bg-neutral-950 text-white py-24 px-6 md:px-12 lg:px-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-widest text-neutral-400 uppercase">
              Our Service
            </h3>
            <h2 className="text-5xl md:text-6xl font-semibold leading-tight">
              What <span className="text-emerald-400">Services</span>
              <br />
              We’re Offering
            </h2>
          </div>
          <p className="md:max-w-md text-neutral-400 leading-relaxed text-sm md:text-base mt-2">
            We offer services that can help businesses improve their visibility and
            business reputation online, expand market reach, and increase turnover
            through effective digital strategies. Following are the services we provide.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col">
          {services.map((service) => {
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setActiveId(isActive ? null : service.id)}
                className={`group relative border-t border-neutral-800 cursor-pointer transition-colors duration-300 ${
                  isActive ? "py-10" : "py-8 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  {/* Left Side: Title & Description */}
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <h3
                      className={`text-3xl md:text-4xl font-medium transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                      }`}
                    >
                      {service.title}
                      {isActive && <span className="text-emerald-400">.</span>}
                    </h3>

                    {/* Expandable Description */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-neutral-400 text-sm md:text-base overflow-hidden"
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Side: Arrow Icon (Visible only when inactive) */}
                  {!isActive && (
                    <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:border-white group-hover:text-white transition-all">
                      <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  )}
                </div>

                {/* Pop-up Image (Absolute positioned to overlap) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                    >
                      {/* Using the mock card component */}
                      <ServiceCard service={service} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {/* Bottom border for the last item */}
          <div className="border-t border-neutral-800" />
        </div>

      </div>
    </section>
  );
}