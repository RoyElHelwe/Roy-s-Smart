// components/about/TeamSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CodeIcon,
  MonitorIcon,
  DatabaseIcon,
  GlobeIcon,
  ZapIcon,
  LinkedinIcon,
  GithubIcon,
} from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image: string;
  links?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Team data based on the uploaded CV
  const teamMembers: TeamMember[] = [
    {
      id: "raed",
      name: "Raed El Helwe",
      role: "Founder & Lead Developer",
      bio: "Software engineer with expertise in web development using Next.js, React, and Tailwind CSS. Strong background in building dynamic, responsive interfaces and implementing AI-driven solutions.",
      skills: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Prisma",
        "Firebase",
        "OpenAI API",
      ],
      image: "/images/team/raed.jpg", // Placeholder image path
      links: {
        linkedin: "https://linkedin.com/in/raed-el-helwe",
        github: "https://github.com/RoyElHelwe",
      },
    },
  ];

  // Future team roles
  const futureRoles: {
    title: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      title: "Hardware Engineer",
      icon: <ZapIcon className="h-5 w-5" />,
      description:
        "Expert in circuit design and power systems to further enhance the physical components of Roy's Smart.",
    },
    {
      title: "Industrial Designer",
      icon: <MonitorIcon className="h-5 w-5" />,
      description:
        "Bringing ergonomic expertise and aesthetic refinement to optimize the product's physical design.",
    },
    {
      title: "Backend Developer",
      icon: <DatabaseIcon className="h-5 w-5" />,
      description:
        "Specialist in cloud infrastructure to improve the connectivity and data management capabilities.",
    },
    {
      title: "Marketing Specialist",
      icon: <GlobeIcon className="h-5 w-5" />,
      description:
        "Strategic thinker to develop and implement marketing strategies for product launch and growth.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-black to-indigo-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-4">
            The Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
              Innovator
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The expertise and passion behind Roy&apos;s Smart
          </p>
        </motion.div>

        {/* Current team */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Team member card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Simple card with hover border effect - no 3D transform */}
            <div className="relative h-full rounded-xl hover:shadow-xl transition-all duration-200 border border-transparent hover:border-indigo-500/30 bg-black/60 overflow-hidden">
              {/* Card content */}
              <div className="p-6 h-full flex flex-col">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Profile image placeholder */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      RH
                    </div>
                    <div className="absolute inset-0">
                      <Image
                        src={teamMembers[0].image}
                        alt={teamMembers[0].name}
                        width={96}
                        height={96}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  {/* Name and role */}
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {teamMembers[0].name}
                    </h3>
                    <p className="text-indigo-400 mb-2">
                      {teamMembers[0].role}
                    </p>
                    <div className="flex gap-3">
                      {teamMembers[0].links?.linkedin && (
                        <a
                          href={teamMembers[0].links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-indigo-400 transition-colors"
                        >
                          <LinkedinIcon className="h-5 w-5" />
                        </a>
                      )}
                      {teamMembers[0].links?.github && (
                        <a
                          href={teamMembers[0].links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-indigo-400 transition-colors"
                        >
                          <GithubIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6 text-gray-300">
                  <p className="mb-4">
                    As a software engineer with a strong foundation in web
                    development, I bring technical expertise and creative
                    problem-solving to Roy&apos;s Smart. My experience spans:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>
                        Front-end development with React, Next.js, and Tailwind
                        CSS, creating responsive and intuitive interfaces
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>
                        Back-end integration using Firebase, Prisma, and API
                        development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>
                        Experience with AI technologies including OpenAI&apos;s APIs
                        and integration patterns
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>
                        Building e-commerce platforms and content management
                        systems
                      </span>
                    </li>
                  </ul>
                  <p>
                    I&apos;m passionate about combining hardware and software to
                    create seamless experiences that solve real problems. Roy&apos;s
                    Smart represents the culmination of this vision—a solution
                    born from understanding the challenges faced by remote
                    workers and digital nomads.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills and education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              {/* Skills */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <CodeIcon className="h-5 w-5 mr-2 text-indigo-400" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {teamMembers[0].skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
                    HTML/CSS
                  </span>
                  <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm">
                    PostgreSQL
                  </span>
                  <span className="px-3 py-1 bg-amber-900/30 text-amber-300 rounded-full text-sm">
                    Git
                  </span>
                  <span className="px-3 py-1 bg-red-900/30 text-red-300 rounded-full text-sm">
                    Node.js
                  </span>
                </div>
              </div>

              {/* Web3 & AI */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <ZapIcon className="h-5 w-5 mr-2 text-indigo-400" />
                  Specialized Skills
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/40 flex items-center justify-center text-indigo-400">
                      <CodeIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">
                        Web3 Development
                      </h5>
                      <p className="text-sm text-gray-400">
                        Experience with blockchain technologies and smart
                        contracts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/40 flex items-center justify-center text-indigo-400">
                      <ZapIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">AI Integration</h5>
                      <p className="text-sm text-gray-400">
                        Building applications with OpenAI APIs and AI-driven
                        features
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/40 flex items-center justify-center text-indigo-400">
                      <ZapIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">
                        Hardware Integration
                      </h5>
                      <p className="text-sm text-gray-400">
                        Connecting software solutions with physical devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Education
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-white">
                      42 School, 42 Beirut
                    </h5>
                    <p className="text-sm text-gray-400">2024-Present</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">
                      B.Sc. Computer Science
                    </h5>
                    <p className="text-sm text-gray-400">
                      Jinan University Tripoli, 2020-2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Future team - hiring for positions */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Growing Our Team
          </h3>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-10">
            As Roy&apos;s Smart expands, we&apos;re looking to bring on talented
            individuals who share our passion for innovation and
            problem-solving. Here are some of the roles we&apos;re looking to fill in
            the future:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureRoles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5 hover:bg-indigo-900/10 transition-colors duration-300"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full bg-indigo-900/40 text-indigo-400 mr-3">
                    {role.icon}
                  </div>
                  <h4 className="font-semibold text-white">{role.title}</h4>
                </div>
                <p className="text-sm text-gray-400">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join the team CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5 rounded-xl">
            <div className="bg-black/80 backdrop-blur-sm rounded-xl px-6 py-4">
              <h3 className="text-xl font-bold text-white mb-2">
                Interested in Joining Our Team?
              </h3>
              <p className="text-gray-300 mb-4">
                We&apos;re always looking for passionate individuals who want to help
                shape the future of remote work technology. If you believe in
                our mission and have skills that could contribute to our vision,
                we&apos;d love to hear from you.
              </p>
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full px-6 py-3 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
