// components/pricing/PricingHero.tsx
"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";

export default function PricingHero() {
  return (
    <div className="relative w-full min-h-[50vh] bg-black/90 overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams />

      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/10 via-black/50 to-black/80 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-[50vh] px-4 py-24 mx-auto text-center">
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
              Transparent Pricing
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
              Investment That Pays For Itself
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Premium productivity solution at a competitive price point. 
            Built with quality components for professional reliability.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-gray-200">Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-gray-200">ROI Calculator</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-gray-200">Flexible Payment Options</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}