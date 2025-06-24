"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UsersFeature() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", role: "" });

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  function handleEdit(user) {
    setEditing(user._id);
    setForm({ name: user.name, role: user.role });
  }

  function handleDelete(id) {
    fetch(`/api/users/${id}`, { method: "DELETE" }).then(() =>
      setUsers((prev) => prev.filter((u) => u._id !== id))
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      fetch(`/api/users/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((r) => r.json())
        .then((updated) => {
          setUsers((prev) =>
            prev.map((u) => (u._id === editing ? updated : u))
          );
          setEditing(null);
          setForm({ name: "", role: "" });
        });
    }
  }

  return (
    <Card className="p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {editing && (
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
          <select
            className="border rounded px-2 py-1"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            required
          >
            <option value="select-role">Select role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="customer">Customer</option>
          </select>
          <Button type="submit">Update</Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setEditing(null)}
          >
            Cancel
          </Button>
        </form>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="flex gap-2 justify-end py-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(u)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(u._id)}
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
