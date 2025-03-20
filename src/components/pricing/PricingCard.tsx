// components/pricing/PricingCard.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ShoppingCart } from "lucide-react";

export default function PricingCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Trigger price reveal animation after a slight delay
          setTimeout(() => {
            setShowPrice(true);
          }, 1000);
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
  
  // Animated counter for price reveal
  const Counter = ({ targetValue, duration = 1500 }: { targetValue: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!showPrice) return;
      
      let startTime: number;
      let animationFrameId: number;
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * targetValue));
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrameId = requestAnimationFrame(updateCount);
      
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [showPrice, targetValue, duration]);
    
    return <span>{count}</span>;
  };
  
  // Features included in the price
  const features = [
    "100,000 mAh Battery with 500W Inverter",
    "Built-in 4G/5G High-Gain Modem",
    "Foldable Ergonomic Workspace",
    "Smart Cable Management System",
    "Weather-Resistant Design",
    "1 Year Warranty",
    "30-Day Money-Back Guarantee"
  ];
  
  return (
    <section ref={containerRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          {/* Pricing Card with Glow Effect */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 20 
            }}
            transition={{ duration: 0.7 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glow Effect Background */}
            <div className="absolute -inset-px rounded-2xl transition-all duration-500">
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl blur-lg transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
                style={{
                  backgroundSize: '200% 200%',
                  animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none'
                }}
              ></div>
            </div>
            
            {/* Card Content */}
            <div className="relative bg-black/90 rounded-2xl p-8 border border-indigo-500/30 backdrop-blur-sm">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-block px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium mb-3">
                  Premium Value
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Roy&apos;s Smart Workstation
                </h2>
                <p className="text-gray-400">
                  Everything you need to work from anywhere
                </p>
              </div>
              
              {/* Price Animation */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="flex items-center justify-center">
                    <span className="text-gray-400 text-xl mr-1">$</span>
                    <div className="text-5xl font-bold text-white overflow-hidden h-16 flex items-center">
                      <AnimatePresence>
                        {showPrice ? (
                          <motion.div
                            initial={{ y: 70 }}
                            animate={{ y: 0 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 100, 
                              damping: 15 
                            }}
                            className="flex"
                          >
                            <Counter targetValue={850} />
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-16 h-8 bg-gray-700/50 rounded-md animate-pulse"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Pulsing glow under the price */}
                  <div 
                    className={`absolute -inset-2 bg-indigo-500/20 blur-xl rounded-full transition-opacity duration-1000 ${showPrice ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      animation: showPrice ? 'pulse 2s infinite' : 'none'
                    }}
                  ></div>
                </div>
                
                <div className="text-gray-400 mt-2">
                  One-time payment, no hidden fees
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-800 my-6"></div>
              
              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      x: isVisible ? 0 : -20 
                    }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <div className="flex-shrink-0 text-green-500 mr-2">
                      <Check className="h-5 w-5" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <motion.button
                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Pre-order Now
                <motion.div
                  className="ml-1"
                  animate={{ x: isHovered ? 3 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
              
              {/* Pre-order Info */}
              <div className="text-center mt-4 text-sm text-gray-400">
                Reserve yours today. Shipping begins in 4-6 weeks.
              </div>
            </div>
          </motion.div>
          
          {/* Volume Discount */}
          <motion.div
            className="mt-6 bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 20 
            }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-indigo-500/20 rounded-full">
                <ShoppingCart className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Volume Discounts</h3>
                <p className="text-gray-400 text-sm">
                  Planning to order multiple units? Contact us for special pricing on bulk orders.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0% { opacity: 0.2; }
          50% { opacity: 0.5; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}