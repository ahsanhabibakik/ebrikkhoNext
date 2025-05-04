import { connectToDatabase } from "../../../../lib/mongodb.js";
import Product from "../../../../models/Product.js";

export async function GET(request) {
  await connectToDatabase();
  const products = await Product.find({});
  return Response.json(products);
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // Accept both single object and array for bulk insert
    if (Array.isArray(data)) {
      const products = await Product.insertMany(data);
      return Response.json(products, { status: 201 });
    } else {
      const product = await Product.create(data);
      return Response.json(product, { status: 201 });
    }
  } catch (error) {
    console.error("Error inserting product(s):", error);
    return Response.json(
      { message: "Error inserting product(s)", error: error.message },
      { status: 500 }
    );
  }
}
