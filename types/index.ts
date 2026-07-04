export interface GeneratedName {
  id: string;
  name: string;
  style: string;
  category: string;
  copied?: boolean;
  favorited?: boolean;
}

export interface GameNameStyle {
  id: string;
  name: string;
  prefix?: string[];
  suffix?: string[];
  symbols?: string[];
  numbers?: string[];
  transform?: "uppercase" | "lowercase" | "capitalize";
}

export interface StylishFont {
  id: string;
  name: string;
  chars: Record<string, string>;
  category: string;
}

export interface Symbol {
  id: string;
  char: string;
  name: string;
  category: string;
  tags: string[];
}

export interface FilterOptions {
  length?: "short" | "medium" | "long";
  symbols?: boolean;
  numbers?: boolean;
  case?: "uppercase" | "lowercase" | "mixed";
  style?: string;
}

export interface GeneratorTab {
  id: string;
  label: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export type Theme = "light" | "dark" | "system";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface AdSlot {
  id: string;
  position: "top" | "hero" | "content" | "sidebar" | "article" | "bottom";
  size: string;
}
