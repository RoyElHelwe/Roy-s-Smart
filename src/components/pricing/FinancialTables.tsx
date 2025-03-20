// components/pricing/FinancialTables.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Package, Calendar } from "lucide-react";

export default function FinancialTables() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
            Financial Breakdown
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive overview of our business costs and breakeven analysis
          </p>
        </motion.div>

        {/* Tabs Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6"
        >
          <Tabs defaultValue="startup">
            <TabsList className="grid w-full grid-cols-3 bg-black/60 border border-indigo-500/20 rounded-lg mb-8">
              <TabsTrigger
                value="startup"
                className="data-[state=active]:bg-indigo-600/30 text-white"
              >
                <Package className="h-4 w-4 mr-2" />
                Startup Costs
              </TabsTrigger>
              <TabsTrigger
                value="fixed"
                className="data-[state=active]:bg-indigo-600/30 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Fixed Costs
              </TabsTrigger>
              <TabsTrigger
                value="variable"
                className="data-[state=active]:bg-indigo-600/30 text-white"
              >
                <Package className="h-4 w-4 mr-2" />
                Variable Costs
              </TabsTrigger>
            </TabsList>

            {/* Startup Costs */}
            <TabsContent value="startup" className="mt-0">
              <div className="space-y-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-indigo-500/20">
                        <th className="text-left py-3 px-4 text-white font-semibold">
                          Category
                        </th>
                        <th className="text-right py-3 px-4 text-white font-semibold">
                          Cost ($)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Product Development (Design & Prototyping)
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          600
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Marketing & Branding
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          500
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          3 Months of Fixed Costs
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          3,600
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="bg-indigo-900/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <td className="py-3 px-4 text-white font-medium">
                          Total Startup Costs
                        </td>
                        <td className="py-3 px-4 text-right text-white font-bold">
                          4,700
                        </td>
                      </motion.tr>
                    </tbody>
                  </table>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20"
                >
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-indigo-400 mr-2" />
                    <p className="text-white">
                      Startup costs include initial product development,
                      branding, and operating expenses for the first three
                      months.
                    </p>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Fixed Costs */}
            <TabsContent value="fixed" className="mt-0">
              <div className="space-y-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-indigo-500/20">
                        <th className="text-left py-3 px-4 text-white font-semibold">
                          Category
                        </th>
                        <th className="text-right py-3 px-4 text-white font-semibold">
                          Cost ($) Monthly
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <td className="py-3 px-4 text-gray-300">Marketing</td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          300
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <td className="py-3 px-4 text-gray-300">Salary</td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          500
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Rent for Assembly Space
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          400
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="bg-indigo-900/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <td className="py-3 px-4 text-white font-medium">
                          Total Fixed Costs (Monthly)
                        </td>
                        <td className="py-3 px-4 text-right text-white font-bold">
                          1,200
                        </td>
                      </motion.tr>
                    </tbody>
                  </table>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20"
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-400 mr-2" />
                    <p className="text-white">
                      Fixed costs are recurring monthly expenses regardless of
                      production volume.
                    </p>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Variable Costs */}
            <TabsContent value="variable" className="mt-0">
              <div className="space-y-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-indigo-500/20">
                        <th className="text-left py-3 px-4 text-white font-semibold">
                          Component
                        </th>
                        <th className="text-right py-3 px-4 text-white font-semibold">
                          Cost (USD)
                        </th>
                        <th className="text-left py-3 px-4 text-white font-semibold">
                          Supplier
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Battery (100,000 mAh)
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          150
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Katranji, 961 Souq
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Inverter (500W Slim)
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          70
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Katranji, 961 Souq
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Charge Controller
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          30
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Katranji, Ayoub Comp
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          USB-C & USB-A Ports + AC Outlet + Display
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          100
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Katranji, 961 Souq
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Frame & Foldable Parts
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          100
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Fleifel, Decathlon, 3MPlast
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.35 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Cable Management System
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          30
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Ayoub Comp, Alibaba
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          Built-in Cooling System
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          25
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Katranji, 961 Souq
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.45 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          LED Indicators
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          10
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Ayoub Comp, Ubey
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="border-b border-indigo-500/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <td className="py-3 px-4 text-gray-300">
                          4G/5G Modem + Antenna
                        </td>
                        <td className="py-3 px-4 text-right text-indigo-300 font-medium">
                          80
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          Katranji, 961 Souq
                        </td>
                      </motion.tr>
                      <motion.tr
                        className="bg-indigo-900/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          x: isVisible ? 0 : -20,
                        }}
                        transition={{ duration: 0.3, delay: 0.55 }}
                      >
                        <td className="py-3 px-4 text-white font-medium">
                          Total Variable Cost per Unit
                        </td>
                        <td className="py-3 px-4 text-right text-white font-bold">
                          630
                        </td>
                        <td className="py-3 px-4"></td>
                      </motion.tr>
                    </tbody>
                  </table>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20"
                >
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-indigo-400 mr-2" />
                    <p className="text-white">
                      Variable costs are expenses that change with each unit
                      produced.
                    </p>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Break-even Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6"
        >
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full bg-indigo-600/20 mr-4">
              <TrendingUp className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Break-even Analysis
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
              <div className="text-sm text-gray-400 mb-1">Selling Price</div>
              <div className="text-xl font-bold text-white">$850</div>
              <div className="text-xs text-gray-500 mt-1">per unit</div>
            </div>

            <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
              <div className="text-sm text-gray-400 mb-1">Variable Cost</div>
              <div className="text-xl font-bold text-white">$630</div>
              <div className="text-xs text-gray-500 mt-1">per unit</div>
            </div>

            <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
              <div className="text-sm text-gray-400 mb-1">Profit Margin</div>
              <div className="text-xl font-bold text-white">$220</div>
              <div className="text-xs text-gray-500 mt-1">per unit</div>
            </div>

            <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
              <div className="text-sm text-gray-400 mb-1">Fixed Costs</div>
              <div className="text-xl font-bold text-white">$1,200</div>
              <div className="text-xs text-gray-500 mt-1">per month</div>
            </div>

            <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
              <div className="text-sm text-gray-400 mb-1">Break-even Point</div>
              <div className="text-xl font-bold text-green-400">6 units</div>
              <div className="text-xs text-gray-500 mt-1">per month</div>
            </div>
          </div>

          <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
            <p className="text-white">
              <span className="font-semibold">Break-even Calculation:</span>{" "}
              $1,200 (Fixed Costs) ÷ $220 (Profit per Unit) ≈ 6 units per month
            </p>
            <p className="text-white mt-2">
              ✅ We need to sell at least 6 units per month to break even.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
