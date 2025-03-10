import { motion } from 'framer-motion';
import img1 from './images/project1.png';
import img2 from './images/project2.png';
import img3 from './images/project3.png';
import icon1 from './images/icon1.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import icon4 from './images/icon4.png';
import { useNavigate } from "react-router-dom";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2 } })
};

const ProjectCard = ({ project, index }) => {
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
    <motion.div 
      variants={fadeUpVariant} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      custom={index} 
      className="bg-white shadow-md overflow-hidden "
    >
      <div className="h-60 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-playfair font-medium text-black pb-4">
          {project.title} <span>– {project.subtitle}</span>
        </h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <img src={icon1} alt="" width="30" />
            <span className="text-sm">{project.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={icon2} alt="" width="30" />
            <span className="text-sm">{project.area}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={icon3} alt="" width="30" />
            <span className="text-sm">{project.distance}</span>
          </div>
          <div className="flex items-start gap-2">
            <img src={icon4} alt="" width="30" />
            <span className="text-sm">{project.amenities}</span>
          </div>
        </div>
        <div className="mt-6">
          <button
              onClick={() => handleScroll("contact")}
            className="inline-flex items-center gap-2 border border-secondary py-2 px-8 text-black font-light transition-all duration-300  "
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CurrentProjectsSection = () => {
  const projects = [
    {
      title: "Green View Residency",
      subtitle: "Premium Plots",
      location: "Saravanampatti, Coimbatore",
      area: "1200 – 2400 Sq. Ft",
      distance: "5 mins to IT Park, 10 mins to Airport",
      amenities: "Gated Community, 24/7 Security, Landscaped Gardens",
      image: img1
    },
    {
      title: "Nilavan Grand Villas",
      subtitle: "Luxury Villas in Vadavalli",
      location: "Vadavalli, Coimbatore",
      area: "1800 – 3000 Sq. Ft",
      distance: "10 mins to Marudhamalai Temple",
      amenities: "Private Garden, Covered Parking, Clubhouse",
      image: img2
    },
    {
      title: "Farm Bliss",
      subtitle: "Scenic Farmhouse Plots in Pollachi",
      location: "Pollachi, Tamil Nadu",
      area: "½ Acre – 2 Acres",
      distance: "20 mins to Aliyar Dam, 30 mins to Coimbatore City",
      amenities: "Organic Farming Spaces, Private Cottages, Water Supply",
      image: img3
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-medium text-black mb-6">
            Current Projects – Explore Our Ongoing Developments
          </h2>
          <p className="text-gray-700 text-lg">
            Discover our latest real estate projects in Coimbatore, offering premium plots,
            villas, farmhouses, and apartments in prime locations. Secure your dream property
            with clear titles and hassle-free transactions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentProjectsSection;
