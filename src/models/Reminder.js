import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    date: Date,
    note: String,
  },
  { timestamps: true }
);

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
