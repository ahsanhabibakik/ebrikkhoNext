import { dbConnect } from "@/lib/mongodb";
import Review from "@/models/Review";
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

  if (req.method === "GET") {
    const { productId } = req.query;
    const reviews = await Review.find(productId ? { productId } : {});
    return res.json({ data: reviews });
  }

  if (req.method === "POST") {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { productId, rating, title, comment } = req.body;
    const review = await Review.create({
      userId,
      productId,
      rating,
      title,
      comment,
      date: new Date(),
    });
    return res.status(201).json({ data: review });
  }

  res.status(405).end();
}
