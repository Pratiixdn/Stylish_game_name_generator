"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Sparkles, Gamepad2, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: 1000000, suffix: "+", label: "Active Users" },
  { icon: Sparkles, value: 500, suffix: "+", label: "Text Styles" },
  { icon: Gamepad2, value: 10000000, suffix: "+", label: "Names Generated" },
  { icon: Clock, value: 0, suffix: "ms", label: "Generation Time" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <span ref={ref}>
      {value === 0 ? "<50" : formatNumber(count)}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32 border-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-secondary mb-4">
                <stat.icon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
