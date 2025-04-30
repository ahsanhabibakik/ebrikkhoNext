import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
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
    const products = await Product.find();
    return res.json({ data: products });
  }

  if (req.method === "POST") {
    const { name, price, description, image, category, stock, sku } = req.body;
    const product = await Product.create({ name, price, description, image, category, stock, sku });
    return res.status(201).json({ data: product });
  }

  if (req.method === "PUT") {
    const { id, ...update } = req.body;
    const product = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json({ data: product });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await Product.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).end();
}
