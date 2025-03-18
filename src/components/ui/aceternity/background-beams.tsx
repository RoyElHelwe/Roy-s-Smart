// components/ui/aceternity/background-beams.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BackgroundBeamsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableAnimation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundBeams({
  disableAnimation = false,
  className,
  children,
  ...props
}: BackgroundBeamsProps) {
  const [opacity, setOpacity] = useState(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const element = ref.current;
    if (!disableAnimation && element) {
      element.addEventListener("mousemove", handleMouseMove);
      setOpacity(1);
    }

    return () => {
      if (!disableAnimation && element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [disableAnimation]);

  return (
    <div
      ref={ref}
      className={cn("h-full w-full overflow-hidden", className)}
      style={{
        position: "relative",
      }}
      {...props}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(
            600px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(100, 120, 220, 0.15),
            transparent 40%
          )`,
          opacity: opacity,
          transition: "opacity 0.5s",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(
            800px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(100, 100, 255, 0.05),
            transparent 40%
          )`,
          opacity: opacity,
          transition: "opacity 0.5s",
        }}
      />
      {children}
    </div>
  );
}