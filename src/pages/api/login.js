import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const client = await clientPromise;
            const db = client.db();
            const usersCollection = db.collection('users');

            // Check if user exists with the provided email
            const user = await usersCollection.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Compare the provided password with the stored hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Create a JWT token (you can customize the payload)
            const payload = { email: user.email, userId: user._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration as needed

            // If the login is successful, send the JWT token and success message
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: 'Login failed due to server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
