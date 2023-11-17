
type ProjectDetails = {
  projectId: string
  dataset: string
  apiVersion: string
}

export const projectDetails = (): ProjectDetails => {
  const {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION} = typeof document === 'undefined' ? process.env : window.ENV

  return {
    projectId: SANITY_PROJECT_ID ?? ``,
    dataset: SANITY_DATASET ?? ``,
    apiVersion: SANITY_API_VERSION ?? `2023-10-01`,
  }
}
