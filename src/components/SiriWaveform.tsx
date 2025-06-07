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

    // Set canvas size to match the larger orb
    canvas.width = 512;
    canvas.height = 512;

    let time = 0;
    const waves = type === 'listening' ? 8 : type === 'processing' ? 6 : 7;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isActive) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const centerY = canvas.height / 2;
      const centerX = canvas.width / 2;
      const baseRadius = 200;

      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        ctx.globalAlpha = 0.9 - (i * 0.1);
        
        // Enhanced wave patterns more like iPhone Siri
        let amplitude = 25;
        let frequency = 0.02;
        let speed = 0.05;
        let waveCount = 16;
        
        if (type === 'listening') {
          amplitude = 45 + Math.sin(time * 0.03) * 20;
          frequency = 0.022 + i * 0.0008;
          speed = 0.06;
          waveCount = 20;
        } else if (type === 'processing') {
          amplitude = 25 + Math.sin(time * 0.05 + i) * 15;
          frequency = 0.025;
          speed = 0.08;
          waveCount = 14;
        } else if (type === 'speaking') {
          amplitude = 35 + Math.sin(time * 0.04 + i * 0.5) * 22;
          frequency = 0.024;
          speed = 0.055;
          waveCount = 18;
        }

        // Create more iPhone Siri-like circular waveforms with multiple harmonics
        for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
          // Primary wave with enhanced complexity
          const primaryWave = Math.sin(angle * waveCount + time * speed + i * 0.8) * amplitude;
          
          // Secondary harmonic for more complexity
          const secondaryWave = Math.sin(angle * (waveCount * 1.5) + time * speed * 1.3 + i * 0.6) * (amplitude * 0.4);
          
          // Tertiary wave for iPhone Siri smoothness
          const tertiaryWave = Math.sin(angle * (waveCount * 0.7) + time * speed * 0.9 + i * 1.1) * (amplitude * 0.25);
          
          // Quaternary wave for extra detail
          const quaternaryWave = Math.sin(angle * (waveCount * 2.2) + time * speed * 1.8 + i * 0.4) * (amplitude * 0.15);
          
          const totalWave = primaryWave + secondaryWave + tertiaryWave + quaternaryWave;
          const currentRadius = baseRadius + totalWave;
          
          const x = centerX + Math.cos(angle) * currentRadius;
          const y = centerY + Math.sin(angle) * currentRadius;
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();

        // Enhanced iPhone Siri-like gradients with more sophisticated colors
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius + amplitude);
        
        if (type === 'listening') {
          // Blue spectrum like iPhone Siri when listening - more vibrant
          gradient.addColorStop(0, `rgba(0, 122, 255, ${1.0 - i * 0.08})`);
          gradient.addColorStop(0.2, `rgba(30, 144, 255, ${0.9 - i * 0.08})`);
          gradient.addColorStop(0.5, `rgba(64, 156, 255, ${0.7 - i * 0.07})`);
          gradient.addColorStop(0.8, `rgba(120, 184, 255, ${0.5 - i * 0.06})`);
          gradient.addColorStop(1, `rgba(0, 122, 255, ${0.2 - i * 0.04})`);
        } else if (type === 'processing') {
          // Purple-pink spectrum for processing - more dynamic
          gradient.addColorStop(0, `rgba(175, 82, 222, ${1.0 - i * 0.08})`);
          gradient.addColorStop(0.3, `rgba(147, 51, 234, ${0.8 - i * 0.08})`);
          gradient.addColorStop(0.6, `rgba(255, 45, 85, ${0.6 - i * 0.07})`);
          gradient.addColorStop(0.9, `rgba(255, 107, 107, ${0.4 - i * 0.06})`);
          gradient.addColorStop(1, `rgba(175, 82, 222, ${0.2 - i * 0.04})`);
        } else {
          // Green-blue spectrum for speaking - more natural
          gradient.addColorStop(0, `rgba(52, 199, 89, ${1.0 - i * 0.08})`);
          gradient.addColorStop(0.3, `rgba(48, 209, 88, ${0.8 - i * 0.08})`);
          gradient.addColorStop(0.6, `rgba(0, 122, 255, ${0.6 - i * 0.07})`);
          gradient.addColorStop(0.9, `rgba(100, 210, 255, ${0.4 - i * 0.06})`);
          gradient.addColorStop(1, `rgba(52, 199, 89, ${0.2 - i * 0.04})`);
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4 - i * 0.3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Add enhanced inner glow effect
        if (i === 0) {
          ctx.globalAlpha = 0.4;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 8;
          ctx.stroke();
        }
        
        // Add outer glow for depth
        if (i === waves - 1) {
          ctx.globalAlpha = 0.2;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      time += 0.6;
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
        className="opacity-90"
        style={{
          width: '256px',
          height: '256px',
          filter: 'blur(0.2px)',
        }}
      />
    </div>
  );
};

export default SiriWaveform;