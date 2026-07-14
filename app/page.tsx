import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Services from '@/components/sections/Services'
import Packs from '@/components/sections/Packs'
import Process from '@/components/sections/Process'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Packs />
      <Process />
      <About />
      <Testimonials />
      <CTA />
    </main>
  )
}