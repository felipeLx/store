import { formatCurrencyString } from "use-shopping-cart";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useLove } from "~/lib/useCart";
import { ProductCover } from "~/components/ProductCover";
import { Title } from "~/components/Title";
import { PRODUCTS_QUERY } from "~/sanity/queries";

import { productsZ, type ProductDocument } from "~/types/product";
import { loadQuery } from "~/sanity/loader.server";

export const loader = async ({params}: LoaderFunctionArgs) => {
    let sku: any = params.productId;
    console.log('sku', sku)
    const product = await loadQuery<ProductDocument[]>(PRODUCTS_QUERY).then((res) => ({
        ...res,
        data: res.data ? productsZ.parse(res.data.filter(e => e.sku?.slice(0, 14) === sku).map((product) => ({
          ...product,
          stripeProductId: product.stripeProductId.replace(/[^\w\s]/gi, '').slice(0, 30),
          sku: product.sku!.slice(0, 14),
          name: product.name.slice(0, 14),
          description: product.description.slice(0, 40),
        }))) : null,
      }))
      
    return {product}
}

export default function ProductsIndex() {
    const data = useLoaderData<typeof loader>();
    const product = data.product.data ? data.product.data[0] : null;
    let title = product?.name;
    const addToCart = useLove((state) => state.addToCart);

    if(!product) {
        return (
            <div>
                <h1>Produto não encontrado</h1>
                <Link to="/">Voltar</Link>
            </div>
        )
    }
  
    return (
        <main>
            <h1 className="p-2 m-2">Artesanatos da Zizi</h1>
            <article className="flex flex-col items-start gap-4 lg:flex-row lg:gap-12">
                <div className="grid-gap-4 mx-auto grid max-w-[70vw] grid-cols-1">
                    <ProductCover image={product.image} />
                </div>
            </article>
            <aside className="flex flex-col items-start gap-4 lg:flex-row lg:gap-12">
            <div className="flex flex-shrink-0 flex-row gap-4 md:gap-6 lg:w-2/3">
                <header>
                <Title data={{title}} />
                <h2 className="bg-black text-2xl font-bold tracking-tighter text-white">
                    {product.description}
                </h2>
                </header>
                <p>{formatCurrencyString({
                  currency: "BRL",
                  value: product.price,
                  language: "pt-BR",
                }).replace('.',',')}</p>
            </div>
            {/* <CartSummary /> */}
                <div className="relative mt-4 items-center justify-center text-center flex flex-row gap-4">
                    <Button size='sm' variant='outline' onClick={() => addToCart(product)}>Colocar no Carrinho</Button>
                    <Link to="/">
                        <p>Voltar</p>
                    </Link>
                </div>
            </aside>
        </main>
    );
} 