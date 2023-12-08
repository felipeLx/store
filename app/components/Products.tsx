import { formatCurrencyString } from "use-shopping-cart";
import {Link} from '@remix-run/react'

import {ProductCover} from '~/components/ProductCover'
import type {ProductDocument} from '~/types/product'
import { Button } from "./ui/button";
import { useLove } from "~/lib/useCart";

type ProductsProps = {
  products: ProductDocument[]
}

export function Products(props: ProductsProps) {
  const addToCart = useLove((state) => state.addToCart);
  const {products = []} = props
  
  if(!products) {
    return(
      <>
        <div className="grid grid-cols-2">
          <p>Carregando...</p>
        </div>
      </>
    )  
  }
  return (
    <>
      <ul className="grid grid-cols-2 gap-6 text-center justify-center md:grid-cols-3 md:gap-12 lg:grid-cols-3">
        {props.products.map(product => 
        <li key={product._id} className="group relative">
          <div className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90">
            <div className="absolute z-0 h-36 w-[100%] translate-x-20 translate-y-20 -rotate-45 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-x-10 group-hover:translate-y-10 group-hover:opacity-75" />
            {product.image ? <ProductCover image={product.image} /> : 
            <p>Produto sem imagem</p>}
          </div>
          <div className="flex flex-col text-center justify-center items-center">
            <Link
                prefetch="intent"
                to={`/product/${product.sku}`}
                
              >
                <Button disabled size='default' variant='outline'>
                {product.name} | {formatCurrencyString({
                  currency: "BRL",
                  value: product.price,
                  language: "pt-BR",
                }).replace('.',',')}
                </Button>
                {/* Makes this entire block clickable 
                <span className="absolute inset-0" />*/}
              </Link>
          </div>
          <div className="relative mt-4 items-center justify-center text-center flex flex-row gap-4">
            <Button size='sm' variant='outline' onClick={() => addToCart(product)}>Colocar no Carrinho</Button>
          </div>
        </li>
      )}
    </ul>
  </>
  )
}
