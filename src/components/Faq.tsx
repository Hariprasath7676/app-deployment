"use client"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Are your properties legally verified?",
    answer: "Yes, all our properties have clear titles and necessary approvals for a hassle-free purchase."
  },
  {
    question: "Do you assist with bank loans?",
    answer: "Yes, we provide comprehensive assistance with bank loans, helping you find the best rates and managing all paperwork for a smooth approval process."
  },
  {
    question: "Can I schedule a site visit?",
    answer: "Absolutely! We arrange convenient site visits at your preferred time. Our representatives will accompany you to show the property and answer all your questions."
  },
  {
    question: "What types of properties do you offer?",
    answer: "We offer a wide range of properties including residential plots, luxury villas, modern apartments, and agricultural farm lands in prime locations across Coimbatore."
  },
  {
    question: "How do I get in touch for more details?",
    answer: "You can reach us through our contact form, call us directly, or visit our office. Our team is available 7 days a week to assist you with your property needs."
  }
]

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl font-playfair text-text mb-6">FAQs</h2>
            <p className="text-lg text-text/70 mb-8">
              Find quick answers to common queries about our properties, legal verification, 
              home loan assistance, and site visits. We ensure a smooth and transparent 
              buying process for you.
            </p>
            <Button 
              className="bg-[#294666] hover:bg-[#294666]/90 text-white"
            >
              CONTACT
            </Button>
          </div>

          {/* Right Column */}
          <div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-t border-b-0 border-t-black px-6 pt-3"
                >
                  <AccordionTrigger className="text-lg font-semibold text-text hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-text/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}