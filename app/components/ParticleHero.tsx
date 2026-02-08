// "use client";
// "use client";

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import PillNav from './Nav';
// import Image from 'next/image';

// interface HeroProps {
//   onLoaded?: () => void;
// }

// const Hero2D: React.FC<HeroProps> = ({ onLoaded }) => {
//   const [introFinished, setIntroFinished] = useState(false);
//   const handleAnimationComplete = () => {
//     setIntroFinished(true);
//     if (onLoaded) onLoaded(); // Notify the Home component
//   };

//   const headingText = "BUILDIFY TECH SERVICES";

//   // Define paths: [start_x, start_y, middle_x, middle_y, end_x, end_y]
//   // The '50' is center. We start lines at 42 or 58 to clear the logo.
//   const tagPaths = [
//     { text: "INNOVATE", left: "15%", top: "25%", points: "42,45 30,25 15,25" },
//     { text: "ENGINEER", left: "85%", top: "25%", points: "58,45 70,25 85,25" },
//     { text: "DEVELOP", left: "15%", top: "75%", points: "42,55 30,75 15,75" },
//     { text: "DEPLOY", left: "85%", top: "75%", points: "58,55 70,75 85,75" },
//   ];

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@700;800&family=Inter:wght@400;600&display=swap');
          
//           .hero-wrapper {
//             position: relative;
//             width: 100%;
//             height: 100vh;
//             background-color: #020202;
//             overflow: hidden;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             font-family: 'Inter', sans-serif;
//           }

//           .grid-bg {
//             position: absolute;
//             inset: 0;
//             background-image: radial-gradient(circle at 2px 2px, rgba(0, 150, 255, 0.07) 1px, transparent 0);
//             background-size: 60px 60px;
//             mask-image: radial-gradient(circle at center, black, transparent 90%);
//           }

//           .buildify-header {
//             font-family: 'Oxanium', sans-serif; 
//             font-weight: 800;
//             font-size: clamp(1.5rem, 4vw, 3.5rem); 
//             color: #ffffff;
//             text-transform: uppercase;
//             letter-spacing: 0.6rem;
//             margin-bottom: 3rem;
//             z-index: 30;
//             display: flex;
//             gap: 0.3em;
//             /* Header Glow */
//             text-shadow: 0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(0, 150, 255, 0.2);
//           }

//           .logo-float-container {
//             position: relative;
//             z-index: 20;
//             filter: drop-shadow(0 0 20px rgba(0, 150, 255, 0.3));
//           }

//           .lines-overlay {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             pointer-events: none;
//             z-index: 10;
//           }

//           .glass-tag {
//             position: absolute;
//             padding: 10px 20px;
//             background: rgba(255, 255, 255, 0.02);
//             backdrop-filter: blur(15px);
//             border: 1px solid rgba(0, 150, 255, 0.3);
//             border-radius: 4px;
//             color: #fff;
//             font-size: 0.8rem;
//             font-weight: 700;
//             letter-spacing: 0.25rem;
//             /* Tag Glow */
//             box-shadow: 0 0 15px rgba(0, 150, 255, 0.2), inset 0 0 10px rgba(0, 150, 255, 0.1);
//             z-index: 25;
//             text-shadow: 0 0 8px rgba(255,255,255,0.5);
//           }
//         `}
//       </style>

//       <div className="hero-wrapper">
//         <div className="grid-bg" />
        
//         <PillNav isVisible={introFinished} />

//         <motion.h1 
//           className="buildify-header"
//           initial="hidden"
//           animate="visible"
//           onAnimationComplete={() => setTimeout(() => setIntroFinished(true), 300)}
//           variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
//         >
//           {headingText.split(" ").map((word, i) => (
//             <span key={i} style={{ display: 'flex' }}>
//               {word.split("").map((char, j) => (
//                 <motion.span key={j} variants={{
//                   hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
//                   visible: { opacity: 1, y: 0, filter: "blur(0px)" }
//                 }}>
//                   {char}
//                 </motion.span>
//               ))}
//               &nbsp;
//             </span>
//           ))}
//         </motion.h1>

//         <motion.div 
//           className="logo-float-container"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={introFinished ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 1, type: "spring" }}
//         >
//           <Image 
//             src="/logo.png" 
//             alt="Buildify Core" 
//             width={160}
//             height={160}
//             style={{ filter: 'brightness(1.2)' }}
//             priority
//           />
//         </motion.div>

