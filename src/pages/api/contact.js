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
      // Create Nodemailer transporter using environment variables for credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,  // Gmail address from env variable
          pass: process.env.GMAIL_APP_PASSWORD, // Gmail app password from env variable
        },
      });

      // Email content
      const mailOptions = {
        from: email, // Sender address
        to: 'contact@holster-tobacco.com', // Recipient address
        subject: `New message from ${name}`, // Subject line
        text: `You have a new message from the contact form.\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nPosition: ${position}\nCountry: ${country}\nMessage: ${message}`, // Plain text content
        html: `<h1>New Contact Form Submission</h1><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Company:</strong> ${company}</p><p><strong>Position:</strong> ${position}</p><p><strong>Country:</strong> ${country}</p><p><strong>Message:</strong></p><p>${message}</p>`, // HTML content
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
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
