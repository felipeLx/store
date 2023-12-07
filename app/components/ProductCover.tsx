import type {SanityImageObjectStub} from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'

import {dataset, projectId} from '~/sanity/projectDetails'

type ProductCoverProps = {
  image?: SanityImageObjectStub & {alt: string}
}

export function ProductCover(props: ProductCoverProps) {
  const {image} = props

  return (
    <div className="aspect-square bg-gray-50">
      <figure>
        {image ? (
          <img
            decoding="async"
            data-zoom={image.asset}
            data-index='1'
            className="h-auto w-full object-cover cursor-zoom-in shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-200"
            src={urlBuilder({projectId, dataset})
              // @ts-ignore
              .image(image.asset._ref)
              .height(800)
              .width(800)
              .fit('max')
              .auto('format')
              .url()}
            alt='Produtos | Artesanatos da Zizi'
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
            Imagem não encontrada | Artesanatos da Zizi
          </div>
        )}
      </figure>
    </div>
  )
}