//         {/* Line Engine with SVG Filters for Glow */}
//         <svg className="lines-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
//           <defs>
//             <filter id="glow">
//               <feGaussianBlur stdDeviation="0.4" result="blur" />
//               <feComposite in="SourceGraphic" in2="blur" operator="over" />
//             </filter>
//           </defs>
          
//           {tagPaths.map((path, i) => (
//             <motion.polyline
//               key={`path-${i}`}
//               points={path.points}
//               fill="none"
//               stroke="#0096ff"
//               strokeWidth="0.3"
//               strokeDasharray="0.8, 1.2"
//               strokeLinecap="round"
//               filter="url(#glow)"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={introFinished ? { pathLength: 1, opacity: 1 } : {}}
//               transition={{ delay: 1.2, duration: 1.8, ease: "easeInOut" }}
//             />
//           ))}
//         </svg>

//         {tagPaths.map((tag, i) => (
//           <motion.div
//             key={`tag-${i}`}
//             className="glass-tag"
//             style={{ left: tag.left, top: tag.top, transform: 'translate(-50%, -50%)' }}
//             initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
//             animate={introFinished ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
//             transition={{ delay: 2.8, duration: 0.6 }}
//           >
//             {tag.text}
//           </motion.div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Hero2D;

"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PillNav from './Nav';
import Image from 'next/image';
import Aurora from './DotGrid';
import ASCIIText from './Random';
import DotGrid from './DotGrid';
import dynamic from 'next/dynamic';
import Squares from './Grid';

const ASCII2DText = dynamic(() => import('./Random'), {
  ssr: false,
});

interface HeroProps {
  onLoaded?: () => void;
}

