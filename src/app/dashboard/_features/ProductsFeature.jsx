"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProductsFeature() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  function handleEdit(product) {
    setEditing(product._id);
    setForm({ name: product.name, price: product.price, stock: product.stock });
  }

  function handleDelete(id) {
    fetch(`/api/products/${id}`, { method: "DELETE" }).then(() =>
      setProducts((prev) => prev.filter((p) => p._id !== id))
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      fetch(`/api/products/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((r) => r.json())
        .then((updated) => {
          setProducts((prev) =>
            prev.map((p) => (p._id === editing ? updated : p))
          );
          setEditing(null);
          setForm({ name: "", price: "", stock: "" });
        });
    } else {
      fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((r) => r.json())
        .then((created) => {
          setProducts((prev) => [...prev, created]);
          setForm({ name: "", price: "", stock: "" });
        });
    }
  }

  return (
    <Card className="p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 mb-4"
      >
        <input
          className="border rounded px-2 py-1"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          className="border rounded px-2 py-1"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          required
        />
        <input
          className="border rounded px-2 py-1"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
          required
        />
        <Button type="submit">{editing ? "Update" : "Add"}</Button>
        {editing && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setEditing(null)}
          >
            Cancel
          </Button>
        )}
      </form>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b">
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td className="flex gap-2 justify-end py-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
