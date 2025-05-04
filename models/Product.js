import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, unique: true },
    brand: String,
    shortDescription: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    tags: [{ type: String }],
    image: { type: String },
    images: [{ type: String }],
    category: { type: String },
    subCategory: [{ type: String }],
    stock: { type: Number, default: 0 },
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    status: { type: String, default: "active" }, // "active", "inactive", "out-of-stock"
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
