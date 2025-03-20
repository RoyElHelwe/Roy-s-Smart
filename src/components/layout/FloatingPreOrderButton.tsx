// components/layout/FloatingPreOrderButton.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingCart } from "lucide-react";

// FloatingEffect component inspired by Aceternity UI
const FloatingEffect = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      {/* Floating shadow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-70 blur-md animate-pulse"></div>
      <div className="relative">{children}</div>
    </motion.div>
  );
};

export default function FloatingPreOrderButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  // Control visibility based on scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only show after scrolling down 300px
    if (latest > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });
  
  // Prevent the button from rendering on the server to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <FloatingEffect>
        <Link href="/pricing" className="inline-block">
          <div className="flex items-center gap-2 bg-black shadow-xl px-4 py-3 rounded-full border border-indigo-500/30">
            <ShoppingCart className="h-5 w-5 text-white" />
            <span className="text-white font-medium">Pre-order Now</span>
          </div>
        </Link>
      </FloatingEffect>
    </motion.div>
  );
}