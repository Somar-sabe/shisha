import { MongoClient } from "mongodb";

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
    if (req.method === "POST") {
        console.log('Received POST request:', req.body); // Debugging request body

        // Basic validation of the order object
        const { orderId, customerName, totalAmount } = req.body;

        if (!orderId || !customerName || !totalAmount) {
            console.error("Missing fields:", { orderId, customerName, totalAmount });  // Debugging missing fields
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

            console.log("Inserting order:", req.body);  // Debugging the order before insertion

            // Insert order into database
            const order = req.body;
            const result = await ordersCollection.insertOne(order);

            console.log('Order saved successfully:', result); // Debugging result of insertion

            // Return success response
            res.status(200).json({
                success: true,
                message: "Order saved successfully",
                orderId: result.insertedId
            });
        } catch (error) {
            console.error("Error saving order:", error);  // Debugging the error
            res.status(500).json({
                success: false,
                message: "Failed to save order",
                error: error.message // Include the error message for debugging
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
