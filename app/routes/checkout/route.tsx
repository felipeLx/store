import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useState, useEffect } from "react";
import { getStripe } from '~/lib/stripe.server';

export default function Checkout() {
  const stripePromise = getStripe()
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    fetch("buy", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {clientSecret};

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}