import groq from "groq";
import {createClient} from '@sanity/client'

import {projectDetails} from '~/sanity/projectDetails'

export const client = createClient({
  ...projectDetails(),
  useCdn: true,
})

export const previewClient = createClient({
  ...projectDetails(),
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_READ_TOKEN,
})

export const getClient = (previewMode = false) =>
  previewMode ? previewClient : client

export const writeClient = createClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export const merchQuery = groq`
*[_type=="product"]{
    name,
    description,
    price,
    sku,
    stripeId,
    dislikes,
    likes,
    "id": _id,
    "image": image.asset->url,
    currency
  }`;

export function skuFunction(sku: string) {
  const skuQuery = groq`
*[_type=="product" && sku==${sku}]{
    name,
    description,
    price,
    "id": _id,
    "image": image.asset->url,
    currency
  }`
  
  return skuQuery;
}