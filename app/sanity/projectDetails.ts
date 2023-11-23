declare global {
  interface Window {
    ENV: {
      SANITY_PROJECT_ID: string
      SANITY_DATASET: string
      SANITY_API_VERSION: string
      SANITY_STUDIO_URL: string
      SANITY_STUDIO_USE_STEGA: string
    }
  }
}

const {
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_VERSION,
  SANITY_STUDIO_URL,
  SANITY_STUDIO_USE_STEGA = false,
} = typeof document === 'undefined' ? process.env : window.ENV

export const projectId = SANITY_PROJECT_ID!
export const dataset = SANITY_DATASET!
export const apiVersion = SANITY_API_VERSION!
export const studioUrl = SANITY_STUDIO_URL!
export const useStega = SANITY_STUDIO_USE_STEGA === 'true'

if (!projectId) throw new Error('Missing SANITY_PROJECT_ID in .env')
if (!dataset) throw new Error('Missing SANITY_DATASET in .env')
if (!apiVersion) throw new Error('Missing SANITY_API_VERSION in .env')
if (!studioUrl) throw new Error('Missing SANITY_STUDIO_URL in .env')
if (typeof useStega !== 'boolean')
  throw new Error(
    `SANITY_STUDIO_USE_STEGA must be a boolean, current value: ${useStega}`,
  )