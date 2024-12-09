
import clientPromise from '@/lib/mongodb'; // Import the MongoDB clientPromise
import nodemailer from 'nodemailer'; // Import Nodemailer

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, customerName, totalAmount, customerEmail, phone, cartItems } = req.body;

    // Check if the necessary fields are present
    if (!orderId || !customerName || !totalAmount || !customerEmail || !phone || !cartItems) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: orderId, customerName, totalAmount, customerEmail, or phone",
      });
    }

    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db('Shisha'); // Use the correct database name

      // Create the order object to be inserted
      const orderData = {
        orderId,
        customerName,
        totalAmount,
        customerEmail,
        phone,
        cartItems,
        createdAt: new Date(),
      };
      const formattedCartItemsText = cartItems
  .map(item => ` - ${item.title}: ${item.price} AED x ${item.cartQuantity}`)
  .join('\n');

// Format cart items as an HTML list for the HTML email
const formattedCartItemsHtml = cartItems
  .map(item => `
    <li>
      <strong>Title:</strong> ${item.title} <br>
      <strong>Price:</strong> ${item.price} AED <br>
      <strong>Quantity:</strong> ${item.cartQuantity}
    </li>`)
  .join('');

      // Insert the order into the 'orders' collection
      await db.collection('orders').insertOne(orderData);
      console.log('Order saved to database.');

      // Create Nodemailer transporter using your Gmail credentials (hardcoded password)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sabesofteng@gmail.com', // Your Gmail address
          pass: 'crse tyut xdcq bxib',  // Hardcoded Gmail app password
        },
      });

      // Email content
      const mailOptions = {
        from: `"Holster Tobacco" sabesofteng@gmail.com`, // Sender address
        to: 'J.Nihad@holster-tobacco.com', // Recipient address
        subject: `New Order Received - ${orderId}`, // Subject line
        text: `A new order has been received.\n\nDetails:\nOrder ID: ${orderId}\nCustomer: ${customerName}\nTotal Amount: ${totalAmount}\nPhone: ${phone}\nCart items: ${cartItems}`, // Plain text body
        html: `<h1>New Order Received</h1>
               <p><strong>Order ID:</strong> ${orderId}</p>
               <p><strong>Customer:</strong> ${customerName}</p>
               <p><strong>Total Amount:</strong> ${totalAmount}</p>
               <p><strong>Phone:</strong> ${phone}</p>
                <ul>${formattedCartItemsHtml}</ul>`  // HTML body
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully.');

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Order saved successfully and email sent",
      });
    } catch (error) {
      console.error("Error saving order or sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save order or send email",
        error: error.message,
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db('Shisha'); // Use the correct database name

      // Fetch all orders and sort by createdAt in descending order
      const orders = await db.collection('orders')
        .find({})
        .sort({ createdAt: -1 }) // Sorting in descending order based on createdAt
        .toArray();

      if (orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found.",
        });
      }

      // Return the orders sorted with the newest first
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
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
