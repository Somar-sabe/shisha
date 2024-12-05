import clientPromise from '@/lib/mongodb'; // Import the MongoDB clientPromise

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, customerName, totalAmount, customerEmail, phone, cartItems } = req.body;

    // Check if the necessary fields are present
    if (!orderId || !customerName || !totalAmount || !customerEmail || !phone || !cartItems) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: orderId, customerName, totalAmount, customerEmail, or phone",
      });
    }

    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db('Shisha'); // Use the correct database name

      // Create the order object to be inserted
      const orderData = {
        orderId,
        customerName,
        totalAmount,
        customerEmail,
        phone,
        cartItems,
        createdAt: new Date(),
      };

      // Insert the order into the 'orders' collection
      await db.collection('orders').insertOne(orderData);
      console.log('Order saved to database.');

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Order saved successfully",
      });
    } catch (error) {
      console.error("Error saving order:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save order",
        error: error.message,
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db('Shisha'); // Use the correct database name

      // Fetch all orders and sort by createdAt in descending order
      const orders = await db.collection('orders')
        .find({})
        .sort({ createdAt: -1 }) // Sorting in descending order based on createdAt
        .toArray();

      if (orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found.",
        });
      }

      // Return the orders sorted with the newest first
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
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
