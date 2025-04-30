import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
