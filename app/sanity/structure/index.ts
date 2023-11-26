import {Disc, Home} from 'lucide-react'
import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/desk'

import OGPreview from '~/sanity/components/OGPreview'

import {resolveOGUrl} from './resolveOGUrl'
import { type SanityDocument } from '@sanity/client'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      S.documentListItem()
        .schemaType('home')
        .icon(Home)
        .id('home')
        .title('Home'),
      S.divider(),
      // Document lists
      S.documentTypeListItem('product').title('Produtos').icon(Disc),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType, documentId},
) => {
  // @ts-ignore
  let id: SanityDocument = documentId!;
  const OGPreviewView = S.view
    .component(OGPreview)
    .options({
      url: resolveOGUrl(id),
    })
    .title('OG Preview')

  switch (schemaType) {
    case `home`:
      return S.document().views([S.view.form()])
    case `product`:
      return S.document().views([S.view.form(), OGPreviewView])
    default:
      return S.document().views([S.view.form()])
  }
}