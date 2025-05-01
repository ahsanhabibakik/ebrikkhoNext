import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await dbConnect();

    switch (req.method) {
      case "GET":
        const products = await Product.find();
        return res.json({ data: products });

      case "POST":
        const newProduct = await Product.create(req.body);
        return res.status(201).json({ data: newProduct });

      case "PUT":
        const updated = await Product.findByIdAndUpdate(
          req.query.id,
          req.body,
          { new: true }
        );
        return res.json({ data: updated });

      case "DELETE":
        await Product.findByIdAndDelete(req.query.id);
        return res.json({ success: true });

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error("Admin API Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
