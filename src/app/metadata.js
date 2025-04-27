import { Geist, Geist_Mono } from "next/font/google";

// Load fonts
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata with favicon support
export const metadata = {
  title: "Ebrikkho - Your Plant Paradise",
  description:
    "Discover and shop the best plants for your home and garden. We offer indoor & outdoor plants, rooftop gardening kits, eco-friendly tools, and sustainable gifts. Join us in growing a greener tomorrow!",
  icons: {
    icon: [
      { url: "/fav.png", type: "image/png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/fav.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ebrikkho - Your Plant Paradise",
    description:
      "Welcome to Ebrikkho 🌿 We're here to make green living simple and beautiful! Shop indoor & outdoor plants, rooftop gardening kits, eco-friendly tools, and sustainable gifts. Join us in growing a greener tomorrow! 🌍💚",
    url: "https://www.ebrikkho.com",
    siteName: "Ebrikkho",
    images: [
      {
        url: "/images/social/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ebrikkho - Your Plant Paradise",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ebrikkho - Your Plant Paradise",
    description:
      "Welcome to Ebrikkho 🌿 We're here to make green living simple and beautiful! Shop indoor & outdoor plants, rooftop gardening kits, eco-friendly tools, and sustainable gifts.",
    images: ["/images/social/twitter-image.jpg"],
    creator: "@ebrikkho",
  },
  keywords: [
    "indoor plants",
    "outdoor plants",
    "rooftop gardening",
    "eco-friendly tools",
    "organic fertilizers",
    "sustainable gifts",
    "natural home decor",
    "plant delivery",
    "gardening essentials",
    "green living",
  ],
  authors: [{ name: "Ebrikkho" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#41753E",
};
