import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Retrieve the email from the query parameters
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required to fetch orders."
        });
      }

      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db("Shisha");
      const ordersCollection = db.collection("orders");

      // Fetch orders for the given email
      const result = await ordersCollection.find({ customerEmail: email }).toArray();


      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found for the given email."
        });
      }

      // Return the filtered orders if successful
      res.status(200).json({ success: true, orders: result });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders.",
        error: error.message
      });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
