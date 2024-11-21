const express = require('express');
const { createPaymentIntent,chargePayment, handleWebhook } = require('../controllers/PaymentController');
const router = express.Router();

// Route to create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Stripe webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);



// Route to handle payment charge after token and clientSecret are received
router.post('/charge', chargePayment);  // New route for handling charge




module.exports = router;
