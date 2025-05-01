import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });
    if (!session.user?.isAdmin) return res.status(403).json({ error: "Not authorized" });

    const db = await dbConnect();
    const users = await User.find().select('-password');
    return res.json({ data: users });
  } catch (error) {
    console.error('Admin Users API Error:', error);
    return res.status(500).json({ error: "Server error" });
  }
}
