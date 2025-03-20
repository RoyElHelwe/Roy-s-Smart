// components/contact/ContactForm.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  MessageSquare, 
  Send, 
  Package, 
  CheckCircle2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(values);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Scroll to the top of the form to see the success message
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div ref={formRef} className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6 md:p-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur rounded-2xl"></div>
      
      <div className="relative">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              <User className="h-5 w-5" />
                            </div>
                            <Input 
                              placeholder="Your name" 
                              className="pl-10 bg-black/50 border-indigo-500/30 focus:border-indigo-500/70 text-white"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              <Mail className="h-5 w-5" />
                            </div>
                            <Input 
                              placeholder="Your email address" 
                              type="email"
                              className="pl-10 bg-black/50 border-indigo-500/30 focus:border-indigo-500/70 text-white"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Subject Field */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Subject</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full pl-10 bg-black/50 border-indigo-500/30 focus:border-indigo-500/70 text-white">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                  <Package className="h-5 w-5" />
                                </div>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 border-indigo-500/30 text-white">
                                <SelectItem value="pre-order">Pre-order Inquiry</SelectItem>
                                <SelectItem value="support">Product Support</SelectItem>
                                <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Message</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-3 text-gray-400">
                              <MessageSquare className="h-5 w-5" />
                            </div>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-32 pl-10 bg-black/50 border-indigo-500/30 focus:border-indigo-500/70 text-white"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </motion.div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full"
              >
                <CheckCircle2 className="h-12 w-12 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h2>
              <p className="text-gray-300 mb-8 max-w-md">
                Thank you for reaching out. We&apos;ll review your message and get back to you as soon as possible.
              </p>
              
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Send Another Message
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}