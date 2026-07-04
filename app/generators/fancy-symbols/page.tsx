import { Metadata } from "next";
import { GeneratorSection } from "@/components/sections/generator-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Fancy Symbols",
  description: "Explore hundreds of gaming symbols, Japanese characters, arrows, stars, and more.",
};

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Fancy <span className="text-gradient">Symbols</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore hundreds of gaming symbols, Japanese characters, arrows, stars, and more.
            </p>
          </div>
          <GeneratorSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
