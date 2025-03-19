// components/use-cases/CustomerSegmentSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Briefcase, 
  Wrench, 
  Mountain, 
  Building, 
  ArrowRight
} from "lucide-react";

interface CustomerSegment {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  image: string;
}

export default function CustomerSegmentSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Animation for scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
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
  
  // Customer segment data
  const customerSegments: CustomerSegment[] = [
    {
      id: "freelancers",
      title: "Freelancers & Digital Nomads",
      description: "Work from anywhere with reliable power and connectivity, turning any location into your professional workspace.",
      icon: <Briefcase />,
      color: "from-blue-500 to-blue-700",
      benefits: [
        "Set up a productive workspace in cafes, co-working spaces, or while traveling",
        "Never lose work due to laptop battery running out",
        "Maintain professional connectivity during client calls",
        "Reduce dependence on finding power outlets"
      ],
      image: "/images/freelancer.jpg"
    },
    {
      id: "engineers",
      title: "Field Engineers & Technicians",
      description: "Maintain connectivity and power for diagnostics equipment and specialized tools in remote or challenging environments.",
      icon: <Wrench />,
      color: "from-green-500 to-green-700",
      benefits: [
        "Power diagnostic equipment in the field",
        "Upload technical data from remote locations",
        "Maintain connectivity with headquarters",
        "Keep multiple devices charged during long field operations"
      ],
      image: "/images/engineer.jpg"
    },
    {
      id: "outdoor",
      title: "Outdoor Professionals",
      description: "Stay connected and powered in wilderness areas, enabling work in environments previously considered too remote.",
      icon: <Mountain />,
      color: "from-amber-500 to-amber-700",
      benefits: [
        "Enable professional work from wilderness locations",
        "Weather-resistant design for outdoor conditions",
        "Maintain connectivity in areas with limited coverage",
        "Power cameras, drones, and other outdoor equipment"
      ],
      image: "/images/outdoor.jpg"
    },
    {
      id: "business",
      title: "Businesses & Government Agencies",
      description: "Ensure operational continuity during power outages or when deploying teams to temporary or remote locations.",
      icon: <Building />,
      color: "from-purple-500 to-purple-700",
      benefits: [
        "Emergency backup during power outages",
        "Support for mobile operations and field offices",
        "Secure connectivity for sensitive operations",
        "Rapid deployment for temporary workspaces"
      ],
      image: "/images/business.jpg"
    }
  ];
  
  // 3D Card component inspired by Aceternity UI
  const Card3D = ({ children, isHovered, id }: { children: React.ReactNode; isHovered: boolean; id: string }) => {
    return (
      <motion.div
        className="relative h-full perspective-1000"
        animate={{
          rotateX: isHovered ? "10deg" : "0deg",
          rotateY: isHovered ? "-15deg" : "0deg",
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onHoverStart={() => setHoveredCard(id)}
        onHoverEnd={() => setHoveredCard(null)}
      >
        {/* Card Shadow */}
        <div
          className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${isHovered ? "opacity-100" : "opacity-70"} blur-sm transition-opacity duration-300`}
          style={{
            background: `linear-gradient(to bottom right, ${isHovered ? "#6366f1" : "#4f46e5"}, ${isHovered ? "#8b5cf6" : "#7c3aed"})`,
            zIndex: -1,
          }}
        />
        
        {/* Card Content */}
        <div className="relative h-full rounded-2xl border border-white/10 bg-black/90 p-6 flex flex-col overflow-hidden transform-gpu transition-all duration-300">
          {/* Gradient Overlay - changes opacity on hover */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.1 : 0,
              background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%)",
            }}
          />
          
          {/* Animated Shine Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-0"
              animate={{
                backgroundPosition: ["200% 0%", "-200% 0%"],
                opacity: [0, 0.1, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                backgroundSize: "200% 100%",
              }}
            />
          )}
          
          {children}
        </div>
      </motion.div>
    );
  };
  
  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y: translateY }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who Will Benefit from Roy&apos;s Smart?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our versatile workstation is designed to meet the needs of various professionals who require power and connectivity on the go.
          </p>
        </motion.div>
        
        {/* Customer Segment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerSegments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ z: 20 }}
              className="h-full min-h-[450px]"
            >
              <Card3D isHovered={hoveredCard === segment.id} id={segment.id}>
                {/* Card Header with Icon */}
                <div className="mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${segment.color} text-white`}>
                    {segment.icon}
                  </div>
                </div>
                
                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {segment.title}
                </h3>
                
                {/* Card Description */}
                <p className="text-gray-300 mb-6">
                  {segment.description}
                </p>
                
                {/* Benefits List */}
                <div className="flex-grow">
                  <h4 className="text-white text-sm font-medium mb-2">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {segment.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        className="flex text-sm text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                        transition={{ duration: 0.3, delay: 0.3 + (0.1 * index) + (0.05 * i) }}
                      >
                        <div className="text-green-500 mr-2 flex-shrink-0">✓</div>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Learn More Link */}
                <div className="mt-auto pt-4">
                  <a
                    href={`#${segment.id}`}
                    className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
        
        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "94%", label: "Customer Satisfaction" },
              { value: "4.8/5", label: "Average Rating" },
              { value: "1000+", label: "Units Deployed" },
              { value: "30+", label: "Countries Worldwide" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-indigo-900/20 rounded-xl border border-indigo-500/20 p-4"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}