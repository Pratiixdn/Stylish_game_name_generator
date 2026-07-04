import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Zap, Shield, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about GameGen - the ultimate game name generator and stylish text tool built for gamers worldwide.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="text-gradient">GameGen</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are passionate gamers and developers who believe every player deserves a unique identity.
            </p>
          </div>

          <div className="space-y-16">
            <section className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                GameGen was created with a simple mission: to help gamers find the perfect name that represents their unique identity. 
                Whether you are a casual player, a competitive esports athlete, or a content creator, your gaming name is your brand.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We combine cutting-edge technology with creative algorithms to generate names that are not just unique, 
                but meaningful and memorable. Our tool supports over 500 text styles and thousands of symbol combinations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-8 text-center">What Makes Us Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", desc: "Generate hundreds of names in under 50ms. No server delays." },
                  { icon: Shield, title: "100% Private", desc: "All processing happens in your browser. Zero data collection." },
                  { icon: Users, title: "Community Driven", desc: "Built with feedback from over 1 million gamers worldwide." },
                  { icon: Globe, title: "Universal Support", desc: "Works on all platforms - PC, console, mobile, and web." },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-xl p-6">
                    <item.icon className="h-8 w-8 text-blue-500 mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq" className="glass rounded-2xl p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  { q: "Is GameGen free to use?", a: "Yes! GameGen is completely free to use. No hidden fees, no premium tiers, no credit card required." },
                  { q: "Do I need to create an account?", a: "No account needed. Just visit the site and start generating names instantly." },
                  { q: "Can I use these names commercially?", a: "Absolutely. All generated names are free to use for personal and commercial purposes." },
                  { q: "How many names can I generate?", a: "Unlimited! Generate as many names as you need. We support bulk generation up to 500 names at once." },
                  { q: "Does it work on mobile?", a: "Yes, GameGen is fully responsive and works perfectly on all devices including smartphones and tablets." },
                  { q: "Can I save my favorite names?", a: "Yes, use the heart icon to favorite any name. Your favorites are saved locally in your browser." },
                ].map((faq, i) => (
                  <div key={i}>
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
