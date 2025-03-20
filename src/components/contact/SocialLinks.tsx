// components/contact/SocialLinks.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Instagram, Youtube } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

// HoverEffect component inspired by Aceternity UI
const HoverEffect = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden group rounded-full">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {children}
    </div>
  );
};

export default function SocialLinks() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Social links data
  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/raed-el-helwe/",
      icon: <Linkedin />,
      color: "from-blue-500 to-blue-700"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/raed__helwe",
      icon: <Instagram />,
      color: "from-pink-500 to-purple-600"
    },
    {
      name: "GitHub",
      url: "https://github.com/RoyElHelwe",
      icon: <Github />,
      color: "from-gray-600 to-gray-800"
    }
  ];

  return (
    <div ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">Connect With Us</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <HoverEffect>
                  <div className={`relative h-full bg-gradient-to-br ${link.color} p-0.5 rounded-full group overflow-hidden`}>
                    <div className="bg-black rounded-full p-3 md:p-4 flex flex-col items-center group-hover:bg-black/80 transition-colors duration-300 h-full">
                      <div className="text-white group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </div>
                      <span className="text-xs text-white mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.name}</span>
                    </div>
                  </div>
                </HoverEffect>
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-indigo-500/20 text-center">
          <p className="text-gray-400 text-sm">
            Follow us on social media for the latest updates, behind-the-scenes content, and early access to new features.
          </p>
        </div>
      </motion.div>
    </div>
  );
}