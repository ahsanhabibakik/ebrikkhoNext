import { connectToDatabase } from "../../../../lib/mongodb.js";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String, // Store hashed password in production
    role: { type: String, default: "customer" }, // "admin", "manager", "customer"
    avatar: String,
    phone: String,
    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      postalCode: String,
      country: String,
    },
    status: { type: String, default: "active" }, // "active", "inactive", "banned"
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function GET(request) {
  await connectToDatabase();
  const users = await User.find({});
  return Response.json(users);
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    if (Array.isArray(data)) {
      const users = await User.insertMany(data);
      return Response.json(users, { status: 201 });
    } else {
      const user = await User.create(data);
      return Response.json(user, { status: 201 });
    }
  } catch (error) {
    return Response.json(
      { message: "Error inserting user(s)", error: error.message },
      { status: 500 }
    );
  }
}
