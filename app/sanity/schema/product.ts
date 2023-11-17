import {ShoppingBag} from 'lucide-react'
import {defineField, defineType} from 'sanity'


export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: ShoppingBag,
  fieldsets: [
    {
      name: 'rating',
      title: 'Rating',
      description: 'These fields are written to from the Remix front end',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      name: 'likes',
      type: 'number',
      readOnly: true,
      fieldset: 'rating',
    }),
    defineField({
      name: 'dislikes',
      type: 'number',
      readOnly: true,
      fieldset: 'rating',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'stripeId',
      title: 'Stripe ID',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      description: 'description',
      stripeId: 'stripeId',
      price: 'price',
      quantity: 'quantity',
      media: 'image',
    },
    prepare({name, description, stripeId, price, quantity, media}) {
      return {
        name,
        subtitle: description,
        stripeId,
        price,
        quantity,
        media,
      }
    },
  },
})