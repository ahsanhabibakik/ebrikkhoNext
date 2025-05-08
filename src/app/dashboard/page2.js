"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Package, Users, ShoppingCart } from "lucide-react";
import ProductsFeature from "./_features/ProductsFeature";
import CategoriesFeature from "./_features/CategoriesFeature";
import OrdersFeature from "./_features/OrdersFeature";
import UsersFeature from "./_features/UsersFeature";

const navItems = [
  {
    title: "Products",
    href: "#products",
    icon: <Leaf className="w-6 h-6" />,
  },
  {
    title: "Categories",
    href: "#categories",
    icon: <Package className="w-6 h-6" />,
  },
  {
    title: "Orders",
    href: "#orders",
    icon: <ShoppingCart className="w-6 h-6" />,
  },
  {
    title: "Users",
    href: "#users",
    icon: <Users className="w-6 h-6" />,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-green-50 to-white">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 py-8 px-4 gap-2">
        <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">
          Ebrikkho Admin
        </h2>
        {navItems.map((item) => (
          <a key={item.title} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-lg rounded-lg mb-2 hover:bg-green-50"
            >
              {item.icon}
              {item.title}
            </Button>
          </a>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 space-y-12">
        <section id="products">
          <ProductsFeature />
        </section>
        <section id="categories">
          <CategoriesFeature />
        </section>
        <section id="orders">
          <OrdersFeature />
        </section>
        <section id="users">
          <UsersFeature />
        </section>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-2 z-50">
        {navItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="flex flex-col items-center text-xs text-gray-700 hover:text-green-700"
          >
            {item.icon}
            <span>{item.title}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
