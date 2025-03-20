// app/about/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import BiographySection from "@/components/about/BiographySection";
import SkillsShowcase from "@/components/about/SkillsShowcase";
import VisionSection from "@/components/about/VisionSection";
import TeamSection from "@/components/about/TeamSection";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Roy's Smart - The Story Behind the Innovation",
  description:
    "Meet Raed El Helwe, the software engineer and innovator behind Roy's Smart portable workstation",
};

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-black to-indigo-950">
      <div className="pt-24">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mb-6">
            About Roy&apos;s Smart
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the innovator, technology, and vision behind the ultimate
            portable workstation
          </p>
        </div>

        {/* Quick Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 overflow-hidden relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl rounded-2xl"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-4">
                  The Roy&apos;s Smart Story
                </h2>
                <p className="text-gray-300 mb-4">
                  Roy&apos;s Smart was founded by Raed El Helwe, a software engineer
                  with expertise in web development, AI integration, and a
                  passion for solving real-world problems.
                </p>
                <p className="text-gray-300 mb-4">
                  Drawing from experience building dynamic web applications
                  using Next.js, React, and other modern technologies, Raed
                  identified a critical gap in the market: the need for a truly
                  integrated portable workstation that solves power and
                  connectivity challenges for remote professionals.
                </p>
                <p className="text-gray-300 mb-6">
                  By combining software expertise with hardware innovation,
                  Roy&apos;s Smart delivers a seamless solution that empowers users
                  to work from anywhere without limitations.
                </p>
                <Button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  asChild
                >
                  <Link href="#team">
                    Meet the Innovator <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
              {/* This could be an actual image of the product or founder */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="inline-block p-6 rounded-full bg-indigo-900/50 border-2 border-indigo-500/50 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Roy&apos;s Smart Workstation
                  </h3>
                  <p className="text-gray-300 mt-2">
                    The Ultimate Portable Solution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section - Move this up to introduce the founder early */}
        <div id="team">
          <TeamSection />
        </div>

        {/* Skills Showcase */}
        <div id="skills">
          <SkillsShowcase />
        </div>

        {/* Biography Section */}
        <div id="journey">
          <BiographySection />
        </div>

        {/* Vision Section */}
        <div id="vision">
          <VisionSection />
        </div>

       
      </div>
    </main>
  );
}
