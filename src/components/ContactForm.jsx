import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    showPopup: false,
    isError: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          submitting: false,
          showPopup: true,
          isError: false,
          message: "Message has been sent, Vidyush will respond soon..."
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          submitting: false,
          showPopup: true,
          isError: true,
          message: data.message || "Something went wrong. Please try again later."
        });
      }
    } catch (error) {
      setStatus({
        submitting: false,
        showPopup: true,
        isError: true,
        message: "Something went wrong. Please try again later."
      });
    }
  };

  useEffect(() => {
    if (status.showPopup) {
      const timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, showPopup: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status.showPopup]);

  return (
    <div id="contact" className="w-full py-32 bg-[#0a1320] relative">
      <AnimatePresence>
        {status.showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg pointer-events-none flex items-center justify-center gap-3 ${status.isError ? 'bg-red-500' : 'bg-[rgb(77,144,219)]'
              } text-white`}
            style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)' }}
          >
            <span className="font-medium text-center whitespace-nowrap">{status.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-3xl">

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-400 font-light">
            I'm available for new opportunities, collaborations and to make new friends.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[#13263b] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative">

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-300 uppercase tracking-widest pl-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status.submitting}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-button/50 transition-all font-light disabled:opacity-50"
              placeholder="Please enter your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-300 uppercase tracking-widest pl-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status.submitting}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-button/50 transition-all font-light disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-gray-300 uppercase tracking-widest pl-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status.submitting}
              maxLength={1000}
              rows={5}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-button/50 transition-all resize-none font-light disabled:opacity-50"
              placeholder="Please enter your message"
            ></textarea>
            <span className="text-xs text-right text-gray-500">{formData.message.length}/1000</span>
          </div>

          <button
            type="submit"
            disabled={status.submitting}
            className="mt-3 w-full bg-primary-button hover:bg-primary-hover text-white py-5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-button/20 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center h-[50px]"
          >
            {status.submitting ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Send Message"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ContactForm;
