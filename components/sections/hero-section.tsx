"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span>Trusted by 1M+ Gamers Worldwide</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Game Name Generator{" "}
            <span className="text-gradient">&</span>{" "}
            <br className="hidden sm:block" />
            Stylish Text Generator
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Generate thousands of unique gaming names, stylish nicknames, and fancy Unicode text instantly. 
            The ultimate tool for gamers, streamers, and content creators.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#generator"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl"
            >
              <Zap className="h-4 w-4" />
              Generate Names
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/generators/stylish-text/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl"
            >
              <Sparkles className="h-4 w-4" />
              Stylish Text
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Instant Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>500+ Styles</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
