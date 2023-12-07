// import { json } from "@remix-run/node";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { type ProductStub } from "~/types/product";
import { getEnv } from "./env.server";
// import { StringFieldProps } from "sanity";
//import { SESSION_ID } from "sanity";

let _stripe: any;

export async function getStripe() {
  let apiKey = getEnv().STRIPE_PUBLIC_KEY
  if (!_stripe) {
    _stripe = await loadStripe(apiKey);
  }
  return _stripe;
}


export const getStripeSession = async (
  items: string,
  domainUrl: string
) => {
  let stripeApiKey = getEnv().STRIPE_API_KEY
  const stripe = new Stripe(stripeApiKey, {
    // @ts-ignore
    apiVersion: '2023-10-16',
    typescript: true,
  });

  const dataObj = JSON.parse(items);

  const lineItems = dataObj.map((product: ProductStub) => {
    return {
      price: product.stripeProductId,
      quantity: product.quantity,
      adjustable_quantity: {
        enabled: false,
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "boleto"], // , "giropay", "pix", , "boleto", "pix"
    line_items: lineItems,
    tax_id_collection: {
      enabled: true,
    },
    shipping_address_collection: {
      allowed_countries: ["BR"],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1OKTcUHEys2Shpg8ZFfNGeC9",
      },
    ],
    custom_text: {
      shipping_address: {
        message: 'Por favor notar que precisamos das confirmação do endereço para o envio pelos Correios.',
      },
      submit: {
        message: 'Enviaremos informações por email.',
      },
    },
    // return_url: `https://artesanatosdazizi.com.br/checkout`
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
    // automatic_tax: { enabled: true },
  });
  
  // return {clientSecret: session.client_secret};
  return session.url as string;
};

/*
const getProductPrice = async(id: string) => {
  let apiKey = getEnv().STRIPE_API_KEY;
  const stripe = new Stripe(apiKey, {
    apiVersion: '2023-10-16',
    typescript: true,
  });

  const price = await stripe.prices.retrieve(id);
  return price.unit_amount;
}
const calculateOrderAmount = async(items: any) => {
   // @ts-ignore
   const itemsObj = JSON.parse(items);
   const cleanedItems = Object.fromEntries(
     Object.entries(itemsObj).map(([key, value]) => [key.trim(), typeof value === 'string' ? value.trim() : value])
   );
 
   const itemsArray = Object.entries(cleanedItems);
   const amount = await itemsArray.reduce(async (totalPromise, [stripeProductId, quantity]) => {
     const total = await totalPromise;
     const price = await getProductPrice(stripeProductId.trim()) as number;
     return total + price * quantity;
   }, Promise.resolve(0));
 
   console.log('amount', amount);
   return amount;
};

export async function stripeHandler(items: ProductStub) {
  console.log('items.cartData stripeHandler', items)
  
  let apiKey = getEnv().STRIPE_API_KEY
  const stripe = new Stripe(apiKey, {
    // @ts-ignore
    apiVersion: '2023-10-16',
    typescript: true,
  });

  let totalAmount = await calculateOrderAmount(items)
  // Create a PaymentIntent with the order amount and currency
  return await stripe.paymentIntents.create({
    amount: Number(totalAmount.valueOf()),
    currency: "BRL",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  //return {clientSecret: paymentIntent.client_secret}
}
*/
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

  return `${protocol}://${host}/`;
}
