import { dbConnect } from "@/lib/mongodb";
import Reminder from "@/models/Reminder";
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
    const reminders = await Reminder.find({ userId });
    return res.json({ data: reminders });
  }

  if (req.method === "POST") {
    const { title, date, note } = req.body;
    const reminder = await Reminder.create({ userId, title, date, note });
    return res.status(201).json({ data: reminder });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await Reminder.deleteOne({ _id: id, userId });
    return res.json({ success: true });
  }

  res.status(405).end();
}
