import {z} from 'zod'

export const productZ = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    sku: z.string().nullable(),
    price: z.number(),
    image: z.any().nullable(),
    likes: z.number().nullable(),
    dislikes: z.number().nullable(),
    currency: z.string(),
    quantity: z.number(),
    stripeProductId: z.string(),
})

export type ProductDocument = z.infer<typeof productZ>
export const productsZ = z.array(productZ)

export const productStubZ = z.object({
    _id: z.string(),
    name: z.string().regex(/[a-zA-Z0-9]/g).trim(),
    description: z.string().regex(/[a-zA-Z0-9]/g).trim(),
    sku: z.string().regex(/[a-zA-Z0-9]/g).trim(),
    price: z.number(),
    image: z.any().nullable(),
    likes: z.number().nullable(),
    dislikes: z.number().nullable(),
    currency: z.string().regex(/[a-zA-Z0-9]/g).trim(),
    quantity: z.number(),
    stripeProductId: z.string().regex(/[a-zA-Z0-9]/g).trim(),
  })
  
  export const productStubsZ = z.array(productStubZ)
  export type ProductStub = z.infer<typeof productStubZ>