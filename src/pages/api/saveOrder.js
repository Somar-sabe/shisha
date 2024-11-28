import clientPromise from '@/lib/mongodb'; // Import the client promise
import nodemailer from 'nodemailer'; // Import Nodemailer
import { google } from 'googleapis'; // Import Google APIs for OAuth2
import { OAuth2Client } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, customerName, totalAmount, customerEmail, phone } = req.body;

    // Check if the necessary fields are present
    if (!orderId || !customerName || !totalAmount || !customerEmail || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: orderId, customerName, totalAmount, customerEmail, or phone"
      });
    }

    try {
      req.body.orderDate = new Date();
      req.body.status = "Processing";
      const client = await clientPromise;
      const db = client.db("Shisha");
      const ordersCollection = db.collection("orders");

      // Insert the order into the database
      const result = await ordersCollection.insertOne(req.body);

      // Initialize OAuth2 client using environment variables
      const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID, // Use environment variable for client ID
        process.env.GOOGLE_CLIENT_SECRET, // Use environment variable for client secret
        'https://www.holster-uae.com/saveOrder' // Your redirect URI
      );

      // Set the tokens (you would have received these tokens after the OAuth authorization flow)
      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN // Use environment variable for refresh token
      });

      // Get the access token using the refresh token
      const { token } = await oauth2Client.getAccessToken();

      // Create a Nodemailer transporter using the OAuth2 token
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER, // Use environment variable for email user
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN, // The refresh token you obtained
          accessToken: token.token, // The access token you obtained
        },
      });

      // Email content
      const mailOptions = {
        from: `"Holster Tobacco" <${process.env.EMAIL_USER}>`, // Sender address
        to: 'sabesofteng@gmail.com', // Recipient address
        subject: `New Order Received - ${orderId}`, // Subject line
        text: `A new order has been received.\n\nDetails:\nOrder ID: ${orderId}\nCustomer: ${customerName}\nTotal Amount: ${totalAmount}\nPhone: ${phone}`, // Plain text body
        html: `<h1>New Order Received</h1>
               <p><strong>Order ID:</strong> ${orderId}</p>
               <p><strong>Customer:</strong> ${customerName}</p>
               <p><strong>Total Amount:</strong> ${totalAmount}</p>
               <p><strong>Phone:</strong> ${phone}</p>`, // HTML body
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully.');

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Order saved and email sent successfully",
        orderId: result.insertedId,
      });
    } catch (error) {
      console.error("Error saving order or sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save order or send email",
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
