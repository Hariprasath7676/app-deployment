import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import heroimg from './images/5.png';
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (id) => {
    navigate("/"); // Ensure you're on the correct page
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroimg}
          alt="Elegant interior"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-20 mt-16">
        <div className="sm:max-w-[60%] mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-medium text-white sm:!leading-[78px] sm:tracking-wide ">
              Find Your Dream Property in Coimbatore
            </h1>
            <p className="text-white/90 mx-auto md:text-lg max-w-6xl font-light ">
              Explore premium plots, villas, apartments, and farm lands tailored to your needs. Your dream home awaits in the heart of Coimbatore.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={() => handleScroll("contact")}
              className="inline-flex items-center gap-2 bg-primary py-3 px-9 text-white group transition-all duration-300 hover:bg-secondary/90"
            >
              <span className="font-light">GET IN TOUCH</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
