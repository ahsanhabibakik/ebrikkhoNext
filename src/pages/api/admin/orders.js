import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });
    if (!session.user?.isAdmin)
      return res.status(403).json({ error: "Not authorized" });

    await dbConnect();

    switch (req.method) {
      case "GET":
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.json({ data: orders });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Admin Orders API Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
