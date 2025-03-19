// app/pricing/page.tsx
import PricingCard from "@/components/pricing/PricingCard";
import ROICalculator from "@/components/pricing/ROICalculator";
import ComponentBreakdown from "@/components/pricing/ComponentBreakdown";
import FinancialTables from "@/components/pricing/FinancialTables";
import BreakEvenSimulator from "@/components/pricing/BreakEvenSimulator";
import ProfitabilityTimeline from "@/components/pricing/ProfitabilityTimeline";

export default function PricingPage() {
  return (
    <main className="bg-gradient-to-b from-black to-indigo-950">
      <div className="pt-24">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mb-6">
            Pricing & Value
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Invest in productivity without limits. Roy's Smart offers
            exceptional value with transparent pricing and flexible payment
            options.
          </p>
        </div>

        {/* Main Pricing Card */}
        <div id="pricing">
          <PricingCard />
        </div>

        {/* ROI Calculator */}
        <div id="roi">
          <ROICalculator />
        </div>

        {/* Component Breakdown */}
        <div id="components">
          <ComponentBreakdown />
        </div>

        {/* Financial Tables */}
        <div id="financials">
          <FinancialTables />
        </div>

        {/* Interactive Break-Even Simulator (NEW) */}
        <div id="simulator">
          <BreakEvenSimulator />
        </div>

        {/* Profitability Timeline (NEW) */}
        <div id="timeline">
          <ProfitabilityTimeline />
        </div>
      </div>
    </main>
  );
}
