import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product";
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

  // Only allow admin users
  const user = await User.findById(decoded.id);
  if (!user || !user.isAdmin) return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    // Total users
    const totalUsers = await User.countDocuments();
    // Total orders
    const totalOrders = await Order.countDocuments();
    // Total products
    const totalProducts = await Product.countDocuments();
    // Total sales (sum of all order totals)
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    // Recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    return res.json({
      data: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalSales: totalSales[0]?.total || 0,
        recentOrders,
      }
    });
  }

  res.status(405).end();
}
