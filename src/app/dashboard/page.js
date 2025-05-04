"use client";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ebrikkho Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Products"
            description="Manage all products, add new, edit or remove existing products."
            href="/dashboard/products"
            icon="🌱"
          />
          <DashboardCard
            title="Categories"
            description="Organize products by categories and subcategories."
            href="/dashboard/categories"
            icon="🗂️"
          />
          <DashboardCard
            title="Orders"
            description="View, process, and track customer orders."
            href="/dashboard/orders"
            icon="📦"
          />
          <DashboardCard
            title="Users"
            description="Manage admin, manager, and customer accounts."
            href="/dashboard/users"
            icon="👤"
          />
        </div>
      </div>
    </main>
  );
}

function DashboardCard({ title, description, href, icon }) {
  return (
    <Link href={href} className="block">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer h-full">
        <div className="card-body flex flex-col justify-between h-full">
          <div>
            <div className="text-4xl mb-2">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="text-base-content/70">{description}</p>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary btn-sm">Manage {title}</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
