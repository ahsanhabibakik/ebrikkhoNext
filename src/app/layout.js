import "./globals.css";
import NavBar from "../components/shared/NavBar";
import { Geist, Geist_Mono } from "next/font/google";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata with favicon support
export const metadata = {
  title: "Ebrikkho - Plant Shop",
  description: "Your one-stop shop for beautiful plants",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-gray-800`}
      >
        <NavBar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100 text-gray-800 text-center p-4">
          <p>© 2023 Ebrikkho. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
