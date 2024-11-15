import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;  // Make sure your MONGO_URI is set correctly
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
    const { orderId, customerName, totalAmount } = req.body;

    // Check if the necessary fields are present
    if (!orderId || !customerName || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: orderId, customerName, totalAmount"
      });
    }

    try {
      const client = await getClient();
      const database = client.db("myDatabase");  // Database name is "myDatabase"
      const ordersCollection = database.collection("orders");

      // Insert the order into the database
      const result = await ordersCollection.insertOne(req.body);

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
