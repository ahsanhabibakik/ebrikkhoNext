import { connectToDatabase } from "../../../../lib/mongodb.js";
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    image: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    status: { type: String, default: "active" }, // "active", "inactive"
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export async function GET(request) {
  await connectToDatabase();
  const categories = await Category.find({});
  return Response.json(categories);
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    if (Array.isArray(data)) {
      const categories = await Category.insertMany(data);
      return Response.json(categories, { status: 201 });
    } else {
      const category = await Category.create(data);
      return Response.json(category, { status: 201 });
    }
  } catch (error) {
    return Response.json({ message: "Error inserting category(s)", error: error.message }, { status: 500 });
  }
}
