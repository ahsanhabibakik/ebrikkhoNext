import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
