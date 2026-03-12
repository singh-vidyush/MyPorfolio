import { motion } from 'framer-motion';

const skills = [
  "React", "JavaScript", "Python", "Machine Learning", "Git", "SQL", "APIs", "Tailwind CSS", "Node.js",
];

const SkillsScroller = () => {
  // Duplicate array to create seamless loop
  const scrollItems = [...skills, ...skills, ...skills];

  return (
    <div className="w-full py-20 overflow-hidden bg-[#0d1b2a] border-y border-white/5 relative flex items-center h-48">

      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d1b2a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d1b2a] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-[300%] group">
        <motion.div
          className="flex gap-16 min-w-full justify-around pr-16"
          animate={{ x: [0, "-33.33%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
          style={{
            // Keep on hover pause as string custom css because framer motion has pause on hover in newer versions but custom implementation is cleaner
          }}
        >
          {scrollItems.map((skill, index) => (
            <div
              key={index}
              className="text-2xl md:text-4xl font-bold text-white/50 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Adding custom CSS to pause the animation on hover */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .group:hover div {
          animation-play-state: paused !important;
        }
      `}} />
    </div>
  );
};

export default SkillsScroller;
