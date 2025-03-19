// components/use-cases/UseCaseCalculator.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Lightbulb, Zap, Clock, Smartphone, Laptop, Monitor, Headphones, Camera, Settings, Server, Wifi } from "lucide-react";

interface DeviceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  powerConsumption: number;  // Watts
  dailyUsageHours: number;
}

interface LocationOption {
  id: string;
  name: string;
  hasPower: boolean;
  hasInternet: boolean;
  description: string;
}

interface DurationOption {
  id: string;
  name: string;
  days: number;
}

interface RecommendationResult {
  batteryNeeded: number;  // mAh
  powerCapacity: string;
  connectivityNeeded: boolean;
  workspaceNeeded: boolean;
  recommendation: string;
  suggestedAddons: string[];
}

export default function UseCaseCalculator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Form state
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("office");
  const [selectedDuration, setSelectedDuration] = useState<string>("day");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  
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
  
  // Data for options
  const deviceOptions: DeviceOption[] = [
    { id: "smartphone", name: "Smartphone", icon: <Smartphone />, powerConsumption: 5, dailyUsageHours: 8 },
    { id: "laptop", name: "Laptop", icon: <Laptop />, powerConsumption: 60, dailyUsageHours: 8 },
    { id: "tablet", name: "Tablet", icon: <Monitor />, powerConsumption: 15, dailyUsageHours: 6 },
    { id: "headphones", name: "Wireless Headphones", icon: <Headphones />, powerConsumption: 1, dailyUsageHours: 6 },
    { id: "monitor", name: "Portable Monitor", icon: <Monitor />, powerConsumption: 25, dailyUsageHours: 8 },
    { id: "camera", name: "Digital Camera", icon: <Camera />, powerConsumption: 5, dailyUsageHours: 4 },
    { id: "equipment", name: "Specialized Equipment", icon: <Settings />, powerConsumption: 80, dailyUsageHours: 4 },
    { id: "wifi", name: "Portable WiFi Router", icon: <Server />, powerConsumption: 8, dailyUsageHours: 12 }
  ];
  
  const locationOptions: LocationOption[] = [
    { 
      id: "office", 
      name: "Office or Coworking Space", 
      hasPower: true, 
      hasInternet: true,
      description: "You have access to power outlets and reliable internet, but require a backup solution."
    },
    { 
      id: "cafe", 
      name: "Cafe or Public Space", 
      hasPower: true, 
      hasInternet: false,
      description: "Limited power outlets are available, but internet connectivity may be unreliable."
    },
    { 
      id: "vehicle", 
      name: "Vehicle (Car/RV/Boat)", 
      hasPower: true, 
      hasInternet: false,
      description: "You have some power through vehicle outlets, but no stable internet connection."
    },
    { 
      id: "outdoor", 
      name: "Outdoor Urban Area", 
      hasPower: false, 
      hasInternet: false,
      description: "No power outlets, but cellular coverage is generally available."
    },
    { 
      id: "remote", 
      name: "Remote Location", 
      hasPower: false, 
      hasInternet: false,
      description: "No power outlets and limited or no cellular coverage."
    }
  ];
  
  const durationOptions: DurationOption[] = [
    { id: "day", name: "One Day", days: 1 },
    { id: "weekend", name: "Weekend (2-3 days)", days: 3 },
    { id: "week", name: "One Week", days: 7 },
    { id: "extended", name: "Extended Period (2+ weeks)", days: 14 }
  ];
  
  // Calculate recommendation based on user inputs
  const calculateRecommendation = () => {
    // Get selected options data
    const devices = deviceOptions.filter(device => selectedDevices.includes(device.id));
    const location = locationOptions.find(loc => loc.id === selectedLocation) || locationOptions[0];
    const duration = durationOptions.find(dur => dur.id === selectedDuration) || durationOptions[0];
    
    // Calculate total power consumption
    const totalPowerConsumptionPerDay = devices.reduce((sum, device) => {
      return sum + (device.powerConsumption * device.dailyUsageHours);
    }, 0);
    
    // Convert Watt-hours to mAh (approximation at 12V)
    const dailyBatteryConsumption = (totalPowerConsumptionPerDay * 1000) / 12;
    const totalBatteryNeeded = dailyBatteryConsumption * duration.days;
    
    // Determine battery capacity needed
    let powerCapacity = "Standard";
    if (totalBatteryNeeded > 80000) {
      powerCapacity = "Maximum";
    } else if (totalBatteryNeeded > 40000) {
      powerCapacity = "High";
    } else if (totalBatteryNeeded > 20000) {
      powerCapacity = "Medium";
    }
    
    // Determine connectivity needs
    const connectivityNeeded = !location.hasInternet || selectedDevices.includes("wifi");
    
    // Determine workspace needs
    const workspaceNeeded = devices.some(d => ["laptop", "tablet", "monitor", "equipment"].includes(d.id));
    
    // Generate suggestion
    let recommendation = "Roy's Smart";
    if (powerCapacity === "Maximum" && connectivityNeeded && workspaceNeeded) {
      recommendation = "Roy's Smart Professional Bundle";
    } else if (powerCapacity === "Standard" && !workspaceNeeded) {
      recommendation = "Roy's Smart Compact Edition";
    }
    
    // Suggest add-ons
    const suggestedAddons = [];
    if (location.id === "remote") {
      suggestedAddons.push("High-Gain Antenna Extension");
    }
    if (selectedDevices.includes("equipment") || powerCapacity === "Maximum") {
      suggestedAddons.push("Additional Battery Pack");
    }
    if (duration.id === "extended") {
      suggestedAddons.push("Solar Charging Panel");
    }
    if (selectedDevices.includes("monitor") && workspaceNeeded) {
      suggestedAddons.push("Adjustable Monitor Mount");
    }
    
    return {
      batteryNeeded: Math.round(totalBatteryNeeded),
      powerCapacity,
      connectivityNeeded,
      workspaceNeeded,
      recommendation,
      suggestedAddons
    };
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recommendation = calculateRecommendation();
    setResult(recommendation);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById("calculator-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };
  
  // Toggle device selection
  const toggleDevice = (deviceId: string) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
    } else {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
    
    // Reset results when changing inputs
    setShowResults(false);
  };
  
  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your Ideal Setup
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Answer a few questions about your needs, and we'll recommend the perfect Roy's Smart configuration for you.
          </p>
        </motion.div>
        
        {/* Calculator Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Devices Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  1. Which devices do you need to power?
                </h3>
                <p className="text-gray-400 mb-4">
                  Select all the devices you'll need to use with your Roy's Smart workstation.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {deviceOptions.map((device) => (
                    <motion.button
                      key={device.id}
                      type="button"
                      className={`flex flex-col items-center p-4 rounded-xl border transition-all
                        ${selectedDevices.includes(device.id)
                          ? "bg-indigo-900/40 border-indigo-500 text-white"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      onClick={() => toggleDevice(device.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className={`p-3 rounded-full mb-2 ${
                        selectedDevices.includes(device.id) 
                          ? "bg-indigo-500" 
                          : "bg-gray-700"
                      }`}>
                        {device.icon}
                      </div>
                      <span className="text-sm text-center">{device.name}</span>
                      {selectedDevices.includes(device.id) && (
                        <div className="absolute top-2 right-2 text-green-500">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
                
                {selectedDevices.length === 0 && (
                  <p className="text-amber-500 text-sm mt-2">
                    Please select at least one device.
                  </p>
                )}
              </div>
              
              {/* Location Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  2. Where will you primarily use your workstation?
                </h3>
                <p className="text-gray-400 mb-4">
                  Choose the environment that best matches your working conditions.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationOptions.map((location) => (
                    <motion.button
                      key={location.id}
                      type="button"
                      className={`flex items-start p-4 rounded-xl border text-left transition-all
                        ${selectedLocation === location.id
                          ? "bg-indigo-900/40 border-indigo-500 text-white"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      onClick={() => {
                        setSelectedLocation(location.id);
                        setShowResults(false);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex-grow">
                        <div className="font-medium mb-1">{location.name}</div>
                        <div className="text-sm text-gray-400">{location.description}</div>
                        
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center text-xs">
                            <div className={`h-2 w-2 rounded-full mr-1 ${location.hasPower ? "bg-green-500" : "bg-red-500"}`}></div>
                            Power
                          </div>
                          <div className="flex items-center text-xs">
                            <div className={`h-2 w-2 rounded-full mr-1 ${location.hasInternet ? "bg-green-500" : "bg-red-500"}`}></div>
                            Internet
                          </div>
                        </div>
                      </div>
                      
                      {selectedLocation === location.id && (
                        <div className="text-green-500 flex-shrink-0 ml-2">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Duration Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  3. How long do you need to work without access to power?
                </h3>
                <p className="text-gray-400 mb-4">
                  Select the typical duration you need to operate without recharging.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {durationOptions.map((duration) => (
                    <motion.button
                      key={duration.id}
                      type="button"
                      className={`p-4 rounded-xl border transition-all
                        ${selectedDuration === duration.id
                          ? "bg-indigo-900/40 border-indigo-500 text-white"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      onClick={() => {
                        setSelectedDuration(duration.id);
                        setShowResults(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex flex-col items-center">
                        <Clock className="h-6 w-6 mb-2" />
                        <div className="font-medium text-center">{duration.name}</div>
                        <div className="text-sm text-center text-gray-400">{duration.days} {duration.days > 1 ? "days" : "day"}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="text-center">
                <motion.button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedDevices.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                  transition={{ delay: 0.4 }}
                >
                  Get My Recommendation
                </motion.button>
              </div>
            </form>
          </div>
          
          {/* Results Section */}
          {showResults && result && (
            <motion.div
              id="calculator-results"
              className="mt-16 bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-indigo-500/20 rounded-full mb-4">
                  <Lightbulb className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Your Personalized Recommendation
                </h3>
                <p className="text-gray-300">
                  Based on your needs, here's the ideal Roy's Smart setup for you.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Power Requirements */}
                <div className="bg-gradient-to-br from-indigo-900/20 to-indigo-900/5 p-5 rounded-xl border border-indigo-500/30">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-indigo-500/20 rounded-full mr-3">
                      <Zap className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Power Needs</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-3">
                    Your devices require approximately:
                  </p>
                  
                  <div className="text-3xl font-bold text-white mb-2">
                    {result.batteryNeeded.toLocaleString()} mAh
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    Power Capacity Level: <span className="text-indigo-400 font-medium">{result.powerCapacity}</span>
                  </div>
                </div>
                
                {/* Connectivity Requirements */}
                <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 p-5 rounded-xl border border-blue-500/30">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-full mr-3">
                      <Wifi className="h-5 w-5 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Connectivity</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-3">
                    Based on your location:
                  </p>
                  
                  <div className="text-xl font-bold text-white mb-2">
                    {result.connectivityNeeded ? "Connectivity Required" : "Standard Connectivity"}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {result.connectivityNeeded 
                      ? "You need the advanced connectivity features for reliable internet access."
                      : "Basic connectivity features will be sufficient for your needs."
                    }
                  </div>
                </div>
                
                {/* Workspace Requirements */}
                <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 p-5 rounded-xl border border-purple-500/30">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-full mr-3">
                      <Laptop className="h-5 w-5 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Workspace</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-3">
                    Your ergonomic needs:
                  </p>
                  
                  <div className="text-xl font-bold text-white mb-2">
                    {result.workspaceNeeded ? "Full Workspace Required" : "Minimal Workspace"}
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {result.workspaceNeeded 
                      ? "You'll benefit from the full ergonomic workspace features."
                      : "You can use a compact setup for your selected devices."
                    }
                  </div>
                </div>
              </div>
              
              {/* Recommendation */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/30 mb-8">
                <h4 className="text-xl font-bold text-white mb-4">
                  We Recommend: {result.recommendation}
                </h4>
                
                <p className="text-gray-300 mb-6">
                  This configuration will provide optimal power, connectivity, and workspace features for your specific needs.
                </p>
                
                {/* Suggested Add-ons */}
                {result.suggestedAddons.length > 0 && (
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-3">
                      Recommended Add-ons:
                    </h5>
                    
                    <ul className="space-y-2">
                      {result.suggestedAddons.map((addon, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (index * 0.1) }}
                        >
                          <div className="text-green-500 mr-2">✓</div>
                          <span className="text-gray-300">{addon}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="#" 
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300"
                >
                  Pre-order This Configuration
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300"
                >
                  Talk to a Specialist
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}