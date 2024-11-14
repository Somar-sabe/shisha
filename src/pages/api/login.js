// pages/api/login.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Example login info for demonstration
        const loginInfo = {
            email: "admin@email.com",
            password: "1234"
        };

        // Check if the provided credentials match
        if (email === loginInfo.email && password === loginInfo.password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } else {
        // Handle non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

