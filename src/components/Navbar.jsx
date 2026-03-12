import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'
        }`}
    >
      <div
        className={`w-full max-w-5xl flex justify-between items-center px-6 py-3 rounded-full transition-all duration-300 ${scrolled
          ? 'bg-opacity-50 bg-[#13263b] backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
          }`}
      >
        <div className="text-xl font-bold cursor-pointer" onClick={() => scrollToSection('home')}>
          Vidyush
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <button onClick={() => scrollToSection('home')} className="hover:text-primary-button transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-primary-button transition-colors">About Me</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-primary-button transition-colors">Projects</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-primary-button transition-colors">Contact</button>
        </div>

        {/* Social Links */}
        <div className="hidden md:flex space-x-4">
          <a href="https://www.instagram.com/frustrated_ion/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-button transition-colors">
            <FaInstagram size={20} />
          </a>
          <a href="https://github.com/singh-vidyush" target="_blank" rel="noopener noreferrer" className="hover:text-primary-button transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/vidyush-singh-949b25224/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-button transition-colors">
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Mobile Menu Button - simplified for now */}
        <div className="md:hidden">
          <button className="p-2">—</button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
