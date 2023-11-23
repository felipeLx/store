import groq from 'groq'

export const HOME_QUERY = groq`*[_id == "home"][0]{ title, siteTitle }`

export const RECORDS_QUERY = groq`*[_type == "product"][0...12]|order(name asc){
    _id,
    _type,
    name,
    sku,
    description,
    price,
    quantity,
    likes,
    dislikes,
    currency,
    stripeId,
    image
  } | order(releaseDate desc)`

export const RECORD_QUERY = groq`*[_type == "product" && sku == $sku][0]{
    _id,
    name,
    sku,
    description,
    price,
    quantity,
    currency,
    stripeId,
    image,
    // coalesce() returns the first value that is not null
    // so we can ensure we have at least a zero
    "likes": coalesce(likes, 0),
    "dislikes": coalesce(dislikes, 0)
}`