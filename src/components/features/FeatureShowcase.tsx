// components/features/FeatureShowcase.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Battery, 
  Wifi, 
  Monitor, 
  Cable, 
  Usb, 
  ZapIcon,
  LayoutDashboard
} from "lucide-react";

interface FeaturePoint {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: string; y: string };
  color: string;
}

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Feature points data
  const featurePoints: FeaturePoint[] = [
    {
      id: "battery",
      title: "100,000 mAh Battery",
      description: "A powerhouse battery that keeps your devices running for days. Power laptops, phones, and other devices simultaneously.",
      icon: <Battery className="h-5 w-5" />,
      position: { x: "20%", y: "40%" },
      color: "bg-green-500"
    },
    {
      id: "connectivity",
      title: "4G/5G Connectivity",
      description: "Built-in high-gain modem ensures you stay connected to the internet wherever you go, even in remote locations.",
      icon: <Wifi className="h-5 w-5" />,
      position: { x: "80%", y: "30%" },
      color: "bg-blue-500"
    },
    {
      id: "workstation",
      title: "Ergonomic Design",
      description: "Adjustable height and angle for optimal viewing and typing position. Designed to prevent strain during long work sessions.",
      icon: <Monitor className="h-5 w-5" />,
      position: { x: "60%", y: "60%" },
      color: "bg-purple-500"
    },
    {
      id: "cable-management",
      title: "Smart Cable Management",
      description: "Integrated cable routing system keeps your workspace organized and free from tangled wires.",
      icon: <Cable className="h-5 w-5" />,
      position: { x: "30%", y: "70%" },
      color: "bg-orange-500"
    },
    {
      id: "ports",
      title: "Multiple Ports",
      description: "USB-C, USB-A, and standard AC outlet accommodate all your devices without the need for additional adapters.",
      icon: <Usb className="h-5 w-5" />,
      position: { x: "75%", y: "80%" },
      color: "bg-indigo-500"
    },
    {
      id: "inverter",
      title: "500W Inverter",
      description: "Powers laptops and other devices that require AC power, eliminating the need for multiple power solutions.",
      icon: <ZapIcon className="h-5 w-5" />,
      position: { x: "40%", y: "25%" },
      color: "bg-amber-500"
    },
    {
      id: "foldable",
      title: "Foldable Structure",
      description: "Compact folding design makes it easy to transport and store when not in use.",
      icon: <LayoutDashboard className="h-5 w-5" />,
      position: { x: "10%", y: "60%" },
      color: "bg-pink-500"
    }
  ];
  
  // Get active feature details
  const getActiveFeature = () => {
    return featurePoints.find(point => point.id === activeFeature);
  };
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Interactive Product Overview</h2>
          <p className="text-gray-300 mt-2">Click on the highlighted points to explore Roy's Smart features</p>
        </div>
        
        <div 
          ref={containerRef} 
          className="relative aspect-[16/9] max-h-[600px] mx-auto bg-gradient-to-b from-indigo-900/30 to-black/50 rounded-xl overflow-hidden border border-indigo-500/20 shadow-xl"
        >
          {/* Product Visualization Area */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            {/* Placeholder for product visualization - replace with real product image or model */}
            <div className="w-[70%] h-[60%] bg-gradient-to-r from-indigo-800/20 via-purple-700/20 to-indigo-600/20 rounded-lg">
              <div className="w-full h-full backdrop-blur-sm flex items-center justify-center">
                <p className="text-white/50 text-lg font-medium">Roy's Smart Workstation</p>
              </div>
            </div>
          </div>
          
          {/* Feature Points */}
          {featurePoints.map((point) => (
            <motion.button
              key={point.id}
              className={`absolute z-10 w-6 h-6 rounded-full ${point.color} flex items-center justify-center ${activeFeature === point.id ? 'ring-4 ring-white' : ''}`}
              style={{ 
                left: point.position.x, 
                top: point.position.y 
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActiveFeature(point.id)}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                boxShadow: activeFeature === point.id 
                  ? '0 0 0 4px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.5)' 
                  : '0 0 0 0px rgba(255,255,255,0)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {point.icon}
              
              {/* Ripple effect when point is active */}
              {activeFeature === point.id && (
                <>
                  <motion.span
                    className={`absolute inline-flex h-full w-full rounded-full ${point.color} opacity-75`}
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <motion.span
                    className={`absolute inline-flex h-full w-full rounded-full ${point.color} opacity-75`}
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </>
              )}
            </motion.button>
          ))}
          
          {/* Feature Detail Popup */}
          <AnimatePresence>
            {activeFeature && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 max-w-lg w-full bg-black/70 backdrop-blur-md rounded-lg p-6 border border-white/10 shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getActiveFeature()?.color}`}>
                    {getActiveFeature()?.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{getActiveFeature()?.title}</h3>
                    <p className="text-gray-300 mt-1">{getActiveFeature()?.description}</p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => setActiveFeature(null)}
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Feature Selection List (mobile-friendly alternative) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {featurePoints.map((point) => (
            <motion.button
              key={point.id}
              className={`text-left p-4 rounded-lg border ${activeFeature === point.id 
                ? `border-${point.color.replace('bg-', '')}/50 bg-${point.color.replace('bg-', '')}/10` 
                : 'border-white/10 bg-white/5'} 
                transition-all hover:bg-white/10`}
              onClick={() => setActiveFeature(point.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${point.color}`}>
                  {point.icon}
                </div>
                <span className="font-medium text-white">{point.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}