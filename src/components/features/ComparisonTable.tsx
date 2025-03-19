// components/features/ComparisonTable.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle, HelpCircle } from "lucide-react";

interface CompetitorData {
  name: string;
  isRoySmart: boolean;
  power: {
    battery: string;
    inverter: string;
    charging: boolean;
  };
  connectivity: {
    cellular: boolean;
    antennaGain: string;
  };
  design: {
    weight: string;
    foldable: boolean;
    waterproof: boolean;
    maxLoad: string;
  };
  price: string;
  rating: number;
}

export default function ComparisonTable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [activeCriteria, setActiveCriteria] = useState<string>("all");

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

  // Comparison data
  const competitors: CompetitorData[] = [
    {
      name: "Roy's Smart",
      isRoySmart: true,
      power: {
        battery: "100,000 mAh",
        inverter: "500W",
        charging: true,
      },
      connectivity: {
        cellular: true,
        antennaGain: "High Gain",
      },
      design: {
        weight: "8 kg",
        foldable: true,
        waterproof: true,
        maxLoad: "20 kg",
      },
      price: "$850",
      rating: 5,
    },
    {
      name: "Generic Power Bank",
      isRoySmart: false,
      power: {
        battery: "20,000 mAh",
        inverter: "45W",
        charging: true,
      },
      connectivity: {
        cellular: false,
        antennaGain: "None",
      },
      design: {
        weight: "0.5 kg",
        foldable: false,
        waterproof: false,
        maxLoad: "N/A",
      },
      price: "$150",
      rating: 2,
    },
    {
      name: "Portable Workstation X",
      isRoySmart: false,
      power: {
        battery: "None",
        inverter: "None",
        charging: false,
      },
      connectivity: {
        cellular: false,
        antennaGain: "None",
      },
      design: {
        weight: "3.2 kg",
        foldable: true,
        waterproof: false,
        maxLoad: "15 kg",
      },
      price: "$300",
      rating: 3,
    },
    {
      name: "Power Station Pro",
      isRoySmart: false,
      power: {
        battery: "60,000 mAh",
        inverter: "300W",
        charging: true,
      },
      connectivity: {
        cellular: false,
        antennaGain: "None",
      },
      design: {
        weight: "4.8 kg",
        foldable: false,
        waterproof: false,
        maxLoad: "N/A",
      },
      price: "$700",
      rating: 4,
    },
  ];

  // Feature categories
  const categories = [
    { id: "all", name: "All Features" },
    { id: "power", name: "Power Features" },
    { id: "connectivity", name: "Connectivity" },
    { id: "design", name: "Design & Durability" },
    { id: "price", name: "Price & Value" },
  ];

  // Check mark component
  const CheckMark = ({ value }: { value: boolean }) =>
    value ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );

  // Rating stars component
  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= rating ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  // Helper to determine cell classes based on hovering
  const getCellClasses = (columnId: string, rowId: string) => {
    let classes = "p-4 text-center transition-colors duration-200 ";

    // Highlight based on column/row hover
    if (hoveredColumn === columnId || hoveredRow === rowId) {
      classes += "bg-indigo-900/30 ";
    } else if (hoveredColumn !== null || hoveredRow !== null) {
      classes += "opacity-70 ";
    }

    return classes;
  };

  // Display tooltip with info about a feature
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  const showTooltip = (text: string, e: React.MouseEvent) => {
    setTooltip({
      visible: true,
      text,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <section ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How We Compare to Competitors
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See why Roy's Smart is the ultimate choice when compared to other
            solutions on the market.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                ${
                  activeCriteria === category.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              onClick={() => setActiveCriteria(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="fixed z-50 bg-black/90 text-white text-sm p-2 rounded pointer-events-none max-w-xs"
            style={{
              left: `${tooltip.x + 10}px`,
              top: `${tooltip.y + 10}px`,
              transform: "translateX(-50%)",
            }}
          >
            {tooltip.text}
          </div>
        )}

        {/* Comparison Table */}
        <div className="relative overflow-x-auto rounded-xl border border-indigo-500/20">
          <motion.table
            className="w-full text-sm text-gray-300 border-collapse"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <thead className="text-white bg-indigo-900/50 uppercase">
              <tr>
                <th
                  className="p-4 text-left"
                  onMouseEnter={() => setHoveredColumn("feature")}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  Feature / Product
                </th>
                {competitors.map((competitor, index) => (
                  <th
                    key={index}
                    className={`p-4 text-center ${
                      competitor.isRoySmart ? "bg-indigo-600/40" : ""
                    }`}
                    onMouseEnter={() => setHoveredColumn(competitor.name)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={competitor.isRoySmart ? "font-bold" : ""}
                      >
                        {competitor.name}
                      </span>
                      {competitor.isRoySmart && (
                        <span className="inline-block text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full mt-1">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Power Features */}
              {(activeCriteria === "all" || activeCriteria === "power") && (
                <>
                  <tr className="bg-indigo-900/20 border-t border-b border-indigo-500/20">
                    <td
                      colSpan={competitors.length + 1}
                      className="p-2 text-white font-medium"
                    >
                      Power Features
                    </td>
                  </tr>

                  {/* Battery Capacity Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("battery")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex items-center">
                        <span>Battery Capacity</span>
                        <HelpCircle
                          className="ml-1 h-4 w-4 text-gray-400 cursor-help"
                          onMouseEnter={(e) =>
                            showTooltip(
                              "Higher capacity means more device charges before needing to recharge the workstation.",
                              e
                            )
                          }
                          onMouseLeave={hideTooltip}
                        />
                      </div>
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "battery")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <span
                          className={`${
                            competitor.isRoySmart
                              ? "font-semibold text-green-400"
                              : ""
                          }`}
                        >
                          {competitor.power.battery}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Inverter Power Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("inverter")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex items-center">
                        <span>Inverter Power</span>
                        <HelpCircle
                          className="ml-1 h-4 w-4 text-gray-400 cursor-help"
                          onMouseEnter={(e) =>
                            showTooltip(
                              "Higher wattage allows powering more demanding devices like laptops and monitors.",
                              e
                            )
                          }
                          onMouseLeave={hideTooltip}
                        />
                      </div>
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "inverter")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <span
                          className={`${
                            competitor.isRoySmart
                              ? "font-semibold text-green-400"
                              : ""
                          }`}
                        >
                          {competitor.power.inverter}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Fast Charging Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("charging")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      Fast Charging Support
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "charging")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <div className="flex justify-center">
                          <CheckMark value={competitor.power.charging} />
                        </div>
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Connectivity Features */}
              {(activeCriteria === "all" ||
                activeCriteria === "connectivity") && (
                <>
                  <tr className="bg-indigo-900/20 border-t border-b border-indigo-500/20">
                    <td
                      colSpan={competitors.length + 1}
                      className="p-2 text-white font-medium"
                    >
                      Connectivity Features
                    </td>
                  </tr>

                  {/* Cellular Connectivity Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("cellular")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex items-center">
                        <span>4G/5G Cellular Modem</span>
                        <HelpCircle
                          className="ml-1 h-4 w-4 text-gray-400 cursor-help"
                          onMouseEnter={(e) =>
                            showTooltip(
                              "Enables internet connectivity anywhere with cellular coverage.",
                              e
                            )
                          }
                          onMouseLeave={hideTooltip}
                        />
                      </div>
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "cellular")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <div className="flex justify-center">
                          <CheckMark value={competitor.connectivity.cellular} />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Antenna Gain Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("antenna")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      Antenna Gain
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "antenna")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <span
                          className={`${
                            competitor.isRoySmart
                              ? "font-semibold text-green-400"
                              : ""
                          }`}
                        >
                          {competitor.connectivity.antennaGain}
                        </span>
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Design Features */}
              {(activeCriteria === "all" || activeCriteria === "design") && (
                <>
                  <tr className="bg-indigo-900/20 border-t border-b border-indigo-500/20">
                    <td
                      colSpan={competitors.length + 1}
                      className="p-2 text-white font-medium"
                    >
                      Design & Durability
                    </td>
                  </tr>

                  {/* Weight Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("weight")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      Weight
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "weight")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        {competitor.design.weight}
                      </td>
                    ))}
                  </tr>

                  {/* Foldable Design Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("foldable")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      Foldable Design
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "foldable")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <div className="flex justify-center">
                          <CheckMark value={competitor.design.foldable} />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Waterproof Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("waterproof")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex items-center">
                        <span>Weather Resistant</span>
                        <HelpCircle
                          className="ml-1 h-4 w-4 text-gray-400 cursor-help"
                          onMouseEnter={(e) =>
                            showTooltip(
                              "Protected against rain, dust, and harsh environments.",
                              e
                            )
                          }
                          onMouseLeave={hideTooltip}
                        />
                      </div>
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(
                          competitor.name,
                          "waterproof"
                        )}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <div className="flex justify-center">
                          <CheckMark value={competitor.design.waterproof} />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Max Load Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("maxLoad")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      Maximum Load Capacity
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "maxLoad")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        {competitor.design.maxLoad}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Price & Value */}
              {(activeCriteria === "all" || activeCriteria === "price") && (
                <>
                  <tr className="bg-indigo-900/20 border-t border-b border-indigo-500/20">
                    <td
                      colSpan={competitors.length + 1}
                      className="p-2 text-white font-medium"
                    >
                      Price & Value
                    </td>
                  </tr>

                  {/* Price Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("price")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      Price
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "price")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <span className="font-medium">{competitor.price}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr className="border-b border-gray-800 hover:bg-white/5">
                    <td
                      className="p-4 text-left"
                      onMouseEnter={() => setHoveredRow("rating")}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      Overall Rating
                    </td>

                    {competitors.map((competitor, index) => (
                      <td
                        key={index}
                        className={getCellClasses(competitor.name, "rating")}
                        onMouseEnter={() => setHoveredColumn(competitor.name)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <div className="flex justify-center">
                          <RatingStars rating={competitor.rating} />
                        </div>
                      </td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </motion.table>
        </div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Key Takeaways
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "All-in-One Solution",
                description:
                  "Roy's Smart is the only product that combines workspace, power, and connectivity in a single device.",
                color:
                  "bg-gradient-to-br from-blue-500/20 to-blue-700/20 border-blue-500/30",
              },
              {
                title: "Superior Power Capacity",
                description:
                  "With a 100,000 mAh battery and 500W inverter, Roy's Smart outperforms all competitors in power delivery.",
                color:
                  "bg-gradient-to-br from-green-500/20 to-green-700/20 border-green-500/30",
              },
              {
                title: "Unmatched Connectivity",
                description:
                  "No other product offers built-in 4G/5G connectivity with high-gain antenna and VPN security.",
                color:
                  "bg-gradient-to-br from-purple-500/20 to-purple-700/20 border-purple-500/30",
              },
            ].map((takeaway, index) => (
              <motion.div
                key={index}
                className={`rounded-xl p-6 border ${takeaway.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {takeaway.title}
                </h4>
                <p className="text-sm text-gray-300">{takeaway.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-3 rounded-full text-white font-medium transition-all duration-300"
          >
            See the Roy's Smart advantage
          </a>
        </motion.div>
      </div>
    </section>
  );
}
