import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {Products} from '~/components/Products'
import type {Loader as RootLoader} from '~/root'
import {useQuery} from '~/sanity/loader'
import {loadQuery} from '~/sanity/loader.server'
import {PRODUCTS_QUERY} from '~/sanity/queries'
import type {ProductDocument} from '~/types/product'
import {productsZ} from '~/types/product'

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader
  }
> = ({data, matches}) => {
  const rootData = matches.find((match) => match.id === `root`)?.data
  const home = rootData ? rootData!.initial.data : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  return [{title}]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  let initial = await loadQuery<ProductDocument[]>(PRODUCTS_QUERY).then((res) => ({
    ...res,
    data: res.data ? productsZ.parse(res.data.map((product) => ({
      ...product,
      stripeProductId: product.stripeProductId.replace(/[^\w\s]/gi, '').slice(0, 30),
      sku: product.sku!.slice(0, 14),
      name: product.name.slice(0, 14),
      description: product.description.slice(0, 40),
    }))) : null,
  }))

  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }
  
  return json({
    initial,
    query: PRODUCTS_QUERY,
    params: {},
  })
}
/*
const data = JSON.stringify(initial.data.map((product) => {
    return {
      products: {
      stripeProductId: product.stripeProductId.replace(/[^\w\s]/gi, '').slice(0, 40),
      sku: product.sku!.slice(0, 14),
      name: product.name.slice(0, 14),
      description: product.description.slice(0, 30)
      }
    }
  }))
  console.log('data', data)
*/
export default function Index() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading} = useQuery<typeof initial.data>(query, params, {
    initial,
  })

  if (loading || !data) {
    return <div>Carregando...</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-12">
      <Products products={data} />
    </div>
  )
}