import { Stripe } from "stripe";
import { config } from "dotenv";

config();

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { orderDetails, email, amount, currency, uid } = req.body;

    let customer;

    try {
      customer = await stripe.customers.retrieve(uid);
    } catch (error) {
      if (error.statusCode === 404) {
        customer = await stripe.customers.create({
          id: uid,
          name: orderDetails.fullName,
          phone: orderDetails.phone,
          address: {
            city: orderDetails.city,
            country: orderDetails.country.eng,
            line1: orderDetails.address,
            postal_code: orderDetails.zipCode,
          },
          email: email,
        });
      } else {
        throw error;
      }
    }

    await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2023-10-16" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ["card"],
      receipt_email: email,
      customer: customer.id,
      shipping: {
        address: {
          city: orderDetails.city,
          country: orderDetails.country.eng,
          line1: orderDetails.address,
          postal_code: orderDetails.zipCode,
        },
        name: orderDetails.fullName,
        phone: orderDetails.phone,
      },
    });

    return res.status(200).json({ paymentIntent });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return res.status(400).json({ error: error.message });
  }
}
