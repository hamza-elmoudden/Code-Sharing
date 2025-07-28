import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '4cyk4v49',  
  dataset: 'code_show',       
  useCdn: false,
  apiVersion: '2023-01-01',
  // token: api
})
