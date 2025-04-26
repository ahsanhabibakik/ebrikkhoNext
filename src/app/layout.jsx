import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { Toaster } from "sonner";
import Footer from "@/components/shared/Footer";
import CartSidebar from "@/components/shared/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ebrikkho - Your Plant Shop",
  description: "Find the perfect plants for your home and garden",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <CustomerProvider>
            <div className="min-h-screen flex flex-col">
              
              <div className="border-b">
                <NavBar />
              </div>

              <main className="flex-grow">{children}</main>
              <Footer />
              <CartSidebar />
            </div>
            <Toaster />
          </CustomerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
