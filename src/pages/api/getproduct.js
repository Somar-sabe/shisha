import clientPromise from '@/lib/mongodb'; // Import the client promise
import { ObjectId } from 'mongodb'; // Import ObjectId for querying by _id

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query; // Extract the 'id' from query parameters

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing product ID",
      });
    }

    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db("Shisha"); // Specify the database
      const productsCollection = db.collection("products"); // Specify the collection

      // Convert the id to ObjectId if it's not already
      const objectId = ObjectId(id);

      // Find the product by _id
      const product = await productsCollection.findOne({ _id: objectId });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Return the product details in the response
      return res.status(200).json({
        success: true,
        product: product,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
