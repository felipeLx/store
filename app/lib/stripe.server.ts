import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { type ProductDocument } from "~/types/product";

let _stripe: any;

export async function getStripe() {
  if (!_stripe) {
    _stripe = await loadStripe(window.ENV.STRIPE_PUBLIC_KEY);
  }
  return _stripe;
}

export async function redirectToStripeCheckout(
  sessionId: string
) {
  const stripe = await getStripe();
  return stripe.redirectToCheckout({ sessionId });
}


export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function fetchPostJSON(url: string, data: any) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forward-Host") ?? request.headers.get("host");

  if (!host) {
    throw new Error("Could not find the url");
  }

  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}

export const getStripeSession = async (
  items: string,
  domainUrl: string
): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
    // @ts-ignore
    apiVersion: "2023-11-13",
    typescript: true,
  });

  const dataObj = JSON.parse(items);

  const lineItems = dataObj.map((product: ProductDocument) => {
    return {
      price: product.stripeId,
      quantity: product.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 5,
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"], // , "giropay", "pix"
    line_items: lineItems,
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
  });

  return session.url as string;
};