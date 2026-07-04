"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 p-12 lg:p-20 text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Find Your Perfect Name?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
              Join over 1 million gamers who have already discovered their unique identity with GameGen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#generator"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-foreground font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl"
              >
                <Sparkles className="h-4 w-4" />
                Start Generating
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/generators/stylish-text/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-sm backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                Try Stylish Text
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
