import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "GameGen Privacy Policy - Learn how we protect your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>1. Information We Do Not Collect</h2>
            <p>
              GameGen is designed with privacy as a core principle. We do not collect, store, or process any personal information. 
              All name generation happens entirely in your browser using client-side JavaScript.
            </p>

            <h2>2. Local Storage</h2>
            <p>
              We use your browser local storage to save your preferences (theme, favorites, recent history) 
              solely for your convenience. This data never leaves your device and is not accessible to us or any third party.
            </p>

            <h2>3. Cookies</h2>
            <p>
              We do not use tracking cookies. Any cookies used are strictly functional (e.g., theme preference) 
              and contain no personally identifiable information.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>
              We may use Google Analytics for anonymous usage statistics. This data is aggregated and cannot be used to identify individual users.
            </p>

            <h2>5. Data Security</h2>
            <p>
              Since we do not collect personal data, there is no personal data to secure. Your generated names and favorites 
              remain on your device until you clear your browser data.
            </p>

            <h2>6. Children Privacy</h2>
            <p>
              Our service is not directed to children under 13. We do not knowingly collect any information from children.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at privacy@gamenamegenerator.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
