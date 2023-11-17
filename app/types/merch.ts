import {z} from 'zod'

export const merchZ = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    currency: z.string(),
    image: z.any().nullable(),
})

export type MerchDocument = z.infer<typeof merchZ>

export const merchsZ = z.array(merchZ)