const Hero2D: React.FC<HeroProps> = ({ onLoaded }) => {
  const [introFinished, setIntroFinished] = useState(false);
  const handleAnimationComplete = () => {
    setIntroFinished(true);
    if (onLoaded) onLoaded(); // Notify the Home component
  };

  const headingText = "BUILDIFY TECH SERVICES";

  // These points are now relative to the 'diagram-container' (100x100 space)
  const tagPaths = [
    { text: "INNOVATE", left: "0%", top: "calc(25% - 19px)", points: "42,45 30,25 15,25" },
    { text: "ENGINEER", left: "85%", top: "calc(25% - 19px)", points: "58,45 70,25 85,25" },
    { text: "DEVELOP", left: "0%", top: "calc(75% - 19px)", points: "42,55 30,75 15,75" },
    { text: "DEPLOY", left: "85%", top: "calc(75% - 19px)", points: "58,55 70,75 85,75" },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@700;800&family=Inter:wght@400;600&display=swap');
          
          .hero-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          /* Remove solid background to let Aurora shine through */
          background-color: transparent; 
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          padding: 2rem 0;
        }

          .grid-bg {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle at 2px 2px, rgba(0, 150, 255, 0.07) 1px, transparent 0);
            background-size: 60px 60px;
            mask-image: radial-gradient(circle at center, black, transparent 90%);
            z-index: 0;
          }

          .buildify-header {
            font-family: 'Oxanium', sans-serif;
            font-weight: 800;
            font-size: clamp(1.5rem, 8vw, 2.5rem);
            text-transform: uppercase;
            letter-spacing: 0.6rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
            gap: 0;
            z-index: 30;
            width: 100%;
            max-width: 90vw;

            /* --- Glassmorphic Text Styles --- */
            
            /* 1. Translucency: White with 70% opacity */
            color: rgba(255, 255, 255, 0.7); 

            /* 2. Glass Glow & Depth: 
              - First shadow: A sharp white highlight for clarity
              - Second shadow: A soft white glow
              - Third shadow: A wider blue/cyan glow to mimic light refraction 
            */
            text-shadow: 
              0px 0px 1px rgba(255, 255, 255, 0.3),
              0px 0px 10px rgba(255, 255, 255, 0.4),
              0px 0px 20px rgba(255, 255, 255, 0.2);

            /* 3. Refractive Edge (Optional): 
              Gives the letters a subtle "frosting" around the edges 
            */
            -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.1);
          }

          .word-wrapper {
            display: inline-flex;  /* Keeps letters of one word together */
            white-space: nowrap;   /* Prevents word from breaking internally */
          }

          .space {
            display: inline-block;
            width: 0.3em;          /* Adjust for desired gap between words */
          }

          /* This container holds the Logo, Lines, and Tags together */
          .diagram-container {
            position: relative;
            width: 100%;
            max-width: 800px; /* Limits the spread of the lines */
            height: 50vh;    /* Defined height for the SVG/Tags coordinate system */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }

          .logo-float-container {
            position: relative;
            z-index: 20;
            filter: drop-shadow(0 0 20px rgba(0, 150, 255, 0.3));
          }

          .lines-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 15;
          }

          .aurora-bg-container {
            position: absolute;
            inset: 0;
            z-index: 0; /* Place behind everything */
            pointer-events: none;
            background: #0a0a0a;
          }

          .glass-tag {
            position: absolute;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(0, 150, 255, 0.3);
            border-radius: 4px;
            color: #fff;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.2rem;
            box-shadow: 0 0 15px rgba(0, 150, 255, 0.2);
            z-index: 25;
            white-space: nowrap;
          }

          .ascii-container {
            position: absolute;
            top: 60%; /* Position it slightly below the main header */
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 2000px;
            height: 60vh;
            z-index: 20;
            pointer-events: none; /* Allows clicking things through the text if needed */
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @media (max-width: 760px) {
            .ascii-container {
              height: 75vh;
            }
            .buildify-header {  
              font-size: clamp(1.2rem, 10vw, 2rem);
              margin-top: -5rem;
            } 
          }
        `}
      </style>

      <div className="hero-wrapper">
        <div className="aurora-bg-container">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#112b21"
          activeColor="#00ff9d"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        {/* <Squares 
          speed={0.5}
          squareSize={60}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#271E37'
          hoverFillColor='#222222'
      
          /> */}
        </div>
        <div className="grid-bg" />
        
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', height: '50vh' }}>
        {/* 1. Header (Normal flow) */}
        <motion.h1 
          className="buildify-header"
          initial="hidden"
          animate="visible"
          onAnimationComplete={handleAnimationComplete}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {headingText.split(" ").map((word, i, array) => (
            <span key={i} className="word-wrapper">
              {word.split("").map((char, j) => (
                <motion.span key={j} variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                }}>
                  {char}
                </motion.span>
              ))}
              {/* Only add space if it's NOT the last word */}
              {i !== array.length - 1 && <span className="space">&nbsp;</span>}
            </span>
          ))}
        </motion.h1>
        {/* <div className="ascii-container">
          <ASCIIText
            text='LETS BUILD'
            
            asciiFontSize={8}
            // If your component supports plane/camera props, 
            // ensure they are centered.
          />
        </div> */}
        <div className="ascii-container">
          <ASCII2DText
            text="LET'S BUILD"
            
            asciiFontSize={8}
            // If your component supports plane/camera props, 
            // ensure they are centered.
          />
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Hero2D;
// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader.js';
// import { motion } from 'framer-motion';
// import PillNav from './Nav'; // Import the new component



// interface ParticleHeroProps {
//   onLoaded?: () => void;
// }
// // --------------------------------------------------------
// // SHADERS (Unchanged)
// // --------------------------------------------------------
// const vertexShader = `
//   attribute float size;
//   attribute vec3 customColor;
//   varying vec3 vColor;

//   void main() {
//     vColor = customColor;
//     vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
//     gl_PointSize = size * ( 300.0 / -mvPosition.z );
//     gl_Position = projectionMatrix * mvPosition;
//   }
// `;

// const fragmentShader = `
//   uniform vec3 color;
//   uniform sampler2D pointTexture;
//   varying vec3 vColor;

//   void main() {
//     gl_FragColor = vec4( color * vColor, 1.0 );
//     gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
//   }
// `;

// // --------------------------------------------------------
// // LOGIC CLASS (Unchanged)
// // --------------------------------------------------------
// class ParticleSystem {
//   scene: THREE.Scene;
//   font: Font;
//   particleImg: THREE.Texture;
//   camera: THREE.PerspectiveCamera;
//   renderer: THREE.WebGLRenderer;
//   raycaster: THREE.Raycaster;
//   mouse: THREE.Vector2;
//   colorChange: THREE.Color;
//   buttom: boolean;
//   data: {
//     text: string;
//     amount: number;
//     particleSize: number;
//     particleColor: number;
//     textSize: number;
//     area: number;
//     ease: number;
//   };
//   planeArea!: THREE.Mesh;
//   particles!: THREE.Points;
//   geometryCopy!: THREE.BufferGeometry;
//   currenPosition?: THREE.Vector3;

//   constructor(
//     scene: THREE.Scene,
//     font: Font,
//     particleImg: THREE.Texture,
//     camera: THREE.PerspectiveCamera,
//     renderer: THREE.WebGLRenderer
//   ) {
//     this.scene = scene;
//     this.font = font;
//     this.particleImg = particleImg;
//     this.camera = camera;
//     this.renderer = renderer;

//     this.raycaster = new THREE.Raycaster();
//     this.mouse = new THREE.Vector2(-200, 200);
//     this.colorChange = new THREE.Color();
//     this.buttom = false;

//     this.data = {
//       text: "LET'S BUILD\nYOUR TECH",
//       amount: 1500,
//       particleSize: 1,
//       particleColor: 0xffffff,
//       textSize: 16,
//       area: 250,
//       ease: 0.05,
//     };

//     this.setup();
//     this.bindEvents();
//     this.updateDataForScreen();
//   }

  
//   setup() {
//     const geometry = new THREE.PlaneGeometry(
//       this.visibleWidthAtZDepth(100, this.camera),
//       this.visibleHeightAtZDepth(100, this.camera)
//     );
//     const material = new THREE.MeshBasicMaterial({
//       color: 0x00ff00,
//       transparent: true,
//     });
//     this.planeArea = new THREE.Mesh(geometry, material);
//     this.planeArea.visible = false;
//     this.scene.add(this.planeArea); 
//     this.createText();
//   }

//   bindEvents() {
//     document.addEventListener('mousedown', this.onMouseDown);
//     document.addEventListener('mousemove', this.onMouseMove);
//     document.addEventListener('mouseup', this.onMouseUp);
//   }

//   unbindEvents() {
//     document.removeEventListener('mousedown', this.onMouseDown);
//     document.removeEventListener('mousemove', this.onMouseMove);
//     document.removeEventListener('mouseup', this.onMouseUp);
//   }

//   onMouseDown = (event: MouseEvent) => {
//     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
//     vector.unproject(this.camera);
//     const dir = vector.sub(this.camera.position).normalize();
//     const distance = -this.camera.position.z / dir.z;
//     this.currenPosition = this.camera.position
//       .clone()
//       .add(dir.multiplyScalar(distance));

//     this.buttom = true;
//     this.data.ease = 0.01;
//   };

//   onMouseUp = () => {
//     this.buttom = false;
//     this.data.ease = 0.05;
//   };

//   onMouseMove = (event: MouseEvent) => {
//     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   };

//   render() {
//     const time = ((0.001 * performance.now()) % 12) / 12;
//     const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

//     this.raycaster.setFromCamera(this.mouse, this.camera);

//     const intersects = this.raycaster.intersectObject(this.planeArea);

//     if (intersects.length > 0) {
//       const pos = this.particles.geometry.attributes.position;
//       const copy = this.geometryCopy.attributes.position;
//       const coulors = this.particles.geometry.attributes.customColor;
//       const size = this.particles.geometry.attributes.size;

//       const mx = intersects[0].point.x;
//       const my = intersects[0].point.y;
//       // const mz = intersects[0].point.z;

//       for (let i = 0, l = pos.count; i < l; i++) {
//         const initX = copy.getX(i);
//         const initY = copy.getY(i);
//         const initZ = copy.getZ(i);

//         let px = pos.getX(i);
//         let py = pos.getY(i);
//         let pz = pos.getZ(i);

//         this.colorChange.setHSL(0.5, 1, 1);
//         coulors.setXYZ(
//           i,
//           this.colorChange.r,
//           this.colorChange.g,
//           this.colorChange.b
//         );
//         coulors.needsUpdate = true;

//         size.setX(i, this.data.particleSize);
//         size.needsUpdate = true;

//         let dx = mx - px;
//         let dy = my - py;

//         const mouseDistance = this.distance(mx, my, px, py);
//         const d = (dx = mx - px) * dx + (dy = my - py) * dy;
//         const f = -this.data.area / d;

//         if (this.buttom) {
//           const t = Math.atan2(dy, dx);
//           px -= f * Math.cos(t);
//           py -= f * Math.sin(t);

//           this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
//           coulors.setXYZ(
//             i,
//             this.colorChange.r,
//             this.colorChange.g,
//             this.colorChange.b
//           );
//           coulors.needsUpdate = true;

//           if (
//             px > initX + 70 ||
//             px < initX - 70 ||
//             py > initY + 70 ||
//             py < initY - 70
//           ) {
//             this.colorChange.setHSL(0.15, 1.0, 0.5);
//             coulors.setXYZ(
//               i,
//               this.colorChange.r,
//               this.colorChange.g,
//               this.colorChange.b
//             );
//             coulors.needsUpdate = true;
//           }
//         } else {
//           if (mouseDistance < this.data.area) {
//             if (i % 5 === 0) {
//               const t = Math.atan2(dy, dx);
//               px -= 0.03 * Math.cos(t);
//               py -= 0.03 * Math.sin(t);

//               this.colorChange.setHSL(0.15, 1.0, 0.5);
//               coulors.setXYZ(
//                 i,
//                 this.colorChange.r,
//                 this.colorChange.g,
//                 this.colorChange.b
//               );
//               coulors.needsUpdate = true;

//               size.setX(i, this.data.particleSize / 1.2);
//               size.needsUpdate = true;
//             } else {
//               const t = Math.atan2(dy, dx);
//               px += f * Math.cos(t);
//               py += f * Math.sin(t);

//               pos.setXYZ(i, px, py, pz);
//               pos.needsUpdate = true;

//               size.setX(i, this.data.particleSize * 1.3);
//               size.needsUpdate = true;
//             }

//             if (
//               px > initX + 10 ||
//               px < initX - 10 ||
//               py > initY + 10 ||
//               py < initY - 10
//             ) {
//               this.colorChange.setHSL(0.15, 1.0, 0.5);
//               coulors.setXYZ(
//                 i,
//                 this.colorChange.r,
//                 this.colorChange.g,
//                 this.colorChange.b
//               );
//               coulors.needsUpdate = true;

//               size.setX(i, this.data.particleSize / 1.8);
//               size.needsUpdate = true;
//             }
//           }
//         }

//         px += (initX - px) * this.data.ease;
//         py += (initY - py) * this.data.ease;
//         pz += (initZ - pz) * this.data.ease;

//         pos.setXYZ(i, px, py, pz);
//         pos.needsUpdate = true;
//       }
//     }
//   }
//   // Inside ParticleSystem class
//   updateDataForScreen() {
//     const width = window.innerWidth;
//     // Dynamic scaling based on width
//     if (width < 640) { // Mobile
//       this.data.textSize = 13; 
//       this.data.amount = 600;
//       this.data.area = 150;
//     } else if (width < 1024) { // Tablet
//       this.data.textSize = 12;
//       this.data.amount = 1000;
//       this.data.area = 180;
//     } else { // Desktop
//       this.data.textSize = 16;
//       this.data.amount = 1500;
//       this.data.area = 250;
//     }

//     if (width < 768) { // Mobile
//     // Forces 4 separate lines: 
//     // LET'S
//     // BUILD
//     // YOUR
//     // TECH
//     this.data.text = "LET'S\nBUILD\nYOUR\nTECH";
//     this.data.textSize = 13; 
//     this.data.amount = 600;
//     this.data.area = 150;
//   } else { // Desktop
//     // Keeps 2 lines:
//     // LET'S BUILD
//     // YOUR TECH
//     this.data.text = "LET'S BUILD\nYOUR TECH";
//     this.data.textSize = 16;
//     this.data.amount = 1500;
//     this.data.area = 250;
//   }
//   }
//   refreshText() {
//     this.scene.remove(this.particles);
//     this.updateDataForScreen();
//     this.createText();
//   }

//   createText() {
//     const thePoints: THREE.Vector3[] = [];
//     const shapes: (THREE.Shape | THREE.Path)[] = this.font.generateShapes(
//       this.data.text,
//       this.data.textSize
//     );
//     const geometry = new THREE.ShapeGeometry(shapes as THREE.Shape[]);
//     geometry.computeBoundingBox();

//     const xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
//     const yMid = (geometry.boundingBox!.max.y - geometry.boundingBox!.min.y) / 2.85;

//     geometry.center();

//     const holeShapes: THREE.Path[] = [];

//     for (let q = 0; q < shapes.length; q++) {
//       const shape = shapes[q];
//       if ((shape as THREE.Shape).holes && (shape as THREE.Shape).holes.length > 0) {
//         for (let j = 0; j < (shape as THREE.Shape).holes.length; j++) {
//           const hole = (shape as THREE.Shape).holes[j];
//           holeShapes.push(hole);
//         }
//       }
//     }

//     shapes.push(...holeShapes);

//     const colors: number[] = [];
//     const sizes: number[] = [];

//     for (let x = 0; x < shapes.length; x++) {
//       const shape = shapes[x];
//       const amountPoints =
//         shape.type === 'Path' ? this.data.amount / 2 : this.data.amount;
//       const points = shape.getSpacedPoints(amountPoints);

//       points.forEach((element, z) => {
//         const a = new THREE.Vector3(element.x, element.y, 0);
//         thePoints.push(a);
//         colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
//         sizes.push(1);
//       });
//     }

//     const geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
//     geoParticles.translate(xMid, yMid, 0);

//     geoParticles.setAttribute(
//       'customColor',
//       new THREE.Float32BufferAttribute(colors, 3)
//     );
//     geoParticles.setAttribute(
//       'size',
//       new THREE.Float32BufferAttribute(sizes, 1)
//     );

//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         color: { value: new THREE.Color(0xffffff) },
//         pointTexture: { value: this.particleImg },
//       },
//       vertexShader: vertexShader,
//       fragmentShader: fragmentShader,
//       blending: THREE.AdditiveBlending,
//       depthTest: false,
//       transparent: true,
//     });

//     this.particles = new THREE.Points(geoParticles, material);
//     this.scene.add(this.particles);

//     this.geometryCopy = new THREE.BufferGeometry();
//     this.geometryCopy.copy(this.particles.geometry);
//   }

//   visibleHeightAtZDepth(depth: number, camera: THREE.PerspectiveCamera) {
//     const cameraOffset = camera.position.z;
//     if (depth < cameraOffset) depth -= cameraOffset;
//     else depth += cameraOffset;

//     const vFOV = (camera.fov * Math.PI) / 180;
//     return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
//   }

//   visibleWidthAtZDepth(depth: number, camera: THREE.PerspectiveCamera) {
//     const height = this.visibleHeightAtZDepth(depth, camera);
//     return height * camera.aspect;
//   }

//   distance(x1: number, y1: number, x2: number, y2: number) {
//     return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
//   }
// }

// // --------------------------------------------------------
// // REACT COMPONENT
// // --------------------------------------------------------

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.5 },
//   }),
// };

