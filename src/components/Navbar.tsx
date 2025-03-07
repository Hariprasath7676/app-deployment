
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from './images/Nilavan-logo New 1.png'
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
          <Link 
            to="/about" 
            className="text-brand-textPrimary hover:text-primary transition-colors duration-300 text-base"
          >
            About Us
          </Link>
          <Link 
            to="/projects" 
            className="text-brand-textPrimary hover:text-primary transition-colors duration-300 text-base"
          >
            Current Projects
          </Link>
          <Link 
            to="/contact" 
            className="text-brand-textPrimary hover:text-primary transition-colors duration-300 text-base"
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden md:flex">
          <a 
            href="tel:+1234567890" 
            className="bg-primary text-white px-5 py-2.5 flex items-center gap-2 transition-all duration-300 hover:bg-primary/90"
          >
            <Phone size={18} />
            <span className="font-medium">CALL US</span>
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
          <Link 
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
          </Link>
          <a 
            href="tel:+1234567890" 
            className="bg-primary text-white px-4 py-2 inline-flex items-center gap-2 w-fit"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Phone size={16} />
            <span>CALL US</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
