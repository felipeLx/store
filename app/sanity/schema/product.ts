import {ShoppingBag} from 'lucide-react'
import {defineField, defineType} from 'sanity' // defineField, 


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
      // @ts-ignore
      validation: Rule => Rule.custom<string>((name) => {
        if (typeof name === 'string') {
          return name.replace(/^[a-zA-Z0-9]/, '').trim(); // remove 'zero-width space' characters
        }
      }).max(30).warning('This field is required'),
    }),
    defineField({
      name: 'stripeProductId',
      title: 'Stripe ID',
      type: 'string',
      // @ts-ignore
      validation: Rule => Rule.custom<string>((name) => {
        if (typeof name === 'string') {
          return name.replace(/^[a-zA-Z0-9]/, '').trim(); // remove 'zero-width space' characters
        }
      }).max(30).warning('This field is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'slug',
      options: {
        source: "name",
      }
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string'})],
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
      stripeProductId: 'stripeProductId',
      price: 'price',
      quantity: 'quantity',
      media: 'image',
    },
    prepare({name, description, stripeProductId, price, quantity, media}) {
      return {
        name,
        description,
        stripeProductId,
        price,
        quantity,
        media,
      }
    },
  },
})