"use client";

import { useState } from "react";
import { DecorativeStylesShowcase } from "@/components/sections/decorative-styles-showcase";

export function DecorativeStylesSection() {
  const [name, setName] = useState("Player");

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          More Stylish <span className="text-gradient">Designs</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Decorative name designs grouped by theme — royal, gun, anime, cute, symbolic, and more. Type your name once, copy any style.
        </p>
        <div className="max-w-sm mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 30))}
            placeholder="Enter your name..."
            className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all text-center"
          />
        </div>
      </div>

      <DecorativeStylesShowcase baseName={name} />
    </div>
  );
}
