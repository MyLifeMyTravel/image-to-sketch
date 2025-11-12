import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ConverterSection } from "@/components/converter-section"
import { StyleShowcase } from "@/components/style-showcase"
import { StatsSection } from "@/components/stats-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ConverterSection />
        <StyleShowcase />
        <StatsSection />
        <PricingSection />
        <FaqSection />
      </main>
    </div>
  )
}
