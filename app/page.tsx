import Header from "@/components/header"
import Hero from "@/components/hero"
import TrustedPartner from "@/components/trusted-partner"
import CurrentProjects from "@/components/current-projects"
import WhyChooseUs from "@/components/why-choose-us"
import ClientReviews from "@/components/client-reviews"
import Faq from "@/components/faq"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Map from "@/components/map"
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustedPartner />
      <CurrentProjects />
      <WhyChooseUs />
      <ClientReviews />
      <Faq />
      <ContactSection />
      <Map/>
      <Footer />
    </main>
  )
}

