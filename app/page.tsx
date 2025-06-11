import Header from "@/components/header"
import Hero from "@/components/hero"
import TrustedPartner from "@/components/trusted-partner"
import Plot from "@/components/plot"
import About from "@/components/about"
import CurrentProjects from "@/components/current-projects"
import WhyChooseUs from "@/components/why-choose-us"
import ClientReviews from "@/components/client-reviews"
import Faq from "@/components/faq"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Map from "@/components/map"
import Imagebox from "@/components/imagebox"
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      {/* <TrustedPartner /> */}
      <About />
      <Plot/>
      <Imagebox/>
      <WhyChooseUs />
      {/* <ClientReviews /> */}
      <CurrentProjects />
      <Faq />
      <ContactSection />
      <Map/>
      <Footer />
    </main>
  )
}

