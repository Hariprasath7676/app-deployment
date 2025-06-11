"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative h-[600px] md:h-[800px] w-full ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/5.png')",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2
            }}
            className="text-3xl md:text-5xl lg:text-6xl font-playfair text-white mb-4 text-center sm:!leading-[78px] sm:tracking-wide"
          >
           The Links Preserve
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.4
            }}
            className="text-white text-sm md:text-lg mb-8 font-light text-center mt-6 max-w-3xl"
          >
           A serene, exclusive real estate enclave set amid coconut groves and across from the golf course—offering a lifestyle deeply connected to nature and the timeless game of golf.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.6
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-primary text-white mt-4">
                GET IN TOUCH
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

