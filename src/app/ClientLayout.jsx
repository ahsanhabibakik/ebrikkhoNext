"use client";

import ReduxProvider from "@/components/providers/ReduxProvider";
import { CustomerProvider } from "@/context/CustomerContext";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import CartSidebar from "@/components/shared/CartSidebar";

export default function ClientLayout({ children }) {
  return (
    <ReduxProvider>
      <CustomerProvider>
        <NavBar />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
      </CustomerProvider>
    </ReduxProvider>
  );
}
