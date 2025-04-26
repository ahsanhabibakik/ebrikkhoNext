"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import CartSidebar from "@/components/shared/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <NavBar onCartOpen={() => setIsCartOpen(true)} />
          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
