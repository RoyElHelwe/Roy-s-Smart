// components/SolutionOverview.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Battery, Wifi, Monitor, Check, Cable, Layout } from "lucide-react";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";

// Card interface for type safety
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

// Feature Card Component
const FeatureCard = ({ title, description, icon, gradient, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full md:w-[calc(33.33%-1rem)] bg-black/20 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 ${gradient} opacity-20`}></div>
      
      {/* Sparkles effect container */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        <SparklesCore
          id={`sparkles-${title.replace(/\s/g, '')}`}
          minSize={0.4}
          maxSize={1}
          particleDensity={10}
          className="w-full h-full"
          particleColor="rgba(255, 255, 255, 0.8)"
        />
      </div>
      
      <div className="relative p-6 h-full flex flex-col">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center text-indigo-300">
            <Check className="h-4 w-4 mr-2" />
            <span className="text-sm">Problem Solved</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SolutionOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Feature data
  const features = [
    {
      title: "Power On-the-Go",
      description: "A built-in 100,000 mAh battery keeps your laptop and devices charged for hours, even in remote locations.",
      icon: <Battery className="h-6 w-6 text-white" />,
      gradient: "bg-gradient-to-br from-green-500 to-green-700",
      delay: 0.1
    },
    {
      title: "Seamless Internet",
      description: "A high-gain 4G/5G modem ensures you stay connected, even during power outages or in remote areas.",
      icon: <Wifi className="h-6 w-6 text-white" />,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
      delay: 0.2
    },
    {
      title: "Ergonomic Design",
      description: "A sleek, foldable table designed for professionals on the move, offering comfortable working posture anywhere.",
      icon: <Layout className="h-6 w-6 text-white" />,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
      delay: 0.3
    },
    {
      title: "Smart Cable Management",
      description: "Integrated cable routing and organization system ensures a clutter-free workspace, even on the go.",
      icon: <Cable className="h-6 w-6 text-white" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-500",
      delay: 0.4
    },
    {
      title: "Compact & Portable",
      description: "Folds down to a slim, lightweight package that fits easily in backpacks and luggage for ultimate portability.",
      icon: <Monitor className="h-6 w-6 text-white" />,
      gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
      delay: 0.5
    },
    {
      title: "All-in-One Solution",
      description: "Whether at home, in a café, or outdoors, Roy's Smart ensures power cuts and lost connections never disrupt your workflow.",
      icon: <Check className="h-6 w-6 text-white" />,
      gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      delay: 0.6
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black to-indigo-950"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 pt-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4"
          >
            The Solution
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
              Roy&apos;s Smart
            </span> Workstation
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            A portable, foldable workstation that ensures you never lose power or internet—wherever you are.
          </motion.p>
          
          {/* Highlight Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <div className="relative py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-16">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50 blur-sm rounded-lg"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl rounded-lg"></div>
              <div className="relative text-lg font-medium text-white">
                ✅ Say goodbye to power and connectivity problems forever!
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Feature Cards Grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-indigo-300 mb-6">
            Ready to never worry about power or connectivity issues again?
          </p>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-8 py-4 transition-all duration-300 shadow-lg shadow-indigo-500/20">
            Pre-order Roy&apos;s Smart Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}