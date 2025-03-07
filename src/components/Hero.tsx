
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src="/lovable-uploads/41ec6083-6aec-431a-8b94-abd6f42e0721.png"
          alt="Elegant interior"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-20 mt-16">
        <div className="max-w-xl">
          <div ref={textRef} className="reveal-up space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 mb-2">
              <span className="h-0.5 w-5 bg-secondary"></span>
              <span className="text-white font-light tracking-wider text-sm">PREMIUM INTERIORS</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium text-white leading-tight">
              Crafting Elegant Living Spaces
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-md">
              Transform your home with our sophisticated interior design solutions that blend luxury with functionality.
            </p>
          </div>
          
          <div ref={buttonRef} className="reveal mt-8">
            <a 
              href="/projects" 
              className="inline-flex items-center gap-2 bg-secondary py-3 px-6 text-brand-textPrimary group transition-all duration-300 hover:bg-secondary/90"
            >
              <span className="font-medium">VIEW OUR PROJECTS</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
        <div className="flex space-x-3">
          <span className="block w-2 h-2 rounded-full bg-white/70"></span>
          <span className="block w-2 h-2 rounded-full bg-white"></span>
          <span className="block w-2 h-2 rounded-full bg-white/70"></span>
          <span className="block w-2 h-2 rounded-full bg-white/70"></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
