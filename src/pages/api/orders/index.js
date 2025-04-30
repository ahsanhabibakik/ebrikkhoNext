import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

function getUserIdFromReq(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  await dbConnect();
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "POST") {
    const { items, total, shippingAddress } = req.body;
    const order = await Order.create({
      userId,
      items,
      total,
      shippingAddress,
      status: "pending",
    });
    return res.status(201).json({ data: order });
  }

  if (req.method === "GET") {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return res.json({ data: orders });
  }

  // Update order status (e.g., cancel or mark as delivered)
  if (req.method === "PUT") {
    const { orderId, status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json({ data: order });
  }

  res.status(405).end();
}
