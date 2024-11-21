const stripe = require('../config/stripe');
const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g., $10.00 => 1000 cents
      currency, // e.g., 'usd'
      payment_method_types: ['card'],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret, // Use this clientSecret on the frontend
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle Webhooks (optional for event handling)
const handleWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Set this from Stripe Dashboard
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { createPaymentIntent, handleWebhook };
