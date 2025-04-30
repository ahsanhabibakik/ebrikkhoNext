import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();
  const { name, email, mobile, password } = req.body;
  if (!name || (!email && !mobile) || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, mobile, password: hashedPassword });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
  });
}
