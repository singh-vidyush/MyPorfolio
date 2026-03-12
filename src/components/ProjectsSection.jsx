import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "Project Alpha",
    description: "An intelligent AI-powered dashboard that analyzes user trends in real-time.",
    technologies: ["React", "Python", "Machine Learning"],
    link: "https://github.com",
    image: "/projects/project1.jpg" // Placeholder path
  },
  {
    id: 2,
    title: "Eco Tracker",
    description: "A mobile-responsive web app to track personal carbon footprint.",
    technologies: ["JavaScript", "TailwindCSS", "Node.js"],
    link: "https://github.com",
    image: "/projects/project2.jpg"
  },
  {
    id: 3,
    title: "FinTech Setup",
    description: "Secure decentralized platform for peer-to-peer micro-transactions.",
    technologies: ["React", "Solidity", "Web3.js"],
    link: "https://github.com",
    image: "/projects/project3.jpg"
  }
];

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active index based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Math to determine which project is active
    // Multiplier depends on number of items. 1 / length
    const step = 1 / projectsData.length;
    let newIndex = Math.floor(latest / step);
    // Boundary checks
    if (newIndex >= projectsData.length) newIndex = projectsData.length - 1;
    if (newIndex < 0) newIndex = 0;
    
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  });

  return (
    <div ref={containerRef} id="projects" className="relative" style={{ height: `${projectsData.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden py-24">
        
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 h-full">
          
          {/* Left Side: Cards */}
          <div className="relative h-full flex flex-col justify-center w-full max-w-md mx-auto">
             <div className="relative h-96 w-full perspective-1000">
                {projectsData.map((project, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;
                  
                  // Calculate dynamic styles based on position relative to active index
                  const yOffset = (idx - activeIndex) * 100;
                  const scale = isActive ? 1 : 0.9;
                  const opacity = Math.abs(idx - activeIndex) > 1 ? 0 : (isActive ? 1 : 0.5);
                  const zIndex = projectsData.length - Math.abs(idx - activeIndex);

                  return (
                    <motion.div
                      key={project.id}
                      animate={{ 
                        y: yOffset,
                        scale: scale,
                        opacity: opacity,
                        zIndex: zIndex
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`absolute top-0 left-0 w-full h-full rounded-2xl bg-[#1e344e] border border-white/10 p-6 flex flex-col shadow-2xl transition-colors ${isActive ? 'ring-2 ring-primary-button/50' : ''}`}
                    >
                       <div className="flex-1 rounded-xl bg-black/20 overflow-hidden mb-4 border border-white/5 flex items-center justify-center">
                          <span className="text-white/20 font-mono">IMG / {project.title}</span>
                       </div>
                       <h3 className="text-2xl font-bold">{project.title}</h3>
                    </motion.div>
                  );
                })}
             </div>
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col justify-center h-full">
             <motion.div
                key={activeIndex} // Force re-render animation when index changes
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
             >
                <div className="inline-block px-3 py-1 rounded-full bg-primary-button/20 text-primary-button text-sm font-semibold mb-6">
                  Project 0{activeIndex + 1}
                </div>
                
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  {projectsData[activeIndex].title}
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                  {projectsData[activeIndex].description}
                </p>

                <div className="mb-10">
                  <h4 className="text-sm text-gray-400 uppercase tracking-widest mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {projectsData[activeIndex].technologies.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={projectsData[activeIndex].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-button hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                >
                  View Project
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
             </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
