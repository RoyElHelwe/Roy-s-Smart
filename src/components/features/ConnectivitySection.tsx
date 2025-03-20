// components/features/ConnectivitySection.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wifi, Signal, Globe, Shield, Satellite, SignalHigh } from "lucide-react";

export default function ConnectivitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>("urban");
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation for scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
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
  
  // Location data with connectivity details
  const locations = [
    {
      id: "urban",
      name: "Urban Areas",
      description: "Excellent connectivity with 5G speeds up to 1Gbps. Perfect for video calls, streaming, and large file transfers.",
      signalStrength: 5,
      xPos: "20%",
      yPos: "40%",
      color: "bg-blue-500"
    },
    {
      id: "suburban",
      name: "Suburban Areas",
      description: "Strong 4G/5G connectivity with speeds up to 500Mbps. Reliable for all online activities including video conferencing.",
      signalStrength: 4,
      xPos: "40%",
      yPos: "60%",
      color: "bg-green-500"
    },
    {
      id: "rural",
      name: "Rural Areas",
      description: "Enhanced 4G connectivity with speeds up to 100Mbps. Our high-gain antenna ensures connection where others fail.",
      signalStrength: 3,
      xPos: "70%",
      yPos: "45%",
      color: "bg-amber-500"
    },
    {
      id: "remote",
      name: "Remote Locations",
      description: "Maintains 4G connectivity in challenging areas. Signal boosting technology enables video calls and web browsing.",
      signalStrength: 2,
      xPos: "60%",
      yPos: "20%",
      color: "bg-orange-500"
    },
    {
      id: "wilderness",
      name: "Wilderness",
      description: "Capable of finding signal in extreme locations. Our advanced antenna can connect where standard devices cannot.",
      signalStrength: 1,
      xPos: "85%",
      yPos: "70%",
      color: "bg-red-500"
    }
  ];
  
  // Get active location
  const getActiveLocation = () => {
    return locations.find(location => location.id === activeLocation);
  };
  
  // Signal bars component
  const SignalBars = ({ strength }: { strength: number }) => {
    return (
      <div className="flex h-5 items-end gap-0.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            className={`w-1.5 rounded-sm ${level <= strength ? 'bg-blue-500' : 'bg-gray-600'}`}
            initial={{ height: 0 }}
            animate={{ height: `${level * 4}px` }}
            transition={{ duration: 0.4, delay: level * 0.1 }}
          />
        ))}
      </div>
    );
  };
  
  return (
    <section ref={containerRef} className="py-24 relative bg-gradient-to-b from-indigo-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y: translateY }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Connectivity Everywhere
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Never lose your internet connection with Roy&apos;s Smart built-in high-gain 4G/5G modem.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Interactive Map */}
          <div className="w-full lg:w-3/5">
            <div className="relative bg-indigo-900/20 rounded-2xl p-4 h-[400px] overflow-hidden border border-indigo-500/20">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0.5">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/5 rounded-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isVisible ? [0.1, 0.3, 0.1] : 0 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i % 10 * 0.1,
                      }}
                    />
                  ))}
                </div>
                
                {/* Map Features */}
                <div className="absolute inset-0">
                  {/* Topography Lines */}
                  <svg width="100%" height="100%" className="opacity-20">
                    <defs>
                      <pattern id="topography" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#topography)" />
                  </svg>
                  
                  {/* Coverage Areas */}
                  {locations.map((location) => (
                    <motion.div
                      key={location.id}
                      className={`absolute rounded-full ${location.color} opacity-20`}
                      style={{
                        left: location.xPos,
                        top: location.yPos,
                        width: '120px',
                        height: '120px',
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: isVisible ? [1, 1.1, 1] : 0,
                        opacity: activeLocation === location.id ? 0.4 : 0.2
                      }}
                      transition={{
                        scale: {
                          duration: 4,
                          repeat: Infinity,
                        },
                        opacity: {
                          duration: 0.5
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Location Markers */}
              {locations.map((location) => (
                <motion.button
                  key={location.id}
                  className={`absolute z-10 rounded-full ${
                    activeLocation === location.id ? location.color : 'bg-white/20'
                  } p-2 cursor-pointer`}
                  style={{
                    left: location.xPos,
                    top: location.yPos,
                    transform: 'translate(-50%, -50%)',
                  }}
                  // whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveLocation(location.id)}
                  // initial={{ scale: 0 }}
                  // animate={{ 
                  //   scale: 1,
                  //   boxShadow: activeLocation === location.id 
                  //     ? '0 0 0 4px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.5)' 
                  //     : '0 0 0 0px rgba(255,255,255,0)'
                  // }}
                  // transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <SignalHigh className="h-4 w-4 text-white" />
                  
                  {/* Signal Rings Animation */}
                  {activeLocation === location.id && (
                    <>
                      <motion.span
                        className={`absolute inset-0 rounded-full ${location.color} opacity-75`}
                        // animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        // transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <motion.span
                        className={`absolute inset-0 rounded-full ${location.color} opacity-75`}
                        // animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        // transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </>
                  )}
                </motion.button>
              ))}
              
              {/* Location Names */}
              {locations.map((location) => (
                <motion.div
                  key={`label-${location.id}`}
                  className="absolute text-xs font-medium"
                  style={{
                    left: location.xPos,
                    top: location.yPos,
                    transform: 'translate(-50%, calc(-50% - 20px))',
                  }}
                  // initial={{ opacity: 0 }}
                  // animate={{ 
                  //   opacity: activeLocation === location.id ? 1 : 0.6
                  // }}
                  // transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`${activeLocation === location.id ? 'text-white' : 'text-gray-400'} 
                    px-2 py-0.5 rounded-full ${activeLocation === location.id ? `bg-${location.color.replace('bg-', '')}/30` : 'bg-black/30'}`}
                  >
                    {location.name}
                  </div>
                </motion.div>
              ))}
              
              {/* Map Legend */}
              <div className="absolute bottom-3 left-3 z-10 bg-black/40 backdrop-blur-sm rounded-lg p-2 text-xs">
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-end gap-0.5 h-4">
                    <div className="w-1 h-4 bg-blue-500 rounded-sm"></div>
                    <div className="w-1 h-3 bg-blue-500 rounded-sm"></div>
                    <div className="w-1 h-2 bg-blue-500 rounded-sm"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-sm"></div>
                  </div>
                  <span>Signal Strength</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location Details */}
          <div className="w-full lg:w-2/5">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 h-full border border-indigo-500/20">
              {activeLocation && (
                <motion.div
                  key={activeLocation}
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // exit={{ opacity: 0, y: -20 }}
                  // transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-full ${getActiveLocation()?.color}`}>
                      <Wifi className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{getActiveLocation()?.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400 text-sm">Signal Strength:</span>
                        <SignalBars strength={getActiveLocation()?.signalStrength || 0} />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {getActiveLocation()?.description}
                  </p>
                  
                  {/* Coverage Features */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Connectivity Features:</h4>
                    
                    <div className="space-y-3">
                      {[
                        {
                          icon: <Globe className="h-4 w-4" />,
                          title: "Multi-Carrier Support",
                          desc: "Automatically connects to the strongest available network"
                        },
                        {
                          icon: <Shield className="h-4 w-4" />,
                          title: "Secure VPN Integration",
                          desc: "Built-in security for sensitive work on public networks"
                        },
                        {
                          icon: <Satellite className="h-4 w-4" />,
                          title: "High-Gain Antenna",
                          desc: "Captures signals that standard devices miss"
                        },
                        {
                          icon: <Signal className="h-4 w-4" />,
                          title: "Signal Boosting Technology",
                          desc: "Amplifies weak signals in challenging environments"
                        }
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex gap-3 bg-white/5 p-3 rounded-lg"
                          // initial={{ opacity: 0, x: -20 }}
                          // animate={{ opacity: 1, x: 0 }}
                          // transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <div className="text-blue-400 mt-0.5">
                            {feature.icon}
                          </div>
                          <div>
                            <div className="text-white font-medium">{feature.title}</div>
                            <div className="text-sm text-gray-400">{feature.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Speed Comparison Table */}
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          // transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Speed Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-300 font-semibold">Network Type</th>
                  <th className="py-3 px-4 text-center text-gray-300 font-semibold">Download Speed</th>
                  <th className="py-3 px-4 text-center text-gray-300 font-semibold">Upload Speed</th>
                  <th className="py-3 px-4 text-center text-gray-300 font-semibold">Latency</th>
                  <th className="py-3 px-4 text-center text-gray-300 font-semibold">Ideal For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "5G",
                    download: "Up to 1 Gbps",
                    upload: "Up to 150 Mbps",
                    latency: "< 10ms",
                    idealFor: "Video streaming, large file transfers, online gaming",
                    color: "blue"
                  },
                  {
                    type: "4G LTE",
                    download: "25-150 Mbps",
                    upload: "10-50 Mbps",
                    latency: "20-40ms",
                    idealFor: "Video calls, web browsing, cloud applications",
                    color: "green"
                  },
                  {
                    type: "4G",
                    download: "5-25 Mbps",
                    upload: "2-10 Mbps",
                    latency: "40-60ms",
                    idealFor: "Email, social media, audio streaming",
                    color: "amber"
                  },
                  {
                    type: "Enhanced 3G",
                    download: "1-5 Mbps",
                    upload: "0.5-2 Mbps",
                    latency: "100-150ms",
                    idealFor: "Basic web browsing, messaging apps",
                    color: "orange"
                  }
                ].map((network, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-white/5"
                    // initial={{ opacity: 0, y: 10 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <td className="py-3 px-4 text-white font-medium">
                      <div className={`inline-block w-2 h-2 rounded-full bg-${network.color}-500 mr-2`}></div>
                      {network.type}
                    </td>
                    <td className="py-3 px-4 text-center text-white">{network.download}</td>
                    <td className="py-3 px-4 text-center text-white">{network.upload}</td>
                    <td className="py-3 px-4 text-center text-white">{network.latency}</td>
                    <td className="py-3 px-4 text-center text-gray-300 text-sm">{network.idealFor}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              * Actual speeds may vary based on network congestion, distance from tower, and physical obstructions.
              Roy&apos;s Smart optimizes for the best available connection in any environment.
            </p>
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          // transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-full text-white font-medium transition-all duration-300"
          >
            Never lose connectivity again
          </a>
        </motion.div>
      </div>
    </section>
  );
}