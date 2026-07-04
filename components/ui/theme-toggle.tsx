"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg bg-secondary animate-pulse" />
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <div className="relative flex items-center bg-secondary rounded-lg p-1 gap-0.5">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "relative p-1.5 rounded-md transition-colors",
          currentTheme === "light" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Light theme"
      >
        {currentTheme === "light" && (
          <motion.div
            layoutId="theme-indicator"
            className="absolute inset-0 bg-background rounded-md shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Sun className="h-4 w-4 relative z-10" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "relative p-1.5 rounded-md transition-colors",
          currentTheme === "dark" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Dark theme"
      >
        {currentTheme === "dark" && (
          <motion.div
            layoutId="theme-indicator"
            className="absolute inset-0 bg-background rounded-md shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Moon className="h-4 w-4 relative z-10" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={cn(
          "relative p-1.5 rounded-md transition-colors",
          theme === "system" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="System theme"
      >
        {theme === "system" && (
          <motion.div
            layoutId="theme-indicator"
            className="absolute inset-0 bg-background rounded-md shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Monitor className="h-4 w-4 relative z-10" />
      </button>
    </div>
  );
}
