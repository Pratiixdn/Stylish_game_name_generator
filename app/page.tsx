import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { GeneratorSection } from "@/components/sections/generator-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { StatsSection } from "@/components/sections/stats-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AdSlot } from "@/components/ui/ad-slot";

export const metadata: Metadata = {
  title: "Game Name Generator & Stylish Text Generator",
  description:
    "Generate thousands of unique gaming names, stylish nicknames, and fancy Unicode text instantly. The ultimate tool for gamers, streamers, and content creators.",
  openGraph: {
    title: "Game Name Generator & Stylish Text Generator",
    description:
      "Generate thousands of unique gaming names, stylish nicknames, and fancy Unicode text instantly.",
    url: "https://gamenamegenerator.com",
  },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdSlot position="hero" className="my-2" />
        </div>
        <GeneratorSection />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdSlot position="content" className="my-2" />
        </div>
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <CTASection />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdSlot position="bottom" className="my-2" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
