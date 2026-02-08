"use client";
import { useRef, useEffect } from 'react';

interface ASCII2DProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  glitchIntensity?: number;
  updateInterval?: number;
}

export default function ASCII2DText({
  text = 'LETS BUILD',
  asciiFontSize = 9,
  textFontSize = 200,
  glitchIntensity = 0.2,
  updateInterval = 200
}: ASCII2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const animationId = useRef<number>(0);
  const lastUpdate = useRef<number>(0);
  // NEW: Ref to track pixel width safely for TypeScript
  const pixelWidthRef = useRef<number>(1000);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const pre = preRef.current;
    if (!container || !canvas || !pre) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const charset = 'MWN$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|(1){][?-_+~i!lI;:,"^`\'. ';
    const glitchColors = ['#2b4539', '#61dca3', '#61b3dc', '#ffe700', '#f000ff', '#001eff'];
    
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const cols = Math.floor(width / (asciiFontSize * 0.6)); 
      const rows = Math.floor(height / asciiFontSize);
      
      canvas.width = cols;
      canvas.height = rows;
      
      // Update the ref instead of the canvas object
      pixelWidthRef.current = width; 
    };

    const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;
      const lines = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      currentY -= ((lines.length - 1) * lineHeight) / 2;

      for (let k = 0; k < lines.length; k++) {
        context.fillText(lines[k].trim(), x, currentY);
        currentY += lineHeight;
      }
    };

    const render = (time: number) => {
      if (canvas.width === 0 || canvas.height === 0) return;
      if (time - lastUpdate.current < updateInterval) {
        animationId.current = requestAnimationFrame(render);
        return;
      }
      lastUpdate.current = time;

      const w = canvas.width;
      const h = canvas.height;
      const pixelWidth = pixelWidthRef.current; 
      ctx.clearRect(0, 0, w, h);
      
      // 1. Identify the Breakpoint
      const isMobile = pixelWidth < 768; 
      
      // 2. Adjust Font Size for better fitting
      // Desktop needs smaller relative font to fit "LET'S BUILD" in one line
      const fontMultiplier = isMobile ? 0.35 : 0.15; 
      const responsiveFontSize = Math.min(w * fontMultiplier, textFontSize / 6); 
      
      const lineHeight = responsiveFontSize * 1.2; 
      ctx.font = `900 ${responsiveFontSize}px "IBM Plex Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // 3. FORCE LINE BREAK LOGIC
      // On desktop: set maxWidth higher than the canvas so it NEVER wraps
      // On mobile: set maxWidth small enough that "LET'S BUILD" MUST wrap
      const maxWidth = isMobile ? (w * 0.4) : (w * 2);

      ctx.globalCompositeOperation = 'screen';
      
      // Render layers
      ctx.fillStyle = '#2b4539'; 
      wrapText(ctx, text, w / 2 - 1.2, h / 2, maxWidth, lineHeight);
      ctx.fillStyle = '#61dca3'; 
      wrapText(ctx, text, w / 2, h / 2, maxWidth, lineHeight);
      ctx.fillStyle = '#61b3dc'; 
      wrapText(ctx, text, w / 2 + 1.2, h / 2, maxWidth, lineHeight);
      
      ctx.globalCompositeOperation = 'source-over';

      const imgData = ctx.getImageData(0, 0, w, h).data;
      let htmlOutput = '';

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const a = imgData[i + 3];

          if (a < 50) {
            htmlOutput += ' ';
            continue;
          }

          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];

          let char;
          if (Math.random() < glitchIntensity) {
            char = charset[Math.floor(Math.random() * charset.length)];
          } else {
            const brightness = (r + g + b) / 3;
            const charIdx = Math.floor((brightness / 255) * (charset.length - 1));
            char = charset[charIdx];
          }

          let color;
          if (Math.random() < glitchIntensity) {
            color = glitchColors[Math.floor(Math.random() * glitchColors.length)];
          } else {
            color = `rgb(${r},${g},${b})`;
          }

          htmlOutput += `<span style="color:${color}">${char}</span>`;
        }
        htmlOutput += '\n';
      }

      pre.innerHTML = htmlOutput;
      animationId.current = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    animationId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId.current);
    };
  }, [text, asciiFontSize, textFontSize, glitchIntensity, updateInterval]);

  return (
    <div ref={containerRef} className="glitch-ascii-container">
      <style>{`
        .glitch-ascii-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }
        .glitch-ascii-container canvas {
          display: none;
        }
        .glitch-ascii-container pre {
          margin: 0;
          padding: 0;
          font-family: "IBM Plex Mono", monospace;
          font-weight: 900;
          white-space: pre;
          user-select: none;
          text-align: center;
          line-height: ${asciiFontSize}px;
          font-size: ${asciiFontSize}px;
          text-shadow: 0 0 8px rgba(255,255,255,0.2);
        }
      `}</style>
      <canvas ref={canvasRef} />
      <pre ref={preRef} />
    </div>
  );
}