// const letterVariants = {
//   hidden: {
//     opacity: 0,
//     y: -50,
//     scale: 3,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "tween" as const,
//       damping: 12,
//       stiffness: 100,
//     },
//   },
// };


// const ParticleText: React.FC<ParticleHeroProps> = ({ onLoaded }) => {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [introFinished, setIntroFinished] = useState(false);
  

//   const handleAnimationComplete = () => {
//     setIntroFinished(true);
//     if (onLoaded) onLoaded(); // Notify the Home component
//   };

//   // Text string to animate
//   const headingText = "BUILDIFY TECH SERVICES";

//   useEffect(() => {
//     if (!mountRef.current) return;

//     let particleSystem: ParticleSystem | null = null;
//     let animationId: number;
//     const container = mountRef.current;

//     // 1. Setup Scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       65,
//       container.clientWidth / container.clientHeight,
//       1,
//       10000
//     );
//     camera.position.set(0, 0, 100);

//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.outputColorSpace = THREE.SRGBColorSpace;
//     container.appendChild(renderer.domElement);

//     // 2. Load Assets
//     const manager = new THREE.LoadingManager();
//     const loader = new FontLoader(manager);
//     const textureLoader = new THREE.TextureLoader(manager);

//     let loadedFont: Font | null = null;
//     let loadedTexture: THREE.Texture | null = null;

