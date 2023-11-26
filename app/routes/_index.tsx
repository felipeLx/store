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
  const initial = await loadQuery<ProductDocument[]>(PRODUCTS_QUERY).then((res) => {
    return {
    ...res,
    data: res.data ? productsZ.parse(res.data) : null
    }}
  )

  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }
  console.log('initial', initial.data)

  const data = JSON.stringify(initial.data.map((product) => {
    return {
      ...product,
      stripeProductId: product.stripeProductId.replace(/[^\w\s]/gi, '').slice(0, 30),
      sku: product.sku!.slice(0, 14),
      name: product.name,
    }
  }))
  console.log('data', data)
  return json({data})
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  // const {products, loading} = useQuery<typeof data>(query, params, data)

  // if (loading || !data) {
    // return <div>Carregando...</div>
 // }

  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-12">
      <Products products={data} />
    </div>
  )
}