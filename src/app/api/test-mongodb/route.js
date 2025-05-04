import { connectToDatabase } from "../../../lib/mongodb.js";

export async function GET(request) {
  try {
    await connectToDatabase();
    console.log("MongoDB connection successful!");
    return Response.json({ message: "MongoDB connection successful!" });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    console.log("MongoDB is not connected.");
    return Response.json({ message: "MongoDB connection failed", error: error.message }, { status: 500 });
  }
}
