import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import aboutimg from "./images/Placeholder Image.png";

const PartnershipSection = () => {
  return (
    <section id="about" className="py-24 bg-white ">
      <div className="px-6 max-w-[1400px] m-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xla gap-12">
          {/* Left: Image with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center sm:left-[5%] relative"
          >
            <img
              src={aboutimg}
              alt="Elegant interior staircase"
              className="w-full max-w-[600px] object-cover"
            />
          </motion.div>

          {/* Right: Blue Background Container */}
          <motion.div
  initial={{ opacity: 0, x: 10 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: true }}
  className="w-full lg:w-1/2 bg-primary sm:mt-0 sm:-left-[5%] relative sm:-mr-8 mt-10"
>

            {/* Right: Content */}
            <div className="bg-white p-8 md:p-12 shadow-lg mt-8 -ml-8 -mb-8 mr-8">
              <h2 className="text-3xl md:text-4xl font-playfair font-medium text-black mb-6">
                Your Trusted Partner<br />in Real Estate
              </h2>

              <p className="text-gray-700 mb-8 text-lg sm:!leading-[33px] sm:tracking-wide">
                Nilavan Realtors is a trusted real estate firm in Coimbatore, offering
                premium plots, villas, apartments, and farmhouses. With years of experience
                and market expertise, we ensure 100% verified properties, seamless
                transactions, and the best deals for our clients.
              </p>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/projects"
                className="inline-flex items-center gap-2 bg-primary py-3 sm:tracking-wide text-white group transition-all duration-300 hover:bg-primary/90 px-9"
              >
                <span className="font-light">LEARN MORE</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
