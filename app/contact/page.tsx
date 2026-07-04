import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Mail, Twitter, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the GameGen team. We would love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions, suggestions, or just want to say hi? We would love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">contact@gamenamegenerator.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Twitter className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Twitter</h3>
                    <p className="text-sm text-muted-foreground">@GameGenOfficial</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Github className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">GitHub</h3>
                    <p className="text-sm text-muted-foreground">github.com/gamegen</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-sm focus:ring-2 focus:ring-ring focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm transition-all hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
