import { loadStripe } from "@stripe/stripe-js";

//let stripePromise: any = '';
const getStripe = () => {
  return loadStripe(process.env.STRIPE_PUBLIC_KEY);
};

export default getStripe;