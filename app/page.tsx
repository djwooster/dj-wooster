import Hero from "@/components/Hero"
import FeaturedProjects from "@/components/FeaturedProjects"
import Marquee from "@/components/Marquee"
import Skills from "@/components/Skills"
import About from "@/components/About"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <Marquee />
      <Skills />
      <About />
      <Footer />
    </main>
  )
}
