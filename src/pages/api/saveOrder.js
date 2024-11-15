import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await client.connect();
            const database = client.db();
            const orders = database.collection("orders");

            const order = req.body;

            const result = await orders.insertOne(order);

            res.status(200).json({ success: true, message: "Order saved successfully", orderId: result.insertedId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to save order" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
