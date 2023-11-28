// import { useState } from "react"
import { type ActionFunctionArgs, json, type LoaderFunctionArgs } from "@remix-run/node"
// import {stripeHandler} from "~/lib/stripe.server"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "~/components/CheckoutForm"
import { getEnv } from "~/lib/env.server"
import { useLoaderData } from "@remix-run/react"

export async function loader({ request, params }: LoaderFunctionArgs) {
  let stripePublicKey = getEnv().STRIPE_PUBLIC_KEY
  const stripePromise = await loadStripe(stripePublicKey);
  return {stripePromise};
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ message: "Method now allowed" }, 405);
  }

  const formData = await request.formData();
  const values: any = Object.fromEntries(formData);
  
  if(typeof values.cartData === 'string') {
    try {
      values.cartData = JSON.parse(values.cartData);
      values.cartData = JSON.stringify(values.cartData).replace(/\t\r\n+/g, '').trim()
    } catch (err) {
      console.error('Failed to parse cartData:', err);
      return json({ message: "Invalid cartData" }, 400);
    }
  }
  // const result = await stripeHandler(values.cartData)
  
  return {} // result;
}

export default function Checkout() {
  const data = useLoaderData<typeof loader>();
  let {stripe}: any = data.stripePromise;
  // const [clientSecret, setClientSecret] = useState("");
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
}