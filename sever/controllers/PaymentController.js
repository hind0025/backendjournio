const stripe = require('../config/stripe');
const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency, 
      payment_method_types: ['card'],
    });


    console.log(paymentIntent);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








// Handle Charge Payment (After the token is sent from frontend)
const chargePayment = async (req, res) => {
  const { token, clientSecret, name } = req.body; // Get token, clientSecret, and name from request body

  try {
    // Confirm the paymentIntent using the received clientSecret and payment method (token)
    const paymentIntent = await stripe.paymentIntents.confirm(clientSecret, {
      payment_method: token.id,  // Use the token's id for payment confirmation
    });

    // Handle successful payment
    if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);

      res.status(200).json({
        success: true,
        message: 'Payment completed successfully!',
      });
    } else {
      // Payment failed
      res.status(400).json({
        success: false,
        message: 'Payment failed.',
      });
    }
  } catch (error) {
    console.error('Error confirming payment:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
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


module.exports = { createPaymentIntent, chargePayment, handleWebhook };
