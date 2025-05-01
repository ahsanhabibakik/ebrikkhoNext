import { dbConnect } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const userId = session.user.id;

  if (req.method === "GET") {
    const wishlist = (await Wishlist.findOne({ userId })) || { items: [] };
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
