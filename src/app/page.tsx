// app/page.tsx
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionOverview from "@/components/SolutionOverview";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionOverview />
      <ValuePropositionSection />
      <CTASection />
      {/* Other sections will be added here */}
    </main>
  );
}