// app/contact/page.tsx
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import MapLocation from "@/components/contact/MapLocation";
import FAQAccordion from "@/components/contact/FAQAccordion";
import SocialLinks from "@/components/contact/SocialLinks";

export const metadata: Metadata = {
  title: "Contact Roy's Smart - Get in Touch",
  description: "Contact us about Roy's Smart portable workstation, pre-orders, or partnerships",
};

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-black to-indigo-950">
      <div className="pt-24">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about Roy&apos;s Smart? We&apos;re here to help.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />
            
            {/* Map & Social Links */}
            <div className="space-y-12">
              <MapLocation />
              <SocialLinks />
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FAQAccordion />
        </div>
      </div>
    </main>
  );
}