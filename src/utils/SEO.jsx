import { Helmet } from 'react-helmet-async'

function SEO({ title, description, path = '/', image = '/og-image.png', schema, keywords, author }) {
  const siteName = 'Wijeya Newspapers'
  const fallbackPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const normalizedPath = (path || fallbackPath || '/').startsWith('/')
    ? (path || fallbackPath || '/')
    : `/${path || fallbackPath || ''}`
  const url = `https://www.wnl.lk${normalizedPath}`
  const pageTitle = title ? `${title} | ${siteName}` : siteName
  const pageDesc = description || 'Wijeya Newspapers Limited — leaders, awards, careers, press releases, and more.'
  const defaultKeywords = 'Wijeya Newspapers, Sri Lanka news, journalism, media, publications, Daily Mirror, Sunday Times, Lankadeepa'
  const pageKeywords = keywords || defaultKeywords
  const pageAuthor = author || 'Wijeya Newspapers Limited'
  const fullImageUrl = image.startsWith('http') ? image : `https://www.wnl.lk${image}`

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
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={pageAuthor} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={pageTitle} />
      <meta name="twitter:site" content="@WijeyaNews" />
      <meta name="twitter:creator" content="@WijeyaNews" />

      {/* Additional SEO Meta Tags */}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export default SEO
