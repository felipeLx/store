import groq from 'groq'

export const HOME_QUERY = groq`*[_id == "home"][0]{ title, siteTitle }`.trim()

export const PRODUCTS_QUERY = groq`*[_type == "product"]|order(price desc){_id,_type,name,"sku": sku.current,description,price,quantity,likes,dislikes,currency,stripeProductId,image}`.trim().replaceAll(/[\u200B-\u200D\uFEFF]/g, '')

export const PRODUCT_QUERY = groq`*[_type == "product" && sku.current == $sku][0]{_id,name,
"sku": sku.current,description,price,quantity,currency,stripeProductId,image,"likes": coalesce(likes, 0),"dislikes": coalesce(dislikes, 0)
}`.trim()
