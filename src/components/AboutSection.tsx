import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import aboutimg from "./images/Placeholder Image.png";

const PartnershipSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-bgPrimary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto gap-12">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={aboutimg}
              alt="Elegant interior staircase"
              className="w-full max-w-[600px] object-cover"
            />
          </div>

          {/* Right: Blue Background Container */}
          <div></div>
          <div className="w-full lg:w-1/2 bg-primary   bluebg relative -mr-8">
            {/* Right: Content */}
            <div
              ref={contentRef}
              className="bg-white p-8 md:p-12 shadow-lg mt-8 -ml-8 -mb-8 mr-8"
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-medium text-primary mb-6 leading-tight">
                Your Trusted Partner<br />in Real Estate
              </h2>

              <p className="text-gray-700 mb-8">
                Nilavan Realtors is a trusted real estate firm in Coimbatore, offering
                premium plots, villas, apartments, and farmhouses. With years of experience
                and market expertise, we ensure 100% verified properties, seamless
                transactions, and the best deals for our clients.
              </p>

              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-primary py-3 px-6 text-white group transition-all duration-300 hover:bg-primary/90"
              >
                <span className="font-light">LEARN MORE</span>
                {/* <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
