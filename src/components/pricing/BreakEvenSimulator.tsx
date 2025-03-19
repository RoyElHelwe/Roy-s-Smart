// components/pricing/BreakEvenSimulator.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, BarChart3, Calculator } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine
} from "recharts";

export default function BreakEvenSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Business model parameters (base values)
  const [unitsSold, setUnitsSold] = useState(6); // Default to break-even
  const [sellingPrice, setSellingPrice] = useState(850);
  const [variableCost, setVariableCost] = useState(630);
  const [fixedCosts, setFixedCosts] = useState(1200);
  
  // Derived calculations
  const profitPerUnit = sellingPrice - variableCost;
  const monthlyProfit = (unitsSold * profitPerUnit) - fixedCosts;
  const breakEvenUnits = Math.ceil(fixedCosts / profitPerUnit);
  
  // Chart data
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Update chart data when inputs change
  useEffect(() => {
    const data = [];
    const maxUnits = Math.max(12, unitsSold + 3); // Show at least up to 12 units or current + 3
    
    for (let units = 0; units <= maxUnits; units++) {
      const profit = (units * profitPerUnit) - fixedCosts;
      data.push({
        units: units,
        profit: profit,
        revenue: units * sellingPrice,
        costs: (units * variableCost) + fixedCosts
      });
    }
    
    setChartData(data);
  }, [unitsSold, sellingPrice, variableCost, fixedCosts, profitPerUnit]);
  
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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 p-3 rounded-lg border border-indigo-500/30 backdrop-blur-sm text-sm">
          <p className="font-medium text-white mb-1">{`${label} Units Sold`}</p>
          <p className="text-indigo-300">{`Revenue: ${formatCurrency(payload[0].payload.revenue)}`}</p>
          <p className="text-red-300">{`Costs: ${formatCurrency(payload[0].payload.costs)}`}</p>
          <p className={`font-medium ${payload[0].payload.profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {`Profit: ${formatCurrency(payload[0].payload.profit)}`}
          </p>
        </div>
      );
    }
    return null;
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
            Interactive Break-Even Simulator
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Adjust the sliders to simulate different business scenarios and see how they affect profitability
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <motion.div
            className="lg:col-span-1 bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-indigo-600/20 mr-4">
                <Calculator className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Adjust Parameters</h3>
            </div>
            
            <div className="space-y-8">
              {/* Units Sold Slider */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-white font-medium">Units Sold Monthly</label>
                  <span className="bg-indigo-900/40 text-indigo-300 px-2 py-1 rounded text-sm">
                    {unitsSold} units
                  </span>
                </div>
                <Slider
                  value={[unitsSold]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(value) => setUnitsSold(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>0 units</span>
                  <span className={`${breakEvenUnits === unitsSold ? 'text-green-400 font-medium' : ''}`}>
                    {breakEvenUnits} units (break-even)
                  </span>
                  <span>20 units</span>
                </div>
              </div>
              
              {/* Selling Price Slider */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-white font-medium">Selling Price</label>
                  <span className="bg-indigo-900/40 text-indigo-300 px-2 py-1 rounded text-sm">
                    ${sellingPrice}
                  </span>
                </div>
                <Slider
                  value={[sellingPrice]}
                  min={700}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setSellingPrice(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>$700</span>
                  <span className="text-indigo-400 font-medium">$850 (base)</span>
                  <span>$1000</span>
                </div>
              </div>
              
              {/* Variable Cost Slider */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-white font-medium">Variable Cost per Unit</label>
                  <span className="bg-indigo-900/40 text-indigo-300 px-2 py-1 rounded text-sm">
                    ${variableCost}
                  </span>
                </div>
                <Slider
                  value={[variableCost]}
                  min={550}
                  max={700}
                  step={10}
                  onValueChange={(value) => setVariableCost(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>$550</span>
                  <span className="text-indigo-400 font-medium">$630 (base)</span>
                  <span>$700</span>
                </div>
              </div>
              
              {/* Fixed Costs Slider */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-white font-medium">Fixed Costs Monthly</label>
                  <span className="bg-indigo-900/40 text-indigo-300 px-2 py-1 rounded text-sm">
                    ${fixedCosts}
                  </span>
                </div>
                <Slider
                  value={[fixedCosts]}
                  min={800}
                  max={1600}
                  step={100}
                  onValueChange={(value) => setFixedCosts(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>$800</span>
                  <span className="text-indigo-400 font-medium">$1,200 (base)</span>
                  <span>$1,600</span>
                </div>
              </div>
              
              {/* Reset Button */}
              <Button 
                variant="outline" 
                className="w-full border-indigo-500/30 hover:bg-indigo-900/30 text-indigo-400 hover:text-white"
                onClick={() => {
                  setUnitsSold(6);
                  setSellingPrice(850);
                  setVariableCost(630);
                  setFixedCosts(1200);
                }}
              >
                Reset to Default Values
              </Button>
            </div>
          </motion.div>
          
          {/* Results Panel */}
          <motion.div
            className="lg:col-span-2 bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-indigo-600/20 mr-4">
                <BarChart3 className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Profitability Analysis</h3>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
                <div className="text-sm text-gray-400 mb-1">Profit Per Unit</div>
                <div className="text-xl font-bold text-white">{formatCurrency(profitPerUnit)}</div>
              </div>
              
              <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
                <div className="text-sm text-gray-400 mb-1">Break-Even Point</div>
                <div className="text-xl font-bold text-white">{breakEvenUnits} units</div>
              </div>
              
              <div className={`${monthlyProfit >= 0 ? 'bg-green-900/20 border-green-500/20' : 'bg-red-900/20 border-red-500/20'} rounded-lg p-4 border`}>
                <div className="text-sm text-gray-400 mb-1">Monthly Profit</div>
                <div className={`text-xl font-bold ${monthlyProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(monthlyProfit)}
                </div>
              </div>
              
              <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
                <div className="text-sm text-gray-400 mb-1">Annual Profit</div>
                <div className={`text-xl font-bold ${monthlyProfit >= 0 ? 'text-white' : 'text-red-400'}`}>
                  {formatCurrency(monthlyProfit * 12)}
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="units" 
                    stroke="rgba(255,255,255,0.5)"
                    label={{ 
                      value: 'Units Sold Monthly', 
                      position: 'insideBottom', 
                      offset: -10,
                      fill: 'rgba(255,255,255,0.7)' 
                    }} 
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    tickFormatter={(value) => `$${value}`}
                    label={{ 
                      value: 'Amount ($)', 
                      angle: -90, 
                      position: 'insideLeft',
                      fill: 'rgba(255,255,255,0.7)'
                    }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.5)" />
                  <ReferenceLine x={breakEvenUnits} stroke="rgba(34, 197, 94, 0.5)" label={{ value: 'Break-even', fill: '#22c55e', position: 'top' }} />
                  <ReferenceLine x={unitsSold} stroke="rgba(167, 139, 250, 0.8)" strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#6366f1" 
                    name="Revenue"
                    strokeWidth={2}
                    dot={{ stroke: '#6366f1', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="costs" 
                    stroke="#ef4444" 
                    name="Total Costs"
                    strokeWidth={2}
                    dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#22c55e" 
                    name="Profit/Loss"
                    strokeWidth={2}
                    dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Analysis Message */}
            <div className={`${monthlyProfit >= 0 ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'} rounded-lg p-4 border`}>
              {monthlyProfit >= 0 ? (
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">
                      Profitable Scenario
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      At {unitsSold} units sold monthly (with a selling price of ${sellingPrice}), 
                      your business generates ${monthlyProfit.toFixed(0)} in monthly profit.
                      This is {Math.abs(unitsSold - breakEvenUnits)} {unitsSold > breakEvenUnits ? 'units above' : 'units below'} the break-even point of {breakEvenUnits} units.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">
                      Loss-making Scenario
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                      At {unitsSold} units sold monthly (with a selling price of ${sellingPrice}), 
                      your business loses ${Math.abs(monthlyProfit).toFixed(0)} monthly.
                      You need to sell {Math.abs(unitsSold - breakEvenUnits)} more units to reach the break-even point of {breakEvenUnits} units.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}