// components/about/SkillsShowcase.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Code, 
  Database, 
  Globe, 
  Server, 
  Palette, 
  Terminal, 
  Braces,
  FileCode,
  Layers,
  Cpu
} from "lucide-react";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";

interface Skill {
  name: string;
  level: number; // 1-10
  icon: React.ReactNode;
  description: string;
  category: "frontend" | "backend" | "tools" | "other";
  color: string;
}

export default function SkillsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
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
  
  // Skills data based on CV
  const skills: Skill[] = [
    // Frontend Skills
    {
      name: "HTML & CSS",
      level: 9,
      icon: <FileCode />,
      description: "Creating responsive, accessible, and modern web interfaces",
      category: "frontend",
      color: "from-orange-500 to-red-600"
    },
    {
      name: "JavaScript",
      level: 9,
      icon: <Braces />,
      description: "Building interactive and dynamic client-side functionality",
      category: "frontend",
      color: "from-yellow-500 to-amber-600"
    },
    {
      name: "TypeScript",
      level: 8,
      icon: <Code />,
      description: "Developing with type safety for more robust applications",
      category: "frontend",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "React",
      level: 9,
      icon: <Code />,
      description: "Creating component-based UIs with React's ecosystem",
      category: "frontend",
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "Next.js",
      level: 9,
      icon: <Server />,
      description: "Building full-stack React applications with SSR and API routes",
      category: "frontend",
      color: "from-gray-500 to-gray-700"
    },
    {
      name: "Tailwind CSS",
      level: 9,
      icon: <Palette />,
      description: "Implementing utility-first CSS for rapid UI development",
      category: "frontend",
      color: "from-cyan-500 to-blue-500"
    },
    
    // Backend Skills
    {
      name: "Node.js",
      level: 7,
      icon: <Server />,
      description: "Server-side JavaScript for API development",
      category: "backend",
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "PostgreSQL",
      level: 7,
      icon: <Database />,
      description: "Relational database for structured data storage",
      category: "backend",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "MySQL",
      level: 7,
      icon: <Database />,
      description: "Popular relational database management system",
      category: "backend",
      color: "from-orange-500 to-amber-600"
    },
    {
      name: "Prisma",
      level: 8,
      icon: <Database />,
      description: "Next-generation ORM for Node.js and TypeScript",
      category: "backend",
      color: "from-blue-500 to-indigo-600"
    },
    
    // Tools
    {
      name: "Git",
      level: 8,
      icon: <Layers />,
      description: "Version control for collaborative development",
      category: "tools",
      color: "from-orange-500 to-red-600"
    },
    {
      name: "OpenAI Integration",
      level: 8,
      icon: <Terminal />,
      description: "Leveraging AI capabilities for content generation and editing",
      category: "tools",
      color: "from-green-500 to-emerald-600"
    },
    
    // Other Skills
    {
      name: "Web3",
      level: 7,
      icon: <Globe />,
      description: "Blockchain and decentralized web technologies",
      category: "other",
      color: "from-purple-500 to-indigo-600"
    },
    {
      name: "Unreal Engine",
      level: 6,
      icon: <Cpu />,
      description: "Game development and interactive 3D experiences",
      category: "other",
      color: "from-red-500 to-pink-600"
    },
    {
      name: "Cloud Functions",
      level: 7,
      icon: <Server />,
      description: "Serverless computing for scalable applications",
      category: "other",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Java (Beginner)",
      level: 5,
      icon: <Terminal />,
      description: "Object-oriented programming for backend development",
      category: "other",
      color: "from-orange-500 to-red-600"
    },
    {
      name: "C",
      level: 6,
      icon: <Terminal />,
      description: "Low-level programming for system applications",
      category: "other",
      color: "from-blue-500 to-indigo-600"
    }
  ];
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-indigo-950 to-black"
    >
      {/* Background sparkles */}
      <div className="absolute inset-0 opacity-20">
        <SparklesCore
          id="skills-sparkles"
          minSize={0.4}
          maxSize={1.5}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4">
            Technical Skills
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The technologies and skills that power Roy's Smart development
          </p>
        </motion.div>
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <FilterButton 
            active={activeCategory === "all"} 
            onClick={() => setActiveCategory("all")}
          >
            All Skills
          </FilterButton>
          <FilterButton 
            active={activeCategory === "frontend"} 
            onClick={() => setActiveCategory("frontend")}
          >
            Frontend
          </FilterButton>
          <FilterButton 
            active={activeCategory === "backend"} 
            onClick={() => setActiveCategory("backend")}
          >
            Backend
          </FilterButton>
          <FilterButton 
            active={activeCategory === "tools"} 
            onClick={() => setActiveCategory("tools")}
          >
            Tools
          </FilterButton>
          <FilterButton 
            active={activeCategory === "other"} 
            onClick={() => setActiveCategory("other")}
          >
            Other
          </FilterButton>
        </div>
        
        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative h-full rounded-xl p-0.5 bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 group overflow-hidden">
                <div className="h-full bg-black rounded-xl p-6 relative overflow-hidden">
                  {/* Background gradient that appears on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Skill header */}
                  <div className="flex items-start mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} text-white mr-4`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                      <div className="text-gray-400 text-sm capitalize">{skill.category}</div>
                    </div>
                  </div>
                  
                  {/* Skill description */}
                  <p className="text-gray-300 mb-4">{skill.description}</p>
                  
                  {/* Skill level */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Proficiency</span>
                      <span className="text-sm font-medium text-white">{skill.level}/10</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        style={{ width: `${skill.level * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Current focus areas */}
        <motion.div
          className="mt-16 bg-black/30 rounded-2xl border border-indigo-500/20 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Current Focus Areas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-white flex items-center">
                <div className="p-1.5 rounded-full bg-blue-500/20 text-blue-400 mr-3">
                  <Code className="h-5 w-5" />
                </div>
                Modern Web Development
              </h4>
              <p className="text-gray-300 text-sm">
                Specializing in Next.js 14, React, and Tailwind CSS to create dynamic, responsive interfaces for both web and mobile experiences. Using TypeScript for type-safe development.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-white flex items-center">
                <div className="p-1.5 rounded-full bg-green-500/20 text-green-400 mr-3">
                  <Terminal className="h-5 w-5" />
                </div>
                AI Integration
              </h4>
              <p className="text-gray-300 text-sm">
                Building applications that leverage OpenAI's capabilities, enabling AI-driven content generation and editing for enhanced user experiences. Creating interfaces between AI tools and user needs.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-white flex items-center">
                <div className="p-1.5 rounded-full bg-purple-500/20 text-purple-400 mr-3">
                  <Globe className="h-5 w-5" />
                </div>
                Full-Stack Integration
              </h4>
              <p className="text-gray-300 text-sm">
                Connecting frontend experiences with backend systems using PostgreSQL, Prisma, and cloud functions. Creating seamless data flows from database to user interface.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Filter button component
function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${active 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
          : 'bg-black/30 text-gray-300 hover:bg-indigo-900/50 border border-indigo-500/20'
        }`}
    >
      {children}
    </button>
  );
}