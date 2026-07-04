import { Metadata } from "next";
import { GeneratorSection } from "@/components/sections/generator-section";
import { DecorativeStylesSection } from "@/components/sections/decorative-styles-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdSlot } from "@/components/ui/ad-slot";

export const metadata: Metadata = {
  title: "Stylish Text Generator",
  description: "Convert your text into 500+ stylish fonts. Mathematical, script, fraktur, monospace, and more Unicode text styles.",
};

export default function StylishTextPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Stylish Text <span className="text-gradient">Generator</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your text into beautiful Unicode fonts. Copy and paste anywhere.
            </p>
          </div>
          <GeneratorSection />
          <AdSlot position="content" className="my-12 max-w-4xl mx-auto" />
          <DecorativeStylesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
