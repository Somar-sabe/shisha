import clientPromise from '@/lib/mongodb';  // Using the client promise like in the saveOrder API

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db(); // Or specify your database: client.db('myDatabase')
      const ordersCollection = db.collection("orders");

      // Fetch all orders from the collection (no filtering by user)
      const result = await ordersCollection.find({}).toArray();  // Fetch all orders without filtering by email

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
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
