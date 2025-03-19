// components/use-cases/ScenarioShowcase.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Laptop, Wifi, Battery, Clock, Check, ArrowRight } from "lucide-react";

interface Scenario {
  id: string;
  title: string;
  description: string;
  environment: string;
  benefits: string[];
  problems: string[];
  background: string;
}

export default function ScenarioShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string>("mountain");

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

  // Scenario data
  const scenarios: Scenario[] = [
    {
      id: "mountain",
      title: "Remote Mountain Retreat",
      description:
        "You're enjoying a weekend in the mountains when urgent work comes in. With Roy's Smart, you create a fully functional office with power and internet connection in minutes.",
      environment: "Mountain Cabin",
      benefits: [
        "Power your laptop for 10+ hours",
        "Connect to 4G/5G networks even in remote areas",
        "Set up an ergonomic workspace anywhere",
        "Handle video calls with clients seamlessly",
      ],
      problems: [
        "No power outlets nearby",
        "Weak cellular signal",
        "Limited flat surfaces for working",
        "Need to respond to client emergencies",
      ],
      background: "bg-[url('/images/mountain-bg.jpg')]",
    },
    {
      id: "office",
      title: "Power Outage at the Office",
      description:
        "When unexpected power outages hit your office, Roy's Smart ensures business continuity with backup power and internet connection for critical operations.",
      environment: "Corporate Office",
      benefits: [
        "Maintain critical operations during outages",
        "Keep communication channels open",
        "Power essential devices for hours",
        "No disruption to customer service",
      ],
      problems: [
        "Unexpected power failures",
        "Deadline-critical work in progress",
        "Network infrastructure down",
        "Client meetings scheduled",
      ],
      background: "bg-[url('/images/office-bg.jpg')]",
    },
    {
      id: "outdoor",
      title: "Outdoor Project Site",
      description:
        "Working on a construction or outdoor project site where power and connectivity are limited or non-existent. Roy's Smart provides both in a durable package.",
      environment: "Construction Site",
      benefits: [
        "Weather-resistant design for outdoor use",
        "Power for laptops and small tools",
        "On-site internet connectivity",
        "Ergonomic workspace for planning and documentation",
      ],
      problems: [
        "No electrical infrastructure",
        "Dusty, possibly wet conditions",
        "Need to update project plans on-site",
        "Communication with headquarters",
      ],
      background: "bg-[url('/images/construction-bg.jpg')]",
    },
  ];

  // Get active scenario
  const getActiveScenario = () => {
    return (
      scenarios.find((scenario) => scenario.id === activeScenario) ||
      scenarios[0]
    );
  };

  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-16" style={{ opacity }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real-World Scenarios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how Roy's Smart transforms challenging situations into
            productive work environments.
          </p>
        </motion.div>

        {/* Scenario Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                ${
                  activeScenario === scenario.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              onClick={() => setActiveScenario(scenario.id)}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        {/* Scenario Display */}
        <div className="relative h-[600px] rounded-2xl overflow-hidden border border-indigo-500/20">
          {/* Parallax Background */}
          <motion.div
            className={`absolute inset-0 ${
              getActiveScenario().background
            } bg-cover bg-center`}
            style={{ y: bgY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            key={`bg-${activeScenario}`}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
          </motion.div>

          {/* Content Container */}
          <motion.div
            className="relative h-full z-10 flex flex-col justify-end"
            style={{ y: contentY }}
          >
            {/* Scenario Content */}
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={`content-${activeScenario}`}
            >
              <div className="max-w-3xl">
                <div className="mb-2 text-indigo-400 font-medium">
                  {getActiveScenario().environment}
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  {getActiveScenario().title}
                </h3>

                <p className="text-xl text-gray-300 mb-8">
                  {getActiveScenario().description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Problems Solved */}
                  <div>
                    <h4 className="flex items-center text-white text-lg font-medium mb-4">
                      <div className="mr-2 p-1 rounded-full bg-red-500/20">
                        <Battery className="h-5 w-5 text-red-500" />
                      </div>
                      Challenges
                    </h4>

                    <ul className="space-y-2">
                      {getActiveScenario().problems.map((problem, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <div className="text-red-500 mr-2 flex-shrink-0">
                            ✗
                          </div>
                          {problem}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="flex items-center text-white text-lg font-medium mb-4">
                      <div className="mr-2 p-1 rounded-full bg-green-500/20">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      Roy's Smart Solution
                    </h4>

                    <ul className="space-y-2">
                      {getActiveScenario().benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <div className="text-green-500 mr-2 flex-shrink-0">
                            ✓
                          </div>
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Icons (for visual effect) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {["mountain", "office", "outdoor"].includes(activeScenario) && (
              <>
                <motion.div
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["10%", "15%", "20%"],
                    y: ["10%", "15%", "20%"],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                >
                  <div className="p-3 bg-indigo-500/20 backdrop-blur-sm rounded-full">
                    <Laptop className="h-6 w-6 text-indigo-400" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["80%", "75%", "70%"],
                    y: ["20%", "25%", "30%"],
                  }}
                  transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                >
                  <div className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-full">
                    <Wifi className="h-6 w-6 text-blue-400" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["60%", "65%", "70%"],
                    y: ["70%", "65%", "60%"],
                  }}
                  transition={{ duration: 9, repeat: Infinity, delay: 2 }}
                >
                  <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-full">
                    <Battery className="h-6 w-6 text-green-400" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["30%", "35%", "40%"],
                    y: ["50%", "45%", "40%"],
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: 3 }}
                >
                  <div className="p-3 bg-amber-500/20 backdrop-blur-sm rounded-full">
                    <Clock className="h-6 w-6 text-amber-400" />
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeScenario === scenario.id ? "bg-indigo-500" : "bg-gray-600"
              }`}
              onClick={() => setActiveScenario(scenario.id)}
              aria-label={`View ${scenario.title} scenario`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Transform any environment into your workstation with Roy's Smart.
            Designed for versatility across a wide range of scenarios.
          </p>
          <a
            href="#calculator"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors"
          >
            Find Your Ideal Setup
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
