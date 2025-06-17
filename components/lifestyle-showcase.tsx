"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface LifestyleFeature {
  id: number
  title: string
  image: string
}

const features: LifestyleFeature[] = [
  {
    id: 1,
    title: "Natural Undulations Golf Course",
    image: "/images/lifestyle1.jpg",
  },
  {
    id: 2,
    title: "Stone Component Wall",
    image: "/images/lifestyle2.jpg",
  },
  {
    id: 3,
    title: "Mimic Trees or Grass",
    image: "/images/lifestyle3.jpg",
  },
  {
    id: 4,
    title: "Grill Designed",
    image: "/images/lifestyle4.jpg",
  },
  {
    id: 5,
    title: "Compound Enterance",
    image: "/images/lifestyle5.jpg",
  },
  {
    id: 6,
    title: "Walking Path",
    image: "/images/lifestyle6.jpg",
  },
]

export default function LifestyleShowcase() {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % features.length)
  }

  const visibleCards = Array.from({ length: 4 }).map(
    (_, idx) => features[(startIndex + idx) % features.length]
  )

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold font-playfair mb-4">
          See Life at The Links Preserve
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-10 text-[17px] leading-relaxed">
          Take a closer look at the natural beauty, peaceful surroundings, and scenic views around The Links Preserve.
          From lush coconut groves to views of the golf course, explore what makes this place special.
        </p>

        <div className="relative flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-2"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-6">
            {visibleCards.map((feature) => (
              <div key={feature.id} className="flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] rounded overflow-hidden shadow-md">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-base font-semibold text-[#141414] font-playfair text-center">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-2"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
