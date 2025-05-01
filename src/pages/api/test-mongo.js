import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const userCount = await User.countDocuments();
    res.status(200).json({ ok: true, userCount });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
