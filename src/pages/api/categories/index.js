import { dbConnect } from "@/lib/mongodb";
import Category from "@/models/Category";
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
    const categories = await Category.find();
    return res.json({ data: categories });
  }

  // Only admin can create categories
  if (req.method === "POST") {
    const decoded = getUserIdFromReq(req);
    if (!decoded) return res.status(401).json({ error: "Unauthorized" });
    // Optionally check isAdmin here
    const { name, slug, icon, description } = req.body;
    const category = await Category.create({ name, slug, icon, description });
    return res.status(201).json({ data: category });
  }

  res.status(405).end();
}
