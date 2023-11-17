import groq from "groq";

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