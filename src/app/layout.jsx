import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/fav.png" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          <NavBar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
