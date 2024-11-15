import clientPromise from '@/lib/mongodb'; // Import the client promise

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, customerName, totalAmount } = req.body;

    // Check if the necessary fields are present
    if (!orderId || !customerName || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: orderId, customerName, totalAmount"
      });
    }

    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db(); // Or specify your database: client.db('myDatabase')
      const ordersCollection = db.collection("orders");

      // Insert the order into the database
      const result = await ordersCollection.insertOne(req.body);

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Order saved successfully",
        orderId: result.insertedId
      });
    } catch (error) {
      console.error("Error saving order:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save order",
        error: error.message
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
