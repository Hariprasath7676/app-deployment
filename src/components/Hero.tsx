
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import heroimg from './images/5.png'
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleScroll = (id) => {
    navigate("/"); // Ensure you're on the correct page
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Timeout ensures DOM is loaded before scrolling
  };

  useEffect(() => {
    // Fade in animation on load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {/* <div className="absolute inset-0 bg-black/50 z-10"></div> */}
        <img
          src={heroimg}
          alt="Elegant interior"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-20 mt-16">
        <div className="sm:max-w-[60%] mx-auto text-center">
          <div ref={textRef} className="reveal-up space-y-10 ">
            {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 mb-2">
              <span className="h-0.5 w-5 bg-secondary"></span>
              <span className="text-white font-light tracking-wider text-sm">PREMIUM INTERIORS</span>
            </div> */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-medium text-white sm:!leading-[78px] sm:tracking-wide ">
              Find Your Dream Property in Coimbatore
            </h1>
            <p className="text-white/90 mx-auto md:text-lg max-w-6xl font-light ">
            Explore premium plots, villas, apartments, and farm lands tailored to your needs. Your dream home awaits in the heart of Coimbatore.            </p>
          </div>
          
          <div ref={buttonRef} className="reveal mt-10">
            <button
            onClick={() => handleScroll("contact")}
              className="inline-flex items-center gap-2 bg-primary py-3 px-9 text-white group transition-all duration-300 hover:bg-secondary/90"
            >
              <span className="font-light">GET IN TOUCH</span>
              {/* <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /> */}
            </button>
          </div>
        </div>
      </div>
      
      {/* <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <div className="flex space-x-3">
          <span className="block w-2 h-2 rounded-full bg-white/70"></span>
          <span className="block w-2 h-2 rounded-full bg-white"></span>
          <span className="block w-2 h-2 rounded-full bg-white/70"></span>
          <span className="block w-2 h-2 rounded-full bg-white/70"></span>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
