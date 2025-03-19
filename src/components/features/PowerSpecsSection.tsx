// components/features/PowerSpecsSection.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Battery, ZapIcon, Phone, Laptop, Watch, Tablet, Tv } from "lucide-react";

// Device charging data
interface DeviceCharge {
  name: string;
  icon: React.ReactNode;
  charges: number;
  color: string;
}

export default function PowerSpecsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"battery" | "inverter" | "comparison">("battery");
  
  // Animation for scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
  // Devices that can be charged
  const devices: DeviceCharge[] = [
    { name: "Smartphones", icon: <Phone />, charges: 25, color: "bg-blue-500" },
    { name: "Laptops", icon: <Laptop />, charges: 5, color: "bg-purple-500" },
    { name: "Smartwatches", icon: <Watch />, charges: 120, color: "bg-green-500" },
    { name: "Tablets", icon: <Tablet />, charges: 15, color: "bg-pink-500" },
    { name: "Portable Monitors", icon: <Tv />, charges: 8, color: "bg-amber-500" }
  ];
  
  // Competitor comparison data
  const competitors = [
    { name: "Roy's Smart", capacity: 100000, power: 500, price: 850, features: 5 },
    { name: "Brand X Portable Battery", capacity: 20000, power: 100, price: 150, features: 2 },
    { name: "Brand Y Power Station", capacity: 60000, power: 300, price: 700, features: 3 },
    { name: "Brand Z Travel Charger", capacity: 30000, power: 60, price: 200, features: 1 }
  ];
  
  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
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
  
  // Animated counter hook
  const AnimatedCounter = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      let start = 0;
      const end = value;
      const duration = 1500;
      const startTime = Date.now();
      
      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress === 1) {
          clearInterval(timer);
        }
      }, 20);
      
      return () => clearInterval(timer);
    }, [value, isVisible]);
    
    return <span className="font-bold">{count.toLocaleString()}</span>;
  };
  
  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y: translateY }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unmatched Power Capacity
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Never run out of power again with Roy's Smart industry-leading battery and inverter system.
          </p>
        </motion.div>
        
        {/* Tabs for Different Power Aspects */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full text-white font-medium transition-all
                ${activeTab === "battery" 
                  ? "bg-gradient-to-r from-green-600 to-green-800 shadow-md" 
                  : "bg-white/10 hover:bg-white/20"}`}
              onClick={() => setActiveTab("battery")}
            >
              Battery Specs
            </button>
            <button
              className={`px-6 py-2 rounded-full text-white font-medium transition-all
                ${activeTab === "inverter" 
                  ? "bg-gradient-to-r from-amber-600 to-amber-800 shadow-md" 
                  : "bg-white/10 hover:bg-white/20"}`}
              onClick={() => setActiveTab("inverter")}
            >
              Inverter System
            </button>
            <button
              className={`px-6 py-2 rounded-full text-white font-medium transition-all
                ${activeTab === "comparison" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 shadow-md" 
                  : "bg-white/10 hover:bg-white/20"}`}
              onClick={() => setActiveTab("comparison")}
            >
              Competitor Comparison
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {/* Battery Specs Tab */}
            {activeTab === "battery" && (
              <motion.div
                key="battery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-green-500/20">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Battery Visualization */}
                    <div className="w-full md:w-1/2">
                      <div className="relative h-80 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="absolute w-40 h-64 bg-green-900/30 rounded-lg border-2 border-green-600/50 flex flex-col items-center justify-center"
                        >
                          <Battery className="w-16 h-16 text-green-500 mb-4" />
                          
                          {/* Animated battery fill */}
                          <motion.div 
                            className="w-full h-full absolute bottom-0 bg-gradient-to-t from-green-500 to-green-300 rounded-b-[6px] opacity-30"
                            initial={{ height: "0%" }}
                            animate={{ height: isVisible ? "100%" : "0%" }}
                            transition={{ duration: 2, delay: 0.5 }}
                          />
                          
                          <div className="z-10 text-center">
                            <div className="text-4xl font-bold text-white mb-2">
                              <AnimatedCounter value={100000} />
                            </div>
                            <div className="text-lg text-green-300">mAh</div>
                          </div>
                        </motion.div>
                        
                        {/* Animated energy beams */}
                        {isVisible && devices.map((device, index) => (
                          <motion.div
                            key={index}
                            className="absolute"
                            style={{
                              left: "50%",
                              top: "50%",
                              rotate: (index * 72) + "deg"
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.2 }}
                          >
                            <motion.div
                              className={`h-1 ${device.color} rounded-full`}
                              style={{ width: "120px", transformOrigin: "left center" }}
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ 
                                scaleX: 1, 
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{ 
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 2,
                                delay: index * 0.3,
                                repeatDelay: 3
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Battery Specs & Details */}
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-bold text-white mb-4">100,000 mAh Capacity</h3>
                      <p className="text-gray-300 mb-6">
                        Our high-density lithium battery pack provides enough power to charge multiple devices for days, eliminating the need to search for power outlets.
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Charge Your Devices Multiple Times:</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {devices.map((device, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                            >
                              <div className={`p-2 rounded-full ${device.color}`}>
                                {device.icon}
                              </div>
                              <div>
                                <div className="text-white">{device.name}</div>
                                <div className="text-sm text-gray-400">
                                  Up to <span className="text-white font-semibold">{device.charges}x</span> charges
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Inverter System Tab */}
            {activeTab === "inverter" && (
              <motion.div
                key="inverter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Inverter Visualization */}
                    <div className="w-full md:w-1/2">
                      <div className="relative h-80 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="w-48 h-48 bg-amber-900/30 rounded-lg border-2 border-amber-600/50 flex items-center justify-center"
                        >
                          <ZapIcon className="w-16 h-16 text-amber-500" />
                          
                          {/* Animated electric pulses */}
                          {isVisible && (
                            <>
                              <motion.div
                                className="absolute w-full h-full rounded-lg border-2 border-amber-500"
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ 
                                  opacity: [0, 0.5, 0], 
                                  scale: [1, 1.2, 1.4]
                                }}
                                transition={{ 
                                  repeat: Infinity,
                                  duration: 2,
                                }}
                              />
                              <motion.div
                                className="absolute w-full h-full rounded-lg border-2 border-amber-500"
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ 
                                  opacity: [0, 0.5, 0], 
                                  scale: [1, 1.3, 1.6]
                                }}
                                transition={{ 
                                  repeat: Infinity,
                                  duration: 2,
                                  delay: 0.5
                                }}
                              />
                            </>
                          )}
                          
                          <div className="absolute -bottom-20 text-center">
                            <div className="text-4xl font-bold text-white mb-2">
                              <AnimatedCounter value={500} />
                            </div>
                            <div className="text-lg text-amber-300">Watts</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Inverter Specs & Details */}
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-bold text-white mb-4">500W Pure Sine Wave Inverter</h3>
                      <p className="text-gray-300 mb-6">
                        Our high-efficiency inverter converts DC battery power to AC power, allowing you to run laptops and other devices that require standard wall outlets.
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Key Inverter Features:</h4>
                        
                        <div className="space-y-3">
                          {[
                            { title: "Pure Sine Wave Output", desc: "Safe for sensitive electronics" },
                            { title: "Multiple AC Outlets", desc: "Connect several devices simultaneously" },
                            { title: "Overload Protection", desc: "Prevents damage from power surges" },
                            { title: "Low Heat Generation", desc: "Energy-efficient operation" }
                          ].map((feature, index) => (
                            <motion.div
                              key={index}
                              className="bg-white/5 rounded-lg p-4"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                            >
                              <div className="text-amber-400 font-medium">{feature.title}</div>
                              <div className="text-sm text-gray-300">{feature.desc}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Competitor Comparison Tab */}
            {activeTab === "comparison" && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">How Roy's Smart Compares</h3>
                  
                  {/* Comparison Chart */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 text-left text-gray-300 font-semibold border-b border-gray-700">Product</th>
                          <th className="py-3 px-4 text-center text-gray-300 font-semibold border-b border-gray-700">Battery Capacity (mAh)</th>
                          <th className="py-3 px-4 text-center text-gray-300 font-semibold border-b border-gray-700">Inverter Power (W)</th>
                          <th className="py-3 px-4 text-center text-gray-300 font-semibold border-b border-gray-700">Price ($)</th>
                          <th className="py-3 px-4 text-center text-gray-300 font-semibold border-b border-gray-700">Value Ratio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitors.map((competitor, index) => {
                          // Calculate value ratio (mAh per dollar)
                          const valueRatio = Math.round((competitor.capacity / competitor.price) * 10) / 10;
                          
                          // Determine if this is Roy's Smart (for highlighting)
                          const isRoysSmart = competitor.name === "Roy's Smart";
                          
                          return (
                            <motion.tr
                              key={index}
                              className={`${isRoysSmart ? 'bg-blue-900/20' : 'hover:bg-white/5'} transition-colors`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.1 }}
                              whileHover={{ scale: isRoysSmart ? 1.01 : 1 }}
                            >
                              <td className={`py-4 px-4 border-b border-gray-800 ${isRoysSmart ? 'font-bold text-blue-400' : 'text-white'}`}>
                                {competitor.name}
                                {isRoysSmart && <span className="ml-2 text-xs bg-blue-500 text-black px-2 py-0.5 rounded-full">BEST CHOICE</span>}
                              </td>
                              
                              <td className="py-4 px-4 text-center border-b border-gray-800">
                                <div className="relative">
                                  <div className="text-white">{competitor.capacity.toLocaleString()}</div>
                                  <div className="mt-1 mx-auto w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                      className={`h-full ${isRoysSmart ? 'bg-blue-500' : 'bg-gray-500'}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(competitor.capacity / 100000) * 100}%` }}
                                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                    />
                                  </div>
                                </div>
                              </td>
                              
                              <td className="py-4 px-4 text-center border-b border-gray-800">
                                <div className="relative">
                                  <div className="text-white">{competitor.power}</div>
                                  <div className="mt-1 mx-auto w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                      className={`h-full ${isRoysSmart ? 'bg-amber-500' : 'bg-gray-500'}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(competitor.power / 500) * 100}%` }}
                                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                    />
                                  </div>
                                </div>
                              </td>
                              
                              <td className="py-4 px-4 text-center border-b border-gray-800 text-white">
                                ${competitor.price}
                              </td>
                              
                              <td className="py-4 px-4 text-center border-b border-gray-800">
                                <div className={`font-bold ${isRoysSmart ? 'text-blue-400' : 'text-white'}`}>
                                  {valueRatio}
                                </div>
                                <div className="text-xs text-gray-400">mAh/$</div>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Key Advantages */}
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Why Roy's Smart Outperforms Competitors:</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: "Higher Capacity", desc: "Up to 5x more battery capacity than portable chargers" },
                        { title: "More Powerful", desc: "Run high-demand devices with our 500W inverter" },
                        { title: "Better Value", desc: "More power per dollar than any competitor" },
                        { title: "Advanced Features", desc: "Combines workspace, power, and connectivity" }
                      ].map((advantage, index) => (
                        <motion.div
                          key={index}
                          className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <div className="text-blue-400 font-medium">{advantage.title}</div>
                          <div className="text-sm text-gray-300">{advantage.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-4">
            Ready to experience unlimited power on the go?
          </p>
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-3 rounded-full text-white font-medium transition-all duration-300"
          >
            Pre-order Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}