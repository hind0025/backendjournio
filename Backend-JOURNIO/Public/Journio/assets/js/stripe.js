// public/js/stripe.js

// Set your Stripe publishable key
const stripe = Stripe('pk_test_51QNAizDIcVDYJAHhmj4kZo75z2mv2SkCuUazXAYV31csnTVGJ0n0V9WLPQ0ruEwKkmJ91IFZSH5FOTB6agAutJ7l00PNX6saAl');  // Replace with your Stripe publishable key
const elements = stripe.elements();
const card = elements.create('card');

// Add the card element to the form
card.mount('#card-element');

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the amount to charge from your package detail
    const amount = 46500;  // Example amount in smallest unit (INR paise for ₹46,500)
    const currency = 'inr';  // Currency for payment

    // Call backend to create payment intent
    const response = await fetch('/api/payments/create-payment-intent', {  // Update URL here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency })
    });

    const data = await response.json();

    if (data.error) {
        console.error(data.error);
        alert('Failed to create payment intent');
        return;
    }

    // Use the clientSecret received from backend to confirm the payment
    const { clientSecret } = data;

    const {token, error} = await stripe.createToken(card);

    if (error) {
        console.error(error);
        alert('Error creating payment token.');
    } else {
        // Send the token and clientSecret to the backend for final processing
        const paymentResponse = await fetch('/api/payments/charge', {  // Update URL here as well
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                clientSecret,
                name: document.getElementById('name').value,
            }),
        });

        const result = await paymentResponse.json();

        if (paymentResponse.ok) {
            alert('Payment successful!');
            window.location.href = '/';  // Redirect to homepage or confirmation page
        } else {
            alert('Payment failed.');
        }
    }
});
