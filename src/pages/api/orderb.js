import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db("Shisha");
      const ordersCollection = db.collection("orders");

      // Fetch all orders
      const result = await ordersCollection.find({}).toArray();

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found."
        });
      }

      // Ensure dates are properly formatted
      const ordersWithFormattedDates = result.map(order => {
        return {
          ...order,
          createdAt: order.createdAt ? order.createdAt.toISOString() : null, // Convert createdAt to ISO string
        };
      });

      // Return all orders with formatted dates
      res.status(200).json({ success: true, orders: ordersWithFormattedDates });
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
