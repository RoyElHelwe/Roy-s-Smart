// components/pricing/ROICalculator.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, CreditCard, Clock, DollarSign } from "lucide-react";

interface ROIResults {
  monthlySavings: number;
  annualSavings: number;
  breakEven: number;
  fiveYearSavings: number;
  roi: number;
}

export default function ROICalculator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculator input state
  const [monthlyOutages, setMonthlyOutages] = useState<number>(2);
  const [hoursPerOutage, setHoursPerOutage] = useState<number>(3);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [cafePurchases, setCafePurchases] = useState<number>(20);
  const [powerBankLifespan, setPowerBankLifespan] = useState<number>(12);
  
  // Results state
  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  
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
  
  // Calculate ROI
  const calculateROI = () => {
    // Lost productivity cost per month
    const lostProductivityCost = monthlyOutages * hoursPerOutage * hourlyRate;
    
    // Cost of cafe purchases per month to access outlets
    const cafePurchaseCost = cafePurchases * 5; // Assuming average $5 per purchase
    
    // Cost of replacing power banks
    const powerBankCost = 150 / powerBankLifespan; // $150 power bank replaced every X months
    
    // Monthly savings
    const monthlySavings = lostProductivityCost + cafePurchaseCost + powerBankCost;
    
    // Annual savings
    const annualSavings = monthlySavings * 12;
    
    // Break-even point (in months)
    const breakEven = 850 / monthlySavings;
    
    // Five-year savings
    const fiveYearSavings = (annualSavings * 5) - 850;
    
    // ROI percentage
    const roi = ((annualSavings * 5) / 850 - 1) * 100;
    
    return {
      monthlySavings,
      annualSavings,
      breakEven,
      fiveYearSavings,
      roi
    };
  };
  
  // Handle calculation submission
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const results = calculateROI();
    setResults(results);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById("roi-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
            Calculate Your Return on Investment
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how quickly Roy&apos;s Smart pays for itself by preventing lost productivity and unnecessary expenses.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 h-full"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-indigo-600/20 mr-4">
                <Calculator className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">ROI Calculator</h3>
            </div>
            
            <form onSubmit={handleCalculate} className="space-y-6">
              {/* Power Outages */}
              <div>
                <label className="block text-gray-300 mb-2">
                  How many times per month do you lose power or connectivity?
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={monthlyOutages}
                  onChange={(e) => setMonthlyOutages(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-400 mt-1 text-sm">
                  <span>0 times</span>
                  <span className="font-medium text-indigo-400">{monthlyOutages} times</span>
                  <span>10+ times</span>
                </div>
              </div>
              
              {/* Hours per Outage */}
              <div>
                <label className="block text-gray-300 mb-2">
                  On average, how many hours of productivity do you lose each time?
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={hoursPerOutage}
                  onChange={(e) => setHoursPerOutage(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-400 mt-1 text-sm">
                  <span>1 hour</span>
                  <span className="font-medium text-indigo-400">{hoursPerOutage} hours</span>
                  <span>8+ hours</span>
                </div>
              </div>
              
              {/* Hourly Rate */}
              <div>
                <label className="block text-gray-300 mb-2">
                  What is your hourly rate or productivity value? ($)
                </label>
                <input
                  type="range"
                  min="15"
                  max="200"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-400 mt-1 text-sm">
                  <span>$15</span>
                  <span className="font-medium text-indigo-400">${hourlyRate}</span>
                  <span>$200+</span>
                </div>
              </div>
              
              {/* Cafe Purchases */}
              <div>
                <label className="block text-gray-300 mb-2">
                  How many cafe purchases do you make monthly just to access power?
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={cafePurchases}
                  onChange={(e) => setCafePurchases(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-400 mt-1 text-sm">
                  <span>0</span>
                  <span className="font-medium text-indigo-400">{cafePurchases}</span>
                  <span>30+</span>
                </div>
              </div>
              
              {/* Power Bank Replacement */}
              <div>
                <label className="block text-gray-300 mb-2">
                  How often do you replace power banks (in months)?
                </label>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="1"
                  value={powerBankLifespan}
                  onChange={(e) => setPowerBankLifespan(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-gray-700 rounded-full h-2"
                />
                <div className="flex justify-between text-gray-400 mt-1 text-sm">
                  <span>6 months</span>
                  <span className="font-medium text-indigo-400">{powerBankLifespan} months</span>
                  <span>24+ months</span>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center"
                >
                  Calculate My Savings
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Results Display */}
          <motion.div
            id="roi-results"
            className={`bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 h-full ${!showResults ? 'flex items-center justify-center' : ''}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!showResults ? (
              <div className="text-center text-gray-400">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-indigo-500 opacity-50" />
                <p className="text-lg">
                  Fill out the form and click &quot;Calculate&quot; to see your potential savings.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-green-600/20 mr-4">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Your ROI Results</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* Monthly Savings */}
                  <motion.div
                    className="bg-gradient-to-br from-indigo-900/20 to-indigo-900/5 p-5 rounded-xl border border-indigo-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-indigo-400 mr-2" />
                      <h4 className="text-white font-medium">Monthly Savings</h4>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {formatCurrency(results?.monthlySavings || 0)}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Productivity, purchases & equipment
                    </div>
                  </motion.div>
                  
                  {/* Annual Savings */}
                  <motion.div
                    className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 p-5 rounded-xl border border-blue-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-blue-400 mr-2" />
                      <h4 className="text-white font-medium">Annual Savings</h4>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {formatCurrency(results?.annualSavings || 0)}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Total savings per year
                    </div>
                  </motion.div>
                  
                  {/* Break-Even Point */}
                  <motion.div
                    className="bg-gradient-to-br from-green-900/20 to-green-900/5 p-5 rounded-xl border border-green-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-green-400 mr-2" />
                      <h4 className="text-white font-medium">Break-Even Point</h4>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {results ? results.breakEven.toFixed(1) : 0} Months
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Time to cover your investment
                    </div>
                  </motion.div>
                  
                  {/* 5-Year ROI */}
                  <motion.div
                    className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 p-5 rounded-xl border border-purple-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-400 mr-2" />
                      <h4 className="text-white font-medium">5-Year ROI</h4>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {results ? results.roi.toFixed(0) : 0}%
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Return on investment percentage
                    </div>
                  </motion.div>
                </div>
                
                {/* 5-Year Savings */}
                <motion.div
                  className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/30 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h4 className="text-xl font-bold text-white mb-2">5-Year Total Savings</h4>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                      {formatCurrency(results?.fiveYearSavings || 0)}
                    </div>
                    <span className="text-gray-400 ml-3">
                      after accounting for your investment
                    </span>
                  </div>
                </motion.div>
                
                {/* CTA */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-300"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Invest in Your Productivity
                  </a>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Assumptions Note */}
        <motion.div
          className="text-center mt-8 text-sm text-gray-500 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.7 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>
            This calculator provides an estimate based on typical usage patterns. Actual savings may vary based on your specific circumstances and usage. The ROI calculation assumes a one-time cost of $850 for Roy&apos;s Smart workstation and a 5-year product lifespan with minimal maintenance costs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}