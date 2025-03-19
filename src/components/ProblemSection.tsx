// components/ProblemSection.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { MessageSquare, Battery, Wifi, Phone } from "lucide-react";

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for mountains and clouds
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const midMountainY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const darkCloudsOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // For notifications animation timing
  const [activeNotifications, setActiveNotifications] = useState<number[]>([]);

  useEffect(() => {
    // Animate notifications sequentially
    const notificationTimers = [
      setTimeout(() => setActiveNotifications((prev) => [...prev, 0]), 1000), // Telegram
      setTimeout(() => setActiveNotifications((prev) => [...prev, 1]), 2000), // Battery
      setTimeout(() => setActiveNotifications((prev) => [...prev, 2]), 3000), // Wifi
      setTimeout(() => setActiveNotifications((prev) => [...prev, 3]), 4000), // Phone
    ];

    return () => {
      notificationTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Notification data
  const notifications = [
    {
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      title: "Telegram",
      message: "Roy! Urgent! The website is down. Please fix it ASAP!",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: <Battery className="h-5 w-5 text-red-500" />,
      title: "Battery Alert",
      message: "Battery at 5% - Connect to a power source.",
      color: "from-red-500/20 to-red-600/20",
    },
    {
      icon: <Wifi className="h-5 w-5 text-yellow-500" />,
      title: "Wi-Fi Disconnected",
      message: "No Internet Connection.",
      color: "from-yellow-500/20 to-yellow-600/20",
    },
    {
      icon: <Phone className="h-5 w-5 text-green-500" />,
      title: "Client Calling",
      message: "We're losing customers by the second!",
      color: "from-green-500/20 to-green-600/20",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-indigo-900 to-black"
    >
      {/* Parallax Mountains Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Far mountains */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[30vh] bg-indigo-950"
          style={{ y: mountainY }}
        >
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#312e81"
              fillOpacity="0.8"
              d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,192C840,192,960,224,1080,218.7C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </motion.div>

        {/* Mid mountains */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[25vh]"
          style={{ y: midMountainY }}
        >
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#4338ca"
              fillOpacity="0.6"
              d="M0,160L60,170.7C120,181,240,203,360,186.7C480,171,600,117,720,106.7C840,96,960,128,1080,144C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </motion.div>

        {/* Foreground mountains */}
        <div className="absolute bottom-0 left-0 w-full h-[20vh]">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#4f46e5"
              fillOpacity="0.4"
              d="M0,64L60,80C120,96,240,128,360,144C480,160,600,160,720,144C840,128,960,96,1080,90.7C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Clouds */}
        <motion.div className="absolute top-20 w-full" style={{ y: cloudY }}>
          <svg
            width="100%"
            height="100"
            viewBox="0 0 500 100"
            preserveAspectRatio="none"
          >
            <path
              d="M30,20 Q50,5 70,20 Q85,5 100,20 Q120,5 140,20 Q155,5 170,20 Q190,5 210,20 V40 H30 Z"
              fill="rgba(255,255,255,0.1)"
            />
            <path
              d="M250,20 Q270,5 290,20 Q305,5 320,20 Q340,5 360,20 Q375,5 390,20 Q410,5 430,20 V40 H250 Z"
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </motion.div>

        {/* Dark Storm Clouds (becomes more visible on scroll) */}
        <motion.div
          className="absolute top-0 w-full h-40 bg-gradient-to-b from-gray-900 to-transparent"
          style={{ opacity: darkCloudsOpacity }}
        >
          <svg
            width="100%"
            height="200"
            viewBox="0 0 500 200"
            preserveAspectRatio="none"
          >
            <path
              d="M30,40 Q70,10 110,40 Q150,10 190,40 Q230,10 270,40 Q310,10 350,40 Q390,10 430,40 Q470,10 500,40 V0 H0 Z"
              fill="rgba(30,30,30,0.8)"
            />
          </svg>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-24 mx-auto">
        <div className="max-w-4xl w-full text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Perfect Getaway
            </span>{" "}
            Until...
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto"
          >
            You&apos;re on a weekend getaway in the mountains, enjoying the fresh
            air, finally taking a break from work. The view is breathtaking, and
            you feel completely at peace.
          </motion.p>

          {/* Notification Cards */}
          <div className="relative max-w-lg mx-auto mb-16 h-[380px]">
            <div className="absolute inset-0 backdrop-blur-3xl bg-black/10 rounded-3xl border border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-10 bg-white/5 flex items-center justify-center border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-red-500 mx-1"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mx-1"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 mx-1"></div>
              </div>
            </div>

            <AnimatePresence>
              {notifications.map(
                (notification, index) =>
                  activeNotifications.includes(index) && (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? 100 : -100,
                        y: 0,
                      }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.5,
                      }}
                      className={`absolute max-w-sm w-full bg-gradient-to-r ${notification.color} backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10`}
                      style={{
                        top: `${30 + index * 80}px`,
                        left: index % 2 === 0 ? "10%" : "auto",
                        right: index % 2 === 1 ? "10%" : "auto",
                        width: "calc(80% - 20px)",
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-white/10 rounded-full p-2">
                          {notification.icon}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-white/80">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-2xl text-red-400 font-semibold"
          >
            😨 Panic sets in. You scramble to find a solution—no outlets, no
            Wi-Fi, no time.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
