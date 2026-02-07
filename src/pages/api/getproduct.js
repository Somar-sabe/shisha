import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing product ID",
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("Shisha");
    const productsCollection = db.collection("products");

    let product = null;

    // 1) ObjectId
    if (ObjectId.isValid(id) && String(new ObjectId(id)) === String(id)) {
      product = await productsCollection.findOne({ _id: new ObjectId(id) });
    }

    // 2) numeric id field
    if (!product) {
      const idNum = Number(id);
      if (!Number.isNaN(idNum)) {
        product = await productsCollection.findOne({ id: idNum });
      }
    }

    // 3) string id field
    if (!product) {
      product = await productsCollection.findOne({ id: String(id) });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
}
