import { dbConnect } from "@/lib/mongodb";
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

  if (req.method === "GET") {
    const products = await Product.find();
    return res.json({ data: products });
  }

  if (req.method === "POST") {
    const decoded = getUserIdFromReq(req);
    if (!decoded) return res.status(401).json({ error: "Unauthorized" });
    // Optionally check isAdmin here
    const { name, price, description, image, category, stock, sku } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
      stock,
      sku,
    });
    return res.status(201).json({ data: product });
  }

  res.status(405).end();
}
