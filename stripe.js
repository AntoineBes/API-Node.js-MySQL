// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// public key: pk_test_igtcPVC8EVARqB1t4S9G614e00QFQF2mh6
// private key: sk_test_voQpX5FzNoFLtWyiIITFmi2N00qrYBlQ32
const stripe = require('stripe')('sk_test_voQpX5FzNoFLtWyiIITFmi2N00qrYBlQ32');

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://example.com/t-shirt.png'],
      amount: 500,
      currency: 'eur',
      quantity: 1,
    }],
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
  });
})();
