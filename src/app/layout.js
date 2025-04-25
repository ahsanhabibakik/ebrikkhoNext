"use client";

import "./globals.css";
import NavBar from "../components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import CartSidebar from "@/components/shared/CartSidebar";
import { useState } from "react";
import { geistSans, geistMono } from "./metadata";

export default function RootLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-gray-800`}
      >
        <NavBar onCartOpen={() => setIsCartOpen(true)} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </body>
    </html>
  );
}
