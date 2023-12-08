import {type PropsWithChildren} from 'react'

import {Footer} from './Footer'
import {Header} from './Header'
import {Title} from './Title'
import type {LogoProps} from '~/types/home'
import ShoppingCartModal from './shoppingCartModal'

export function Layout({home, children}: PropsWithChildren<LogoProps>) {
  return (
    <>
      <Header />
      <div className="flex flex-col w-fill mb-2 pb-2">
        {home?.title ? <Title data={home} /> : null}
        {children}
        <ShoppingCartModal />
      </div>
      <Footer home={home} />
    </>
  )
}