import {defineField, defineType} from 'sanity'

export const merchType = defineType({
    name: "merch",
    title: "Merch",
    type: "document",
    fields: [
        defineField({
        name: "name",
        title: "Name",
        type: "string",
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
      }),
      defineField({
        name: "price",
        title: "Price",
        description: "For now, add cents as zeroes, ie 500 = $5",
        type: "number", 
      }),
      defineField({
        name: "currency",
        title: "Currency",
        description: "Keep this 'brl' for the purposes of this tutorial",
        type: "string",
      }),
      defineField({
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
      }),
    ],
      initialValue: {
      currency: "brl",
    },
  });