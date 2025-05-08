"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    sales: 0,
    orders: 0,
    products: 0,
    users: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "" });
  const [catLoading, setCatLoading] = useState(false);
  const catSlugInput = useRef();

  // --- User Management (MVP) ---
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  // --- Settings (MVP) ---
  const [settings, setSettings] = useState({
    storeName: "",
    logoUrl: "",
    contactEmail: "",
    contactPhone: "",
    currency: "৳",
    paymentKey: "",
  });
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Fetch stats, orders, products, categories, users, and settings
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setStats((s) => ({ ...s, products: data.length || 0 }));
        setProducts(data);
      });
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        setStats((s) => ({ ...s, users: data.length || 0 }));
        setUsers(data);
      });
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setStats((s) => ({
          ...s,
          orders: data.length || 0,
          sales: data.reduce((sum, o) => sum + (o.total || 0), 0),
        }));
        setRecentOrders(data.slice(0, 5));
      });
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data));
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data) setSettings(data);
      });
  }, []);

  // Add product handler (MVP: name, price, quantity)
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
      setProducts((prev) => [...prev, newProduct]);
      setStats((s) => ({ ...s, products: s.products + 1 }));
      setProductForm({ name: "", price: "", quantity: "" });
    }
    setLoading(false);
  }

  // Delete product handler
  async function handleDeleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setStats((s) => ({ ...s, products: s.products - 1 }));
    }
  }

  // Add category handler
  async function handleAddCategory(e) {
    e.preventDefault();
    setCatLoading(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryForm),
    });
    if (res.ok) {
      const newCat = await res.json();
      setCategories((prev) => [...prev, newCat]);
      setCategoryForm({ name: "", slug: "" });
    }
    setCatLoading(false);
  }

  // Delete category handler
  async function handleDeleteCategory(id) {
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c._id !== id));
    }
  }

  // Auto-generate slug from name
  function handleCategoryNameChange(e) {
    const name = e.target.value;
    setCategoryForm((f) => ({
      ...f,
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }));
  }

  // Block/unblock user handler (MVP: toggle status)
  async function handleToggleUserStatus(id, currentStatus) {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      );
    }
  }

  // Save settings handler
  async function handleSettingsSave(e) {
    e.preventDefault();
    setSettingsLoading(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSettingsLoading(false);
  }

  // Low stock warning (MVP: < 5)
  const lowStock = products.filter((p) => Number(p.quantity) < 5);

  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Ebrikkho Admin Dashboard</h1>
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/dashboard/products" className="btn btn-primary btn-sm">
            Manage Products
          </Link>
          <Link href="/dashboard/orders" className="btn btn-accent btn-sm">
            View Orders
          </Link>
          <Link href="/dashboard/users" className="btn btn-warning btn-sm">
            View Users
          </Link>
          <Link href="/dashboard/categories" className="btn btn-info btn-sm">
            Manage Categories
          </Link>
          <Link href="/dashboard/settings" className="btn btn-outline btn-sm">
            Settings
          </Link>
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard
            title="Total Sales"
            value={`৳${stats.sales.toLocaleString()}`}
            icon="💰"
          />
          <InfoCard title="Total Orders" value={stats.orders} icon="📦" />
          <InfoCard title="Total Products" value={stats.products} icon="🌱" />
          <InfoCard title="Total Users" value={stats.users} icon="👤" />
        </div>
        {/* Low Stock Warning */}
        {lowStock.length > 0 && (
          <div className="alert alert-warning mb-6">
            <span>⚠️ Low Stock: {lowStock.map((p) => p.name).join(", ")}</span>
          </div>
        )}
        {/* Product Add (MVP: name, price, quantity) */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          <form
            onSubmit={handleAddProduct}
            className="flex flex-col sm:flex-row gap-2 mb-4"
          >
            <input
              className="input input-bordered"
              placeholder="Name"
              value={productForm.name}
              onChange={(e) =>
                setProductForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />
            <input
              className="input input-bordered"
              placeholder="Price"
              type="number"
              value={productForm.price}
              onChange={(e) =>
                setProductForm((f) => ({ ...f, price: e.target.value }))
              }
              required
            />
            <input
              className="input input-bordered"
              placeholder="Quantity"
              type="number"
              value={productForm.quantity}
              onChange={(e) =>
                setProductForm((f) => ({ ...f, quantity: e.target.value }))
              }
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
                <th>Qty</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>৳{p.price}</td>
                  <td>{p.quantity}</td>
                  <td className="flex gap-2 justify-end py-1">
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* --- Category Management (MVP) --- */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <form
            onSubmit={handleAddCategory}
            className="flex flex-col sm:flex-row gap-2 mb-4"
          >
            <input
              className="input input-bordered"
              placeholder="Category Name"
              value={categoryForm.name}
              onChange={handleCategoryNameChange}
              required
            />
            <input
              className="input input-bordered"
              placeholder="Slug"
              value={categoryForm.slug}
              onChange={(e) =>
                setCategoryForm((f) => ({ ...f, slug: e.target.value }))
              }
              ref={catSlugInput}
              required
            />
            <button className="btn btn-info" disabled={catLoading}>
              {catLoading ? "Adding..." : "Add"}
            </button>
          </form>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.slug}</td>
                  <td className="flex gap-2 justify-end py-1">
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteCategory(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* --- User Management (MVP) --- */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Users</h2>
            <button
              className="btn btn-outline btn-xs"
              onClick={() => setShowUsers((v) => !v)}
            >
              {showUsers ? "Hide" : "Show"}
            </button>
          </div>
          {showUsers && (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <span
                        className={`badge ${
                          u.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td>
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="flex gap-2 justify-end py-1">
                      <button
                        className={`btn btn-xs ${
                          u.status === "active" ? "btn-error" : "btn-success"
                        }`}
                        onClick={() => handleToggleUserStatus(u._id, u.status)}
                      >
                        {u.status === "active" ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* --- Settings (MVP) --- */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Store Settings</h2>
          <form
            onSubmit={handleSettingsSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="label">Store Name</label>
              <input
                className="input input-bordered w-full"
                value={settings.storeName}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, storeName: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="label">Logo URL</label>
              <input
                className="input input-bordered w-full"
                value={settings.logoUrl}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, logoUrl: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="label">Contact Email</label>
              <input
                className="input input-bordered w-full"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, contactEmail: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="label">Contact Phone</label>
              <input
                className="input input-bordered w-full"
                value={settings.contactPhone}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, contactPhone: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="label">Currency</label>
              <input
                className="input input-bordered w-full"
                value={settings.currency}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, currency: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="label">Payment Gateway Key</label>
              <input
                className="input input-bordered w-full"
                value={settings.paymentKey}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, paymentKey: e.target.value }))
                }
              />
            </div>
            <div className="col-span-full">
              <button className="btn btn-primary" disabled={settingsLoading}>
                {settingsLoading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
        {/* Recent Orders (MVP) */}
        <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>User</th>
                <th>Status</th>
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-base-content/60">
                    No recent orders.
                  </td>
                </tr>
              )}
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    <Link
                      href={`/dashboard/users/${
                        order.userId || order.user || ""
                      }`}
                      className="link link-hover"
                    >
                      {order.userEmail || "User"}
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>৳{order.total}</td>
                  <td>
                    <Link
                      href={`/dashboard/orders/${order._id}`}
                      className="btn btn-xs btn-outline"
                    >
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
