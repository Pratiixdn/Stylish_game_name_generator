"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Gamepad2,
  Sparkles,
  Type,
  Shapes,
  Users,
  User,
  BookOpen,
  Info,
  Mail,
  ChevronDown,
  KeyRound,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Gamepad2 },
  {
    href: "#",
    label: "Generators",
    icon: Sparkles,
    children: [
      { href: "/generators/game-name/", label: "Game Names", icon: Gamepad2 },
      { href: "/generators/stylish-text/", label: "Stylish Text", icon: Type },
      { href: "/generators/unicode-fonts/", label: "Unicode Fonts", icon: Type },
      { href: "/generators/fancy-symbols/", label: "Fancy Symbols", icon: Shapes },
      { href: "/generators/clan-name/", label: "Clan Names", icon: Users },
      { href: "/generators/nickname/", label: "Nicknames", icon: User },
      { href: "/generators/password/", label: "Password Generator", icon: KeyRound },
    ],
  },
  { href: "/blog/", label: "Blog", icon: BookOpen },
  { href: "/about/", label: "About", icon: Info },
  { href: "/contact/", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-strong shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
            >
              <Gamepad2 className="h-5 w-5" />
            </motion.div>
            <span className="text-lg font-bold tracking-tight">
              Game<span className="text-gradient">Gen</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        "hover:bg-secondary focus-ring",
                        openDropdown === link.label && "bg-secondary"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                      <ChevronDown className={cn(
                        "h-3 w-3 transition-transform",
                        openDropdown === link.label && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 rounded-xl glass-strong shadow-xl border p-2"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors",
                                "hover:bg-secondary",
                                pathname === child.href && "bg-secondary font-medium"
                              )}
                            >
                              <child.icon className="h-4 w-4 text-muted-foreground" />
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      "hover:bg-secondary focus-ring",
                      pathname === link.href && "bg-secondary font-medium"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong border-t"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground">
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </div>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-2 pl-8 pr-3 py-2 rounded-lg text-sm transition-colors",
                            "hover:bg-secondary",
                            pathname === child.href && "bg-secondary font-medium"
                          )}
                        >
                          <child.icon className="h-4 w-4" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        "hover:bg-secondary",
                        pathname === link.href && "bg-secondary"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
