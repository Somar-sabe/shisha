import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userName, email, password } = req.body;

        try {
            const client = await clientPromise;
            const db = client.db(); // Connects to the default database specified in MONGODB_URI
            const usersCollection = db.collection('users');

            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            const result = await usersCollection.insertOne({
                userName,
                email,
                password, // Note: store hashed password in production
                createdAt: new Date(),
            });

            res.status(200).json({ message: 'User created successfully!' });
        } catch (error) {
            console.error("Error saving user data:", error);
            res.status(500).json({ error: 'Failed to save user data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
