'use client';

import { motion } from "framer-motion";
import Image from "next/image";

function Map() {
    const fadeInVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.8 }
      }
    }
      return (
            <div className="bg-background pt-10">
             <motion.h2
             variants={fadeInVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="text-3xl md:text-4xl font-medium font-playfair text-center text-text mb-12"
           >
             Our Location
           </motion.h2>
           <div className="max-w-7xl mx-auto px-4 pb-14 sm:px-6 lg:px-8">
             <div className="relative w-full h-[520px] overflow-hidden ">
              <Image
                src="/images/map.jpg"
                alt="Our location map"
                fill
                className="object-cover"
                priority
              />
             </div>
           </div>
         </div>
      )}
  
      export default Map;
  