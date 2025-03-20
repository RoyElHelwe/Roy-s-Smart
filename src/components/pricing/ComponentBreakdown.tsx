// components/pricing/ComponentBreakdown.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Battery,
  Zap,
  Cable,
  Cpu,
  Wifi,
  Shield,
  Layout,
  PieChart,
  DollarSign,
} from "lucide-react";

interface ComponentCost {
  id: string;
  name: string;
  cost: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

export default function ComponentBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedComponent, setExpandedComponent] = useState<string | null>(
    null
  );
  const [hoveredPieSlice, setHoveredPieSlice] = useState<string | null>(null);

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

  // Component cost data
  const components: ComponentCost[] = [
    {
      id: "battery",
      name: "Battery (100,000 mAh)",
      cost: 150,
      icon: <Battery />,
      color: "bg-blue-500",
      description:
        "High-capacity, long-lasting lithium battery pack provides reliable power for all your devices. Engineered with premium cells for maximum longevity and performance.",
    },
    {
      id: "inverter",
      name: "Inverter (500W Slim)",
      cost: 70,
      icon: <Zap />,
      color: "bg-yellow-500",
      description:
        "Pure sine wave inverter delivers clean AC power for laptops and other sensitive electronics. Efficient operation with low heat generation and multiple protection circuits.",
    },
    {
      id: "controller",
      name: "Charge Controller",
      cost: 30,
      icon: <Cpu />,
      color: "bg-green-500",
      description:
        "Smart power management system optimizes charging and power distribution. Features dynamic load balancing and protection circuits for battery longevity.",
    },
    {
      id: "ports",
      name: "Ports & Display",
      cost: 100,
      icon: <Cable />,
      color: "bg-purple-500",
      description:
        "Comprehensive connection panel includes USB-C, USB-A, AC outlets, and an intuitive display for monitoring power status. High-quality components ensure reliable connections.",
    },
    {
      id: "frame",
      name: "Frame & Foldable Parts",
      cost: 100,
      icon: <Layout />,
      color: "bg-indigo-500",
      description:
        "Aerospace-grade aluminum frame with precision hinges and adjustable components. Engineered for durability while maintaining a lightweight profile.",
    },
    {
      id: "cable",
      name: "Cable Management System",
      cost: 30,
      icon: <Cable />,
      color: "bg-pink-500",
      description:
        "Integrated cable management solution keeps your workspace organized and free from tangled wires. Includes retractable cable guides and storage compartments.",
    },
    {
      id: "cooling",
      name: "Cooling System",
      cost: 25,
      icon: <Zap />,
      color: "bg-teal-500",
      description:
        "Advanced thermal management system ensures optimal performance in various environments. Features passive cooling design with strategic heat dissipation.",
    },
    {
      id: "indicators",
      name: "LED Indicators",
      cost: 10,
      icon: <Zap />,
      color: "bg-amber-500",
      description:
        "Intuitive status indicators provide at-a-glance information about power levels, charging status, and connectivity. Energy-efficient LEDs with adjustable brightness.",
    },
    {
      id: "modem",
      name: "4G/5G Modem & Antenna",
      cost: 80,
      icon: <Wifi />,
      color: "bg-red-500",
      description:
        "High-gain cellular modem with advanced antenna design ensures connectivity even in areas with weak signal. Multi-band support for global compatibility.",
    },
    {
      id: "assembly",
      name: "Assembly & Testing",
      cost: 35,
      icon: <Shield />,
      color: "bg-gray-500",
      description:
        "Each unit is carefully assembled and undergoes rigorous quality testing to ensure reliability and performance. Includes burn-in testing and calibration.",
    },
  ];

  // Calculate total cost
  const totalCost = components.reduce(
    (sum, component) => sum + component.cost,
    0
  );

  // Calculate percentage for each component
  const getPercentage = (cost: number) => {
    return ((cost / totalCost) * 100).toFixed(1);
  };

  // Toggle component expansion
  const toggleComponent = (id: string) => {
    if (expandedComponent === id) {
      setExpandedComponent(null);
    } else {
      setExpandedComponent(id);
    }
  };

  // SVG Pie Chart calculations
  const PieChartComponent = () => {
    // Sort components by cost (highest first) for better visual representation
    const sortedComponents = [...components].sort((a, b) => b.cost - a.cost);

    // Calculate total angle for each component (in degrees)
    const anglePerDollar = 360 / totalCost;

    // Starting position (top of circle = -90 degrees in SVG coordinates)
    let startAngle = -90;

    // Generate SVG paths for pie slices
    const pieSlices = sortedComponents.map((component) => {
      const angle = component.cost * anglePerDollar;
      const endAngle = startAngle + angle;

      // Calculate SVG arc path
      const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
      const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
      const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
      const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);

      // Determine if the arc should take the long path (> 180 degrees)
      const largeArcFlag = angle > 180 ? 1 : 0;

      // Create SVG path
      const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      // Store the current start angle to use for the next slice
      const currentStartAngle = startAngle;
      startAngle = endAngle;

      // Return the SVG path with its properties
      return {
        id: component.id,
        path: pathData,
        color: component.color,
        name: component.name,
        cost: component.cost,
        startAngle: currentStartAngle,
        endAngle,
      };
    });

    return (
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {pieSlices.map((slice, index) => (
            <motion.path
              key={slice.id}
              d={slice.path}
              className={`${slice.color} cursor-pointer transition-opacity duration-300`}
              style={{
                opacity:
                  hoveredPieSlice === null || hoveredPieSlice === slice.id
                    ? 1
                    : 0.3,
                transformOrigin: "center",
              }}
              onMouseEnter={() => setHoveredPieSlice(slice.id)}
              onMouseLeave={() => setHoveredPieSlice(null)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: hoveredPieSlice === slice.id ? 1.05 : 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: isVisible ? index * 0.05 : 0,
              }}
            />
          ))}
          {/* Center circle (hole) */}
          <circle cx="100" cy="100" r="40" fill="#111" />
          {/* Total cost in center */}
          <text
            x="100"
            y="95"
            textAnchor="middle"
            className="fill-white text-sm font-medium"
          >
            Total
          </text>
          <text
            x="100"
            y="115"
            textAnchor="middle"
            className="fill-white text-sm font-bold"
          >
            ${totalCost}
          </text>
        </svg>

        {/* Hover info */}
        {hoveredPieSlice && (
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-xs border border-white/10 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {components.find((c) => c.id === hoveredPieSlice)?.name}: $
            {components.find((c) => c.id === hoveredPieSlice)?.cost}
          </motion.div>
        )}
      </div>
    );
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
            Component Breakdown
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the premium components that make Roy&apos;s Smart worth every penny.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pie Chart */}
          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 flex flex-col items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 self-start flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-indigo-400" />
              Cost Distribution
            </h3>

            <PieChartComponent />

            <div className="mt-8 text-center">
              <div className="text-sm text-gray-400 mb-1">
                Total Component Cost
              </div>
              <div className="text-3xl font-bold text-white">${totalCost}</div>
              <div className="text-xs text-gray-500 mt-1">
                *Additional costs include R&D, marketing, and support
              </div>
            </div>
          </motion.div>

          {/* Component List */}
          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-indigo-400" />
              Component Details
            </h3>

            <div className="space-y-3">
              {components.map((component, index) => (
                <motion.div
                  key={component.id}
                  className={`rounded-lg overflow-hidden border border-gray-800 transition-all duration-300 ${
                    hoveredPieSlice === component.id ||
                    expandedComponent === component.id
                      ? `bg-black/60 border-${component.color.replace(
                          "bg-",
                          ""
                        )}/30`
                      : "bg-black/30"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  onMouseEnter={() => setHoveredPieSlice(component.id)}
                  onMouseLeave={() => setHoveredPieSlice(null)}
                >
                  {/* Component Header (always visible) */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleComponent(component.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full ${component.color} mr-3`}
                      >
                        {component.icon}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {component.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          ${component.cost} ({getPercentage(component.cost)}%)
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        expandedComponent === component.id
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </div>

                  {/* Expanded Details */}
                  {expandedComponent === component.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4"
                    >
                      <div className="border-t border-gray-800 pt-3 text-gray-300 text-sm">
                        {component.description}
                      </div>

                      {/* Component Stats */}
                      <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between text-xs text-gray-400">
                        <div>
                          Unit Cost:{" "}
                          <span className="text-white">${component.cost}</span>
                        </div>
                        <div>
                          Percentage:{" "}
                          <span className="text-white">
                            {getPercentage(component.cost)}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Value Proposition */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Quality Without Compromise
          </h3>
          <p className="text-gray-300">
            At Roy&apos;s Smart, we believe in using only the highest-quality
            components to ensure reliability, durability, and performance. We
            source premium materials and components directly from reputable
            manufacturers to maintain strict quality control while providing
            exceptional value.
          </p>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-indigo-500/20">
            <div className="text-gray-400">Total Retail Price:</div>
            <div className="text-2xl font-bold text-white">$850</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
