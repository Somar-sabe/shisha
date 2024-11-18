import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { orderId, status } = req.body;

      // Validate the request body
      if (!orderId || !status) {
        return res.status(400).json({
          success: false,
          message: "Order ID and status are required to update the order status."
        });
      }

      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db("Shisha");
      const ordersCollection = db.collection("orders");

      // Update the order's status
      const result = await ordersCollection.findOneAndUpdate(
        { orderId: orderId }, // Filter by orderId
        { $set: { status: status } }, // Update the status
        { returnDocument: "after" } // Return the updated document
      );

      // Log the result to check what was returned
      console.log("Result of update:", result);

      // Check if the order was found and updated
      if (!result.value) {
        console.error("Order not found with the provided ID:", orderId);
        return res.status(404).json({
          success: false,
          message: "Order not found with the provided ID."
        });
      }

      // Return the updated order
      return res.status(200).json({
        success: true,
        message: "Order status updated successfully.",
        order: result.value
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update the order status.",
        error: error.message
      });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
