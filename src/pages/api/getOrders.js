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
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token"
        });
      }

      // The decoded token is no longer needed for fetching all orders, but you can still check the user
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

      // Fetch all orders from the collection (no filtering by user)
      const result = await orders.find({}).toArray();  // Fetch all orders without filtering by email

      // Return the orders if successful
      res.status(200).json({ success: true, orders: result });
    } catch (error) {
      console.error("Error fetching orders:", error);
      console.error(error.stack);  // Log the full error stack for debugging

      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message
      });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
