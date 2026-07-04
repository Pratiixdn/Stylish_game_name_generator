import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "GameGen Terms of Service - Read our terms and conditions.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using GameGen, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>

            <h2>2. Use of Service</h2>
            <p>
              GameGen provides name generation tools for personal and commercial use. You may use generated names 
              for any lawful purpose including gaming, social media, and business.
            </p>

            <h2>3. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to disrupt or damage the service</li>
              <li>Use automated systems to scrape or bulk download content</li>
              <li>Impersonate others or create misleading names for fraud</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              The GameGen website, logo, and software are our intellectual property. Generated names are free to use, 
              but our branding and code remain protected.
            </p>

            <h2>5. Disclaimer</h2>
            <p>
              GameGen is provided as-is without warranties. We are not responsible for any issues arising 
              from the use of generated names on third-party platforms.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              In no event shall GameGen be liable for any indirect, incidental, or consequential damages 
              arising from the use of our service.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service constitutes 
              acceptance of updated terms.
            </p>

            <h2>8. Contact</h2>
            <p>
              For questions about these terms, contact us at legal@gamenamegenerator.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
