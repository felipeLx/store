// import { useState } from "react"
import { type ActionFunctionArgs, json, type LoaderFunctionArgs } from "@remix-run/node"
import {stripeHandler} from "~/lib/stripe.server"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "~/components/CheckoutForm"
import { getEnv } from "~/lib/env.server"
import { useLoaderData } from "@remix-run/react"

export async function loader({ request, params }: LoaderFunctionArgs) {
  let stripePublicKey = getEnv().STRIPE_PUBLIC_KEY
  const stripePromise = await loadStripe(stripePublicKey);
  console.log('request Checkout', request)
  console.log('params Checkout', params)
  return {stripePromise};
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ message: "Method now allowed" }, 405);
  }

  const formData = await request.formData();
  const values: any = Object.fromEntries(formData);

  const result = await stripeHandler(values)
  
  return result;
}

export default function Checkout() {
  const data = useLoaderData<typeof loader>();
  let {stripe}: any = data.stripePromise;
  console.log('stripe Checkout', stripe)
  // const [clientSecret, setClientSecret] = useState("");
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
}