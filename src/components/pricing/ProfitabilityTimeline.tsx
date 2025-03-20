// components/pricing/ProfitabilityTimeline.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  BadgeDollarSign,
  Rocket,
  Globe,
  Award,
  ChevronRight,
  Calendar
} from "lucide-react";

interface TimelinePhase {
  id: string;
  title: string;
  months: string;
  description: string;
  icon: React.ReactNode;
  status: "past" | "current" | "future";
  milestones: {
    text: string;
    complete?: boolean;
  }[];
  goalUnits: number;
  projectedProfit?: number;
  cssColorClass: string;
}

export default function ProfitabilityTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("break-even");
  
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
  
  // Format currency
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return "-";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Timeline phases data
  const timelinePhases: TimelinePhase[] = [
    {
      id: "launch",
      title: "Launch Phase",
      months: "Months 1-3",
      description: "Initial market entry with product launch, establishing manufacturing and beginning marketing efforts. Focus on building awareness and collecting early customer feedback.",
      icon: <Rocket className="h-6 w-6" />,
      status: "past",
      milestones: [
        { text: "Complete product development", complete: true },
        { text: "Establish marketing channels", complete: true },
        { text: "Begin pre-order campaign", complete: true },
        { text: "Setup manufacturing pipeline", complete: true },
      ],
      goalUnits: 3,
      projectedProfit: -3600, // Initial 3 months of fixed costs
      cssColorClass: "from-purple-500 to-indigo-700"
    },
    {
      id: "break-even",
      title: "Break-Even Phase",
      months: "Months 4-6",
      description: "Reaching minimum viable sales volume to cover ongoing expenses. This phase focuses on optimizing production processes and refining marketing strategies to achieve consistent orders.",
      icon: <BadgeDollarSign className="h-6 w-6" />,
      status: "current",
      milestones: [
        { text: "Complete first production run", complete: true },
        { text: "Launch targeted ad campaigns", complete: true },
        { text: "Reach 6+ units monthly", complete: false },
        { text: "Optimize supply chain costs", complete: false },
      ],
      goalUnits: 6,
      projectedProfit: 0,
      cssColorClass: "from-indigo-500 to-blue-700"
    },
    {
      id: "growth",
      title: "Growth Phase",
      months: "Months 7-12",
      description: "Scaling operations to generate consistent profit. During this phase, marketing expands to new channels and customer segments while production efficiency improves through process refinement.",
      icon: <TrendingUp className="h-6 w-6" />,
      status: "future",
      milestones: [
        { text: "Expand to new customer segments", complete: false },
        { text: "Reduce per-unit production costs", complete: false },
        { text: "Scale to 10+ units monthly", complete: false },
        { text: "Begin development of v2 features", complete: false },
      ],
      goalUnits: 10,
      projectedProfit: 1000, // (10 units × $220 profit) - $1,200 fixed costs
      cssColorClass: "from-blue-500 to-teal-700"
    },
    {
      id: "scaling",
      title: "Scaling Phase",
      months: "Year 2",
      description: "Expanding market reach through new distribution channels, strategic partnerships, and product variations. This phase focuses on growth acceleration and brand establishment.",
      icon: <Globe className="h-6 w-6" />,
      status: "future",
      milestones: [
        { text: "Launch version 2.0 product", complete: false },
        { text: "Establish reseller partnerships", complete: false },
        { text: "Introduce complementary products", complete: false },
        { text: "Achieve 20+ units monthly", complete: false },
      ],
      goalUnits: 20,
      projectedProfit: 3200, // (20 units × $220 profit) - $1,200 fixed costs
      cssColorClass: "from-teal-500 to-green-700"
    },
    {
      id: "maturity",
      title: "Maturity Phase",
      months: "Year 3+",
      description: "Stabilizing as a market leader with a diversified product line, optimized operations, and strong brand recognition. This phase focuses on long-term sustainability and expansion.",
      icon: <Award className="h-6 w-6" />,
      status: "future",
      milestones: [
        { text: "Develop premium product tier", complete: false },
        { text: "Establish international presence", complete: false },
        { text: "Create recurring revenue streams", complete: false },
        { text: "Scale to 50+ units monthly", complete: false },
      ],
      goalUnits: 50,
      projectedProfit: 9800, // (50 units × $220 profit) - $1,200 fixed costs
      cssColorClass: "from-green-500 to-emerald-700"
    }
  ];
  
  // Get currently selected phase
  const currentPhase = timelinePhases.find(phase => phase.id === selectedPhase) || timelinePhases[0];

  return (
    <section ref={containerRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4">
            Business Roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-teal-400">Profitability</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A clear timeline from product launch to sustainable business growth
          </p>
        </motion.div>
        
        {/* Timeline Navigation */}
        <div className="relative">
          {/* Line connecting all phases */}
          <div className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-20"></div>
          
          <motion.div
            className="relative flex flex-wrap md:flex-nowrap justify-between gap-4 mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {timelinePhases.map((phase, index) => {
              // Determine if this phase is active, completed, or upcoming
              const isActive = phase.id === selectedPhase;
              const isCompleted = phase.status === "past";
              
              return (
                <motion.button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`relative flex flex-col items-center text-center w-full max-w-[200px] transition duration-300 mx-auto ${
                    isActive ? 'transform scale-110' : ''
                  }`}
                  whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  {/* Icon with colored background */}
                  <div className={`relative rounded-full p-0.5 ${isActive ? 'bg-gradient-to-r ' + phase.cssColorClass : 'bg-gray-800'}`}>
                    <div className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full
                      ${isActive 
                        ? 'bg-black text-white' 
                        : isCompleted
                          ? 'bg-indigo-900/80 text-white'
                          : 'bg-gray-900 text-gray-400'}`}
                    >
                      {phase.icon}
                      
                      {/* Status indicator */}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-black" />
                        </div>
                      )}
                      {phase.status === "current" && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                          <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Timeline stem for desktop */}
                  <div className={`hidden md:block absolute top-16 w-0.5 h-10 ${
                    isActive 
                      ? 'bg-gradient-to-b ' + phase.cssColorClass 
                      : isCompleted
                        ? 'bg-indigo-600/50'
                        : 'bg-gray-700'
                  }`}></div>
                  
                  {/* Title */}
                  <div className={`mt-4 font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {phase.title}
                  </div>
                  
                  {/* Months */}
                  <div className={`text-xs transition-colors duration-300 ${
                    isActive ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {phase.months}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
        
        {/* Phase Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPhase}
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${currentPhase.cssColorClass} px-6 py-4`}>
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="p-2 bg-black/30 backdrop-blur-sm rounded-full mr-3">
                    {currentPhase.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentPhase.title}</h3>
                    <p className="text-white/80 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {currentPhase.months}
                    </p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg ${
                  currentPhase.projectedProfit && currentPhase.projectedProfit >= 0 
                    ? 'bg-green-900/30 border border-green-500/30 text-green-300' 
                    : 'bg-red-900/30 border border-red-500/30 text-red-300'
                }`}>
                  <div className="text-sm">Projected Monthly Profit</div>
                  <div className="text-xl font-bold flex items-center">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {formatCurrency(currentPhase.projectedProfit)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Left Column - Description and Milestones */}
              <div className="space-y-6">
                <div className="bg-black/20 rounded-xl p-5 border border-indigo-500/10">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-indigo-400" />
                    Phase Overview
                  </h4>
                  <p className="text-gray-300">{currentPhase.description}</p>
                </div>
                
                <div className="bg-black/20 rounded-xl p-5 border border-indigo-500/10">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-indigo-400" />
                    Key Milestones
                  </h4>
                  <div className="space-y-4">
                    {currentPhase.milestones.map((milestone, index) => (
                      <div 
                        key={index} 
                        className={`flex items-start p-3 rounded-lg ${
                          milestone.complete 
                            ? 'bg-green-900/10 border border-green-500/20' 
                            : 'bg-gray-900/40 border border-gray-700/20'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full mr-3 flex items-center justify-center
                          ${milestone.complete 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-700/20 text-gray-400'}`}
                        >
                          {milestone.complete ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <span className={`${milestone.complete ? 'text-gray-300' : 'text-gray-400'}`}>
                          {milestone.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Financial & Unit Goals */}
              <div className="space-y-6">
                <div className="bg-black/20 rounded-xl p-5 border border-indigo-500/10">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-indigo-400" />
                    Sales Targets
                  </h4>
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl w-16 h-16 flex items-center justify-center font-bold text-2xl text-white mr-4 bg-gradient-to-br ${currentPhase.cssColorClass}`}>
                      {currentPhase.goalUnits}+
                    </div>
                    <div>
                      <div className="text-white font-medium">Units per Month</div>
                      <div className="text-sm text-gray-400">Target sales volume</div>
                    </div>
                  </div>
                  
                  {/* Progress visualization */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress to Target</span>
                      <span className="text-gray-300">
                        {currentPhase.status === "past" 
                          ? "100%" 
                          : currentPhase.status === "current" 
                            ? "50%" 
                            : "0%"}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${currentPhase.cssColorClass} rounded-full`}
                        style={{ width: `${Math.min(100, (currentPhase.status === "past" ? 100 : currentPhase.status === "current" ? 50 : 0))}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <div>0 units</div>
                      <div>Break-even: 6 units</div>
                      <div>{currentPhase.goalUnits}+ units</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-xl p-5 border border-indigo-500/10">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <BadgeDollarSign className="h-4 w-4 mr-2 text-indigo-400" />
                    Financial Projections
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/30 rounded-lg p-3 border border-indigo-500/20">
                        <div className="text-sm text-gray-400">Monthly Revenue</div>
                        <div className="text-lg font-medium text-white">{formatCurrency(currentPhase.goalUnits * 850)}</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 border border-indigo-500/20">
                        <div className="text-sm text-gray-400">Monthly Costs</div>
                        <div className="text-lg font-medium text-white">{formatCurrency((currentPhase.goalUnits * 630) + 1200)}</div>
                      </div>
                    </div>
                    <div className={`rounded-lg p-3 border flex justify-between items-center
                      ${currentPhase.projectedProfit && currentPhase.projectedProfit >= 0 
                        ? 'bg-green-900/20 border-green-500/30' 
                        : 'bg-red-900/20 border-red-500/30'}`}
                    >
                      <div>
                        <div className="text-sm text-gray-300">Projected Annual Profit</div>
                        <div className={`text-lg font-bold ${
                          currentPhase.projectedProfit && currentPhase.projectedProfit >= 0 
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }`}>
                          {formatCurrency(currentPhase.projectedProfit ? currentPhase.projectedProfit * 12 : undefined)}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        currentPhase.projectedProfit && currentPhase.projectedProfit >= 0 
                          ? 'bg-green-900/30 text-green-300' 
                          : 'bg-red-900/30 text-red-300'
                      }`}>
                        {currentPhase.projectedProfit && currentPhase.projectedProfit >= 0 ? 'PROFIT' : 'INVESTMENT'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phase transition */}
                {currentPhase.status !== "past" && (
                  <div className="bg-indigo-900/20 rounded-xl p-5 border border-indigo-500/20">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-indigo-400" />
                      Moving to Next Phase
                    </h4>
                    <div className="flex items-start">
                      <div className="bg-indigo-500/20 rounded-full p-1.5 mt-0.5 mr-3">
                        <CheckCircle className="h-4 w-4 text-indigo-400" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        Complete the milestones and reach the sales targets to progress to the 
                        {currentPhase.status === "current" ? " Growth" : currentPhase.title === "Growth Phase" ? " Scaling" : " Maturity"} Phase.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* 5-Year Projection Table */}
        <motion.div
          className="mt-12 bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
                5-Year Projection
              </h3>
              <p className="text-gray-400 mt-1">Long-term business performance forecast</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-3 border border-green-500/30">
              <div className="text-sm text-gray-300">5-Year Cumulative Profit</div>
              <div className="text-2xl font-bold text-green-400">+$264,000</div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-indigo-500/20">
                  <th className="py-3 px-4 text-left text-white font-semibold">Time Period</th>
                  <th className="py-3 px-4 text-center text-white font-semibold">Monthly Units</th>
                  <th className="py-3 px-4 text-center text-white font-semibold">Monthly Profit</th>
                  <th className="py-3 px-4 text-right text-white font-semibold">Cumulative Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-indigo-500/10">
                  <td className="py-3 px-4 text-gray-300">Year 1 (Months 1-12)</td>
                  <td className="py-3 px-4 text-center text-gray-300">3-10</td>
                  <td className="py-3 px-4 text-center text-red-400">-$1,200 to +$1,000</td>
                  <td className="py-3 px-4 text-right text-red-400">-$7,200</td>
                </tr>
                <tr className="border-b border-indigo-500/10">
                  <td className="py-3 px-4 text-gray-300">Year 2</td>
                  <td className="py-3 px-4 text-center text-gray-300">10-20</td>
                  <td className="py-3 px-4 text-center text-green-400">+$1,000 to +$3,200</td>
                  <td className="py-3 px-4 text-right text-green-400">+$18,000</td>
                </tr>
                <tr className="border-b border-indigo-500/10">
                  <td className="py-3 px-4 text-gray-300">Year 3</td>
                  <td className="py-3 px-4 text-center text-gray-300">20-30</td>
                  <td className="py-3 px-4 text-center text-green-400">+$3,200 to +$5,400</td>
                  <td className="py-3 px-4 text-right text-green-400">+$69,000</td>
                </tr>
                <tr className="border-b border-indigo-500/10">
                  <td className="py-3 px-4 text-gray-300">Year 4</td>
                  <td className="py-3 px-4 text-center text-gray-300">30-40</td>
                  <td className="py-3 px-4 text-center text-green-400">+$5,400 to +$7,600</td>
                  <td className="py-3 px-4 text-right text-green-400">+$147,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Year 5</td>
                  <td className="py-3 px-4 text-center text-gray-300">40-50+</td>
                  <td className="py-3 px-4 text-center text-green-400">+$7,600 to +$9,800+</td>
                  <td className="py-3 px-4 text-right text-green-400">+$264,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>
              Projections assume consistent profit margins, increasing market penetration, and controlled fixed cost growth.
              Actual results may vary based on market conditions and business execution.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}