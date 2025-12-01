import { Helmet } from 'react-helmet-async'

function SEO({ title, description, path = '/', image = '/og-image.png', schema }) {
  const siteName = 'Wijeya Newspapers'
  const url = `https://www.wnl.lk${path}`
  const pageTitle = title ? `${title} | ${siteName}` : siteName
  const pageDesc = description || 'Wijeya Newspapers Limited — leaders, awards, careers, press releases, and more.'

  const jsonLd = schema || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    url,
    description: pageDesc,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: 'https://www.wnl.lk/'
    }
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export default SEO
