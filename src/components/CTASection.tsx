// components/CTASection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Check, Users } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [count, setCount] = useState(785);
  const [isVisible, setIsVisible] = useState(false);

  // Animated customer count that increments randomly
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setCount(prev => prev + 1);
        }
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you would send this to your API/backend
      console.log("Email submitted:", email);
    }
  };

  // Intersection observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById("cta-section");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section 
      id="cta-section"
      className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-indigo-950 via-indigo-900 to-black"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-radial from-indigo-500/20 via-transparent to-transparent opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-30"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side - CTA Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Be Among the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  First
                </span>{" "}
                to Experience Roy's Smart
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                Pre-order now and never worry about power or connectivity issues again. Join the future of remote work with Roy's Smart Workstation.
              </p>
              
              {/* Social Proof Counter */}
              <div className="flex items-center gap-3 mb-8 bg-indigo-900/30 px-4 py-3 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
                <Users className="h-5 w-5 text-indigo-400" />
                <div>
                  <span className="font-bold text-white mr-2 tabular-nums">{count}+</span>
                  <span className="text-gray-300">people have already joined the waitlist</span>
                </div>
              </div>
              
              {/* Pre-order Button with Animated Gradient */}
              <motion.button
                className="relative group overflow-hidden rounded-full text-white font-semibold px-8 py-4 shadow-lg"
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 
                              bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 
                              group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-indigo-600 group-hover:to-purple-600
                              bg-size-200 group-hover:bg-pos-100"></span>
                
                <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20">
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-transparent opacity-10"></span>
                </span>
                
                <span className="relative flex items-center">
                  Pre-order Now
                  <motion.span
                    animate={{ x: buttonHover ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>
          
          {/* Right Side - Newsletter Signup */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated on Launch & Availability
              </h3>
              
              <p className="text-gray-300 mb-6">
                Sign up to receive exclusive updates, early-bird discounts, and be the first to know when Roy's Smart is available.
              </p>
              
              {isSubmitted ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-white">
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-black" />
                    </div>
                    <span>Thanks for signing up! We'll keep you updated.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg
                               transition-colors duration-300 shadow-sm shadow-indigo-700/20"
                  >
                    Subscribe to Updates
                  </button>
                  
                  <p className="text-xs text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
              
              {/* Features Pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                <div className="text-xs bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full">
                  Early Access Offers
                </div>
                <div className="text-xs bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full">
                  Exclusive Discounts
                </div>
                <div className="text-xs bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full">
                  Feature Updates
                </div>
                <div className="text-xs bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full">
                  Launch Date News
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}