// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown,
  Battery, 
  Cpu, 
  Wifi, 
  Briefcase, 
  DollarSign, 
  User, 
  MessageSquare 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", icon: <Battery className="h-4 w-4 mr-2" /> },
    { 
      name: "Features", 
      href: "/features", 
      icon: <Cpu className="h-4 w-4 mr-2" />,
      children: [
        { name: "Power System", href: "/features#power" },
        { name: "Connectivity", href: "/features#connectivity" },
        { name: "Design", href: "/features#design" },
        { name: "Comparison", href: "/features#comparison" },
      ]
    },
    { 
      name: "Use Cases", 
      href: "/use-cases", 
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      children: [
        { name: "Freelancers", href: "/use-cases#freelancers" },
        { name: "Field Engineers", href: "/use-cases#engineers" },
        { name: "Outdoor Professionals", href: "/use-cases#outdoor" },
        { name: "Business & Government", href: "/use-cases#business" },
      ]
    },
    { name: "Pricing", href: "/pricing", icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { name: "About", href: "/about", icon: <User className="h-4 w-4 mr-2" /> },
    { name: "Contact", href: "/contact", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-black/80 backdrop-blur-lg border-b border-white/10" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
              <Wifi className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Roy's Smart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => 
              link.children ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`flex items-center text-sm font-medium transition-colors ${
                        isActive(link.href) 
                          ? "text-white" 
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.icon}
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-lg border border-white/10 text-white w-48">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link 
                          href={child.href}
                          className="cursor-pointer hover:bg-white/10 transition-colors"
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center text-sm font-medium transition-colors ${
                    isActive(link.href) 
                      ? "text-white" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-6"
            >
              Pre-order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="py-2">
                  {link.children ? (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-medium text-white">
                        {link.icon}
                        {link.name}
                      </div>
                      <div className="ml-6 space-y-2 border-l border-white/20 pl-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-sm text-gray-300 hover:text-white py-1"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center text-sm font-medium ${
                        isActive(link.href) 
                          ? "text-white" 
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full"
                >
                  Pre-order Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}