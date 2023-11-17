import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {projectDetails} from '~/sanity/projectDetails'
import schema from '~/sanity/schema'
import {defaultDocumentNode, structure} from '~/sanity/structure'

export const config = defineConfig({
  ...projectDetails(),
  name: 'zizi-sanity',
  title: 'Sanity Zizi',
  plugins: [deskTool({structure, defaultDocumentNode}), visionTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
