"use client";
import { useState, useEffect } from "react";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders from API
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 px-4 py-2">{order.id}</td>
              <td className="border border-gray-300 px-4 py-2">{order.user}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="border border-gray-300 p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${order.total.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={`/dashboard/orders/${order.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
