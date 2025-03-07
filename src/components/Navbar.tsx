
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from './images/Nilavan-logo New 1.png'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
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

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm'
          : 'bg-white py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-2xl font-playfair font-medium text-primary transition-all duration-300"
          >
            <img 
              src="/logo.png" 
              alt="Nilavan Logo" 
              className="h-9 md:h-12" 
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                
                // Type assertion to safely access nextSibling as HTMLElement
                const nextElement = target.nextSibling as HTMLElement;
                if (nextElement && nextElement.style) {
                  nextElement.style.display = 'block';
                }
              }}
            />
            <span className="hidden"><img src={logo} alt="" width="90"  /></span>
          </Link>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-12">
        <button onClick={() => handleScroll("about")} className="text-brand-textPrimary hover:text-primary transition-colors duration-300 text-base">
        About Us
      </button>
      <button onClick={() => handleScroll("projects")} className="text-brand-textPrimary hover:text-primary transition-colors duration-300 text-base">
        Current Projects
      </button>
      <button onClick={() => handleScroll("contact")} className="text-brand-textPrimary hover:text-primary transition-colors duration-300 text-base">
        Contact Us
      </button>
        </nav>

        <div className="hidden md:flex">
          <a 
            href="tel:+1234567890" 
            className="bg-primary text-white px-9 py-2.5 flex items-center gap-2 transition-all duration-300 hover:bg-primary/90 "
          >
            <Phone size={18} fill='currentColor'/>
            <span className="font-light">CALL US</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brand-textPrimary transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-brand-textPrimary transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-brand-textPrimary transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-60 border-b' : 'max-h-0'
        } bg-white/95 backdrop-blur-md`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
        <button onClick={() => handleScroll("about")} className="text-brand-textPrimary hover:text-primary py-2 transition-color">
        About Us
      </button>
      <button onClick={() => handleScroll("projects")} className="text-brand-textPrimary hover:text-primary py-2 transition-color">
        Current Projects
      </button>
      <button onClick={() => handleScroll("contact")} className="text-brand-textPrimary hover:text-primary py-2 transition-color">
        Contact Us
      </button>
          {/* <Link 
            to="/about" 
            className="text-brand-textPrimary hover:text-primary py-2 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/projects" 
            className="text-brand-textPrimary hover:text-primary py-2 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Current Projects
          </Link>
          <Link 
            to="/contact" 
            className="text-brand-textPrimary hover:text-primary py-2 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link> */}
          <button
            className="bg-primary text-white font-light px-4 py-2 inline-flex items-center gap-2 w-fit m-auto mt-4"
            onClick={() => handleScroll("contact")}
          >
            <Phone size={16} fill='currentColor' />
            <span className='font-light'>CALL US</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
