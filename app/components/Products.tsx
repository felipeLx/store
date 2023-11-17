import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import {Link} from '@remix-run/react'
import React from 'react'

import {ProductCover} from '~/components/ProductCover'
import type {ProductDocument} from '~/types/product'
import { Button } from "./ui/button";

type ProductsProps = {
  products: ProductDocument[]
}

export function Products(props: ProductsProps) {
  const { addItem, removeItem } = useShoppingCart();
  
  const {products = []} = props
  return (
    <>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-3">
        {products.map(product => 
        <li key={product.sku} className="group relative flex flex-col">
          <div className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90">
            <div className="absolute z-0 h-36 w-[100%] translate-x-20 translate-y-20 -rotate-45 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-x-10 group-hover:translate-y-10 group-hover:opacity-75" />
            <ProductCover image={product.image} name={product.name} />
          </div>
          <div className="flex flex-col text-center">
            <Link
                prefetch="intent"
                to={`/product/${product.sku}`}
                
              >
                <Button disabled size='wide' variant='outline'>
                {product.name} / {formatCurrencyString({
                  currency: "BRL",
                  value: product.price,
                })}
                </Button>
                {/* Makes this entire block clickable 
                <span className="absolute inset-0" />*/}
              </Link>
          </div>
          <div className="relative mt-4 items-center justify-center text-center flex flex-row gap-4">
            <Button size='sm' variant='outline' onClick={() => addItem(product)}>Colocar no Carrinho</Button>
            <Button size='sm' variant='outline' onClick={() => removeItem(product.id)}>Tirar do Carrinho</Button>
          </div>
        </li>
      )}
    </ul>
  </>
  )
}
