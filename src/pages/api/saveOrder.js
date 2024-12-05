import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb'; // Assuming MongoDB, adjust accordingly if using another database

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'Shisha';
const collectionName = 'orders';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, customerName, totalAmount, customerEmail, phone, cartItems } = req.body;

    // Check if the necessary fields are present
    if (!orderId || !customerName || !totalAmount || !customerEmail || !phone || !cartItems) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: orderId, customerName, totalAmount, customerEmail, or phone"
      });
    }

    try {
      // Connect to MongoDB and save the order to the database
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Insert the order into the database
      const order = {
        orderId,
        customerName,
        totalAmount,
        customerEmail,
        phone,
        cartItems,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(order);
      if (!result.acknowledged) {
        throw new Error("Failed to save order to the database.");
      }

      // Create Nodemailer transporter using your Gmail credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail address
          pass: process.env.EMAIL_PASSWORD, // Replace with your App Password
        }
      });

      // Email content
      const mailOptions = {
        from: `"Holster Tobacco" <${process.env.EMAIL_USER}>`, // Sender address
        to: 'J.Nihad@holster-tobacco.com', // Recipient address
        subject: `New Order Received - ${orderId}`, // Subject line
        html: `
          <h1>New Order Received</h1>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Cart items:</strong> ${JSON.stringify(cartItems)}</p>
        `, // HTML body
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully.');

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Order saved and email sent successfully",
      });
    } catch (error) {
      console.error("Error saving order or sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save order or send email",
        error: error.message,
      });
    } finally {
      // Ensure that MongoDB connection is closed
      await client.close();
    }
  } else {
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
