"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, Smartphone, Sparkles, Download } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Generate hundreds of unique names and stylish text in milliseconds. No waiting, no loading.",
  },
  {
    icon: Shield,
    title: "100% Free & Private",
    description: "No sign-up required. All processing happens locally in your browser. Your data never leaves your device.",
  },
  {
    icon: Globe,
    title: "500+ Styles",
    description: "Access over 500 unique text styles including mathematical, script, fraktur, monospace, and more.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect experience on any device. Generate names on the go from your phone or tablet.",
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "AI-powered name suggestions based on your input. Get creative combinations you never thought of.",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "Export your generated names in TXT, CSV, or JSON format. Import into any game or platform.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">GameGen</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The most advanced name generator with features designed for serious gamers and content creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl glass hover:bg-secondary transition-all duration-300 hover-lift"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
