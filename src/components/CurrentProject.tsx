
import { MapPin, Ruler, Clock, Check, ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

type ProjectProps = {
  title: string;
  subtitle: string;
  location: string;
  area: string;
  distance: string;
  amenities: string;
  image: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="bg-white shadow-md reveal-up">
      <div className="h-60 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-playfair font-medium text-primary">
          {project.title} <span className="text-gray-700">– {project.subtitle}</span>
        </h3>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-secondary" />
            <span className="text-sm">{project.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Ruler size={18} className="text-secondary" />
            <span className="text-sm">{project.area}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-secondary" />
            <span className="text-sm">{project.distance}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <Check size={18} className="text-secondary mt-0.5" />
            <span className="text-sm">{project.amenities}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 border border-primary py-2 px-8 text-primary font-medium group transition-all duration-300 hover:bg-primary hover:text-white"
          >
            ENQUIRE NOW
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

const CurrentProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-up');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('active');
              }, 150 * index); // Staggered animation
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const projects = [
    {
      title: "Green view Residency",
      subtitle: "Premium Plots",
      location: "Saravanampatti, Coimbatore",
      area: "1200 – 2400 Sq. Ft",
      distance: "5 mins to IT Park, 10 mins to Airport",
      amenities: "Gated Community, 24/7 Security, Landscaped Gardens",
      image: "/lovable-uploads/b59d90e5-fc6a-42a3-9e70-ec7a7e0d7ebc.png"
    },
    {
      title: "Nilavan Grand Villas",
      subtitle: "Luxury Villas in Vadavalli",
      location: "Vadavalli, Coimbatore",
      area: "1800 – 3000 Sq. Ft",
      distance: "10 mins to Marudhamalai Temple",
      amenities: "Private Garden, Covered Parking, Clubhouse",
      image: "/lovable-uploads/d36cbed0-2e28-425a-b68b-60eaece7ee21.png"
    },
    {
      title: "Farm Bliss",
      subtitle: "Scenic Farmhouse Plots in Pollachi",
      location: "Pollachi, Tamil Nadu",
      area: "½ Acre – 2 Acres",
      distance: "20 mins to Aliyar Dam, 30 mins to Coimbatore City",
      amenities: "Organic Farming Spaces, Private Cottages, Water Supply",
      image: "/lovable-uploads/41ec6083-6aec-431a-8b94-abd6f42e0721.png"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-up">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium text-primary mb-6">
            Current Projects – Explore Our Ongoing Developments
          </h2>
          <p className="text-gray-700">
            Discover our latest real estate projects in Coimbatore, offering premium plots,
            villas, farmhouses, and apartments in prime locations. Secure your dream property
            with clear titles and hassle-free transactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentProjectsSection;