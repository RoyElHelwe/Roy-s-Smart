// components/ui/aceternity/sparkles.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps extends React.HTMLAttributes<HTMLDivElement> {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  className?: string;
  particleOptions?: any;
  id?: string;
}

const SparklesCore = ({
  id,
  className,
  background = "#000",
  minSize = 0.4,
  maxSize = 1,
  particleColor = "#FFF",
  particleDensity = 100,
  particleOptions = {},
  ...props
}: SparklesCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  // This effect initializes the sparkles canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setLoaded(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityDirection: number;
    }[] = [];

    // Create particles
    for (let i = 0; i < particleDensity; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: size,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random(),
        opacityDirection: Math.random() > 0.5 ? 0.01 : -0.01,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDirection;

        if (p.opacity <= 0.1 || p.opacity >= 0.9) {
          p.opacityDirection *= -1;
        }

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particleColor)}, ${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxSize, minSize, particleColor, particleDensity, particleOptions]);

  // Helper function to convert hex color to rgb
  function hexToRgb(hex: string) {
    // Remove # if present
    hex = hex.replace("#", "");
    
    // Parse as RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  return (
    <div
      className={cn("fixed inset-0 w-full h-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        id={id || "sparkles-canvas"}
        className="absolute inset-0 w-full h-full translate-z-0"
      />
    </div>
  );
};

export { SparklesCore };