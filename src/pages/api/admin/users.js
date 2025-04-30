import { dbConnect } from "@/lib/mongodb";
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

  // Only allow admin users (add an isAdmin field to your User model if needed)
  const user = await User.findById(decoded.id);
  if (!user || !user.isAdmin) return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    const users = await User.find().select("-password");
    return res.json({ data: users });
  }

  res.status(405).end();
}
