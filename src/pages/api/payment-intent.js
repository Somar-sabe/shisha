export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const paymentRequest = req.body;
            const response = await fetch("https://api-v2.ziina.com/api/payment_intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${kDeeT1QaJj7PXNDO29g7RnlC66DOU1Q2kD/CVcvGSjyIiColdkulLgELptycBRnB}`,
                },
                body: JSON.stringify(paymentRequest),
            });

            const paymentResponse = await response.json();

            if (paymentResponse.status === "success") {
                res.status(200).json({ status: 'success', payment_url: paymentResponse.payment_url });
            } else {
                res.status(400).json({ status: 'error', message: paymentResponse.message });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    } else {
        res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }
}
