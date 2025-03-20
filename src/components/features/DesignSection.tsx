// components/features/DesignSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CornerRightDown, Move, Minimize2, Ruler, Weight, PenTool, Activity } from "lucide-react";

interface DesignFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function DesignSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  
  // Animation for scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
  // Animation folding state on interval
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setIsFolded(prev => !prev);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  
  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Design features data
  const features: DesignFeature[] = [
    {
      title: "Foldable Design",
      description: "Compact folding mechanism allows the workstation to collapse down to just 5 cm thick, perfect for storage and travel.",
      icon: <Minimize2 />,
      color: "bg-blue-500"
    },
    {
      title: "Lightweight Construction",
      description: "Made from aerospace-grade aluminum alloy, weighing only 2.5 kg while maintaining exceptional durability.",
      icon: <Weight />,
      color: "bg-green-500"
    },
    {
      title: "Adjustable Height",
      description: "Multiple height settings allow for ergonomic positioning whether you're sitting or standing.",
      icon: <Move />,
      color: "bg-purple-500"
    },
    {
      title: "Modular Components",
      description: "Detachable modules let you customize the workstation to your specific needs and upgrade individual parts.",
      icon: <PenTool />,
      color: "bg-amber-500"
    },
    {
      title: "Weather Resistant",
      description: "IP65-rated materials protect your electronics from rain, dust, and extreme temperatures.",
      icon: <Activity />,
      color: "bg-pink-500"
    },
    {
      title: "Precision Engineering",
      description: "Designed with tight tolerances and premium materials for smooth operation and long-term reliability.",
      icon: <Ruler />,
      color: "bg-indigo-500"
    }
  ];
  
  // Product dimensions and specifications
  const specifications = [
    { label: "Unfolded Dimensions", value: "100 cm × 60 cm × 75 cm" },
    { label: "Folded Dimensions", value: "50 cm × 60 cm × 15 cm" },
    { label: "Weight", value: "8 kg" },
    { label: "Maximum Load", value: "20 kg" },
    { label: "Materials", value: "Aluminum, Carbon Fiber, ABS Plastic" },
    { label: "Weather Rating", value: "IP65" }
  ];
  
  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y: translateY }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ergonomic & Portable Design
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Engineered for maximum portability without compromising on functionality or durability.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Folding Animation */}
          <div className="w-full lg:w-1/2">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 h-[500px] relative border border-purple-500/20 flex items-center justify-center overflow-hidden">
              {/* Folding Animation Container */}
              <div className="perspective-1000 relative w-[60%] h-[60%]">
                {/* Base/Bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[10%] bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-md border border-purple-500/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                
                {/* Table Surface */}
                <motion.div
                  className="absolute bottom-[10%] left-0 w-full h-[5%] bg-gradient-to-r from-purple-800/70 to-indigo-800/70 rounded-sm border border-purple-400/40 origin-bottom"
                  initial={{ rotateX: 0, opacity: 0 }}
                  animate={{ 
                    rotateX: isFolded ? -90 : 0,
                    opacity: isVisible ? 1 : 0
                  }}
                  transition={{ 
                    rotateX: { 
                      duration: 1.5,
                      ease: "easeInOut"
                    },
                    opacity: { duration: 0.5, delay: 0.3 }
                  }}
                >
                  {/* Device Display */}
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[150%] w-[70%] h-[200%] bg-gradient-to-t from-indigo-900/60 to-indigo-700/60 rounded-sm border border-indigo-400/30 origin-bottom"
                    // animate={{ 
                    //   rotateX: isFolded ? 90 : 0, 
                    //   opacity: isVisible ? 1 : 0
                    // }}
                    transition={{ 
                      rotateX: { 
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {/* Screen */}
                    <div className="absolute inset-[10%] bg-blue-500/20 rounded-sm border border-blue-500/30" />
                  </motion.div>
                  
                  {/* Power Module */}
                  <motion.div
                    className="absolute top-0 left-[15%] transform -translate-y-[100%] w-[25%] h-[150%] bg-gradient-to-t from-green-900/60 to-green-700/60 rounded-sm border border-green-400/30 origin-bottom"
                    // animate={{ 
                    //   rotateX: isFolded ? 180 : 0,
                    //   opacity: isVisible ? 1 : 0 
                    // }}
                    transition={{ 
                      rotateX: { 
                        duration: 1.5,
                        ease: "easeInOut"
                      }
                    }}
                  />
                </motion.div>
                
                {/* Fold/Unfold Button */}
                <button
                  className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                  onClick={() => setIsFolded(prev => !prev)}
                >
                  <CornerRightDown className="h-3 w-3" />
                  {isFolded ? "Unfold" : "Fold"}
                </button>
                
                {/* Dimensions Indicators */}
                {!isFolded && (
                  <>
                    <motion.div
                      className="absolute bottom-[15%] left-0 w-full border-b border-dashed border-white/30 flex justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isVisible ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <span className="bg-black/50 text-white/70 px-1 text-xs -mb-1.5">100 cm</span>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-[15%] left-0 h-[85%] border-l border-dashed border-white/30 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isVisible ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <span className="bg-black/50 text-white/70 px-1 text-xs -ml-1.5 rotate-90">75 cm</span>
                    </motion.div>
                  </>
                )}
                
                {isFolded && (
                  <>
                    <motion.div
                      className="absolute bottom-[15%] left-0 w-full border-b border-dashed border-white/30 flex justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isVisible ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <span className="bg-black/50 text-white/70 px-1 text-xs -mb-1.5">50 cm</span>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-[15%] left-0 h-[20%] border-l border-dashed border-white/30 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isVisible ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <span className="bg-black/50 text-white/70 px-1 text-xs -ml-1.5 rotate-90">15 cm</span>
                    </motion.div>
                  </>
                )}
                
                {/* State Label */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[20px] text-sm font-medium text-white">
                  {isFolded ? "Folded State" : "Unfolded State"}
                </div>
              </div>
              
              {/* Animation Label */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
                Watch the animation or click the button to see folding in action
              </div>
            </div>
          </div>
          
          {/* Design Features */}
          <div className="w-full lg:w-1/2">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 h-full border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Design Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`group relative rounded-xl border border-white/10 p-5 transition-all duration-300 overflow-hidden ${
                      hoveredFeature === feature.title ? 'ring-2 ring-purple-500/50 scale-[1.02]' : 'hover:border-white/20'
                    }`}
                    onMouseEnter={() => setHoveredFeature(feature.title)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    {/* Gradient background that follows mouse */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${feature.color}`}
                      style={{
                        backgroundImage: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)"
                      }}
                      onMouseMove={(e) => {
                        if (e.currentTarget) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          e.currentTarget.style.setProperty("--x", `${x}%`);
                          e.currentTarget.style.setProperty("--y", `${y}%`);
                        }
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className={`p-2 rounded-full ${feature.color} inline-block mb-3`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Specifications */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Technical Specifications</h3>
                
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex flex-col">
                        <dt className="text-sm text-gray-400">{spec.label}</dt>
                        <dd className="text-white font-medium">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Materials Showcase */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Premium Materials</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Aerospace Aluminum",
                description: "Lightweight yet incredibly strong, our aluminum frame provides the perfect foundation.",
                color: "bg-gradient-to-br from-gray-600 to-gray-800"
              },
              {
                name: "Carbon Fiber Composites",
                description: "Used in key structural areas to maximize strength while minimizing weight.",
                color: "bg-gradient-to-br from-gray-800 to-black"
              },
              {
                name: "Premium ABS Polymer",
                description: "High-impact resistant polymer protects sensitive electronics and connection points.",
                color: "bg-gradient-to-br from-indigo-800 to-indigo-950"
              }
            ].map((material, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border border-white/10 ${material.color}`}
              >
                <h4 className="text-lg font-semibold text-white mb-2">{material.name}</h4>
                <p className="text-sm text-gray-300">{material.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
            Experience the perfect blend of form and function with Roy&apos;s Smart workstation. Designed to go anywhere, built to last.
          </p>
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-3 rounded-full text-white font-medium transition-all duration-300"
          >
            View Detailed Specifications
          </a>
        </motion.div>
      </div>
    </section>
  );
}