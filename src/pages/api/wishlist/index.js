import { dbConnect } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
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

  if (req.method === "GET") {
    const wishlist = await Wishlist.findOne({ userId }) || { items: [] };
    return res.json({ data: { items: wishlist.items } });
  }

  if (req.method === "POST") {
    const { productId, name, price, image } = req.body;
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) wishlist = await Wishlist.create({ userId, items: [] });
    if (!wishlist.items.find((i) => i.productId === productId)) {
      wishlist.items.push({ productId, name, price, image });
      await wishlist.save();
    }
    return res.json({ data: { items: wishlist.items } });
  }

  // Remove a single item from wishlist
  if (req.method === "PATCH") {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });
    wishlist.items = wishlist.items.filter((i) => i.productId !== productId);
    await wishlist.save();
    return res.json({ data: { items: wishlist.items } });
  }

  if (req.method === "DELETE") {
    await Wishlist.findOneAndUpdate({ userId }, { items: [] });
    return res.json({ data: { items: [] } });
  }

  res.status(405).end();
}
