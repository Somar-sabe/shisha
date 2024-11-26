import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with a specific domain if needed
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Respond with a 200 status code to handle preflight requests
    }
    
    if (req.method === 'POST') {
        const { userName, email, password } = req.body;

        try {
            // Connect to MongoDB
            const client = await clientPromise;
            const db = client.db(); // Connects to the default database specified in MONGODB_URI
            const usersCollection = db.collection('users');

            // Check if the user already exists
            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            const result = await usersCollection.insertOne({
                userName,
                email,
                password: hashedPassword, // Store the hashed password
                createdAt: new Date(),
            });

            // Return success response
            res.status(200).json({ message: 'User created successfully!' });
        } catch (error) {
            console.error("Error saving user data:", error);
            res.status(500).json({ error: 'Failed to save user data' });
        }
    } else {
        // Handle non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
