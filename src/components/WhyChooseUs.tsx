"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Handshake, Check as HomeCheck, FileCheck, Award } from "lucide-react"

const features = [
  {
    icon: <Handshake className="h-12 w-12 text-secondary" />,
    title: "Your Trusted Partner in Coimbatore's Real Estate Market",
    description: "We are dedicated to providing you with the best real estate experience.",
    buttonText: "LEARN MORE",
  },
  {
    icon: <HomeCheck className="h-12 w-12 text-secondary" />,
    title: "All Our Properties Are 100% Verified for Your Peace of Mind",
    description: "Rest assured, every property comes with clear titles and approvals.",
    buttonText: "DISCOVER NOW",
  },
  {
    icon: <FileCheck className="h-12 w-12 text-secondary" />,
    title: "Experience a Hassle-Free Buying Process with Our Expert Guidance",
    description: "We simplify the buying journey, making it smooth and stress-free.",
    buttonText: "START NOW",
  },
  {
    icon: <Award className="h-12 w-12 text-secondary" />,
    title: "Get the Best Deals & Price Guarantee on Every Property",
    description: "We offer competitive prices and exclusive deals to ensure you get the best value for your investment.",
    buttonText: "EXPLORE NOW",
  },
]

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-16">
          Why Choose Nilavan Realtors for Your Real Estate Needs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text mb-4">
                  {feature.title}
                </h3>
                <p className="text-text/70 mb-6">
                  {feature.description}
                </p>
                <Button 
                  variant="default" 
                  className="bg-[#294666] hover:bg-[#294666]/90 text-white"
                >
                  {feature.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}