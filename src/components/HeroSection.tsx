// app/components/HeroSection.tsx
"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Battery, Wifi, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useProgress,
  Stage,
} from "@react-three/drei";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import Link from "next/link";
import { Workstation } from "./models";

// Loading component for the 3D model
function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="text-sm font-medium text-indigo-300">
          {progress.toFixed(0)}%
        </div>
        <div className="w-32 h-1 bg-indigo-900/30 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-indigo-500"
            style={{ width: `${progress}%`, transition: "width 0.2s" }}
          />
        </div>
      </div>
    </Html>
  );
}

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModelSpinning, setIsModelSpinning] = useState(true);

  return (
    <div className="relative w-full min-h-screen bg-black/90 overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams />

      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/10 via-black/50 to-black/80 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-24 mx-auto text-center">
        {/* Sparkles Effect */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-30 max-w-5xl">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-200 bg-indigo-900/30 rounded-full border border-indigo-700/50">
              Introducing the Future of Mobile Workspaces
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
              Roy&apos;s Smart
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            The Ultimate Portable & Foldable Workstation that ensures you never
            lose power or connectivity—wherever you are.
          </motion.p>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Battery className="h-5 w-5 text-green-400" />
              <span className="text-gray-200">100,000 mAh Battery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Wifi className="h-5 w-5 text-blue-400" />
              <span className="text-gray-200">4G/5G Connectivity</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Monitor className="h-5 w-5 text-purple-400" />
              <span className="text-gray-200">Ergonomic Design</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-8 py-6 transition-all duration-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/20"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Pre-order Now
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>
            <Link href="/features">
              <Button
                variant="outline"
                size="lg"
                className="font-medium rounded-full border-gray-300/20 bg-white/5 backdrop-blur-sm text-gray-100 hover:bg-white/10 px-8 py-6"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* 3D Model Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, type: "spring" }}
            className="mt-16 relative"
          >
            <div
              className="w-full h-[300px] md:h-[400px] bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-xl backdrop-blur-sm border border-indigo-500/20 overflow-hidden relative"
              onClick={() => setIsModelSpinning(!isModelSpinning)}
            >
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-white/5" />

              {/* 3D Canvas */}
              <Canvas
                shadows
                dpr={[1, 2]} // Responsive pixel ratio
                camera={{
                  position: [0, 0, 4],
                  fov: 50,
                }}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                  preserveDrawingBuffer: true, // Important for screenshots and stability
                }}
              >

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={1}
                  castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Suspense for loading state */}
                <Suspense fallback={<ModelLoader />}>
                  {/* Use Stage to simplify lighting setup for models */}
                  <Stage
                    environment="city"
                    intensity={0.5}
                    shadows={true}
                    adjustCamera={false} // Don't adjust the camera automatically
                  >
                    {/* Simple OrbitControls instead of PresentationControls */}
                    <Workstation
                      position={[0, -0.5, 0]}
                      scale={1.5}
                      autoRotate={isModelSpinning}
                      rotationSpeed={0.005}
                    />
                  </Stage>

                  {/* Orbit controls with constraints to prevent issues */}
                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 1.75}
                    minPolarAngle={Math.PI / 3}
                    makeDefault
                  />
                </Suspense>
              </Canvas>

              {/* Feature Callouts */}
              <div className="hidden md:block">
                <div className="absolute top-4 left-6 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10 text-sm text-white/80 shadow-xl">
                  <div className="font-medium">100,000 mAh Battery</div>
                  <div className="text-xs text-white/60">Power for hours</div>
                </div>

                <div className="absolute bottom-4 right-6 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10 text-sm text-white/80 shadow-xl">
                  <div className="font-medium">Foldable Design</div>
                  <div className="text-xs text-white/60">
                    Compact & portable
                  </div>
                </div>
              </div>

              {/* Model interaction hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 text-xs text-white/60">
                Drag to rotate • Click to {isModelSpinning ? "stop" : "spin"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
