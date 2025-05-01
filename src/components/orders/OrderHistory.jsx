"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMyOrders } from "@/redux/slices/orderSlice";

export default function OrderHistory() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <ul className="mt-2 space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="text-sm">
                    {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
}
