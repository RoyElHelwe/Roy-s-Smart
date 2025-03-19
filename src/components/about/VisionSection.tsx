// components/about/VisionSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { Lightbulb, ArrowRight, Globe, Zap, Shield, Sparkles } from "lucide-react";

interface FutureProduct {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Parallax effect for different layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
  
  // Future product ideas
  const futureProducts: FutureProduct[] = [
    {
      id: "modular",
      name: "Roy's Smart Modular",
      description: "Customizable components that allow users to build their perfect workstation based on their specific needs—from extra battery capacity to specialized connectivity options.",
      icon: <Lightbulb />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "enterprise",
      name: "Roy's Smart Enterprise",
      description: "Advanced security features and management tools designed for business deployments, with fleet management capabilities and corporate VPN integration.",
      icon: <Shield />,
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "global",
      name: "Roy's Smart Global",
      description: "Enhanced connectivity with multi-band support for international travelers, satellite connectivity options, and global power compatibility.",
      icon: <Globe />,
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: "solar",
      name: "Roy's Smart Solar",
      description: "Integrated solar charging capabilities with high-efficiency panels that fold out from the workstation for sustainable power generation anywhere.",
      icon: <Zap />,
      color: "from-amber-500 to-yellow-600"
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-black"
    >
      {/* Parallax background layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-black opacity-50"
        style={{ y: layer1Y }}
      />
      
      <motion.div
        className="absolute w-full h-full opacity-10"
        style={{ y: layer2Y }}
      >
        <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-60 h-60 rounded-full bg-indigo-500 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-purple-500 blur-3xl"></div>
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          style={{ y: layer3Y }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4">
            Future Roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">Vision</span> For The Future
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <TextGenerateEffect 
              words="Creating innovative solutions that empower professionals to work efficiently from anywhere, without limitations." 
              className="text-xl text-gray-300"
            />
          </div>
        </motion.div>
        
        {/* Vision statement */}
        <motion.div
          className="relative mb-20 bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Background glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl rounded-2xl"></div>
          
          <div className="relative">
            <Sparkles className="h-8 w-8 text-indigo-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                At Roy's Smart, we're not just building another gadget—we're reimagining what it means to work remotely. Our mission is to eliminate the technological barriers that limit where and how professionals can work.
              </p>
              <p>
                We believe that connectivity and power should never be the limiting factors in productivity or creativity. That's why we're dedicated to creating integrated solutions that provide freedom, reliability, and peace of mind for professionals on the move.
              </p>
              <p>
                As we grow, we'll continue to push the boundaries of portable workstation technology, always with our core values in mind: innovation, quality, and user-centered design.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Future products grid */}
      
        
        {/* Forward-looking statement */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 italic">
            "We're building more than just a product—we're creating a new category of professional tools that will transform how and where people work in the digital age."
          </p>
          <p className="mt-2 text-indigo-400 font-medium">- Raed El Helwe, Founder</p>
        </motion.div>
      </div>
    </section>
  );
}