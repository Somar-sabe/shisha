// pages/api/contact.js
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

const uri = 'your_mongo_connection_string';  // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, company, position, country, message } = req.body;

        try {
            // Connect to MongoDB and save the contact form data
            await client.connect();
            const database = client.db('shisha');  // Replace with your database name
            const collection = database.collection('contacts');

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

            // Save the form data to MongoDB
            await collection.insertOne(formData);

            // Send the email using Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your-email@gmail.com',  // Your Gmail address
                    pass: 'your-gmail-app-password',  // Gmail app password (not your Gmail password)
                },
            });

            const mailOptions = {
                from: email,  // Sender's email address
                to: 'contact@holster-tobacco.com',  // Recipient's email address
                subject: `New message from ${name}`,  // Email subject
                text: `
                    You have a new message from the contact form.
                    Name: ${name}
                    Email: ${email}
                    Phone: ${phone}
                    Company: ${company}
                    Position: ${position}
                    Country: ${country}
                    Message: ${message}
                `,  // Plain text content
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
                `,  // HTML content
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            // Respond with success
            res.status(200).json({ success: true, message: 'Form submitted and email sent successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Error saving form data or sending email' });
        } finally {
            // Close MongoDB connection
            await client.close();
        }
    } else {
        // Handle other HTTP methods (e.g., GET)
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
