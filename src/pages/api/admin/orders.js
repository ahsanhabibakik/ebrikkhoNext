import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";

function getUserIdFromReq(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  await dbConnect();
  const decoded = getUserIdFromReq(req);
  if (!decoded) return res.status(401).json({ error: "Unauthorized" });
  const user = await User.findById(decoded.id);
  if (!user || !user.isAdmin) return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json({ data: orders });
  }

  if (req.method === "PUT") {
    const { id, status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json({ data: order });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await Order.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).end();
}
