// components/use-cases/TestimonialSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  category: string;
}

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Freelance Designer",
      company: "Self-employed",
      quote: "Roy's Smart has completely transformed my ability to work remotely. I can now set up a professional workspace anywhere, and the battery life is incredible. I worked for 3 days at a mountain retreat without needing to recharge!",
      avatar: "/images/avatar-1.jpg",
      rating: 5,
      category: "freelancer"
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Field Engineer",
      company: "TechnoSolutions Inc.",
      quote: "As a field engineer, I need reliable power and connectivity in remote locations. Roy's Smart delivers on both fronts. The high-gain antenna maintains connection in areas where my phone has no signal, and the power capacity runs all my diagnostic equipment.",
      avatar: "/images/avatar-2.jpg",
      rating: 5,
      category: "engineer"
    },
    {
      id: "3",
      name: "Alex Rivera",
      title: "Wildlife Photographer",
      company: "National Geographic",
      quote: "Roy's Smart has become an essential part of my outdoor gear. I can edit photos, backup data, and send files to clients directly from remote locations. The weather-resistant design has held up in rain, dust, and extreme temperatures.",
      avatar: "/images/avatar-3.jpg",
      rating: 4,
      category: "outdoor"
    },
    {
      id: "4",
      name: "Jessica Taylor",
      title: "Operations Manager",
      company: "Global Enterprises",
      quote: "We deployed Roy's Smart workstations to our field teams, and the improvement in productivity has been remarkable. The secure VPN connection ensures our sensitive data remains protected, and the reliability has eliminated downtime due to power issues.",
      avatar: "/images/avatar-4.jpg",
      rating: 5,
      category: "business"
    },
    {
      id: "5",
      name: "David Wilson",
      title: "Digital Nomad",
      company: "Remote Developers Network",
      quote: "I've tried many portable power solutions, but Roy's Smart is in a league of its own. The combination of workspace, power, and connectivity in one compact unit is exactly what I needed for my nomadic lifestyle. Worth every penny!",
      avatar: "/images/avatar-5.jpg",
      rating: 5,
      category: "freelancer"
    },
    {
      id: "6",
      name: "Emma Rodriguez",
      title: "Construction Project Manager",
      company: "BuildRight Construction",
      quote: "Managing projects on-site requires constant connectivity and power. Roy's Smart has eliminated our need for generator rentals at smaller sites, and the workstation design keeps my devices and papers organized in chaotic environments.",
      avatar: "/images/avatar-6.jpg",
      rating: 4,
      category: "engineer"
    }
  ];
  
  // Filter testimonials based on active category
  const filteredTestimonials = activeFilter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);
  
  // Get current testimonial
  const currentTestimonial = filteredTestimonials[currentIndex];
  
  // Intersection observer to trigger animations and autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
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
  
  // Autoplay functionality
  useEffect(() => {
    if (!isVisible || !isAutoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible, currentIndex, isAutoplay, filteredTestimonials.length]);
  
  // Navigation functions
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
  };
  
  // Variants for animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };
  
  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-xl ${star <= rating ? "text-yellow-500" : "text-gray-600"}`}>★</span>
      ))}
    </div>
  );
  
  return (
    <section ref={containerRef} className="py-24 relative bg-gradient-to-b from-indigo-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from professionals who have transformed their work experience with Roy's Smart.
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "all", label: "All Testimonials" },
            { id: "freelancer", label: "Freelancers" },
            { id: "engineer", label: "Engineers & Technicians" },
            { id: "outdoor", label: "Outdoor Professionals" },
            { id: "business", label: "Business & Government" }
          ].map((filter) => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                ${activeFilter === filter.id 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
              onClick={() => {
                setActiveFilter(filter.id);
                setCurrentIndex(0);
                setDirection(0);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="relative h-[400px] md:h-[300px] overflow-hidden rounded-2xl border border-indigo-500/20 bg-black/40 backdrop-blur-sm">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 p-6 md:p-10"
              >
                <div className="flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-indigo-500 opacity-50" />
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="flex flex-col md:flex-row gap-6 flex-grow">
                    <div className="md:w-3/4">
                      {/* Quote Text */}
                      <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-300 italic mb-6"
                      >
                        "{currentTestimonial.quote}"
                      </motion.blockquote>
                      
                      {/* Rating */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-4"
                      >
                        <StarRating rating={currentTestimonial.rating} />
                      </motion.div>
                      
                      {/* User Info */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="font-semibold text-white">{currentTestimonial.name}</div>
                        <div className="text-sm text-gray-400">
                          {currentTestimonial.title}, {currentTestimonial.company}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Avatar */}
                    <div className="md:w-1/4 flex items-center justify-center md:justify-end">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/50"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-2xl">
                          {currentTestimonial.name.charAt(0)}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            {filteredTestimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  onMouseEnter={() => setIsAutoplay(false)}
                  onMouseLeave={() => setIsAutoplay(true)}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={nextTestimonial}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  onMouseEnter={() => setIsAutoplay(false)}
                  onMouseLeave={() => setIsAutoplay(true)}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          
          {/* Pagination Indicators */}
          {filteredTestimonials.length > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {filteredTestimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                    setIsAutoplay(false);
                    setTimeout(() => setIsAutoplay(true), 5000);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex 
                      ? "bg-indigo-500 w-6" 
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-white">Trusted By Professionals Worldwide</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            {["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"].map((company, index) => (
              <div key={index} className="h-8 flex items-center justify-center">
                <div className="text-gray-400 font-bold text-xl">{company}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}