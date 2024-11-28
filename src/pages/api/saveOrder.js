import clientPromise from '@/lib/mongodb'; // Import the client promise
import nodemailer from 'nodemailer'; // Import Nodemailer

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

      // Set up Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 587, 
        secure: false, 
        auth: {
          user: 'sabesofteng@gmail.com', 
          pass: '0934491127sS@', 
        },
      });

      // Email content
      const mailOptions = {
        from: '"Holster Tobacco" ', // Sender address
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
