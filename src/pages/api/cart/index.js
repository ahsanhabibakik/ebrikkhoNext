import { dbConnect } from "@/lib/mongodb";
import Cart from "@/models/Cart";
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
    const cart = await Cart.findOne({ userId }) || { items: [] };
    return res.json({ data: { items: cart.items } });
  }

  if (req.method === "POST") {
    const { productId, name, price, quantity, image } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = await Cart.create({ userId, items: [] });
    const idx = cart.items.findIndex((i) => i.productId === productId);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity, image });
    }
    await cart.save();
    return res.json({ data: { items: cart.items } });
  }

  if (req.method === "DELETE") {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    return res.json({ data: { items: [] } });
  }

  res.status(405).end();
}
