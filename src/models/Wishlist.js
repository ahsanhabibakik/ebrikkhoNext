import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);
