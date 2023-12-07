import { Link } from '@remix-run/react'
// import {Logo} from '~/components/Logo'
import type {LogoProps} from '~/types/home'
import { Facebook, Instagram } from 'lucide-react';

export function Footer(props: LogoProps) {
  return (
    <footer className="min-h-[200px] bg-black w-full block">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-12">
        <div className="flex mt-2 max-w-sm text-right flex-row items-start justify-start gap-2 text-sm lg:flex-row lg:items-center lg:gap-5 md:flex-col sm:flex-col">
          <ul className='flex flex-row align-baseline text-inherit gap-2'>
          <li className="text-white mr-4 text-sm">
              <Link to="/">Home</Link></li>
            <li className="text-white mr-4 text-sm">
              <Link to="about">Quem Somos</Link></li>
            <li className="text-white mr-4 text-sm"><Link to="privacy">Política de Privacidade</Link></li>
            <li className="text-white mr-4 text-sm"><Link to="tos">Termo de Serviço</Link></li>
          </ul>
        </div>
        <div className="flex max-w-sm text-right flex-1 flex-col items-end justify-end gap-2 text-sm lg:flex-row lg:items-center lg:gap-5 md:flex-col sm:flex-col">
          <ul className='flex flex-row align-baseline text-inherit gap-2'>
            <li className="text-white mr-4 text-sm">
              <a target='_blank' rel='noreferrer' href='https://www.facebook.com/artesanatosdazizies'><Facebook /></a></li>
            <li className="text-white mr-4 text-sm"><a target='_blank' rel='noreferrer' href='https://www.instagram.com/artesanatosdazizi/'><Instagram /></a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-end items-baseline p-2">
        <p className='text-white font-light'> {new Date().getFullYear()} @ArtesanatosdaZizi</p>
      </div>
    </footer>
  )
}