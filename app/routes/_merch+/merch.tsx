import { Link, useLoaderData } from "@remix-run/react";
import Cart from "~/components/Cart";
import { Products } from "~/components/Products";
import { merchQuery } from "~/lib/sanity.server";
import { client } from "~/sanity/client";

export const loader = async () => {
    const res = await client.fetch(merchQuery);
    const products = await res.json();
    return products;
}

export default function Merch() {
    const data = useLoaderData<typeof loader>();
    // const stripePromise = getStripe()
    
    return (
        <main>
            <h1>Artesanatos da Zizi</h1>
            <p>
                Parceria com{" "}
                <a href="https://useshoppingcart.com">Stripe</a>
            </p>
            <Cart>
            <Products products={data.products} />
            {/* <CartSummary /> */}
            </Cart>
            <Link to="/">
                <p>Voltar</p>
            </Link>
        </main>
    );
} 