//     loader.load(
//       'https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json',
//       (font) => { loadedFont = font; }
//     );

//     textureLoader.load(
//       'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png',
//       (texture) => { loadedTexture = texture; }
//     );

//     manager.onLoad = function () {
//       if (loadedFont && loadedTexture) {
//         particleSystem = new ParticleSystem(
//           scene,
//           loadedFont,
//           loadedTexture,
//           camera,
//           renderer
//         );
//       }
//     };

//     // 3. Render Loop
//     const render = () => {
//       animationId = requestAnimationFrame(render);
//       if (particleSystem) {
//         particleSystem.render();
//       }
//       renderer.render(scene, camera);
//     };
//     render();

//     // 4. Resize Handler
//     const onWindowResize = () => {
//       if (!container || !particleSystem) return;

//       const w = container.clientWidth;
//       const h = container.clientHeight;

//       // 1. Update Camera
//       camera.aspect = w / h;
      
//       // Adaptive Camera Depth: Move camera back on narrow screens
//       if (w < 768) {
//         camera.position.z = 150; // Further back for mobile
//       } else {
//         camera.position.z = 100;
//       }
      
//       camera.updateProjectionMatrix();

//       // 2. Update Renderer
//       renderer.setSize(w, h);

//       // 3. Re-sync Interaction Plane
//       // This ensures your mouse interaction still lines up with the particles
//       particleSystem.planeArea.geometry.dispose();
//       particleSystem.planeArea.geometry = new THREE.PlaneGeometry(
//         particleSystem.visibleWidthAtZDepth(100, camera),
//         particleSystem.visibleHeightAtZDepth(100, camera)
//       );

