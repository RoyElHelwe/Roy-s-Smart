// components/layout/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

// GlowingBorderEffect component inspired by Aceternity UI
const GlowingBorderEffect = ({ children, isActive = false }: { children: React.ReactNode; isActive?: boolean }) => {
  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-30 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Handle newsletter signup
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    
    setIsEmailValid(true);
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }, 1500);
  };
  
  // Current year for copyright
  const currentYear = new Date().getFullYear();
  
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
  
  // Quick links
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-black relative">
      {/* Top gradient border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="text-white text-xl font-bold">Roy's Smart</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              The ultimate portable & foldable workstation. Never lose power or connectivity wherever you are.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${link.color} flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links column */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info column */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">Qalamoun, Lebanon</li>
              <li>
                <a 
                  href="mailto:raedhelwe@hotmail.com" 
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  raedhelwe@hotmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+96171567290" 
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  +961 71 567 290
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter column */}
          <div>
            <h3 className="text-white font-bold mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates and news about Roy's Smart.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="space-y-3">
                <GlowingBorderEffect isActive={!isEmailValid}>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsEmailValid(true);
                      }}
                      className={`pl-10 bg-black/50 border-indigo-500/30 focus:border-indigo-500/70 text-white ${
                        !isEmailValid ? 'border-red-500' : ''
                      }`}
                    />
                  </div>
                </GlowingBorderEffect>
                {!isEmailValid && (
                  <p className="text-red-500 text-sm">Please enter a valid email address</p>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubscribed}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </div>
                  ) : isSubscribed ? (
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Subscribed!
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Roy's Smart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}