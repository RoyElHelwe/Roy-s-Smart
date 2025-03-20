// components/contact/FAQAccordion.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
  category: string;
}

export default function FAQAccordion() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<string | null>(null);

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

  // FAQ data
  const faqs: FAQ[] = [
    {
      question:
        "What makes Roy's Smart different from other portable workstations?",
      answer:
        "Roy's Smart is the only solution that integrates high-capacity power (100,000 mAh), reliable internet connectivity (4G/5G modem), and an ergonomic workspace in one portable, foldable unit. Most alternatives only address one of these needs, requiring you to carry multiple devices.",
      category: "product",
    },
    {
      question: "How long does the battery last on a single charge?",
      answer:
        "The 100,000 mAh battery can power a typical laptop for 8-10 hours, a smartphone for several days, or a combination of devices. Actual runtime depends on the specific devices connected and their power requirements.",
      category: "product",
    },
    {
      question: "Is the internet connectivity dependent on a specific carrier?",
      answer:
        "No, Roy's Smart features a carrier-agnostic 4G/5G modem compatible with most major providers worldwide. You can use your existing SIM card or purchase one locally when traveling.",
      category: "product",
    },
    {
      question: "When will my pre-order ship?",
      answer:
        "We're currently planning to ship the first batch of pre-orders within 4-6 weeks of production start. You'll receive regular updates on your order status, including a shipping notification with tracking information.",
      category: "ordering",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards. For pre-orders, we only require a 50% deposit, with the remaining balance due before shipping.",
      category: "ordering",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we will ship to most countries worldwide as soon as possible. International shipping costs and delivery times vary by location. These details will be provided during checkout.",
      category: "ordering",
    },
    {
      question: "What is your return policy?",
      answer: (
        <div>
          <p>Our return policy includes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
            <li>30-day satisfaction guarantee</li>
            <li>Free returns for defective products</li>
            <li>Return shipping paid by customer for non-defective returns</li>
            <li>Full refund minus shipping costs for unused products</li>
          </ul>
        </div>
      ),
      category: "ordering",
    },
    {
      question: "Is there a warranty?",
      answer:
        "Yes, Roy's Smart comes with a 1-year standard warranty covering manufacturing defects.",
      category: "support",
    },
    {
      question: "How do I get technical support?",
      answer:
        "Technical support is available via email, live chat on our website, or phone during business hours. We typically respond to support requests within 24 hours.",
      category: "support",
    },
    {
      question: "Can I upgrade components in the future?",
      answer:
        "Yes, Roy's Smart features a modular design allowing for component upgrades as technology improves. This includes the battery, connectivity module, and various ports.",
      category: "support",
    },
    {
      question: "Are you looking for partners or investors?",
      answer:
        "We're open to strategic partnerships that align with our mission of enabling productive remote work. For partnership inquiries, please contact us through the form with details about your organization and proposal.",
      category: "business",
    },
  ];

  // Filter FAQs based on selected category
  const filteredFAQs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  // FAQ categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "product", name: "Product" },
    { id: "ordering", name: "Ordering" },
    { id: "support", name: "Support" },
    { id: "business", name: "Business" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Handle accordion state changes
  const handleAccordionChange = (value: string) => {
    setActiveItem(value === activeItem ? null : value);
  };

  const staggerDelay = 0.05;

  return (
    <div ref={containerRef}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="text-center mb-10"
      >
        <div className="inline-block p-3 rounded-full bg-indigo-900/30 text-indigo-400 mb-4">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <HelpCircle className="h-6 w-6" />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Find answers to common questions about Roy's Smart. If you don't see
          what you're looking for, please contact us.
        </p>
      </motion.div>

      {/* Category filters with animation */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-10"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            variants={itemVariants}
            custom={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                selectedCategory === category.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-black/30 text-gray-300 hover:bg-indigo-900/50 border border-indigo-500/20"
              }`}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* FAQ Accordion with animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 md:p-8 pointer-events-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredFAQs.length > 0 ? (
              <div className="w-full space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={`${selectedCategory}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * staggerDelay,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="border border-indigo-500/20 rounded-xl overflow-hidden bg-black/20 mb-4 hover:border-indigo-500/40 transition-colors duration-300"
                  >
                    {/* Custom Accordion Item */}
                    <div>
                      <button
                        onClick={() => handleAccordionChange(`item-${index}`)}
                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-indigo-900/20 text-white font-medium text-left transition-colors duration-300"
                      >
                        {faq.question}
                        <motion.div
                          animate={{
                            rotate: activeItem === `item-${index}` ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-5 w-5 text-indigo-400" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeItem === `item-${index}` && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              transition: {
                                height: {
                                  duration: 0.3,
                                },
                                opacity: {
                                  duration: 0.3,
                                  delay: 0.1,
                                },
                              },
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: {
                                  duration: 0.3,
                                },
                                opacity: {
                                  duration: 0.2,
                                },
                              },
                            }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              className="px-6 pb-4 text-gray-300"
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {typeof faq.answer === "string"
                                ? faq.answer
                                : faq.answer}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.p
                  className="text-gray-400"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  No questions found in this category.
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Call to action for unanswered questions */}
      <motion.div
        className="text-center mt-8 text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p>
          Can't find the answer you're looking for?{" "}
          <motion.a
            href="#contact-form"
            className="text-indigo-400 hover:text-indigo-300 underline inline-block"
            whileHover={{
              scale: 1.05,
              color: "#a5b4fc",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contact us
          </motion.a>{" "}
          directly.
        </p>
      </motion.div>
    </div>
  );
}
