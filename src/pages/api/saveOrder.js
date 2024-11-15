import { MongoClient } from "mongodb";

// MongoDB URI and client initialization
const uri = process.env.MONGO_URI;
let client;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
  }
  if (!client.isConnected()) {
    await client.connect();
  }
  return client;
}

export default async function handler(req, res) {
    // Ensure that the request method is POST
    if (req.method === "POST") {
        console.log('Received POST request:', req.body); // Debugging request body

        // Basic validation of the order object
        const { orderId, customerName, totalAmount } = req.body;
        if (!orderId || !customerName || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: orderId, customerName, totalAmount"
            });
        }

        try {
            // Get MongoDB client
            const client = await getClient();
            const database = client.db();
            const ordersCollection = database.collection("orders");

            // Insert order into database
            const order = req.body;

            console.log('Inserting order:', order); // Log the order being inserted
            const result = await ordersCollection.insertOne(order);

            // Check if insertion was successful and log the result
            if (result.acknowledged) {
                console.log('Order saved successfully:', result); // Debugging result of insertion
                res.status(200).json({
                    success: true,
                    message: "Order saved successfully",
                    orderId: result.insertedId
                });
            } else {
                console.log('Failed to insert order:', result);
                res.status(500).json({
                    success: false,
                    message: "Failed to save order"
                });
            }
        } catch (error) {
            console.error("Error saving order:", error); // Log error if MongoDB insert fails
            res.status(500).json({
                success: false,
                message: "Failed to save order",
                error: error.message // Include error message in the response
            });
        }
    } else {
        // Handle non-POST methods (e.g., GET)
        console.log(`Method ${req.method} not allowed`);
        res.status(405).json({
            success: false,
            message: `Method ${req.method} Not Allowed`
        });
    }
}
