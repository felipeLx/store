import urlBuilder from '@sanity/image-url'
import React from 'react'

import {projectDetails} from '~/sanity/projectDetails'

type ProductCoverProps = {
  name?: string | null
  image?: string
}

export function ProductCover(props: ProductCoverProps) {
  const {name, image} = props
  
  return (
    <div className="aspect-square bg-gray-50">
      {image ? (
        <img
        className="h-auto w-full object-cover shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-200"
        src={urlBuilder(projectDetails())
          // @ts-ignore
          .image(image)
          .height(800)
          .width(800)
          .fit('max')
          .auto('format')
          .url()}
        alt={String(name) ?? ``}
        loading="lazy"
      />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
          {name ?? `Missing Product image`}
        </div>
      )}
    </div>
  )
}
