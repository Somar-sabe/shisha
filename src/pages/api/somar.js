import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    // Ensure that the request method is POST
    if (req.method === "POST") {
        console.log('Received POST request:', req.body); // Debugging request body

        try {
            // Connect to MongoDB
            await client.connect();
            const database = client.db();
            const orders = database.collection("orders");

            // Get order data from request body
            const order = req.body;

            // Insert order into database
            const result = await orders.insertOne(order);
            
            console.log('Order saved successfully:', result); // Debugging result of insertion

            // Return success response
            res.status(200).json({
                success: true,
                message: "Order saved successfully",
                orderId: result.insertedId
            });
        } catch (error) {
            console.error("Error saving order:", error);
            res.status(500).json({
                success: false,
                message: "Failed to save order"
            });
        } finally {
            // Close the MongoDB client after the operation
            await client.close();
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
