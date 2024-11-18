import clientPromise from '@/lib/mongodb'; // Import the client promise

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db("Shisha"); // Specify the database
      const productsCollection = db.collection("products"); // Specify the collection

      // Fetch all products from the collection
      const products = await productsCollection.find({}).toArray();

      // Return the products in the response
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
