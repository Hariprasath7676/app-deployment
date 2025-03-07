"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import img1 from './images/whychooseus1.png'
import img2 from './images/whychooseus2.png'
import img3 from './images/whychooseus3.png'
import img4 from './images/whychooseus4.png'

const features = [
  {
    icon: <img src={img1} alt="" width="80px" />,
    title: "Your Trusted Partner in Coimbatore's Real Estate Market",
    description: "We are dedicated to providing you with the best real estate experience.",
    buttonText: "LEARN MORE",
  },
  {
    icon: <img src={img2} alt="" width="80px" />,
    title: "All Our Properties Are 100% Verified for Your Peace of Mind",
    description: "Rest assured, every property comes with clear titles and approvals.",
    buttonText: "DISCOVER NOW",
  },
  {
    icon: <img src={img3} alt="" width="80px" />,
    title: "Experience a Hassle-Free Buying Process with Our Expert Guidance",
    description: "We simplify the buying journey, making it smooth and stress-free.",
    buttonText: "START NOW",
  },
  {
    icon: <img src={img4} alt="" width="80px" />,
    title: "Get the Best Deals & Price Guarantee on Every Property",
    description: "We offer competitive prices and exclusive deals to ensure you get the best value for your investment.",
    buttonText: "EXPLORE NOW",
  },
]

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-light font-playfair text-center text-text mb-16">
          Why Choose Nilavan Realtors for Your Real Estate Needs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-xl hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center max-w-lg m-auto">
                  <div className="mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-text mb-4 sm:!leading-[33px] sm:tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-text/70 mb-6 text-lg">
                    {feature.description}
                  </p>
                  <Button variant="default" className="bg-primary hover:bg-[#294666]/90 text-white">
                    {feature.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
