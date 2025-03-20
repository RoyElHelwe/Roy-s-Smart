// components/about/BiographySection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  Briefcase,
  GraduationCap,
  Globe,
  Server,
  Cpu,
} from "lucide-react";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

export default function BiographySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

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

  // Timeline data based on CV
  const timelineEvents: TimelineEvent[] = [
    {
      year: "2020-2023",
      title: "B.Sc. Computer Science",
      description:
        "Earned Computer Science degree from Jinan University Tripoli, building a strong foundation in programming and software development.",
      icon: <GraduationCap className="h-6 w-6" />,
      iconBgColor: "bg-blue-500",
    },
    {
      year: "2023",
      title: "Front-end Developer at Markaz Studio",
      description:
        "Developed crypto portfolio site and e-commerce platform using React, Next.js, and GraphQL for content management.",
      icon: <Briefcase className="h-6 w-6" />,
      iconBgColor: "bg-purple-500",
    },
    {
      year: "2024",
      title: "OpenAI Integration Projects",
      description:
        "Created dynamic websites with Next.js 14 and Tailwind CSS that interface with OpenAI's API for generating and editing AI-driven content.",
      icon: <Server className="h-6 w-6" />,
      iconBgColor: "bg-green-500",
    },
    {
      year: "2024",
      title: "E-commerce Website for Dubai Store",
      description:
        "Built a dynamic website using Next.js 14, Tailwind CSS, Prisma, and PostgreSQL for a Dubai store with catalog browsing and order functionality.",
      icon: <Globe className="h-6 w-6" />,
      iconBgColor: "bg-amber-500",
    },
    {
      year: "2024",
      title: "AI/ML Healthcare Platform",
      description:
        "Migrated iCenna's healthcare platform from Next.js 13/MUI to Next.js 14/Tailwind CSS and implemented NextAuth for secure authentication.",
      icon: <Code className="h-6 w-6" />,
      iconBgColor: "bg-red-500",
    },
    {
      year: "2024",
      title: "Roy's Smart Concept Development",
      description:
        "Combined software expertise with hardware innovation to create the ultimate portable workstation for remote professionals.",
      icon: <Cpu className="h-6 w-6" />,
      iconBgColor: "bg-indigo-500",
    },
  ];

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <BackgroundBeams />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div className="text-center mb-16" style={{ opacity, scale }}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4">
            My Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
              Background
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A timeline of my professional development and key projects
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600 opacity-30"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Center dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-black"></div>
                  </div>

                  <div
                    className={`flex ${
                      isEven ? "flex-row-reverse" : ""
                    } items-center`}
                  >
                    {/* Year */}
                    <div
                      className={`w-1/2 ${
                        isEven ? "text-right pr-16" : "text-left pl-16"
                      }`}
                    >
                      <div className="inline-block px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-300 font-mono font-medium">
                        {event.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`w-1/2 ${
                        isEven ? "text-left pl-16" : "text-right pr-16"
                      }`}
                    >
                      <div
                        className={`${
                          isEven
                            ? "rounded-tl-xl rounded-br-xl"
                            : "rounded-tr-xl rounded-bl-xl"
                        } bg-black/30 border border-indigo-500/20 backdrop-blur-sm p-5 shadow-xl`}
                      >
                        <div className="flex items-center mb-3 gap-3">
                          <div
                            className={`p-2 rounded-full ${event.iconBgColor}`}
                          >
                            {event.icon}
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {event.title}
                          </h3>
                        </div>
                        <p className="text-gray-300">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Personal statement */}
        <motion.div
          className="mt-24 max-w-3xl mx-auto bg-black/30 rounded-2xl border border-indigo-500/20 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Why I Created Roy&apos;s Smart
          </h3>
          <div className="text-gray-300 space-y-4">
            <p>
              As a software engineer specializing in modern web technologies,
              I&apos;ve worked with clients across different industries and
              recognized a common challenge: the limitations of working remotely
              due to power and connectivity issues.
            </p>
            <p>
              My experience building complex web applications and integrating AI
              technologies has shown me that software alone isn&apos;t enough –
              professionals need reliable hardware infrastructure to support
              their digital work, especially when away from traditional office
              spaces.
            </p>
            <p>
              Roy&apos;s Smart represents the merging of my software expertise with
              hardware innovation, creating a solution that addresses the
              real-world needs of remote workers, digital nomads, and field
              professionals who need reliable power and connectivity wherever
              they go.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
