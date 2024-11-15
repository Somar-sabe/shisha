import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            // Get the JWT token from the Authorization header
            const token = req.headers.authorization?.split(' ')[1]; // Bearer token

            // If the token is not provided, return an error
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization token is required"
                });
            }

            // Verify and decode the JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Extract email from the decoded token
            const userEmail = decoded.email;

            if (!userEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to authenticate user"
                });
            }

            // Connect to the MongoDB client
            await client.connect();
            const database = client.db();
            const orders = database.collection("orders");

            // Fetch orders for the specific user using the email from the JWT
            const result = await orders.find({ customerEmail: userEmail }).toArray();

            // Return the orders if successful
            res.status(200).json({ success: true, orders: result });
        } catch (error) {
            console.error("Error fetching orders:", error);

            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token"
                });
            }

            res.status(500).json({ success: false, message: "Failed to fetch orders" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