//       // 4. Trigger a "Soft Refresh"
//       // If the window width changed significantly, re-generate the text
//       particleSystem.refreshText();
//     };
//     window.addEventListener('resize', onWindowResize);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener('resize', onWindowResize);
//       if (particleSystem) particleSystem.unbindEvents();
//       if (container.contains(renderer.domElement)) {
//         container.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Oxanium:wght@700;900&display=swap');
          
//           .particle-text-container {
//             position: relative;
//             width: 100%;
//             height: 100vh;
//             background-color: #0a0a0a;
//             font-family: 'Roboto', sans-serif;
//             overflow: hidden;
//           }

//           #magic-canvas {
//             position: absolute;
//             top: 20vh; 
//             left: 0;
//             width: 100%;
//             height: 100%;
//             z-index: 0;
//           }

//           .playground {
//             position: absolute;
//             width: 100%;
//             height: 100%;
//             top: 0;
//             left: 0;
//             display: flex;
//             flex-direction: column;
//             justify-content: center; 
//             align-items: center;
//             pointer-events: none; 
//             z-index: 1;
//           }

//           .buildify-header {
//             font-family: 'Oxanium', sans-serif; 
//             font-weight: 800;
//             font-size: clamp(1.2rem, 5vw, 2.1rem); 
//             color: #ffffff;
//             text-transform: uppercase;
//             letter-spacing: 0.2rem;
//             text-align: center;
//             text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
//             margin-bottom: 200px; 
//             pointer-events: auto;
            
