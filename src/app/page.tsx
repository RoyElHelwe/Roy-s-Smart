// app/page.tsx
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionOverview from "@/components/SolutionOverview";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionOverview />
      {/* Other sections will be added here */}
    </main>
  );
}