// app/features/page.tsx
import FeatureShowcase from "@/components/features/FeatureShowcase";
import PowerSpecsSection from "@/components/features/PowerSpecsSection";
import ConnectivitySection from "@/components/features/ConnectivitySection";
// import DesignSection from "@/components/features/DesignSection";
// import ComparisonTable from "@/components/features/ComparisonTable";

export default function FeaturesPage() {
  return (
    <main className="bg-gradient-to-b from-black to-indigo-950">
      <div className="pt-24">
        {/* Page Header */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mb-6">
            Features & Specifications
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the advanced technology and innovative design that makes Roy&apos;s Smart 
            the ultimate solution for mobile professionals.
          </p>
        </div> */}
        
        {/* Main Feature Showcase */}
        <FeatureShowcase />
        
        {/* Power Specifications */}
        <div id="power">
          <PowerSpecsSection />
        </div>
        
        {/* Connectivity Section */}
        <div id="connectivity">
          <ConnectivitySection />
        </div>
        
        {/* Design Section */}
        <div id="design">
          {/* <DesignSection /> */}
        </div>
        
        {/* Comparison Table */}
        <div id="comparison">
          {/* <ComparisonTable /> */}
        </div>
      </div>
    </main>
  );
}