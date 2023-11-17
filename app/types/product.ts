import {z} from 'zod'

export const productZ = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    price: z.number(),
    image: z.any().nullable(),
    likes: z.number(),
    dislikes: z.number(),
    currency: z.string(),
    quantity: z.number(),
    stripeId: z.string(),
})

export type ProductDocument = z.infer<typeof productZ>


export const productStubZ = z.object({
    _id: z.string(),
    _type: z.string(),
    name: z.string().nullable(),
    image: z.any().nullable(),
  })
  
  export const productStubsZ = z.array(productStubZ)
  
  export type ProductStub = z.infer<typeof productStubZ>
  