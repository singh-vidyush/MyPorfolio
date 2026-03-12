import React from 'react';
import Navbar from './components/Navbar';
import HeroAnimation from './components/HeroAnimation';
import SkillsScroller from './components/SkillsScroller';
import ProjectsSection from './components/ProjectsSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#13263b] text-white font-sans selection:bg-primary-button selection:text-white">
      <Navbar />
      
      <main>
        {/* Section 1: Hero Scroll Animation */}
        <HeroAnimation />

        {/* Section 2: Skills and Technologies */}
        <SkillsScroller />

        {/* Section 3: Projects */}
        <ProjectsSection />

        {/* Section 4: Contact Form */}
        <ContactForm />
      </main>

      {/* Section 5: Final Section (Footer) */}
      <Footer />
    </div>
  );
}

export default App;
