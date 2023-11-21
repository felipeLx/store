import {type PropsWithChildren, Suspense} from 'react'

import {useRootLoaderData} from '~/lib/useRootLoaderData'

import {Footer} from './Footer'

import NavBar from "~/components/navBar"
import ShoppingCartModal from "./shoppingCartModal"
import {PreviewProvider} from './PreviewProvider'

export function Layout(props: PropsWithChildren) {
  const rootData = useRootLoaderData()
  const children = (
    <>
      <div className="container mx-auto p-4 lg:p-12">
        <NavBar />
        {props.children}
        <ShoppingCartModal />
      </div>
      <Footer />
    </>
  )

  return rootData.preview ? (
    <Suspense fallback={children}>
      <PreviewProvider>{children}</PreviewProvider>
    </Suspense>
  ) : (
    children
  )
}
