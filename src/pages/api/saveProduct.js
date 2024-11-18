import clientPromise from '@/lib/mongodb'; // Import the client promise

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Destructure necessary product data from the request body
    const {
      id,
      title,
      thumbnail,
      pCate,
      cate,
      price,
      productType,
      shortDes,
      description,
    } = req.body;

    // Check if the necessary fields are present
    if (!id || !title || !price || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: id, title, price, thumbnail"
      });
    }

    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db("Shisha"); // Specify the database
      const productsCollection = db.collection("products"); // Specify the collection

      // Insert the product into the database
      const result = await productsCollection.insertOne(req.body);

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Product saved successfully",
        productId: result.insertedId,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save product",
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
