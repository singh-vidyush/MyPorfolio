import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-20 bg-[#0d1b2a] border-t border-white/5 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-primary-button/10 to-transparent pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
          Thank you for visiting.
        </h2>
        <h2 className="font-light text-gray-400 mb-10">
          Thank you for stopping by. Your visit truly means a lot.<br></br>
          I hope you found something useful or interesting here.<br></br>
          You're always welcome to return — I'd be glad to see you again.

        </h2>
        <a
          href="/Resume.pdf"
          download ="Vidyush_Resume.pdf"
          className="inline-flex items-center gap-3 bg-white text-[#13263b] hover:bg-gray-200 px-8 py-4 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15V3M12 15L8 11M12 15L16 11M21 21H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download Resume
        </a>

        <div className="mt-16 text-sm text-gray-500 font-medium">
          Hope to see you again!
        </div>
      </div>
    </footer>
  );
};

export default Footer;
