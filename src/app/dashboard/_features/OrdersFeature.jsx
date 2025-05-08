"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function OrdersFeature() {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: "" });

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  function handleEdit(order) {
    setEditing(order._id);
    setForm({ status: order.status });
  }

  function handleDelete(id) {
    fetch(`/api/orders/${id}`, { method: "DELETE" }).then(() =>
      setOrders((prev) => prev.filter((o) => o._id !== id))
    );
  }

  function handleApprove(id) {
    fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    })
      .then((r) => r.json())
      .then((updated) => {
        setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      fetch(`/api/orders/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((r) => r.json())
        .then((updated) => {
          setOrders((prev) =>
            prev.map((o) => (o._id === editing ? updated : o))
          );
          setEditing(null);
          setForm({ status: "" });
        });
    }
  }

  return (
    <Card className="p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {editing && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 mb-4"
        >
          <input
            className="border rounded px-2 py-1"
            placeholder="Status"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            required
          />
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
            <th>Email</th>
            <th>Status</th>
            <th>Total</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b">
              <td>{o.userEmail}</td>
              <td>{o.status}</td>
              <td>{o.total}</td>
              <td className="flex gap-2 justify-end py-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(o)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleApprove(o._id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(o._id)}
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
