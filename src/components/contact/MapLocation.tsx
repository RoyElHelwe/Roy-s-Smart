// components/contact/MapLocation.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, MapIcon, Mail, Phone } from "lucide-react";
import Script from "next/script";

// We'll use the direct DOM approach with a script tag instead of react-leaflet
// to avoid TypeScript issues
export default function MapLocation() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Coordinates for Qalamoun, Lebanon (approximate for 9QJG+63F)
  const qalamounCoordinates = [34.3786, 35.7786]; // [latitude, longitude]

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

  // Initialize map after Leaflet is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // This function runs after Leaflet script is loaded
    const initMap = () => {
      // Check if L (Leaflet) is available globally
      if (typeof window.L !== "undefined") {
        // Create map
        const map = window.L.map(mapRef.current).setView(
          qalamounCoordinates,
          15
        );

        // Add dark style tile layer
        window.L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19,
          }
        ).addTo(map);

        // Custom icon
        const customIcon = window.L.divIcon({
          className: "custom-icon",
          html: `<div class="marker-pin">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                     <circle cx="12" cy="10" r="3"></circle>
                   </svg>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        // Add marker
        const marker = window.L.marker(qalamounCoordinates, {
          icon: customIcon,
        }).addTo(map);

        // Add popup
        marker.bindPopup("<b>Roy's Smart</b><br>Qalamoun, Lebanon").openPopup();

        // Disable scroll wheel zoom to prevent accidental zooming
        map.scrollWheelZoom.disable();
      }
    };

    initMap();
  }, [mapLoaded]);

  return (
    <div ref={containerRef} className="pointer-events-auto">
      {/* Add Leaflet CSS */}
      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          background-color: #111827;
        }
        .custom-icon {
          background: none;
          border: none;
        }
        .marker-pin {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* Load Leaflet from CDN */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        onLoad={() => setMapLoaded(true)}
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <h2 className="text-2xl font-bold text-white mb-6">
        Location & Contact Info
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-black/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20 overflow-hidden"
      >
        {/* Map container */}
        <div className="relative h-64 w-full overflow-hidden">
          {/* Map element */}
          <div ref={mapRef} className="w-full h-full bg-indigo-950/50">
            {/* Loading state */}
            {!mapLoaded && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-indigo-400 animate-pulse flex flex-col items-center">
                  <MapIcon className="h-8 w-8 mb-2" />
                  <span>Map Loading...</span>
                </div>
              </div>
            )}
          </div>

          {/* Map overlay gradient */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent h-20 pointer-events-none"></div>
        </div>

        {/* Contact information */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-900/40 rounded-full p-2 mr-3">
                <MapPin className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Qalamoun</h3>
                <p className="text-gray-400">Lebanon</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-900/40 rounded-full p-2 mr-3">
                <Mail className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Email</h3>
                <p className="text-gray-400">raedhelwe@hotmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-900/40 rounded-full p-2 mr-3">
                <Phone className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Phone</h3>
                <p className="text-gray-400">+961 71 567 290</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Add this declaration to make TypeScript happy with the global L object
declare global {
  interface Window {
    L: any;
  }
}
