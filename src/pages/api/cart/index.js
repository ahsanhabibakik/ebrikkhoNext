import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/lib/mongodb";
import Cart from "@/models/Cart";

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Check session (but don't require it)
    const session = await getServerSession(req, res, authOptions);

    if (req.method === "GET") {
      if (!session) {
        // Guest user - return empty cart
        return res.json({ data: { items: [] } });
      }

      // Get user's cart from DB
      const cart = await Cart.findOne({ userId: session.user.id });
      return res.json({ data: { items: cart?.items || [] } });
    }

    if (req.method === "POST") {
      const { productId, quantity } = req.body;

      if (!session) {
        // Guest user - return success but let client handle storage
        return res.json({ data: { items: [] } });
      }

      // Get or create user's cart
      let cart = await Cart.findOne({ userId: session.user.id });
      if (!cart) {
        cart = new Cart({ userId: session.user.id, items: [] });
      }

      // Update cart items
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      return res.json({ data: { items: cart.items } });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Cart API Error:", error);
    return res.status(500).json({
      error: "Server error",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
