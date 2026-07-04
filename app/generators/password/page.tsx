import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdSlot } from "@/components/ui/ad-slot";
import { PasswordGeneratorSection } from "@/components/sections/password-generator-section";

export const metadata: Metadata = {
  title: "Password Generator",
  description:
    "Generate strong, secure passwords instantly — with or without a personal seed word. Customize length, character sets, and export your results.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Password <span className="text-gradient">Generator</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create strong, unique passwords for your accounts — fully random, or anchored to a personal
              seed word for something more memorable.
            </p>
          </div>

          <PasswordGeneratorSection />

          <AdSlot position="bottom" className="mt-12 max-w-4xl mx-auto" />

          <div className="max-w-3xl mx-auto mt-16 glass rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">Tips for stronger passwords</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Length beats complexity.</strong> A longer password is
                generally harder to crack than a short one stuffed with symbols.
              </li>
              <li>
                <strong className="text-foreground">Never reuse passwords across accounts.</strong> If one
                site is breached, reused passwords let attackers try the same credentials elsewhere.
              </li>
              <li>
                <strong className="text-foreground">Enable two-factor authentication</strong> wherever it&apos;s
                offered — it closes off the most common account theft method almost entirely.
              </li>
              <li>
                <strong className="text-foreground">Use a password manager</strong> to store unique,
                generated passwords for every account without needing to memorize them.
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
