
import React, { useEffect, useRef } from 'react';

interface SiriWaveformProps {
  isActive: boolean;
  type: 'listening' | 'processing' | 'speaking';
}

const SiriWaveform: React.FC<SiriWaveformProps> = ({ isActive, type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match the orb
    canvas.width = 320;
    canvas.height = 320;

    let time = 0;
    const waves = 4;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isActive) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const centerY = canvas.height / 2;
      const centerX = canvas.width / 2;
      const radius = 140;

      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        ctx.globalAlpha = 0.6 - (i * 0.1);
        
        // Different wave patterns based on type
        let amplitude = 15;
        let frequency = 0.03;
        let speed = 0.08;
        
        if (type === 'listening') {
          amplitude = 25 + Math.sin(time * 0.05) * 10;
          frequency = 0.04 + i * 0.002;
          speed = 0.1;
        } else if (type === 'processing') {
          amplitude = 12 + Math.sin(time * 0.08 + i) * 8;
          frequency = 0.05;
          speed = 0.12;
        } else if (type === 'speaking') {
          amplitude = 20 + Math.sin(time * 0.06 + i * 0.3) * 12;
          frequency = 0.035;
          speed = 0.09;
        }

        // Create circular waveform
        for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
          const waveOffset = Math.sin(angle * 8 + time * speed + i * 0.5) * amplitude;
          const currentRadius = radius + waveOffset;
          
          const x = centerX + Math.cos(angle) * currentRadius;
          const y = centerY + Math.sin(angle) * currentRadius;
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();

        // Gradient colors based on type with Apple-like colors
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius + amplitude);
        if (type === 'listening') {
          gradient.addColorStop(0, 'rgba(0, 122, 255, 0.8)');
          gradient.addColorStop(0.5, 'rgba(88, 86, 214, 0.6)');
          gradient.addColorStop(1, 'rgba(0, 122, 255, 0.2)');
        } else if (type === 'processing') {
          gradient.addColorStop(0, 'rgba(175, 82, 222, 0.8)');
          gradient.addColorStop(0.5, 'rgba(255, 45, 85, 0.6)');
          gradient.addColorStop(1, 'rgba(175, 82, 222, 0.2)');
        } else {
          gradient.addColorStop(0, 'rgba(52, 199, 89, 0.8)');
          gradient.addColorStop(0.5, 'rgba(0, 122, 255, 0.6)');
          gradient.addColorStop(1, 'rgba(52, 199, 89, 0.2)');
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 - i * 0.2;
        ctx.stroke();
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, type]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="opacity-70"
        style={{
          width: '160px',
          height: '160px',
          filter: 'blur(0.5px)',
        }}
      />
    </div>
  );
};

export default SiriWaveform;
