
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  useEffect(() => {
    // Smooth scroll animation
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-right');
      
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
    </main>
  );
};

export default Index;
