import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51LL18HSDZMLAH51NPQnNHeJ9tXyG6iZXsbghYhUUOOnWB0NIc8H99JqNt0YppU3zvNVHT8Q4jffIY4DTqJeqTASL00qf9XuY8r', {
  apiVersion: '2020-08-27',
  typescript: true,
});
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3000,
    currency: 'usd',
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3001, () => console.log('Server up'));
