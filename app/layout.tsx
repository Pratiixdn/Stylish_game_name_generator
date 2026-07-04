import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Game Name Generator & Stylish Text Generator",
    template: "%s | Game Name Generator",
  },
  description:
    "Generate thousands of unique gaming names, stylish nicknames, and fancy Unicode text instantly. The ultimate tool for gamers, streamers, and content creators.",
  keywords: [
    "game name generator",
    "stylish text generator",
    "fancy fonts",
    "gaming names",
    "nickname generator",
    "clan names",
    "unicode text",
    "cool symbols",
  ],
  authors: [{ name: "Game Name Generator" }],
  creator: "Game Name Generator",
  publisher: "Game Name Generator",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gamenamegenerator.com",
    siteName: "Game Name Generator",
    title: "Game Name Generator & Stylish Text Generator",
    description:
      "Generate thousands of unique gaming names, stylish nicknames, and fancy Unicode text instantly.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Game Name Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Name Generator & Stylish Text Generator",
    description:
      "Generate thousands of unique gaming names, stylish nicknames, and fancy Unicode text instantly.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://gamenamegenerator.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* TODO: replace ca-pub-XXXXXXXXXXXXXXXX with your real AdSense publisher ID (must match components/ui/ad-slot.tsx) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: 500,
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "hsl(var(--card))",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "hsl(var(--card))",
                },
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
