let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful') // eslint-disable-line global-require
} catch (_) { console.info('using env vars') }

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken
}

// process.env.GATSBY_CONTENTFUL_OFFLINE = true

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://www.gulfcorpusa.com'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/layouts/')
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-133288229-1',
        respectDNT: true
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        // production: true
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/favicon.png',

        // WebApp Manifest Configuration
        appName: 'Gulf Corp', // Inferred with your package.json
        appDescription: 'Real Estate Development & Construction',
        developerName: 'Zach Hardesty',
        developerURL: 'https://zachhardesty.com',
        dir: 'auto',
        lang: 'en-US',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: '1.0',

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          windows: false
        }
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        pure: process.env.NODE_ENV === 'production',
        fileName: process.env.NODE_ENV !== 'production',
        displayName: process.env.NODE_ENV !== 'production'
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig
    },
    'gatsby-plugin-netlify'
  ]
}
