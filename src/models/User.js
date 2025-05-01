import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  emailVerified: Date,
  isAdmin: { type: Boolean, default: false },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'superadmin', 'ad'],
    default: 'user'
  },
  phone: String,
  address: {
    street: String,
    area: String,
    city: String,
    country: String,
    postalCode: String
  },
  metadata: {
    position: String,
    department: String,
    joinedDate: { type: Date, default: Date.now },
    lastLogin: Date
  },
  billingAddress: {
    street: String,
    area: String,
    city: String,
    country: String,
    postalCode: String
  },
  preferences: {
    newsletter: { type: Boolean, default: true },
    notifications: { type: Boolean, default: true }
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
