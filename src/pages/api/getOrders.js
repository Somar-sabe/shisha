import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Connect to the MongoDB client
      await client.connect();
      const database = client.db();
      const orders = database.collection("orders");

      // Fetch all orders from the collection (no filtering by user)
      const result = await orders.find({}).toArray();  // Fetch all orders without filtering by email

      // Return the orders if successful
      res.status(200).json({ success: true, orders: result });
    } catch (error) {
      console.error("Error fetching orders:", error);
      console.error(error.stack);  // Log the full error stack for debugging

      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message
      });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
