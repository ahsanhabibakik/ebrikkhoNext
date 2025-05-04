"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CategoriesFeature() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  function handleEdit(category) {
    setEditing(category._id);
    setForm({ name: category.name });
  }

  function handleDelete(id) {
    fetch(`/api/categories/${id}`, { method: "DELETE" }).then(() =>
      setCategories((prev) => prev.filter((c) => c._id !== id))
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      fetch(`/api/categories/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((r) => r.json())
        .then((updated) => {
          setCategories((prev) =>
            prev.map((c) => (c._id === editing ? updated : c))
          );
          setEditing(null);
          setForm({ name: "" });
        });
    } else {
      fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((r) => r.json())
        .then((created) => {
          setCategories((prev) => [...prev, created]);
          setForm({ name: "" });
        });
    }
  }

  return (
    <Card className="p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          className="border rounded px-2 py-1"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <Button type="submit">{editing ? "Update" : "Add"}</Button>
        {editing && (
          <Button type="button" variant="ghost" onClick={() => setEditing(null)}>
            Cancel
          </Button>
        )}
      </form>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id} className="border-b">
              <td>{c.name}</td>
              <td className="flex gap-2 justify-end py-1">
                <Button size="sm" variant="outline" onClick={() => handleEdit(c)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(c._id)}>
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
