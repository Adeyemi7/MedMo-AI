"use client"

import { MainLayout } from "@/components/main-layout"
import HeroSection from "@/components/hero-section"
import ProblemSolutionSection from "@/components/problem-solution-section"
import HowItWorksSection from "@/components/how-it-works-section"
import TargetAudienceSection from "@/components/target-audience-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import TrustPartnersSection from "@/components/trust-partners-section"
import PlatformWorksSection from "@/components/platform-works-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import FAQSection from "@/components/faq-section"
import FinalCTASection from "@/components/final-cta-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <main>
          <HeroSection />
          <ProblemSolutionSection />
          <HowItWorksSection />
          <TargetAudienceSection />
          <FeaturesSection />
          <TestimonialsSection />
          <TrustPartnersSection />
          <PlatformWorksSection />
          <WhyChooseUsSection />
          <FAQSection />
          <FinalCTASection />
        </main>
        <Footer />
      </div>
    </MainLayout>
  );
}
