import { dbConnect } from "@/lib/mongodb";
import Reminder from "@/models/Reminder";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const userId = session.user.id;

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
