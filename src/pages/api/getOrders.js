import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            await client.connect();
            const database = client.db();
            const orders = database.collection("orders");

            const result = await orders.find({}).toArray();

            res.status(200).json({ success: true, orders: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to fetch orders" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
