
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

    canvas.width = 300;
    canvas.height = 100;

    let time = 0;
    const waves = 5;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isActive) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const centerY = canvas.height / 2;
      const centerX = canvas.width / 2;

      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        ctx.globalAlpha = 0.7 - (i * 0.1);
        
        // Different wave patterns based on type
        let amplitude = 20;
        let frequency = 0.02;
        
        if (type === 'listening') {
          amplitude = 30 + Math.sin(time * 0.05) * 10;
          frequency = 0.02 + i * 0.005;
        } else if (type === 'processing') {
          amplitude = 15 + Math.sin(time * 0.1 + i) * 5;
          frequency = 0.03;
        } else if (type === 'speaking') {
          amplitude = 25 + Math.sin(time * 0.08 + i * 0.5) * 8;
          frequency = 0.025;
        }

        for (let x = 0; x < canvas.width; x++) {
          const y = centerY + Math.sin((x - centerX) * frequency + time * 0.1 + i * 0.5) * amplitude * Math.sin(time * 0.02 + i);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Gradient colors based on type
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        if (type === 'listening') {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.8)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');
        } else if (type === 'processing') {
          gradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)');
          gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.8)');
          gradient.addColorStop(1, 'rgba(147, 51, 234, 0.8)');
        } else {
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.8)');
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0.8)');
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3 - i * 0.3;
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
        className="opacity-80"
        style={{
          filter: 'blur(0.5px)',
        }}
      />
    </div>
  );
};

export default SiriWaveform;
