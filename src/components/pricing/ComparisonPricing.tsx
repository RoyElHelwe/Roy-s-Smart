// components/pricing/ComparisonPricing.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Battery, 
  Zap, 
  Wifi, 
  LayoutDashboard, 
  Pickaxe,
  Check,
  X,
  InfoIcon,
  DollarSign,
  Settings
} from "lucide-react";

interface Feature {
  id: string;
  name: string;
  icon: React.ReactNode;
  roySmart: boolean;
  diyPossible: boolean;
  diyDifficulty: number; // 1-5 scale
  diyCost: number[];     // Range of possible costs
}

interface ComparisonOption {
  id: string;
  name: string;
  description: string;
  price: number;
  pros: string[];
  cons: string[];
}

export default function ComparisonPricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // DIY Configuration state
  const [qualityLevel, setQualityLevel] = useState<number>(3); // 1-5 scale
  const [timeValue, setTimeValue] = useState<number>(50); // $ per hour
  const [skillLevel, setSkillLevel] = useState<number>(3); // 1-5 scale
  
  // Tooltip state
  const [tooltip, setTooltip] = useState<{ visible: boolean, text: string, x: number, y: number }>({
    visible: false,
    text: "",
    x: 0,
    y: 0
  });
  
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
  
  // Product features data
  const features: Feature[] = [
    {
      id: "battery",
      name: "100,000 mAh Battery",
      icon: <Battery />,
      roySmart: true,
      diyPossible: true,
      diyDifficulty: 4,
      diyCost: [150, 300]
    },
    {
      id: "inverter",
      name: "500W Pure Sine Inverter",
      icon: <Zap />,
      roySmart: true,
      diyPossible: true,
      diyDifficulty: 3,
      diyCost: [70, 150]
    },
    {
      id: "connectivity",
      name: "4G/5G Connectivity",
      icon: <Wifi />,
      roySmart: true,
      diyPossible: true,
      diyDifficulty: 5,
      diyCost: [80, 200]
    },
    {
      id: "workspace",
      name: "Foldable Workspace",
      icon: <LayoutDashboard />,
      roySmart: true,
      diyPossible: true,
      diyDifficulty: 4,
      diyCost: [100, 250]
    },
    {
      id: "cableManagement",
      name: "Cable Management",
      icon: <Zap />,
      roySmart: true,
      diyPossible: true,
      diyDifficulty: 2,
      diyCost: [30, 80]
    },
    {
      id: "weatherResistant",
      name: "Weather Resistant",
      icon: <Zap />,
      roySmart: true,
      diyPossible: true,
      diyDifficulty: 4,
      diyCost: [50, 150]
    },
    {
      id: "integration",
      name: "Integrated System",
      icon: <Settings />,
      roySmart: true,
      diyPossible: true,
      diyDifficulty: 5,
      diyCost: [100, 300]
    },
    {
      id: "warranty",
      name: "1-Year Warranty",
      icon: <Check />,
      roySmart: true,
      diyPossible: false,
      diyDifficulty: 0,
      diyCost: [0, 0]
    }
  ];
  
  // Alternative options
  const options: ComparisonOption[] = [
    {
      id: "roySmart",
      name: "Roy's Smart",
      description: "Complete all-in-one workstation with power and connectivity",
      price: 850,
      pros: [
        "All-in-one integrated solution",
        "Professional build quality",
        "1-year warranty",
        "Compact and portable design",
        "No assembly required"
      ],
      cons: [
        "Higher upfront cost"
      ]
    },
    {
      id: "diy",
      name: "DIY Solution",
      description: "Build your own workstation with separate components",
      price: calculateDIYCost().totalCost,
      pros: [
        "Potentially lower cost",
        "Customizable to specific needs",
        "Educational experience"
      ],
      cons: [
        "Requires technical knowledge",
        "Time-consuming to build",
        "Potentially bulkier solution",
        "No warranty",
        "May lack integration between components"
      ]
    },
    {
      id: "separate",
      name: "Separate Components",
      description: "Purchase individual products for each need",
      price: 1200,
      pros: [
        "Can purchase incrementally",
        "May already own some components"
      ],
      cons: [
        "Higher total cost",
        "Lack of integration",
        "Bulky to transport",
        "Multiple items to manage",
        "Inconsistent quality"
      ]
    }
  ];
  
  // Calculate DIY costs based on quality level and skill level
  function calculateDIYCost() {
    // Base component costs (weighted by quality level)
    const componentCosts = features.reduce((total, feature) => {
      if (feature.diyPossible) {
        // Calculate weighted cost based on quality level (1-5)
        // Lower quality = lower end of range, higher quality = higher end of range
        const costRange = feature.diyCost[1] - feature.diyCost[0];
        const weightedCost = feature.diyCost[0] + (costRange * (qualityLevel - 1) / 4);
        return total + weightedCost;
      }
      return total;
    }, 0);
    
    // Extra components needed (connectors, wiring, etc.)
    const extraComponentsCost = 50 + (qualityLevel * 20);
    
    // Tools needed (depends on skill level - higher skill might already have tools)
    const toolsCost = Math.max(0, 200 - (skillLevel * 30));
    
    // Time investment (hours * hourly value)
    const hoursNeeded = calculateTimeNeeded();
    const timeCost = hoursNeeded * timeValue;
    
    // Total cost
    const totalCost = Math.round(componentCosts + extraComponentsCost + toolsCost + timeCost);
    
    return {
      componentCosts: Math.round(componentCosts),
      extraComponentsCost,
      toolsCost,
      hoursNeeded,
      timeCost: Math.round(timeCost),
      totalCost
    };
  }
  
  // Calculate time needed based on skill level and complexity
  function calculateTimeNeeded() {
    // Base time (hours) needed for assembly
    const baseTime = 20;
    
    // Calculate complexity factor from features
    const complexityFactor = features
      .filter(f => f.diyPossible)
      .reduce((sum, feature) => sum + feature.diyDifficulty, 0) / features.length;
    
    // Adjust time based on skill level (lower skill = more time)
    return baseTime * complexityFactor * (6 - skillLevel) / 3;
  }
  
  // Update option prices when sliders change
  useEffect(() => {
    const diyCalculation = calculateDIYCost();
    options[1].price = diyCalculation.totalCost;
  }, [qualityLevel, skillLevel, timeValue]);
  
  // Show tooltip
  const showTooltip = (text: string, e: React.MouseEvent) => {
    setTooltip({
      visible: true,
      text,
      x: e.clientX,
      y: e.clientY
    });
  };
  
  // Hide tooltip
  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };
  
  return (
    <section ref={containerRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Compare With Alternatives
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how Roy&apos;s Smart compares to DIY solutions and separate components.
          </p>
        </motion.div>
        
        {/* Tooltip */}
        {tooltip.visible && (
          <div 
            className="fixed z-50 bg-black/90 text-white text-sm p-2 rounded pointer-events-none max-w-xs"
            style={{ 
              left: `${tooltip.x + 10}px`, 
              top: `${tooltip.y + 10}px`,
              transform: "translateX(-50%)"
            }}
          >
            {tooltip.text}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* DIY Configuration */}
          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Pickaxe className="h-5 w-5 mr-2 text-indigo-400" />
              DIY Configuration
            </h3>
            
            <div className="space-y-6">
              {/* Quality Level Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-300">
                    Component Quality
                  </label>
                  <div className="text-indigo-400 font-medium">
                    {["Basic", "Budget", "Standard", "Premium", "Professional"][qualityLevel - 1]}
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={qualityLevel}
                  onChange={(e) => setQualityLevel(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-500 mt-1 text-xs">
                  <span>Basic</span>
                  <span>Standard</span>
                  <span>Professional</span>
                </div>
              </div>
              
              {/* Skill Level Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-300">
                    Technical Skill Level
                  </label>
                  <div className="text-indigo-400 font-medium">
                    {["Beginner", "Novice", "Intermediate", "Advanced", "Expert"][skillLevel - 1]}
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-500 mt-1 text-xs">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>
              
              {/* Time Value Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-300 flex items-center">
                    Value of Your Time
                    <button
                      className="ml-1 text-gray-500"
                      onMouseEnter={(e) => showTooltip("How much is an hour of your time worth? This affects the total DIY cost calculation.", e)}
                      onMouseLeave={hideTooltip}
                    >
                      <InfoIcon className="h-4 w-4" />
                    </button>
                  </label>
                  <div className="text-indigo-400 font-medium">
                    ${timeValue}/hour
                  </div>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={timeValue}
                  onChange={(e) => setTimeValue(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-500 mt-1 text-xs">
                  <span>$15/hr</span>
                  <span>$50/hr</span>
                  <span>$100/hr</span>
                </div>
              </div>
              
              {/* DIY Cost Breakdown */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="text-white font-medium mb-3">DIY Cost Breakdown</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Components:</span>
                    <span className="text-white">${calculateDIYCost().componentCosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Extra Parts:</span>
                    <span className="text-white">${calculateDIYCost().extraComponentsCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tools:</span>
                    <span className="text-white">${calculateDIYCost().toolsCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-400">
                      Time Investment:
                      <span className="text-gray-500 text-xs ml-1">
                        ({Math.round(calculateDIYCost().hoursNeeded)} hours)
                      </span>
                    </div>
                    <span className="text-white">${calculateDIYCost().timeCost}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-800 font-medium">
                    <span className="text-gray-300">Total DIY Cost:</span>
                    <span className="text-white">${calculateDIYCost().totalCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Price Comparison Cards */}
          <motion.div
            className="col-span-1 lg:col-span-2 order-1 lg:order-2 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                className={`bg-black/30 backdrop-blur-sm rounded-2xl border overflow-hidden ${
                  option.id === "roySmart" 
                    ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                    : "border-gray-800"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                whileHover={{ translateY: -5 }}
              >
                {/* Card Header */}
                <div className={`p-4 text-center ${
                  option.id === "roySmart" 
                    ? "bg-indigo-900/50 border-b border-indigo-500/30" 
                    : "bg-black/50 border-b border-gray-800"
                }`}>
                  <h3 className="text-xl font-bold text-white">{option.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                </div>
                
                {/* Price */}
                <div className="p-6 text-center">
                  <div className="text-gray-400 text-sm mb-1">Starting at</div>
                  <div className={`text-3xl font-bold ${
                    option.id === "roySmart" ? "text-indigo-400" : "text-white"
                  }`}>
                    ${option.price}
                  </div>
                  
                  {option.id === "diy" && (
                    <div className="text-xs text-gray-500 mt-1">
                      Based on your configuration
                    </div>
                  )}
                  
                  {option.id === "roySmart" && (
                    <div className="mt-4">
                      <a
                        href="#"
                        className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-5 py-2 text-sm transition-all duration-300"
                      >
                        Pre-order Now
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Pros & Cons */}
                <div className="px-4 pb-6">
                  {/* Pros */}
                  <div className="mb-4">
                    <h4 className="text-green-500 font-medium text-sm mb-2">Pros</h4>
                    <ul className="space-y-1">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="flex text-sm text-gray-300">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Cons */}
                  <div>
                    <h4 className="text-red-500 font-medium text-sm mb-2">Cons</h4>
                    <ul className="space-y-1">
                      {option.cons.map((con, i) => (
                        <li key={i} className="flex text-sm text-gray-300">
                          <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Feature Comparison Table */}
        <motion.div
          className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Feature Comparison</h3>
          
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 text-left text-gray-400 font-medium">Feature</th>
                <th className="py-3 text-center text-gray-400 font-medium">Roy&apos;s Smart</th>
                <th className="py-3 text-center text-gray-400 font-medium">DIY Solution</th>
                <th className="py-3 text-center text-gray-400 font-medium">Separate Products</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.id} className="border-b border-gray-800 hover:bg-white/5">
                  <td className="py-3 flex items-center">
                    <div className="p-1 rounded bg-indigo-500/10 mr-2">
                      {feature.icon}
                    </div>
                    <span className="text-white">{feature.name}</span>
                  </td>
                  <td className="py-3 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-3 text-center">
                    {feature.diyPossible ? (
                      <div className="flex flex-col items-center">
                        <Check className="h-5 w-5 text-yellow-500" />
                        <span className="text-xs text-gray-500 mt-1">
                          Difficulty: {Array(feature.diyDifficulty).fill('●').join('')}
                        </span>
                      </div>
                    ) : (
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 text-center">
                    <Check className="h-5 w-5 text-blue-500 mx-auto" />
                  </td>
                </tr>
              ))}
              <tr className="border-b border-gray-800 hover:bg-white/5">
                <td className="py-3 flex items-center">
                  <div className="p-1 rounded bg-indigo-500/10 mr-2">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <span className="text-white">Total Cost</span>
                </td>
                <td className="py-3 text-center font-bold text-indigo-400">$850</td>
                <td className="py-3 text-center font-bold text-white">${calculateDIYCost().totalCost}</td>
                <td className="py-3 text-center font-bold text-white">$1,200+</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        
        {/* Recommendation */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Our Recommendation</h3>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            While DIY solutions can sometimes cost less (depending on quality and your time value), 
            Roy&apos;s Smart offers the best balance of quality, convenience, and integrated design.
            Our all-in-one solution eliminates the complexity and time investment of DIY approaches,
            while offering professional-grade components at a price lower than buying separate products.
          </p>
          
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-8 py-3 transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            Get the Complete Solution
          </a>
        </motion.div>
      </div>
    </section>
  );
}