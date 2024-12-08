// // Initialize Stripe with your public key
// const stripe = Stripe('pk_test_51QNAizDIcVDYJAHhmj4kZo75z2mv2SkCuUazXAYV31csnTVGJ0n0V9WLPQ0ruEwKkmJ91IFZSH5FOTB6agAutJ7l00PNX6saAl');

// // Create an instance of Elements
// const elements = stripe.elements();
// const card = elements.create('card');

// // Mount the card element to the DOM
// card.mount('#card-element');

// // Get the payment form element
// const form = document.getElementById('payment-form');

// // Handle form submission
// form.addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent default form submission

//     // Retrieve the cardholder name from the input field
//     const nameInput = document.getElementById('name');
//     if (!nameInput) {
//         console.error('Cardholder name input not found.');
//         alert('Please enter your name.');
//         return; // Exit early if the input is missing
//     }
//     const name = nameInput.value.trim();

//     if (!name) {
//         alert('Cardholder name is required.');
//         return; // Exit early if the name is empty
//     }

//     // Payment details
//     const amount = 46500; // Example amount in smallest currency unit (e.g., INR paise for ₹46,500)
//     const currency = 'inr'; // Payment currency

//     try {
//         // Step 1: Create a PaymentIntent via your backend
//         const intentResponse = await fetch('http://127.0.0.1:5000/api/payments/create-payment-intent', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ amount, currency }),
//         });

//         const intentData = await intentResponse.json();

//         if (!intentResponse.ok || !intentData.clientSecret) {
//             console.error('Error creating PaymentIntent:', intentData.error || 'Unknown error');
//             alert('Failed to create PaymentIntent.');
//             return;
//         }

//         const { clientSecret } = intentData;

//         // Step 2: Confirm the card payment using Stripe.js
//         const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: card,
//                 billing_details: {
//                     name,
//                 },
//             },
//         });

//         if (error) {
//             console.error('Error confirming card payment:', error);
//             alert(`Payment failed: ${error.message}`);
//             return;
//         }

//         if (paymentIntent && paymentIntent.status === 'succeeded') {
//             alert('Payment successful!');
//             window.location.href = '/home'; // Redirect to a success page
//         } else {
//             alert('Payment failed. Please try again.');
//         }
//     } catch (err) {
//         console.error('Error processing payment:', err);
//         alert('An error occurred while processing your payment.');
//     }
// });


// Initialize Stripe with your public key
const stripe = Stripe('pk_test_51QNAizDIcVDYJAHhmj4kZo75z2mv2SkCuUazXAYV31csnTVGJ0n0V9WLPQ0ruEwKkmJ91IFZSH5FOTB6agAutJ7l00PNX6saAl');

// Create an instance of Elements
const elements = stripe.elements();
const card = elements.create('card');

// Mount the card element to the DOM
card.mount('#card-element');

// Get the payment form element
const form = document.getElementById('payment-form');

// Retrieve price and title from sessionStorage
const amount = parseInt(sessionStorage.getItem("selectedPrice"))*100 || 0; // Convert price to integer
const title = sessionStorage.getItem("selectedTitle") || "Package";

// Display the selected package details (optional)
const packageDetails = document.getElementById("package-details");
if (packageDetails) {
    packageDetails.innerHTML = `
        <h3>${title}</h3>
        <p>Price: ₹${amount.toLocaleString()}</p>
    `;
}

// Payment currency
const currency = "inr"; 


form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    // Retrieve the cardholder name from the input field
    const nameInput = document.getElementById('name');
    if (!nameInput) {
        console.error('Cardholder name input not found.');
        alert('Please enter your name.');
        return; // Exit early if the input is missing
    }
    const name = nameInput.value.trim();

    if (!name) {
        alert('Cardholder name is required.');
        return; // Exit early if the name is empty
    }

    try {
        // Step 1: Create a PaymentIntent via your backend
        const intentResponse = await fetch('http://127.0.0.1:5000/api/payments/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, currency }),
        });

        const intentData = await intentResponse.json();

        if (!intentResponse.ok || !intentData.clientSecret) {
            console.error('Error creating PaymentIntent:', intentData.error || 'Unknown error');
            alert('Failed to create PaymentIntent.');
            return;
        }

        const { clientSecret } = intentData;

        // Step 2: Confirm the card payment using Stripe.js
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name,
                },
            },
        });

        if (error) {
            console.error('Error confirming card payment:', error);
            alert(`Payment failed: ${error.message}`);
            return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
            window.location.href = '/Backend-JOURNIO/Public/Journio/index.html'; 
        } else {
            alert('Payment failed. Please try again.');
        }
    } catch (err) {
        console.error('Error processing payment:', err);
        alert('An error occurred while processing your payment.');
    }
});
