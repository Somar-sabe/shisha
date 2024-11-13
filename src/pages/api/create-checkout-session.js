import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { cartItems, totalAmount } = req.body;

        try {
            const lineItems = cartItems.map((item) => ({
                price_data: {
                    currency: 'aed',
                    product_data: { name: item.title },
                    unit_amount: item.price * 100, // Amount in cents
                },
                quantity: item.cartQuantity,
            }));

            // Use req.headers.origin if available, otherwise use a default base URL
            const baseUrl = req.headers.origin || 'https://www.holster-uae.com';

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${baseUrl}/checkout/success`,
                cancel_url: `${baseUrl}/checkout/cancel`,
            });

            res.status(200).json({ url: session.url });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
