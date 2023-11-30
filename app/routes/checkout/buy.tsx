import { type ActionFunctionArgs, json } from "@remix-run/node" // , redirect
import { getDomainUrl, getStripe, getStripeSession } from "~/lib/stripe.server"
import {EmbeddedCheckoutProvider,EmbeddedCheckout} from '@stripe/react-stripe-js';
import { useActionData } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ message: "Method now allowed" }, 405);
  }

  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const items = values.cartData as string;

  const stripeClientSecret: any = await getStripeSession(
    items,
    getDomainUrl(request)
  );
  console.log('stripeRedirectUrl', stripeClientSecret)
  return json({clientSecret: stripeClientSecret.clientSecret});
}

export default function Checkout() {
  const stripePromise = getStripe()
  const actionData = useActionData<typeof action>()
  console.log('actionData', actionData)
  //const options = {actionData.clientSecret};

  return (
    <div id="checkout">
      {actionData && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={actionData.clientSecret}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}