import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
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
    total: Number,
    status: { type: String, default: "pending" },
    shippingAddress: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
