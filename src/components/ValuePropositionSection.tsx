// components/ValuePropositionSection.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
  delay: number;
}

const Card = ({ title, description, icon, features, gradient, delay }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 50
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      className={`w-full h-full rounded-xl overflow-hidden ${gradient} p-[1px]`}
    >
      <div className="relative rounded-xl bg-black/85 backdrop-blur-sm p-6 h-full flex flex-col">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-300 text-sm mb-6">{description}</p>
        
        {/* Features List */}
        <div className="flex-grow">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-200">
                <span className="text-indigo-400 mr-2 flex-shrink-0">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </motion.div>
  );
};

// 3D Card hover effect inspired by Aceternity
const FloatingCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative group perspective-1000 h-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur group-hover:opacity-30 transition duration-1000 group-hover:duration-200 rounded-xl"></div>
      <div className="relative h-full bg-black/30 rounded-xl transition-all duration-500 
                    [transform-style:preserve-3d] group-hover:[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_scale(1.02)]"
           onMouseMove={(e) => {
             const { currentTarget: target } = e;
             const rect = target.getBoundingClientRect();
             const x = e.clientX - rect.left;
             const y = e.clientY - rect.top;
             const multiplier = 15;
             const rX = ((y - rect.height / 2) / rect.height) * -multiplier;
             const rY = ((x - rect.width / 2) / rect.width) * multiplier;
             target.style.setProperty('--rx', `${rX}deg`);
             target.style.setProperty('--ry', `${rY}deg`);
           }}
           onMouseLeave={(e) => {
             const { currentTarget: target } = e;
             target.style.setProperty('--rx', '0deg');
             target.style.setProperty('--ry', '0deg');
           }}
       >
        {children}
      </div>
    </div>
  );
};

export default function ValuePropositionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0.5]);
  
  // Value proposition data
  const valueProps = [
    {
      title: "Smart & Portable",
      description: "Designed for mobility without compromise",
      icon: "🚀",
      features: [
        "Folds easily for storage and travel",
        "Lightweight aluminum construction",
        "Setup in under 30 seconds",
        "Weighs only 2.5kg"
      ],
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
      delay: 0.1
    },
    {
      title: "Powerful & Reliable",
      description: "Never run out of power again",
      icon: "⚡",
      features: [
        "100,000mAh battery capacity",
        "500W inverter for AC power",
        "Multiple charging ports",
        "Solar charging compatible"
      ],
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      delay: 0.2
    },
    {
      title: "Connectivity-Ready",
      description: "Stay connected anywhere, anytime",
      icon: "🌐",
      features: [
        "Built-in 4G/5G high-gain modem",
        "Multi-carrier SIM compatibility",
        "Signal boosting technology",
        "Secure VPN integration"
      ],
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      delay: 0.3
    },
    {
      title: "Durable & Modular",
      description: "Built to last and adapt to your needs",
      icon: "🔧",
      features: [
        "Weatherproof construction",
        "Upgradeable components",
        "Customizable workspace layout",
        "Future-proof design"
      ],
      gradient: "bg-gradient-to-br from-orange-500 to-amber-600",
      delay: 0.4
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-indigo-950 to-black py-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
          style={{ y: y1, opacity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          style={{ y: y2, opacity }}
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4"
          >
            Why Choose Roy's Smart
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
              Value Proposition
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-4"
          >
            The only workstation that combines workspace, power, and internet in one unit!
          </motion.p>
        </div>
        
        {/* Value proposition cards - Using grid instead of flex-wrap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valueProps.map((prop, index) => (
            <FloatingCard key={index}>
              <Card {...prop} />
            </FloatingCard>
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
            Ready to experience the future of remote work?
          </p>
          <Link href="#" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-8 py-4 transition-all duration-300 shadow-lg shadow-indigo-500/20">
            Learn More About Roy's Smart
          </Link>
        </motion.div>
      </div>
    </section>
  );
}