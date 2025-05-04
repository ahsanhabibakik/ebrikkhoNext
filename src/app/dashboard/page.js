"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    sales: 0,
    orders: 0,
    products: 0,
    users: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(false);

  // Fetch stats, orders, and products
  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => {
        setStats(s => ({ ...s, products: data.length || 0 }));
        setProducts(data);
      });
    fetch("/api/users")
      .then(r => r.json())
      .then(data => setStats(s => ({ ...s, users: data.length || 0 })));
    fetch("/api/orders")
      .then(r => r.json())
      .then(data => {
        setStats(s => ({
          ...s,
          orders: data.length || 0,
          sales: data.reduce((sum, o) => sum + (o.total || 0), 0),
        }));
        setRecentOrders(data.slice(0, 5));
      });
  }, []);

  // Add product handler
  async function handleAddProduct(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productForm),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
      setStats(s => ({ ...s, products: s.products + 1 }));
      setProductForm({ name: "", price: "", stock: "" });
    }
    setLoading(false);
  }

  // Delete product handler
  async function handleDeleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(prev => prev.filter(p => p._id !== id));
      setStats(s => ({ ...s, products: s.products - 1 }));
    }
  }

  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ebrikkho Admin Dashboard</h1>
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/dashboard/products/add" className="btn btn-success btn-sm">
            ➕ Add Product
          </Link>
          <Link href="/dashboard/categories/add" className="btn btn-info btn-sm">
            ➕ Add Category
          </Link>
          <Link href="/dashboard/orders" className="btn btn-accent btn-sm">
            📦 All Orders
          </Link>
          <Link href="/dashboard/users" className="btn btn-warning btn-sm">
            👥 All Users
          </Link>
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard title="Total Sales" value={`৳${stats.sales.toLocaleString()}`} icon="💰" />
          <InfoCard title="Total Orders" value={stats.orders} icon="📦" />
          <InfoCard title="Total Products" value={stats.products} icon="🌱" />
          <InfoCard title="Total Users" value={stats.users} icon="👤" />
        </div>
        {/* Product CRUD */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <form onSubmit={handleAddProduct} className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              className="input input-bordered"
              placeholder="Name"
              value={productForm.name}
              onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              className="input input-bordered"
              placeholder="Price"
              type="number"
              value={productForm.price}
              onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))}
              required
            />
            <input
              className="input input-bordered"
              placeholder="Stock"
              type="number"
              value={productForm.stock}
              onChange={e => setProductForm(f => ({ ...f, stock: e.target.value }))}
              required
            />
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>৳{p.price}</td>
                  <td>{p.stock}</td>
                  <td className="flex gap-2 justify-end py-1">
                    <button className="btn btn-xs btn-error" onClick={() => handleDeleteProduct(p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DashboardCard
            title="Products"
            description="Quickly add, edit, or remove products. Jump to add product or manage inventory."
            href="/dashboard/products"
            icon="🌱"
            actions={[
              { label: "Add Product", href: "/dashboard/products/add", style: "btn-success" },
              { label: "Manage Products", href: "/dashboard/products", style: "btn-primary" },
            ]}
          />
          <DashboardCard
            title="Categories"
            description="Organize and add new categories for your products."
            href="/dashboard/categories"
            icon="🗂️"
            actions={[
              { label: "Add Category", href: "/dashboard/categories/add", style: "btn-info" },
              { label: "Manage Categories", href: "/dashboard/categories", style: "btn-primary" },
            ]}
          />
          <DashboardCard
            title="Orders"
            description="View, approve, or track customer orders. See recent and pending orders."
            href="/dashboard/orders"
            icon="📦"
            actions={[
              { label: "Recent Orders", href: "/dashboard/orders", style: "btn-accent" },
            ]}
          />
          <DashboardCard
            title="Users"
            description="Manage accounts, view user info, and see order history."
            href="/dashboard/users"
            icon="👤"
            actions={[
              { label: "All Users", href: "/dashboard/users", style: "btn-warning" },
            ]}
          />
        </div>
        {/* Recent Orders */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-base-content/60">No recent orders.</td>
                </tr>
              )}
              {recentOrders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <Link href={`/dashboard/users/${order.userId || order.user || ""}`} className="link link-hover">
                      {order.userEmail || "User"}
                    </Link>
                  </td>
                  <td>৳{order.total}</td>
                  <td>
                    <span className={`badge ${order.status === "Delivered" ? "badge-success" : "badge-warning"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <Link href={`/dashboard/orders/${order._id}`} className="btn btn-xs btn-outline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function DashboardCard({ title, description, href, icon, actions = [] }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer h-full">
      <div className="card-body flex flex-col justify-between h-full">
        <div>
          <div className="text-4xl mb-2">{icon}</div>
          <h2 className="card-title">{title}</h2>
          <p className="text-base-content/70">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {actions.map((action) => (
            <Link key={action.label} href={action.href} className={`btn btn-sm ${action.style}`}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="card bg-base-100 shadow flex flex-row items-center gap-4 p-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-lg font-bold">{value}</div>
        <div className="text-base-content/70">{title}</div>
      </div>
    </div>
  );
}
