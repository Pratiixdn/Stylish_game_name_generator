"use client";

import { motion } from "framer-motion";
import { Type, Wand2, Copy, Share2 } from "lucide-react";

const steps = [
  {
    icon: Type,
    title: "Enter Your Name",
    description: "Type any name, word, or phrase into the input field. Keep it under 30 characters for best results.",
  },
  {
    icon: Wand2,
    title: "Choose Your Style",
    description: "Select from game names, stylish text, Unicode fonts, symbols, clan names, or nicknames.",
  },
  {
    icon: Copy,
    title: "Generate & Copy",
    description: "Click generate and instantly get hundreds of unique variations. Copy any result with one click.",
  },
  {
    icon: Share2,
    title: "Use Anywhere",
    description: "Paste your new name into any game, social media, or streaming platform. Stand out from the crowd.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your perfect gaming name in just 4 simple steps. No registration required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold mb-6 shadow-lg">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
