import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            // Simulate user authentication (replace with your actual authentication logic)
            const userEmail = req.query.email; // Assuming email is sent as a query parameter

            // Validate user email
            if (!userEmail) {
                return res.status(400).json({
                    success: false,
                    message: "User email is required to fetch orders"
                });
            }

            await client.connect();
            const database = client.db();
            const orders = database.collection("orders");

            // Fetch orders for the specific user
            const result = await orders.find({ customerEmail: userEmail }).toArray();

            res.status(200).json({ success: true, orders: result });
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({ success: false, message: "Failed to fetch orders" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
