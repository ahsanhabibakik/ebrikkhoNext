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
  description: "Discover and shop the best plants for your home and garden",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};
