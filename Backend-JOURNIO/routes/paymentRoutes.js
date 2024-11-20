const express = require('express');
const { createPaymentIntent, handleWebhook } = require('../controllers/PaymentController');
const router = express.Router();

// Route to create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Stripe webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
