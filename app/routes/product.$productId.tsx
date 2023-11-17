import { type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { LikeDislike } from "~/components/LikeDislike";
// import groq from "groq";
// import Cart from "~/components/Cart";
// import { Product } from "~/components/Product";
import { ProductCover } from "~/components/ProductCover";
import { Title } from "~/components/Title";
import { merchQuery } from "~/lib/sanity.server";
import { client } from "~/sanity/client";
import { type ProductDocument } from "~/types/product";

export const loader = async ({params}: LoaderFunctionArgs) => {
    let sku = params.productId as string;
    const products = await client.fetch(merchQuery);
    // eslint-disable @typescript-eslint
    const product = products.filter((product: ProductDocument) => product.sku === sku);
    
    return {product};
}

export default function ProductsIndex() {
    const data = useLoaderData<typeof loader>();
    const product = data.product[0];
    let title = product.name;
    // const stripePromise = getStripe()
    return (
        <main>
            <h1>Artesanatos da Zizi</h1>
            <article className="flex flex-col items-start gap-4 lg:flex-row lg:gap-12">
            <div className="grid-gap-4 mx-auto grid max-w-[70vw] grid-cols-1">
                <ProductCover image={product.image} name={product.name} />
                <LikeDislike id={product.id} likes={product.likes} dislikes={product.dislikes} />
            </div>
            <div className="flex flex-shrink-0 flex-col gap-4 md:gap-6 lg:w-2/3">
                <header>
                <Title data={{title}} />
                <h2 className="bg-black text-2xl font-bold tracking-tighter text-white">
                    {product.description}
                </h2>
                </header>
                <p>R$ {product.price}</p>
            </div>
            </article>
            {/* <CartSummary /> */}
            <Link to="/">
                <p>Voltar</p>
            </Link>
        </main>
    );
} 