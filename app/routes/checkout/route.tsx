import { type DataFunctionArgs } from '@remix-run/node';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useState, useEffect } from "react";
import { getStripe } from '~/lib/stripe.server';

export const loader = async ({params, request}: DataFunctionArgs) => {
  let paramsId = params;
  console.log('paramsId', paramsId)

  let requestCheckout = request;
  console.log('requestCheckout', requestCheckout)
  return {}
}

export default function Checkout() {
  const stripePromise = getStripe()
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    const resp = fetch("checkout/buy", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    
    console.log(resp);
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