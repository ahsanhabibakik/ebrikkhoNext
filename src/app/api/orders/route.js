import { connectToDatabase } from "../../../../lib/mongodb.js";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true }, // Unique order identifier
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user
    userEmail: String,
    customerName: String,
    customerPhone: String,
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productName: String,
        quantity: Number,
        price: Number,
        image: String,
      }
    ],
    subtotal: Number,
    shippingFee: Number,
    total: Number,
    paymentMethod: String, // e.g., "COD", "Card", "bKash"
    paymentStatus: { type: String, default: "pending" }, // "pending", "paid", "failed"
    transactionId: String,
    status: { 
      type: String, 
      enum: ["pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned"], 
      default: "pending" 
    }, // order status
    deliveryTracking: [
      {
        status: String, // e.g., "Order Placed", "Dispatched", "In Transit", "Delivered"
        location: String, // e.g., "Dhaka Hub", "On the way"
        updatedAt: { type: Date, default: Date.now }
      }
    ],
    shippingAddress: {
      division: String,
      district: String,
      areaOrThana: String,
      streetAddress: String,
      postalCode: String,
      country: String,
    },
    deliveryDate: Date,
    notes: String, // special note from user
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export async function GET(request) {
  await connectToDatabase();
  const orders = await Order.find({});
  return Response.json(orders);
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    if (Array.isArray(data)) {
      const orders = await Order.insertMany(data);
      return Response.json(orders, { status: 201 });
    } else {
      const order = await Order.create(data);
      return Response.json(order, { status: 201 });
    }
  } catch (error) {
    return Response.json({ message: "Error inserting order(s)", error: error.message }, { status: 500 });
  }
}
