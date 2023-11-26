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
      <div className="container mx-auto p-4 lg:p-12 grid grid-cols-1 gap-4 lg:gap-12">
        {home?.title ? <Title data={home} /> : null}
        {children}
        <ShoppingCartModal />
      </div>
      <Footer home={home} />
    </>
  )
}