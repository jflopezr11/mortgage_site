import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '8id7fua6',        
  dataset: 'production',         
  apiVersion: '2025-03-30',
  useCdn: true,
})