//             /* Needed for framer-motion letter splitting to look right */
//             display: flex;
//             flex-wrap: wrap; 
//             justify-content: center;
//             gap: 0.2em; 
//           }


//           @media (max-width: 768px) {
//             .buildify-header {
//               font-size: 1.8rem;
//               margin-bottom: 300px;
//               padding: 0 20px;
//             }
//             #magic-canvas {
//                 top: 15vh; 
//             }
            
//           }
//         `}
//       </style>

//       <div className="particle-text-container">
        
//         {/* The Overlay UI */}
//         <div className="playground">
          
//           {/* NAV BAR - Fades in only when intro is finished */}
//           <PillNav isVisible={introFinished} />

//           {/* ANIMATED TEXT HEADER */}
//           {/* ANIMATED TEXT HEADER */}
//           <motion.h1 
//             className="buildify-header"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             onAnimationComplete={handleAnimationComplete}
//             style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
//           >
//             {headingText.split(" ").map((word, wordIndex) => (
//               <span 
//                 key={wordIndex} 
//                 style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
//               >
//                 {word.split("").map((char, charIndex) => (
//                   <motion.span 
//                     key={charIndex} 
//                     variants={letterVariants} 
//                     style={{ display: 'inline-block' }}
//                   >
//                     {char}
//                   </motion.span>
//                 ))}
//                 {/* Add a space after each word except the last one */}
//                 {wordIndex !== headingText.split(" ").length - 1 && "\u00A0"}
//               </span>
//             ))}
//           </motion.h1>
//         </div>

//         {/* 3D CANVAS - Fades in only when intro is finished */}
//         <motion.div 
//           id="magic-canvas" 
//           ref={mountRef}
//           initial={{ opacity: 0 }}
//           animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
//           transition={{ duration: 1.5, ease: "easeIn" }}
//         />

//       </div>
//     </>
//   );
// };

// export default ParticleText;