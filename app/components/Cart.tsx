import { CartProvider } from 'use-shopping-cart'
import {getStripe} from '~/lib/stripe.server'

export default function Cart({children}: {children: React.ReactElement}) {
    const stripePromise = getStripe()
    
    return (
        <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currency="BRL"
        >
        {children}
        </CartProvider>
    )
}

