"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then(setOrder);
  }, [id]);

  if (!order) return <div className="p-8">Loading...</div>;

  return (
    <main className="max-w-2xl mx-auto bg-base-100 p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Order #{order._id}</h1>
      <div className="mb-4">
        <div>
          <b>User:</b>{" "}
          <Link href={`/dashboard/users/${order.userId}`} className="link">
            {order.userEmail}
          </Link>
        </div>
        <div>
          <b>Status:</b> {order.status}
        </div>
        <div>
          <b>Total:</b> ৳{order.total}
        </div>
        <div>
          <b>Created:</b> {new Date(order.createdAt).toLocaleString()}
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
      <ul className="list-disc pl-6">
        {order.items?.map((item, idx) => (
          <li key={idx}>
            {item.name} × {item.quantity} — ৳{item.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
