"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then(setUser);
    fetch(`/api/orders?user=${id}`)
      .then((r) => r.json())
      .then(setOrders);
  }, [id]);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <main className="max-w-2xl mx-auto bg-base-100 p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <div className="mb-4">
        <div>
          <b>Email:</b> {user.email}
        </div>
        <div>
          <b>Role:</b> {user.role}
        </div>
        <div>
          <b>Status:</b> {user.status}
        </div>
        <div>
          <b>Address:</b> {user.address?.addressLine1}, {user.address?.city},{" "}
          {user.address?.country}
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Order History</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>৳{order.total}</td>
              <td>{order.status}</td>
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
    </main>
  );
}
