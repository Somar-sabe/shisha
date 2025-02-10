import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Destructure form data from the request body
    const {
      name,
      phone,
      email,
      company,
      position,
      country,
      message
    } = req.body;

    // Validate the required fields
    if (!name || !phone || !email || !company || !position || !country) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, phone, email, company, position, country"
      });
    }

    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db("Shisha"); // Specify the database name
      const contactCollection = db.collection("contacts"); // Specify the collection name

      // Insert the form data into the collection
      const result = await contactCollection.insertOne({
        name,
        phone,
        email,
        company,
        position,
        country,
        message,
        createdAt: new Date(),
      });

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Form data saved successfully",
        contactId: result.insertedId,
      });
    } catch (error) {
      console.error("Error saving form data:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save form data",
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
