// app/use-cases/page.tsx
import CustomerSegmentSection from "@/components/use-cases/CustomerSegmentSection";
import ScenarioShowcase from "@/components/use-cases/ScenarioShowcase";
import TestimonialSection from "@/components/use-cases/TestimonialSection";
import UseCaseCalculator from "@/components/use-cases/UseCaseCalculator";

export default function UseCasesPage() {
  return (
    <main className="bg-gradient-to-b from-black to-indigo-950">
      <div className="pt-24">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mb-6">
            Ideal Use Cases
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how Roy's Smart workstation adapts to your specific needs, 
            whether you're a freelancer, field engineer, or outdoor professional.
          </p>
        </div>
        
        {/* Customer Segment Section */}
        <div id="customers">
          <CustomerSegmentSection />
        </div>
        
        {/* Scenario Showcase */}
        <div id="scenarios">
          <ScenarioShowcase />
        </div>
        
        {/* Testimonial Section */}
        <div id="testimonials">
          <TestimonialSection />
        </div>
        
        {/* Use Case Calculator */}
        <div id="calculator">
          <UseCaseCalculator />
        </div>
      </div>
    </main>
  );
}