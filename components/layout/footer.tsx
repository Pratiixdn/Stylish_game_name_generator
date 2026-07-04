"use client";

import Link from "next/link";
import { Gamepad2, Twitter, Github, Youtube, Mail } from "lucide-react";

const footerLinks = {
  Generators: [
    { label: "Game Names", href: "/generators/game-name/" },
    { label: "Stylish Text", href: "/generators/stylish-text/" },
    { label: "Unicode Fonts", href: "/generators/unicode-fonts/" },
    { label: "Fancy Symbols", href: "/generators/fancy-symbols/" },
    { label: "Clan Names", href: "/generators/clan-name/" },
    { label: "Nicknames", href: "/generators/nickname/" },
    { label: "Password Generator", href: "/generators/password/" },
  ],
  Resources: [
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
    { label: "FAQ", href: "/about/#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Terms of Service", href: "/terms/" },
    { label: "Disclaimer", href: "/disclaimer/" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Mail, href: "mailto:contact@gamenamegenerator.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">
                Game<span className="text-gradient">Gen</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              The ultimate game name generator and stylish text tool for gamers, streamers, and content creators worldwide.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GameGen. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with passion for the gaming community.
          </p>
        </div>
      </div>
    </footer>
  );
}
