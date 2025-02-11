import clientPromise from '@/lib/mongodb';  // Import the MongoDB clientPromise
import nodemailer from 'nodemailer'; // Import Nodemailer

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, company, position, country, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !company || !position || !country || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    try {
      // Use the clientPromise to get the MongoDB client
      const client = await clientPromise;
      const db = client.db('shisha'); // Use the correct database name

      // Prepare the contact form data to be inserted into MongoDB
      const formData = {
        name,
        email,
        phone,
        company,
        position,
        country,
        message,
        submittedAt: new Date(),
      };

      // Insert the contact form data into the 'contact_form' collection
      await db.collection('contact_form').insertOne(formData);
      console.log('Contact form data saved to database.');

      // Create Nodemailer transporter using your Gmail credentials (hardcoded password)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sabesofteng@gmail.com',  // Your Gmail address
          pass: 'crse tyut xdcq bxib',   // Your Gmail app password (not your Gmail password)
        },
      });

      // Email content
      const mailOptions = {
        from: email, // Sender address
        to: 'contact@holster-tobacco.com', // Recipient address
        subject: `New message from ${name}`, // Subject line
        text: `
          You have a new message from the contact form.
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Company: ${company}
          Position: ${position}
          Country: ${country}
          Message: ${message}
        `, // Plain text content
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `, // HTML content
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Form submitted and email sent successfully",
      });
    } catch (error) {
      console.error("Error saving form data or sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save form data or send email",
        error: error.message,
      });
    }
  } else {
    // Handle other HTTP methods (e.g., GET)
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
