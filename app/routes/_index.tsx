import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import LiveQuery from '@sanity/preview-kit/live-query'

import {Title} from '~/components/Title'
import {useRootLoaderData} from '~/lib/useRootLoaderData'
import type {Loader as RootLoader} from '~/root'
import tailwind from '~/tailwind.css'
import { merchQuery, client } from "~/lib/sanity.server";
import { Products } from "~/components/Products";

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: tailwind}]
}

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader
  }
> = ({data, matches}) => {
  const rootData = matches.find((match) => match.id === `root`)?.data
  const home = rootData ? rootData.home : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  return [{title}]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const products = await client.fetch(merchQuery);
    return {products};
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const rootData = useRootLoaderData()

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:gap-12">
        <LiveQuery
          enabled={Boolean(rootData.preview)}
          query={rootData.query}
          params={rootData.params}
          initialData={rootData.home}
        >
        <Title data={rootData.home} />
        </LiveQuery>
        <div className='flex w-full justify-center items-center'>
          <Products products={data.products} />
          <Outlet />
        </div>
      </div>
    </>
  )
}
