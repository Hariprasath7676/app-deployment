
import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (contentRef.current) observer.observe(contentRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="reveal-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-0.5 w-5 bg-secondary"></span>
              <span className="text-secondary font-light tracking-wider text-sm">WHO WE ARE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-playfair font-medium text-primary mb-6 leading-tight">
              A Passion for Transforming Living Spaces
            </h2>
            <p className="text-gray-700 mb-5">
              At Nilavan, we believe that your home should be a reflection of your personality, aspirations, and lifestyle. 
              Our team of experienced designers takes a personalized approach to every project, ensuring that the final design 
              exceeds expectations while maintaining functionality.
            </p>
            <p className="text-gray-700 mb-8">
              With meticulous attention to detail and a commitment to quality, we craft spaces that inspire and delight. 
              From concept to completion, we work closely with our clients to bring their vision to life.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-secondary pl-4">
                <p className="text-3xl font-playfair text-primary font-medium">15+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="border-l-2 border-secondary pl-4">
                <p className="text-3xl font-playfair text-primary font-medium">200+</p>
                <p className="text-gray-600">Projects Completed</p>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="reveal-right">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-secondary"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-secondary"></div>
              <img 
                src="/lovable-uploads/d36cbed0-2e28-425a-b68b-60eaece7ee21.png" 
                alt="Interior design work" 
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
