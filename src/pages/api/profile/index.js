import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
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
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ data: user });
  }

  if (req.method === "PUT") {
    const { name, email, mobile } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, mobile },
      { new: true, runValidators: true }
    ).select("-password");
    return res.json({ data: user });
  }

  if (req.method === "DELETE") {
    await User.findByIdAndDelete(userId);
    return res.json({ success: true });
  }

  res.status(405).end();
}
