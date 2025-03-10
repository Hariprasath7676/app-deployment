
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PartnershipSection from '@/components/AboutSection';
import CurrentProjectsSection from '@/components/CurrentProject';
import Footer from '@/components/footer';
import WhyChooseSection from '@/components/WhyChooseUs'; 
import TestimonialSection from '@/components/Testimonials';
import FAQSection from '@/components/Faq';
import ContactSection from '@/components/contact';
import Map from '@/components/map';

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
      <PartnershipSection />
      <CurrentProjectsSection/>
      <WhyChooseSection/>
      <TestimonialSection/>
      <FAQSection/>
      <ContactSection/>
      <Map/>
      <Footer/> 
    </main>
  );
};

export default Index;
