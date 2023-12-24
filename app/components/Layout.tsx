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
        <div className='p-2'>
          {home?.title ? <Title data={home} /> : null}
          <h6>
            <span className="text-gray-400">Artes prontas e únicas para venda</span>
          </h6>
          <p>Diferente de outros sites. no Artesanatos da Zizi você encontra produtos prontos, realizados para exposição e feiras, e agora disponíveis para a venda. Produto único, não há reprodução.</p>
        </div>
        {children}
        <ShoppingCartModal />
      </div>
      <Footer home={home} />
    </>
  )
}